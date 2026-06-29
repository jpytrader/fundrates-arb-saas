#!/bin/bash
set -euo pipefail

if [ -z "$SUPABASE_URL" ] || [ -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then
  echo "Skipping build-time provisioning: Missing cluster variables."
else
  REF=$(echo "$SUPABASE_URL" | sed -E 's|https://([^.]+).*|\1|')
  echo "Provisioning Supabase cluster ref: $REF"
  
  # 🌟 Automate creation of the missing config.toml file
  bunx supabase init --force

  # 🌟 Dynamically construct the pre-authenticated IPv4 connection pooler URL
  # Because we use standard single-quotes 'EOF' for this block, password special characters
  # remain completely untouched in memory as plain data tokens.
  DB_POOLER_URL="postgresql://postgres.\${REF}:\${SUPABASE_DB_PASSWORD}\@aws-1-us-east-1.pooler.supabase.com:5432/postgres"

  echo "Executing single-pass Database Schema migrations over IPv4 Pooler..."
  # 🌟 Modern supabase CLI reads this flag flawlessly, bypassing all IPv6 routing restrictions!
  bun run db:push -- --db-url "$DB_POOLER_URL"
              
  # 🌟 Inject environment configurations into the management tier
  echo "Provisioning remote project secrets..."
  bunx supabase secrets set \
    FRA_CRON_SECRET="$FRA_CRON_SECRET" \
    STRIPE_SECRET_KEY="$STRIPE_SECRET_KEY" \
    STRIPE_WEBHOOK_SECRET="$STRIPE_WEBHOOK_SECRET"

  echo "Deploying operational engine components - billing schemas, payment gateways, and serverless functions..."
  bun run deploy:functions -- --no-verify-jwt
  bunx supabase functions deploy create-checkout --no-verify-jwt
  bunx supabase functions deploy create-portal-session --no-verify-jwt
  bunx supabase functions deploy stripe-webhook-fra
  bunx supabase functions deploy reconcile-subscriptions
  bunx supabase functions deploy revoke-exchange-key
  bunx supabase functions deploy rotate-exchange-key
  echo "Database provisioning matrix established."

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
  echo "Infrastructure provisioning completed successfully."
fi
# Hand over execution natively to the standard container CMD
exec "$@"
