-- 0004_billing_resilience.sql
--
-- Combined production-hardening migration covering:
--   * S3 — Stripe webhook DLQ
--   * S4 — Idempotency: UNIQUE partial index on fra_events (user_id, type, timestamp)
--   * S6 — Vault revoke: action column on fra_key_rotations + revoke_vault_secret()
--   * S7 — Observability: fra_engine_metrics table

BEGIN;

-- ───────────────────────── S3: Stripe webhook DLQ ─────────────────────────
CREATE TABLE IF NOT EXISTS public.fra_webhook_dlq (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id        text UNIQUE NOT NULL,
  event_type      text NOT NULL,
  payload         jsonb NOT NULL,
  last_error      text,
  retry_count     int NOT NULL DEFAULT 0,
  next_attempt_at timestamptz NOT NULL DEFAULT now(),
  resolved_at     timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_fra_webhook_dlq_pending
  ON public.fra_webhook_dlq (next_attempt_at)
  WHERE resolved_at IS NULL;

ALTER TABLE public.fra_webhook_dlq ENABLE ROW LEVEL SECURITY;
-- service_role only — no policies = no grants for anon/authenticated.

-- ───────────── S4: idempotent fra_events under retries ─────────────────────
-- Edge function may be retried (cron overlap, transient failure). The unique
-- index turns duplicate inserts into harmless no-ops via ON CONFLICT.
CREATE UNIQUE INDEX IF NOT EXISTS uq_fra_events_user_type_ts
  ON public.fra_events (user_id, type, timestamp);

-- ────────────── S6: vault revoke + audit action column ─────────────────────
ALTER TABLE public.fra_key_rotations
  ADD COLUMN IF NOT EXISTS action text NOT NULL DEFAULT 'rotate'
    CHECK (action IN ('rotate', 'revoke'));

CREATE OR REPLACE FUNCTION public.revoke_vault_secret(
  p_name    text,
  p_user_id uuid
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, vault
AS $$
DECLARE
  v_secret_id uuid;
  v_exchange  text;
BEGIN
  v_exchange := split_part(p_name, '_', 2);

  SELECT id INTO v_secret_id FROM vault.secrets WHERE name = p_name;
  IF v_secret_id IS NOT NULL THEN
    DELETE FROM vault.secrets WHERE id = v_secret_id;
  END IF;

  INSERT INTO public.fra_key_rotations (user_id, exchange, ip, action)
  VALUES (p_user_id, v_exchange, NULL, 'revoke');
END;
$$;

REVOKE ALL ON FUNCTION public.revoke_vault_secret(text, uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.revoke_vault_secret(text, uuid) FROM anon, authenticated;

-- ────────────── S7: per-tick engine metrics ────────────────────────────────
CREATE TABLE IF NOT EXISTS public.fra_engine_metrics (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ts                timestamptz NOT NULL DEFAULT now(),
  tenants_total     int NOT NULL,
  tenants_eligible  int NOT NULL,
  tenants_skipped   int NOT NULL,
  errors            int NOT NULL DEFAULT 0,
  duration_ms       int NOT NULL,
  sub_cache_age_ms  int,
  sub_cache_cold    boolean NOT NULL DEFAULT false
);

CREATE INDEX IF NOT EXISTS idx_fra_engine_metrics_ts
  ON public.fra_engine_metrics (ts DESC);

ALTER TABLE public.fra_engine_metrics ENABLE ROW LEVEL SECURITY;

-- Admins read.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'public' AND p.proname = 'has_role'
  ) THEN
    EXECUTE $pol$
      DROP POLICY IF EXISTS "admin metrics select" ON public.fra_engine_metrics;
      CREATE POLICY "admin metrics select"
        ON public.fra_engine_metrics
        FOR SELECT
        USING (public.has_role(auth.uid(), 'admin'::public.app_role));
    $pol$;
  END IF;
END $$;
-- service_role inserts via implicit grant.

COMMIT;

-- Replace advisory wrappers (HTTP RPC sessions don't persist, so use a
-- TTL'd lock table — same effect, simpler reasoning).
DROP FUNCTION IF EXISTS public.fra_try_advisory_lock(text);
DROP FUNCTION IF EXISTS public.fra_advisory_unlock(text);

CREATE TABLE IF NOT EXISTS public.fra_engine_locks (
  key          text PRIMARY KEY,
  acquired_at  timestamptz NOT NULL DEFAULT now(),
  expires_at   timestamptz NOT NULL
);

ALTER TABLE public.fra_engine_locks ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.fra_try_lock(p_key text, p_ttl_secs int DEFAULT 120)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE v_ok boolean := false;
BEGIN
  -- Best-effort cleanup of stale locks.
  DELETE FROM public.fra_engine_locks WHERE expires_at < now();
  INSERT INTO public.fra_engine_locks (key, expires_at)
  VALUES (p_key, now() + (p_ttl_secs || ' seconds')::interval)
  ON CONFLICT (key) DO NOTHING;
  GET DIAGNOSTICS v_ok = ROW_COUNT;
  RETURN v_ok > 0;
END $$;

CREATE OR REPLACE FUNCTION public.fra_unlock(p_key text)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$ DELETE FROM public.fra_engine_locks WHERE key = p_key; $$;

REVOKE ALL ON FUNCTION public.fra_try_lock(text, int) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.fra_unlock(text)        FROM PUBLIC, anon, authenticated;
