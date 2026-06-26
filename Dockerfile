# ==========================================
# STAGE 1: Automated Production Provisioner
# ==========================================
FROM supabase/cli:v1.192.1 AS provisioner
WORKDIR /provision

# Explicitly copy ONLY what the Supabase CLI needs to deploy schemas & functions
COPY migrations/ ./migrations/
COPY edge-functions/ ./edge-functions/

# Declare variables required at build/init phase
ARG SUPABASE_URL
ARG SUPABASE_SERVICE_ROLE_KEY
ARG FRA_CRON_SECRET
ARG STRIPE_SECRET_KEY
ARG STRIPE_WEBHOOK_SECRET

RUN set -eu; \
    if [ -z "$SUPABASE_URL" ] || [ -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then \
      echo "Skipping build-time provisioning: Missing cluster variables."; \
    else \
      REF=$(echo "$SUPABASE_URL" | sed -E 's|https://([^.]+).*|\1|'); \
      echo "Provisioning Supabase cluster ref: $REF"; \
      supabase link --project-ref "$REF" --password "PlaceholderUnusedForApiDirectives"; \
      \
      echo "Executing Database Schema migrations..."; \
      npm run db:push -- --file migrations/0001_init.sql; \
      supabase secrets set FRA_CRON_SECRET="$FRA_CRON_SECRET"; \
      npm run deploy:functions -- --no-verify-jwt; \
      \
      echo "Wiring Billing schemas and Payment gateways..."; \
      supabase db push --file migrations/0002_subscriptions.sql; \
      supabase secrets set STRIPE_SECRET_KEY="$STRIPE_SECRET_KEY"; \
      supabase functions deploy create-checkout --no-verify-jwt; \
      supabase functions deploy create-portal-session --no-verify-jwt; \
      \
      echo "Scheduling persistent database background CRON automation..."; \
      supabase db execute --string " \
        SELECT cron.schedule('fra-engine-tick', '* * * * *', \$\$\$ \
          SELECT net.http_post( \
            url := '$SUPABASE_URL/functions/v1/fra-engine', \
            headers := jsonb_build_object('Content-Type', 'application/json', 'x-cron-secret', '$FRA_CRON_SECRET'), \
            body := '{}'::jsonb \
          ); \
        \$\$\$); \
      "; \
      supabase db execute --string " \
        SELECT cron.schedule('fra-reconcile-subscriptions', '0 * * * *', \$\$ \
          SELECT net.http_post( \
            url := 'https://' || '$REF' || '.functions.supabase.co/reconcile-subscriptions', \
            headers := jsonb_build_object('x-cron-secret', current_setting('app.settings.fra_cron_secret', true)) \
          ); \
        \$\$); \
      "; \
      \
      echo "Deploying operational engine components, tags, and webhooks..."; \
      supabase db push --file migrations/0004_billing_resilience.sql; \
      supabase secrets set STRIPE_WEBHOOK_SECRET="$STRIPE_WEBHOOK_SECRET"; \
      supabase functions deploy stripe-webhook-fra; \
      supabase functions deploy reconcile-subscriptions; \
      supabase functions deploy revoke-exchange-key; \
      supabase functions deploy rotate-exchange-key; \
      echo "Database provisioning matrix established."; \
    fi

# ==========================================
# STAGE 2: High-Performance Production App
# ==========================================
# FROM node:20-alpine
FROM oven/bun:alpine
WORKDIR /app
COPY package*.json bun.lock* .npmrc ./
# RUN npm install --omit=dev || npm install
RUN bun install --production --no-frozen-lockfile
COPY dist/ ./dist/
COPY README.md ./
EXPOSE 3000
# CMD ["npm", "start"]
# Run the application utilizing bun execution parameters
CMD ["bun", "run", "dist/index.js"] 
