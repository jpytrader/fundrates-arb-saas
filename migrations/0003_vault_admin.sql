-- 0003_vault_admin.sql
--
-- Vault key rotation stack:
\set ON_ERROR_STOP on
BEGIN;
--   * public.fra_key_rotations  — audit table
--   * public.rotate_vault_secret(p_name, p_payload, p_user_id) — atomic
--     create-or-update wrapper around vault.create_secret/vault.update_secret.
--
-- Companion edge function: edge-functions/rotate-exchange-key/
-- Companion docs: docs/ARCHITECTURE.md §Vault rotation v2

-- ---------------------------------------------------------------------------
-- Audit table
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.fra_key_rotations (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exchange    text NOT NULL,
  ip          inet,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_fra_key_rotations_created_at
  ON public.fra_key_rotations (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_fra_key_rotations_user_created
  ON public.fra_key_rotations (user_id, created_at DESC);

ALTER TABLE public.fra_key_rotations ENABLE ROW LEVEL SECURITY;

-- Users see their own rotations.
DROP POLICY IF EXISTS "own rotations select" ON public.fra_key_rotations;
CREATE POLICY "own rotations select"
  ON public.fra_key_rotations
  FOR SELECT
  USING (auth.uid() = user_id);

-- Admins (if the host project ships a has_role helper) see all rotations.
-- Wrapped in a DO block so this migration is portable to projects that
-- don't expose has_role / app_role.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'public' AND p.proname = 'has_role'
  ) THEN
    EXECUTE $pol$
      DROP POLICY IF EXISTS "admin rotations select" ON public.fra_key_rotations;
      CREATE POLICY "admin rotations select"
        ON public.fra_key_rotations
        FOR SELECT
        USING (public.has_role(auth.uid(), 'admin'::public.app_role));
    $pol$;
  END IF;
END $$;

-- INSERT is service-role only (no policy → no grants for authenticated/anon).
-- The edge function uses the service role key.

-- ---------------------------------------------------------------------------
-- Atomic rotate function
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.rotate_vault_secret(
  p_name    text,
  p_payload text,
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
  -- Derive `<exchange>` from `fra_<exchange>_key_<uuid>` for the audit row.
  v_exchange := split_part(p_name, '_', 2);

  SELECT id INTO v_secret_id FROM vault.secrets WHERE name = p_name;

  IF v_secret_id IS NULL THEN
    PERFORM vault.create_secret(p_payload, p_name);
  ELSE
    PERFORM vault.update_secret(v_secret_id, p_payload, p_name);
  END IF;

  -- Minimal audit so SQL-direct rotations are also tracked.
  -- The edge function inserts a richer row (with IP) immediately after.
  INSERT INTO public.fra_key_rotations (user_id, exchange, ip)
  VALUES (p_user_id, v_exchange, NULL);
END;
$$;

REVOKE ALL ON FUNCTION public.rotate_vault_secret(text, text, uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.rotate_vault_secret(text, text, uuid) FROM anon, authenticated;
-- service_role keeps EXECUTE by default.

COMMIT;
