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

  echo "Deploying engine components - billing schemas, gateway targets, and serverless functions..."

  # 1. Pull deployed function list directly using the native CLI (bypasses curl string formatting)
  # The '-o json' flag allows safe programmatic parsing natively in Bash without jq
  DEPLOYED_RAW=$(bunx supabase functions list -o json 2>/dev/null || echo "[]")

  # 2. Map all your functions into a clean Bash associative array tracking system
  declare -A TARGET_FUNCTIONS=(
    ["fra-engine"]=1
    ["create-checkout"]=1
    ["create-portal-session"]=1
    ["stripe-webhook-fra"]=1
    ["reconcile-subscriptions"]=1
    ["revoke-exchange-key"]=1
    ["rotate-exchange-key"]=1
  )

  # 3. Cleanly parse slugs using standard Bash string manipulation instead of 'jq'
  while read -r slug; do
    unset "TARGET_FUNCTIONS[$slug]"
  done < <(echo "$DEPLOYED_RAW" | grep -o '"slug": "[^"]*' | grep -o '[^"]*$')

  # Collect whatever keys remain in our array (these are the true missing functions)
  MISSING_FUNCTIONS=("${!TARGET_FUNCTIONS[@]}")

  if [ ${#MISSING_FUNCTIONS[@]} -eq 0 ]; then
    echo "✅ All required edge functions are already present on the project stack."
  else
    echo "🚀 Discovered missing functions needing deployment: ${MISSING_FUNCTIONS[*]}"
    
    # Group regular commands cleanly to deploy in single bulk operations
    BULK_STANDARD=()
    BULK_NO_JWT=()

    for FUNC in "${MISSING_FUNCTIONS[@]}"; do
      case "$FUNC" in
        "fra-engine")
          # Custom deployment pipeline script
          bun run deploy:functions -- -no-verify-jwt 2>&1 | grep -v "WARN: failed to read file" || true
          ;;
        "create-checkout"|"create-portal-session")
          BULK_NO_JWT+=("$FUNC")
          ;;
        *)
          BULK_STANDARD+=("$FUNC")
          ;;
      esac
    done

    # 4. Trigger massive speed optimizations by executing bulk operations instead of loops
    if [ ${#BULK_NO_JWT[@]} -gt 0 ]; then
      echo "⚡ Bulk deploying non-JWT functions: ${BULK_NO_JWT[*]}"
      bunx supabase functions deploy "${BULK_NO_JWT[@]}" --no-verify-jwt
    fi

    if [ ${#BULK_STANDARD[@]} -gt 0 ]; then
      echo "⚡ Bulk deploying standard functions: ${BULK_STANDARD[*]}"
      bunx supabase functions deploy "${BULK_STANDARD[@]}"
    fi
  fi

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
