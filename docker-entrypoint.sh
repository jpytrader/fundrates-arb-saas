#!/bin/bash

set -euo pipefail
if [ -z "$SUPABASE_URL" ] || [ -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then
  echo "Skipping build-time provisioning: Missing cluster variables."
else
  REF=$(echo "$SUPABASE_URL" | sed -E 's|https://([^.]+).*|\1|')
  echo "Provisioning Supabase cluster ref: $REF"
  
  # 🌟 Automate creation of the missing config.toml file
  bunx supabase init
  bunx supabase link --project-ref "$REF"
  
  echo "Executing Database Schema migrations..."

  bun run db:push -- --file migrations/0001_init.sql
  bunx supabase secrets set FRA_CRON_SECRET="$FRA_CRON_SECRET"
  bun run deploy:functions -- --no-verify-jwt

  echo "Wiring Billing schemas and Payment gateways..."

  bunx supabase db push --file migrations/0002_subscriptions.sql
  bunx supabase secrets set STRIPE_SECRET_KEY="$STRIPE_SECRET_KEY"
  bunx supabase functions deploy create-checkout --no-verify-jwt
  bunx supabase functions deploy create-portal-session --no-verify-jwt

  echo "Scheduling persistent database background CRON automation..."
  CRON_1_EXISTS=$(supabase db execute --string "SELECT EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'fra-engine-tick');" | grep -q "true" && echo "true" || echo "false")
  echo "Checking and scheduling persistent database background CRON automation..."
  if [ "$CRON_1_EXISTS" = "false" ]; then
    echo "Scheduling fra-engine-tick..."
    bunx supabase db execute --string "
      SELECT cron.schedule('fra-engine-tick', '* * * * *', \$\$\$
        SELECT net.http_post(
          url := '$SUPABASE_URL/functions/v1/fra-engine',
          headers := jsonb_build_object('Content-Type', 'application/json', 'x-cron-secret', '$FRA_CRON_SECRET'),
          body := '{}'::jsonb
        );
      \$\$\$);
    "
  else
    echo "CRON 'fra-engine-tick' already exists. Skipping scheduling."
  fi
  CRON_2_EXISTS=$(supabase db execute --string "SELECT EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'fra-reconcile-subscriptions');" | grep -q "true" && echo "true" || echo "false")
  if [ "$CRON_2_EXISTS" = "false" ]; then
    echo "Scheduling fra-reconcile-subscriptions..."
    bunx supabase db execute --string "
      SELECT cron.schedule('fra-reconcile-subscriptions', '0 * * * *', \$\$
        SELECT net.http_post(
          url := 'https://' || '$REF' || '.functions.supabase.co/reconcile-subscriptions',
          headers := jsonb_build_object('x-cron-secret', current_setting('app.settings.fra_cron_secret', true))
        );
      \$\$);
    "
  else
    echo "CRON 'fra-reconcile-subscriptions' already exists. Skipping scheduling."
  fi
  
  echo "Deploying operational engine components, tags, and webhooks..."

  bunx supabase db push --file migrations/0004_billing_resilience.sql
  bunx supabase secrets set STRIPE_WEBHOOK_SECRET="$STRIPE_WEBHOOK_SECRET"
  bunx supabase functions deploy stripe-webhook-fra
  bunx supabase functions deploy reconcile-subscriptions
  bunx supabase functions deploy revoke-exchange-key
  bunx supabase functions deploy rotate-exchange-key
  echo "Database provisioning matrix established."
fi
# Hand over execution natively to the standard container CMD
exec "$@"
