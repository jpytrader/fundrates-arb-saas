#cloud-config
# Rendered by Terraform templatefile(). ${...} = Terraform variable, $VAR = shell variable.
# On first boot this script: mounts the data volume, installs Docker + Coolify,
# generates Supabase JWT keys, starts all stacks, and enables the watchdog.

write_files:

  # ── JWT key generator (no pip required) ────────────────────────────────────
  - path: /usr/local/bin/gen-jwt.py
    permissions: '0755'
    content: |
      #!/usr/bin/env python3
      import hmac, hashlib, base64, json, time, sys
      secret = sys.argv[1]
      def b64url(d):
          return base64.urlsafe_b64encode(
              d if isinstance(d, bytes) else d.encode()
          ).rstrip(b'=').decode()
      def make_jwt(role):
          now = int(time.time())
          h   = b64url(json.dumps({"alg":"HS256","typ":"JWT"}, separators=(',',':')))
          p   = b64url(json.dumps({"role":role,"iss":"supabase","iat":now,"exp":now+315360000},
                                   separators=(',',':')))
          sig = b64url(hmac.new(secret.encode(), f"{h}.{p}".encode(), hashlib.sha256).digest())
          return f"{h}.{p}.{sig}"
      print(f"ANON_KEY={make_jwt('anon')}")
      print(f"SERVICE_ROLE_KEY={make_jwt('service_role')}")

  # ── Kong declarative config ─────────────────────────────────────────────────
  - path: /data/supabase/volumes/api/kong.yml
    content: |
      _format_version: "1.1"

      consumers:
        - username: anon
          keyauth_credentials:
            - key: __ANON_KEY__
        - username: service_role
          keyauth_credentials:
            - key: __SERVICE_ROLE_KEY__

      acls:
        - consumer: anon
          group: anon
        - consumer: service_role
          group: admin

      services:
        - name: auth-v1-open
          url: http://supabase-auth:9999/verify
          routes:
            - name: auth-v1-open
              strip_path: true
              paths:
                - /auth/v1/verify
          plugins:
            - name: cors

        - name: auth-v1-open-callback
          url: http://supabase-auth:9999/callback
          routes:
            - name: auth-v1-open-callback
              strip_path: true
              paths:
                - /auth/v1/callback

        - name: auth-v1-open-meta
          url: http://supabase-auth:9999/
          routes:
            - name: auth-v1-open-meta
              strip_path: true
              paths:
                - ~/auth/v1/signup$
                - ~/auth/v1/token
                - ~/auth/v1/otp$
                - ~/auth/v1/recover$
                - ~/auth/v1/user$
                - ~/auth/v1/logout$
          plugins:
            - name: cors

        - name: auth-v1
          _comment: GoTrue server
          url: http://supabase-auth:9999/
          routes:
            - name: auth-v1-all
              strip_path: true
              paths:
                - /auth/v1/
          plugins:
            - name: cors
            - name: key-auth
              config:
                hide_credentials: false
            - name: acl
              config:
                hide_groups_header: true
                allow:
                  - admin
                  - anon

        - name: rest-v1
          _comment: PostgREST
          url: http://supabase-rest:3000/
          routes:
            - name: rest-v1-all
              strip_path: true
              paths:
                - /rest/v1/
          plugins:
            - name: cors
            - name: key-auth
              config:
                hide_credentials: true
            - name: acl
              config:
                hide_groups_header: true
                allow:
                  - admin
                  - anon

        - name: storage-v1
          _comment: Supabase Storage
          url: http://supabase-storage:5000/
          routes:
            - name: storage-v1-all
              strip_path: true
              paths:
                - /storage/v1/
          plugins:
            - name: cors

        - name: realtime-v1
          _comment: Supabase Realtime WebSocket
          url: http://supabase-realtime:4000/socket/
          routes:
            - name: realtime-v1-all
              strip_path: true
              paths:
                - /realtime/v1/
          plugins:
            - name: cors
            - name: key-auth
              config:
                hide_credentials: false
            - name: acl
              config:
                hide_groups_header: true
                allow:
                  - admin
                  - anon

        - name: functions-v1
          _comment: Edge Runtime (Deno)
          url: http://supabase-functions:9000/
          routes:
            - name: functions-v1-all
              strip_path: true
              paths:
                - /functions/v1/
          plugins:
            - name: cors
            - name: key-auth
              config:
                hide_credentials: true
            - name: acl
              config:
                hide_groups_header: true
                allow:
                  - admin
                  - anon

        - name: meta
          _comment: Postgres Meta (Studio internal only)
          url: http://supabase-meta:8080/
          routes:
            - name: meta-all
              strip_path: true
              paths:
                - /pg/
          plugins:
            - name: key-auth
              config:
                hide_credentials: false
            - name: acl
              config:
                hide_groups_header: true
                allow:
                  - admin

  # ── Grafana datasource provisioning ────────────────────────────────────────
  - path: /data/monitoring/grafana/provisioning/datasources/datasources.yml
    content: |
      apiVersion: 1
      datasources:
        - name: Prometheus
          type: prometheus
          access: proxy
          url: http://prometheus:9090
          isDefault: true
          editable: false

        - name: PostgreSQL (fra_engine_metrics)
          type: postgres
          access: proxy
          url: supabase-db:5432
          user: postgres
          secureJsonData:
            password: ${postgres_password}
          jsonData:
            database: postgres
            sslmode: disable
            postgresVersion: 1500
            timescaledb: false
          editable: false

  # ── Prometheus scrape config ────────────────────────────────────────────────
  - path: /data/monitoring/prometheus/prometheus.yml
    content: |
      global:
        scrape_interval: 15s
        evaluation_interval: 15s

      scrape_configs:
        - job_name: postgres
          static_configs:
            - targets: ['postgres-exporter:9187']
          scrape_interval: 30s

        - job_name: cadvisor
          static_configs:
            - targets: ['cadvisor:8080']
          scrape_interval: 15s

        - job_name: prometheus
          static_configs:
            - targets: ['localhost:9090']

  # ── pgsodium root encryption key ───────────────────────────────────────────
  # Required for Supabase Vault (vault.create_secret / vault.update_secret).
  # On supabase.com this is pre-configured; on self-hosted it must be supplied
  # explicitly. The value is a 64-char hex string generated by Terraform and
  # stored in tfstate. See README §pgsodium root key rotation.
  - path: /data/supabase/volumes/db/pgsodium_root.key
    permissions: '0600'
    content: |
      ${pgsodium_root_key}

  # ── Watchdog env file (SMTP creds for alerts) ───────────────────────────────
  - path: /data/watchdog/.env
    permissions: '0600'
    content: |
      SMTP_HOST=${smtp_host}
      SMTP_PORT=${smtp_port}
      SMTP_USER=${smtp_user}
      SMTP_PASS=${smtp_password}
      SMTP_FROM=${smtp_sender}
      ALERT_TO=${smtp_sender}
      DOMAIN=${domain_name}

  # ── Watchdog bash script ────────────────────────────────────────────────────
  - path: /usr/local/bin/fra-watchdog.sh
    encoding: b64
    permissions: '0755'
    content: ${base64encode(watchdog_script)}

  # ── Watchdog systemd service unit ───────────────────────────────────────────
  - path: /etc/systemd/system/fra-watchdog.service
    content: |
      [Unit]
      Description=FRA container health watchdog
      After=docker.service
      Requires=docker.service

      [Service]
      Type=oneshot
      ExecStart=/usr/local/bin/fra-watchdog.sh
      StandardOutput=journal
      StandardError=journal
      SyslogIdentifier=fra-watchdog

      [Install]
      WantedBy=multi-user.target

  # ── Watchdog systemd timer (fires every 60 s) ───────────────────────────────
  - path: /etc/systemd/system/fra-watchdog.timer
    content: |
      [Unit]
      Description=FRA watchdog — run every 60 seconds
      Requires=fra-watchdog.service

      [Timer]
      OnBootSec=120
      OnUnitActiveSec=60
      Unit=fra-watchdog.service

      [Install]
      WantedBy=timers.target

  # ── App migrations (base64 to avoid YAML special-character issues) ────────────
  - path: /data/supabase/migrations/0001_init.sql
    encoding: b64
    permissions: '0640'
    content: ${base64encode(migration_0001)}

  - path: /data/supabase/migrations/0002_subscriptions.sql
    encoding: b64
    permissions: '0640'
    content: ${base64encode(migration_0002)}

  - path: /data/supabase/migrations/0003_vault_admin.sql
    encoding: b64
    permissions: '0640'
    content: ${base64encode(migration_0003)}

  - path: /data/supabase/migrations/0004_billing_resilience.sql
    encoding: b64
    permissions: '0640'
    content: ${base64encode(migration_0004)}

  # ── Supabase docker-compose (rendered by Terraform, base64 to avoid YAML issues)
  - path: /data/supabase/docker-compose.yml
    encoding: b64
    permissions: '0640'
    content: ${base64encode(supabase_compose)}

  # ── Monitoring docker-compose ───────────────────────────────────────────────
  - path: /data/monitoring/docker-compose.yml
    encoding: b64
    permissions: '0640'
    content: ${base64encode(monitoring_compose)}

