# Deployment Guide

Step-by-step instructions to deploy the FRA SaaS wrapper to a fresh Supabase
project.

## Prerequisites

- Supabase CLI installed (`npm i -g supabase`)
- A Supabase project (free tier is fine for evaluation)
- `pg_cron` and `pg_net` extensions enabled (Database → Extensions)

## 1. Link & install

```bash
cd supabase-saas
npm install
supabase link --project-ref <your-project-ref>
```

## 2. Apply the schema

```bash
supabase db push migrations/0001_init.sql
```

This creates `fra_state`, `fra_positions`, `fra_pnl_history`, `fra_events`,
their RLS policies, and adds them to the `supabase_realtime` publication.

## 3. Generate a cron secret

```bash
openssl rand -hex 32
```

Copy the output — you'll use it twice.

## 4. Set edge function secrets

```bash
supabase secrets set FRA_CRON_SECRET=<paste-from-step-3>
# SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are auto-provided by Supabase
```

## 5. Deploy the engine function

```bash
supabase functions deploy fra-engine --no-verify-jwt
```

`--no-verify-jwt` is required because the function authenticates via the
`x-cron-secret` header instead of a user JWT.

## 6. Schedule the cron job

In the SQL editor (or via the CLI):

```sql
SELECT cron.schedule(
  'fra-engine-tick',
  '* * * * *',
  $$
  SELECT net.http_post(
    url := 'https://<project-ref>.supabase.co/functions/v1/fra-engine',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-cron-secret', '<your-FRA_CRON_SECRET>'
    ),
    body := '{}'::jsonb
  );
  $$
);
```

## 7. Per-tenant exchange keys (Vault)

The component itself accepts exchange keys client-side via the `exchangeKeys`
prop. For SaaS use, store them in Supabase Vault, keyed by user ID:

```sql
SELECT vault.create_secret(
  '<hyperliquid-private-key>',
  'fra_hyperliquid_key_' || auth.uid()
);
```

Read them server-side from the edge function via `vault.decrypted_secrets`.
**Never expose Vault secrets to the client.**

## 8. Wire the client

In your Ionic / Vite / Next app:

```bash
npm install @vireson/funding-rate-arb @supabase/supabase-js
```

Then drop in `client/ExampleApp.tsx` and configure the env vars in
`.env.example`.

## Verifying

1. Sign in a test user from the client.
2. Toggle the engine to "Running" — you should see a row appear in `fra_state`.
3. Wait one minute — `fra_events` should get a `scan_heartbeat` row from the
   server-side function.
4. Open the SQL editor: `SELECT * FROM cron.job_run_details ORDER BY runid DESC LIMIT 5;`

## Rollback

```bash
supabase functions delete fra-engine
psql $DATABASE_URL -c "SELECT cron.unschedule('fra-engine-tick');"
psql $DATABASE_URL -c "DROP TABLE public.fra_events, public.fra_pnl_history, public.fra_positions, public.fra_state CASCADE;"
```
