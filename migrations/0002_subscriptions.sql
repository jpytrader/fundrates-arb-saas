-- ============================================================================
-- Funding Rate Arbitrage SaaS — billing slice (Stripe Sync Engine)
-- ============================================================================
\set ON_ERROR_STOP on
BEGIN;
-- Mandatory subscription gate. Bridges the Supabase Stripe Sync Engine's
-- internal `stripe.subscriptions` table into a clean `public.subscriptions`
-- table that RLS-scopes rows to the owning user via metadata.supabase_user_id.
--
-- PREREQUISITE: Install the Supabase Stripe Sync Engine integration first so
-- the `stripe` schema and `stripe.subscriptions` table exist. See
-- docs/BILLING.md for setup steps.
-- ============================================================================

-- ─── Application-side subscription mirror ───────────────────────────────────
CREATE TABLE public.subscriptions (
  id                   TEXT PRIMARY KEY,                       -- Stripe sub ID
  user_id              UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status               TEXT NOT NULL CHECK (status IN (
                         'active','trialing','past_due','canceled','unpaid'
                       )),
  price_id             TEXT,
  current_period_end   TIMESTAMPTZ,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_subscriptions_user_status
  ON public.subscriptions(user_id, status);

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Users may only read their own subscription row. Writes are server-side
-- (trigger via SECURITY DEFINER), so no INSERT/UPDATE policies for clients.
CREATE POLICY "Users can view their own subscription"
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- ─── Bridge trigger: stripe.subscriptions → public.subscriptions ────────────
CREATE OR REPLACE FUNCTION public.sync_stripe_to_public()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, stripe
AS $$
DECLARE
  v_user_id UUID;
  v_price_id TEXT;
  v_period_end BIGINT;
BEGIN
  -- Extract supabase user id from Stripe metadata (set in create-checkout)
  v_user_id := NULLIF(NEW.metadata->>'supabase_user_id', '')::uuid;
  IF v_user_id IS NULL THEN
    RAISE WARNING 'sync_stripe_to_public: missing metadata.supabase_user_id on stripe sub %', NEW.id;
    RETURN NEW;
  END IF;

  -- Extract first price ID from items.data[0].price.id
  v_price_id := NEW.items->'data'->0->'price'->>'id';

  -- current_period_end is a unix timestamp (seconds) in Stripe payloads
  v_period_end := (NEW.current_period_end)::bigint;

  INSERT INTO public.subscriptions (
    id, user_id, status, price_id, current_period_end
  )
  VALUES (
    NEW.id,
    v_user_id,
    NEW.status,
    v_price_id,
    CASE WHEN v_period_end IS NOT NULL
         THEN to_timestamp(v_period_end)
         ELSE NULL END
  )
  ON CONFLICT (id) DO UPDATE SET
    status             = EXCLUDED.status,
    price_id           = EXCLUDED.price_id,
    current_period_end = EXCLUDED.current_period_end,
    updated_at         = now();

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_stripe_sync
  AFTER INSERT OR UPDATE ON stripe.subscriptions
  FOR EACH ROW EXECUTE PROCEDURE public.sync_stripe_to_public();

-- ─── updated_at maintenance (reuse 0001 helper) ─────────────────────────────
CREATE TRIGGER trg_subscriptions_touch
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.fra_touch_updated_at();

-- ─── Realtime: client gate unlocks ~1s after Stripe writes ──────────────────
ALTER PUBLICATION supabase_realtime ADD TABLE public.subscriptions;

COMMIT;