runcmd:
  # ── 1. Mount the 100 GB data block volume ───────────────────────────────────
  - |
    set -e
    BOOT=$(lsblk -no PKNAME $(findmnt -no SOURCE /))
    DATA=$(lsblk -dno NAME | grep -v "^$BOOT$" | grep -v loop | head -1)
    if [ -n "$DATA" ]; then
      mkfs.ext4 -F /dev/$DATA
      mkdir -p /data
      echo "/dev/$DATA /data ext4 defaults,nofail 0 2" >> /etc/fstab
      mount -a
    fi

  # ── 2. Create persistent directory tree ────────────────────────────────────
  - |
    mkdir -p \
      /data/supabase/db \
      /data/supabase/functions \
      /data/supabase/migrations \
      /data/supabase/volumes/api \
      /data/supabase/volumes/db/init \
      /data/monitoring/uptime-kuma \
      /data/monitoring/prometheus/data \
      /data/monitoring/grafana/provisioning/datasources \
      /data/watchdog/state

  # ── 3. Install Docker CE ────────────────────────────────────────────────────
  - |
    export DEBIAN_FRONTEND=noninteractive
    apt-get update -qq
    apt-get install -y -qq ca-certificates curl gnupg lsb-release
    install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
      | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    chmod a+r /etc/apt/keyrings/docker.gpg
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
      https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \
      > /etc/apt/sources.list.d/docker.list
    apt-get update -qq
    apt-get install -y -qq \
      docker-ce docker-ce-cli containerd.io \
      docker-buildx-plugin docker-compose-plugin
    systemctl enable --now docker

  # ── 4. Pre-create Docker networks (Coolify also creates 'coolify') ─────────
  - docker network create coolify 2>/dev/null || true
  - docker network create supabase-net 2>/dev/null || true

  # ── 5. Install Coolify ──────────────────────────────────────────────────────
  - |
    curl -fsSL https://cdn.coolify.io/install.sh | \
      COOLIFY_INSTALL_NON_INTERACTIVE=1 bash
    # Wait up to 5 minutes for Coolify API to respond
    TRIES=0
    until curl -sf http://localhost:8000/api/health >/dev/null 2>&1; do
      TRIES=$((TRIES+1))
      [ $TRIES -ge 30 ] && echo "Coolify health check timed out" && break
      sleep 10
    done

  # ── 6. Inject JWT placeholders into kong.yml ────────────────────────────────
  # (Actual key substitution happens after gen-jwt.py runs in step 8)

  # ── 7. Move write_files-deposited compose/config files into place ───────────
  # write_files already wrote to final paths; ensure permissions
  - chmod 640 /data/supabase/docker-compose.yml /data/monitoring/docker-compose.yml
  - chmod 600 /data/watchdog/.env

  # ── 8. Generate JWT keys and inject into compose files ──────────────────────
  - |
    python3 /usr/local/bin/gen-jwt.py "${jwt_secret}" > /tmp/jwt.env
    . /tmp/jwt.env
    # Supabase compose
    sed -i "s|__ANON_KEY__|$ANON_KEY|g"         /data/supabase/docker-compose.yml
    sed -i "s|__SERVICE_ROLE_KEY__|$SERVICE_ROLE_KEY|g" /data/supabase/docker-compose.yml
    # Kong declarative config
    sed -i "s|__ANON_KEY__|$ANON_KEY|g"         /data/supabase/volumes/api/kong.yml
    sed -i "s|__SERVICE_ROLE_KEY__|$SERVICE_ROLE_KEY|g" /data/supabase/volumes/api/kong.yml
    rm -f /tmp/jwt.env

  # ── 9. Start Supabase stack ─────────────────────────────────────────────────
  - docker compose -f /data/supabase/docker-compose.yml up -d

  # ── 10. Wait for PostgreSQL to be healthy ───────────────────────────────────
  - |
    TRIES=0
    until docker exec supabase-db pg_isready -U postgres -q; do
      TRIES=$((TRIES+1))
      [ $TRIES -ge 36 ] && echo "DB readiness timed out" && break
      sleep 10
    done

  # ── 11. Apply app migrations (idempotent — safe on instance restart) ─────────
  - |
    set -euo pipefail
    # Create migration tracking table if it does not already exist
    docker exec -i supabase-db psql -U postgres << 'ENDSQL'
    CREATE TABLE IF NOT EXISTS public._fra_migrations (
      name       TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    ENDSQL

    for migration in \
        0001_init.sql \
        0002_subscriptions.sql \
        0003_vault_admin.sql \
        0004_billing_resilience.sql; do
      APPLIED=$(docker exec supabase-db psql -U postgres -tAc \
        "SELECT COUNT(*) FROM public._fra_migrations WHERE name = '$migration'" \
        2>/dev/null || echo 0)
      if [ "$APPLIED" = "0" ]; then
        echo "=== Applying migration $migration ==="
        # -v ON_ERROR_STOP=1: abort immediately on any SQL error so a partial
        # failure cannot leave the DB in a half-applied state.  Each migration
        # is wrapped in BEGIN/COMMIT so the failure rolls back the whole file.
        if docker exec -i supabase-db \
            psql -U postgres -v ON_ERROR_STOP=1 \
            < /data/supabase/migrations/$migration; then
          docker exec supabase-db psql -U postgres -c \
            "INSERT INTO public._fra_migrations(name) VALUES ('$migration') ON CONFLICT DO NOTHING"
          echo "=== Migration $migration applied ==="
        else
          echo "ERROR: migration $migration failed — aborting boot sequence." >&2
          echo "Check /var/log/cloud-init-output.log for the full psql error." >&2
          exit 1
        fi
      else
        echo "=== Migration $migration already applied, skipping ==="
      fi
    done
    # Write sentinel so step 12 knows all migrations succeeded
    touch /tmp/fra-migrations-ok
    echo "=== All migrations applied successfully ==="

  # ── 12. Enable pg_cron + pg_net extensions and schedule fra-engine tick ─────
  - |
    # Gate: refuse to set up pg_cron if the migration step did not complete
    if [ ! -f /tmp/fra-migrations-ok ]; then
      echo "ERROR: /tmp/fra-migrations-ok not found — migrations did not finish." >&2
      echo "Skipping pg_cron setup to avoid scheduling against a broken schema." >&2
      exit 1
    fi
    cat > /tmp/fra-pgcron.sql << ENDSQL
    CREATE EXTENSION IF NOT EXISTS pg_cron;
    CREATE EXTENSION IF NOT EXISTS pg_net;
    SELECT cron.schedule(
      'fra-engine-tick',
      '* * * * *',
      \$cron\$SELECT net.http_post(
        url := 'http://supabase-kong:8000/functions/v1/fra-engine',
        headers := jsonb_build_object(
          'Content-Type', 'application/json',
          'x-cron-secret', '${fra_cron_secret}'
        ),
        body := '{}'::jsonb
      );\$cron\$
    );
    ENDSQL
    docker exec -i supabase-db psql -U postgres < /tmp/fra-pgcron.sql
    rm -f /tmp/fra-pgcron.sql

  # ── 13. Start monitoring stack ──────────────────────────────────────────────
  - docker compose -f /data/monitoring/docker-compose.yml up -d

  # ── 14. Enable watchdog systemd timer ───────────────────────────────────────
  - systemctl daemon-reload
  - systemctl enable fra-watchdog.timer
  - systemctl start fra-watchdog.timer

  # ── 15. Signal completion ───────────────────────────────────────────────────
  - |
    echo "=== FRA cloud-init complete $(date) ===" | \
      tee /data/cloud-init-complete.txt

final_message: |
  FundRates Arb self-hosted stack is up.
  Next steps:
    1. Point DNS A records and DKIM CNAMEs (see Terraform outputs).
    2. Register the Coolify admin account at https://coolify.${domain_name}
    3. Deploy the fra-engine edge function:
         supabase functions deploy fra-engine --project-ref https://api.${domain_name}
    4. Import a Grafana dashboard for fra_engine_metrics at https://metrics.${domain_name}
  Note: App migrations (0001-0004) were applied automatically during boot.
        Re-check /var/log/cloud-init-output.log if any migration step failed.
