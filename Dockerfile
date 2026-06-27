# ==========================================
# STAGE 1: Automated Production Provisioner
# ==========================================
# 🌟 Use the official Bun Alpine image which is public and downloads instantly everywhere
FROM oven/bun:1.1-alpine AS provisioner
WORKDIR /provision

# 🌟 Install Git, Bash, and the missing system library compatibility wrappers needed by Supabase
RUN apk add --no-cache git bash libc6-compat

# Declare variables required at build/init phase
# 🌟 Add these lines so Stage 1 can receive variables from railway.toml
ARG SUPABASE_URL
ARG SUPABASE_SERVICE_ROLE_KEY
ARG SUPABASE_ACCESS_TOKEN
ARG FRA_CRON_SECRET
ARG STRIPE_SECRET_KEY
ARG STRIPE_WEBHOOK_SECRET

# 🌟 Freeze them as active environment variables for your application runtime
ENV SUPABASE_URL=$SUPABASE_URL
ENV SUPABASE_SERVICE_ROLE_KEY=$SUPABASE_SERVICE_ROLE_KEY
# Authorizes the CLI directly against your cloud project - generate in Supabase account
ENV SUPABASE_ACCESS_TOKEN=$SUPABASE_ACCESS_TOKEN
ENV FRA_CRON_SECRET=$FRA_CRON_SECRET
ENV STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY
ENV STRIPE_WEBHOOK_SECRET=$STRIPE_WEBHOOK_SECRET

# Explicitly copy ONLY what the Supabase CLI needs to deploy schemas & functions
COPY migrations/ ./migrations/
COPY edge-functions/ ./edge-functions/

# 🌟 Install the exact stable Supabase CLI binary package natively via Bun
RUN bun install -g supabase@1.192.0

RUN set -eu; \
    if [ -z "$SUPABASE_URL" ] || [ -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then \
      echo "Skipping build-time provisioning: Missing cluster variables."; \
    else \
      REF=$(echo "$SUPABASE_URL" | sed -E 's|https://([^.]+).*|\1|'); \
      echo "Provisioning Supabase cluster ref: $REF"; \
      bunx supabase link --project-ref "$REF" --password "PlaceholderUnusedForApiDirectives"; \
      \
      echo "Executing Database Schema migrations..."; \
      bun run db:push -- --file migrations/0001_init.sql; \
      bunx supabase secrets set FRA_CRON_SECRET="$FRA_CRON_SECRET"; \
      bun run deploy:functions -- --no-verify-jwt; \
      \
      echo "Wiring Billing schemas and Payment gateways..."; \
      bunx supabase db push --file migrations/0002_subscriptions.sql; \
      bunx supabase secrets set STRIPE_SECRET_KEY="$STRIPE_SECRET_KEY"; \
      bunx supabase functions deploy create-checkout --no-verify-jwt; \
      bunx supabase functions deploy create-portal-session --no-verify-jwt; \
      \      
      echo "Scheduling persistent database background CRON automation..."; \
      CRON_1_EXISTS=$(supabase db execute --string "SELECT EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'fra-engine-tick');" | grep -q "true" && echo "true" || echo "false"); \
      echo "Checking and scheduling persistent database background CRON automation..."; \
      if [ "$CRON_1_EXISTS" = "false" ]; then \
        echo "Scheduling fra-engine-tick..."; \
        bunx supabase db execute --string " \
          SELECT cron.schedule('fra-engine-tick', '* * * * *', \$\$\$ \
            SELECT net.http_post( \
              url := '$SUPABASE_URL/functions/v1/fra-engine', \
              headers := jsonb_build_object('Content-Type', 'application/json', 'x-cron-secret', '$FRA_CRON_SECRET'), \
              body := '{}'::jsonb \
            ); \
          \$\$\$); \
        "; \
      else \
        echo "CRON 'fra-engine-tick' already exists. Skipping scheduling."; \
      fi; \
      CRON_2_EXISTS=$(supabase db execute --string "SELECT EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'fra-reconcile-subscriptions');" | grep -q "true" && echo "true" || echo "false"); \
      if [ "$CRON_2_EXISTS" = "false" ]; then \
        echo "Scheduling fra-reconcile-subscriptions..."; \
        bunx supabase db execute --string " \
          SELECT cron.schedule('fra-reconcile-subscriptions', '0 * * * *', \$\$ \
            SELECT net.http_post( \
              url := 'https://' || '$REF' || '.functions.supabase.co/reconcile-subscriptions', \
              headers := jsonb_build_object('x-cron-secret', current_setting('app.settings.fra_cron_secret', true)) \
            ); \
          \$\$); \
        "; \
      else \
        echo "CRON 'fra-reconcile-subscriptions' already exists. Skipping scheduling."; \
      fi; \
      \
      echo "Deploying operational engine components, tags, and webhooks..."; \
      bunx supabase db push --file migrations/0004_billing_resilience.sql; \
      bunx supabase secrets set STRIPE_WEBHOOK_SECRET="$STRIPE_WEBHOOK_SECRET"; \
      bunx supabase functions deploy stripe-webhook-fra; \
      bunx supabase functions deploy reconcile-subscriptions; \
      bunx supabase functions deploy revoke-exchange-key; \
      bunx supabase functions deploy rotate-exchange-key; \
      # 🌟 Generates the tracking token upon successful completion
      touch /provision/provision_receipt.txt \
      echo "Database provisioning matrix established."; \
    fi

# ==========================================
# STAGE 2: High-Performance Production App
# ==========================================
# FROM node:20-alpine
FROM oven/bun:alpine
WORKDIR /app

# 🌟 Force Docker to fully run Stage 1 to fetch this file!
COPY --from=provisioner /provision/provision_receipt.txt ./

# 🌟 There lines let Stage 2 receive variables from railway.toml
ARG SUPABASE_URL
ARG SUPABASE_ANON_KEY
ARG STRIPE_PRICE_ID

# 🌟 Freeze them as active environment variables for your application runtime
ENV SUPABASE_URL=$SUPABASE_URL
ENV SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY
ENV STRIPE_PRICE_ID=$STRIPE_PRICE_ID

COPY package*.json bun.lock* .npmrc ./
# RUN npm install --omit=dev || npm install
RUN bun install --production --no-frozen-lockfile
COPY dist/ ./dist/
COPY README.md ./
EXPOSE 3000
# CMD ["npm", "start"]
# Run the application utilizing bun execution parameters
CMD ["bun", "run", "dist/index.js"] 
