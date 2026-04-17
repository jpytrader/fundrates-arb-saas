-- ============================================================================
-- Funding Rate Arbitrage SaaS — initial schema
-- ============================================================================
-- One row per user holds the canonical JSONB engine state. Denormalized tables
-- mirror positions, PnL history and events for indexing, analytics and
-- realtime subscriptions.
-- ============================================================================

-- ─── Canonical engine state (one row per user) ──────────────────────────────
CREATE TABLE public.fra_state (
  user_id     UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  state       JSONB NOT NULL,
  version     INTEGER NOT NULL,
  is_running  BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.fra_state ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own state"
  ON public.fra_state FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users write own state"
  ON public.fra_state FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own state"
  ON public.fra_state FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own state"
  ON public.fra_state FOR DELETE USING (auth.uid() = user_id);

-- ─── Denormalized positions (mirror of state.positions) ─────────────────────
CREATE TABLE public.fra_positions (
  id                 TEXT PRIMARY KEY,
  user_id            UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  pair               TEXT NOT NULL,
  exchange           TEXT NOT NULL,
  size_usd           NUMERIC NOT NULL,
  opened_at          TIMESTAMPTZ NOT NULL,
  funding_collected  NUMERIC NOT NULL DEFAULT 0,
  unrealized_pnl     NUMERIC NOT NULL DEFAULT 0,
  status             TEXT NOT NULL,
  margin_health_pct  NUMERIC NOT NULL DEFAULT 0,
  execution_cost     NUMERIC NOT NULL DEFAULT 0,
  raw                JSONB NOT NULL,
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_fra_positions_user ON public.fra_positions(user_id);
CREATE INDEX idx_fra_positions_status ON public.fra_positions(status);

ALTER TABLE public.fra_positions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own positions"
  ON public.fra_positions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users manage own positions"
  ON public.fra_positions FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ─── P&L history (append-only time series) ──────────────────────────────────
CREATE TABLE public.fra_pnl_history (
  id                       BIGSERIAL PRIMARY KEY,
  user_id                  UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  timestamp                TIMESTAMPTZ NOT NULL,
  net_pnl                  NUMERIC NOT NULL,
  total_realized_pnl       NUMERIC NOT NULL,
  total_unrealized_pnl     NUMERIC NOT NULL,
  total_funding_collected  NUMERIC NOT NULL,
  total_execution_cost     NUMERIC NOT NULL,
  open_position_count      INTEGER NOT NULL
);

CREATE INDEX idx_fra_pnl_user_ts ON public.fra_pnl_history(user_id, timestamp DESC);

ALTER TABLE public.fra_pnl_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own pnl history"
  ON public.fra_pnl_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own pnl history"
  ON public.fra_pnl_history FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ─── Engine events (heartbeats, opens/closes, errors) ───────────────────────
CREATE TABLE public.fra_events (
  id          BIGSERIAL PRIMARY KEY,
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type        TEXT NOT NULL,
  timestamp   TIMESTAMPTZ NOT NULL DEFAULT now(),
  data        JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX idx_fra_events_user_ts ON public.fra_events(user_id, timestamp DESC);

ALTER TABLE public.fra_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own events"
  ON public.fra_events FOR SELECT USING (auth.uid() = user_id);
-- Server-side inserts go through service role and bypass RLS

-- ─── Realtime publication ───────────────────────────────────────────────────
ALTER PUBLICATION supabase_realtime ADD TABLE public.fra_state;
ALTER PUBLICATION supabase_realtime ADD TABLE public.fra_positions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.fra_events;

-- ─── updated_at trigger ─────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.fra_touch_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TRIGGER trg_fra_state_touch
  BEFORE UPDATE ON public.fra_state
  FOR EACH ROW EXECUTE FUNCTION public.fra_touch_updated_at();

CREATE TRIGGER trg_fra_positions_touch
  BEFORE UPDATE ON public.fra_positions
  FOR EACH ROW EXECUTE FUNCTION public.fra_touch_updated_at();

-- ─── pg_cron schedule (run every minute) ────────────────────────────────────
-- Requires pg_cron + pg_net extensions enabled in the project.
-- The CRON_SECRET must match the FRA_CRON_SECRET env var on the edge function.
--
-- Run this AFTER deploying the fra-engine function and setting the secret:
--
-- SELECT cron.schedule(
--   'fra-engine-tick',
--   '* * * * *',
--   $$
--   SELECT net.http_post(
--     url := 'https://<project-ref>.supabase.co/functions/v1/fra-engine',
--     headers := jsonb_build_object(
--       'Content-Type', 'application/json',
--       'x-cron-secret', '<your-FRA_CRON_SECRET>'
--     ),
--     body := '{}'::jsonb
--   );
--   $$
-- );
