#!/bin/bash
set -euo pipefail

if [ -z "$SUPABASE_URL" ] || [ -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then
  echo "Skipping build-time provisioning: Missing cluster variables."
else
  REF=$(echo "$SUPABASE_URL" | sed -E 's|https://([^.]+).*|\1|')
  echo "Provisioning Supabase cluster ref: $REF"
  
  # 🌟 Automate creation of the missing config.toml file
  bunx supabase init --force
  
  mkdir -p supabase/migrations
  cp -r migrations/* supabase/migrations/ 2>/dev/null || true
  
  mkdir -p supabase/functions
  cp -r edge-functions/* supabase/functions/ 2>/dev/null || true
  
  # 🌟 Export the exact variable the CLI reads natively to replace 'supabase link' completely!
  export SUPABASE_ACCESS_TOKEN="${SUPABASE_ACCESS_TOKEN}"
  export SUPABASE_DB_PASSWORD="${SUPABASE_DB_PASSWORD}"

  # 🌟 Use the native pipe-feed string (<<<) to supply the password non-interactively!
  # This triggers the true network lookup, flags the workspace for IPv4, and links the project cleanly.
  bunx supabase link --project-ref "$REF" <<< "$SUPABASE_DB_PASSWORD"

  echo "Executing single-pass Database Schema migrations over IPv4 Session Pooler..."
  # 🌟 FIXED: Run the command completely bare! It natively inherits the active variables
  bun run db:push
              
  # 🌟 Inject environment configurations into the management tier
  echo "Provisioning remote project secrets..."
  bunx supabase secrets set \
    FRA_CRON_SECRET="$FRA_CRON_SECRET" \
    STRIPE_SECRET_KEY="$STRIPE_SECRET_KEY" \
    STRIPE_WEBHOOK_SECRET="$STRIPE_WEBHOOK_SECRET"

  echo "Deploying engine components - billing schemas, payment gateways, and serverless functions..."
  EXISTING_FUNCTIONS=$(curl -s -X GET "https://supabase.com{REF}/functions" \
    -H "Authorization: Bearer ${SUPABASE_ACCESS_TOKEN}")

  # Define functions as a standard space-separated string list
  FUNCTIONS="fra-engine create-checkout create-portal-session stripe-webhook-fra reconcile-subscriptions revoke-exchange-key rotate-exchange-key"

  for FUNC_NAME in $FUNCTIONS; do
    if echo "$EXISTING_FUNCTIONS" | grep -q "\"slug\": \"${FUNC_NAME}\""; then
      echo "⏭️ Skipping: '${FUNC_NAME}' already exists."
    else
      echo "🚀 Deploying missing function: '${FUNC_NAME}'"
      case "${FUNC_NAME}" in
        "fra-engine")
          bun run deploy:functions -- -no-verify-jwt 2>&1 | grep -v "WARN: failed to read file" ;;
        "create-checkout"|"create-portal-session")
          bunx supabase functions deploy "${FUNC_NAME}" --no-verify-jwt ;;
        *)
          bunx supabase functions deploy "${FUNC_NAME}" ;;
      esac
    fi
  done
  echo "Database provisioning matrix established."

  echo "Scheduling persistent database background CRON automation..."
  CRON_1_EXISTS=$(bunx supabase db query --linked "SELECT EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'fra-engine-tick');" | grep -q "true" && echo "true" || echo "false")
  echo "Checking and scheduling persistent database background CRON automation..."
  if [ "$CRON_1_EXISTS" = "false" ]; then
    echo "Scheduling fra-engine-tick..."
    bunx supabase db query --linked "
      SELECT cron.schedule('fra-engine-tick', '* * * * *', \$\$
        SELECT net.http_post(
          url := '$SUPABASE_URL/functions/v1/fra-engine',
          headers := jsonb_build_object('Content-Type', 'application/json', 'x-cron-secret', '$FRA_CRON_SECRET'),
          body := '{}'::jsonb
        );
      \$\$);
    "
  else
    echo "CRON 'fra-engine-tick' already exists. Skipping scheduling."
  fi

  CRON_2_EXISTS=$(bunx supabase db query --linked "SELECT EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'fra-reconcile-subscriptions');" | grep -q "true" && echo "true" || echo "false")
  if [ "$CRON_2_EXISTS" = "false" ]; then
    echo "Scheduling fra-reconcile-subscriptions..."
    bunx supabase db query --linked "
      SELECT cron.schedule('fra-reconcile-subscriptions', '0 * * * *', \$\$\
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
