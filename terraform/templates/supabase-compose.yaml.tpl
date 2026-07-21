# supabase-compose.yaml.tpl
# Rendered by Terraform templatefile(). All ${...} references are Terraform variables.
# The resulting docker-compose.yml is written to /data/supabase/docker-compose.yml by cloud-init.
# JWT keys (ANON_KEY / SERVICE_ROLE_KEY) are injected by cloud-init via sed after
# the Python key-generator runs. Placeholders are __ANON_KEY__ and __SERVICE_ROLE_KEY__.

version: "3.8"

networks:
  coolify:
    external: true        # created by the Coolify installer
  supabase-net:
    external: true        # pre-created by cloud-init before compose up

volumes:
  db-data:
    driver: local
    driver_opts:
      type: none
      device: /data/supabase/db
      o: bind
  functions-data:
    driver: local
    driver_opts:
      type: none
      device: /data/supabase/functions
      o: bind

services:

  # ── PostgreSQL ──────────────────────────────────────────────────────────────
  db:
    container_name: supabase-db
    image: supabase/postgres:15.8.1.060
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "pg_isready", "-U", "postgres", "-d", "postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
    command:
      - postgres
      - -c
      - config_file=/etc/postgresql/postgresql.conf
      - -c
      - log_min_messages=fatal
    environment:
      POSTGRES_HOST: /var/run/postgresql
      PGPORT: 5432
      POSTGRES_PORT: 5432
      PGPASSWORD: ${postgres_password}
      POSTGRES_PASSWORD: ${postgres_password}
      PGDATABASE: postgres
      POSTGRES_DB: postgres
      JWT_SECRET: ${jwt_secret}
      JWT_EXP: 3600
      PGSODIUM_ROOT_KEY: ${pgsodium_root_key}
    volumes:
      - db-data:/var/lib/postgresql/data
      - /data/supabase/volumes/db/init:/docker-entrypoint-initdb.d:z
    networks:
      - supabase-net

  # ── Supabase Auth (GoTrue) ──────────────────────────────────────────────────
  auth:
    container_name: supabase-auth
    image: supabase/gotrue:v2.152.0
    restart: unless-stopped
    depends_on:
      db:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:9999/health"]
      interval: 10s
      timeout: 5s
      retries: 5
    environment:
      GOTRUE_API_HOST: 0.0.0.0
      GOTRUE_API_PORT: 9999
      API_EXTERNAL_URL: ${api_url}
      GOTRUE_DB_DRIVER: postgres
      GOTRUE_DB_DATABASE_URL: postgres://supabase_auth_admin:${postgres_password}@db:5432/postgres
      GOTRUE_SITE_URL: ${studio_url}
      GOTRUE_URI_ALLOW_LIST: "*"
      GOTRUE_DISABLE_SIGNUP: "false"
      GOTRUE_JWT_ADMIN_ROLES: service_role
      GOTRUE_JWT_AUD: authenticated
      GOTRUE_JWT_DEFAULT_GROUP_NAME: authenticated
      GOTRUE_JWT_EXP: 3600
      GOTRUE_JWT_SECRET: ${jwt_secret}
      GOTRUE_EXTERNAL_EMAIL_ENABLED: "true"
      GOTRUE_MAILER_AUTOCONFIRM: "false"
      GOTRUE_SMTP_ADMIN_EMAIL: ${smtp_sender}
      GOTRUE_SMTP_HOST: ${smtp_host}
      GOTRUE_SMTP_PORT: ${smtp_port}
      GOTRUE_SMTP_USER: ${smtp_user}
      GOTRUE_SMTP_PASS: ${smtp_password}
      GOTRUE_SMTP_SENDER_NAME: FundRates Arb
      GOTRUE_MAILER_URLPATHS_INVITE: ${api_url}/auth/v1/verify
      GOTRUE_MAILER_URLPATHS_CONFIRMATION: ${api_url}/auth/v1/verify
      GOTRUE_MAILER_URLPATHS_RECOVERY: ${api_url}/auth/v1/verify
      GOTRUE_MAILER_URLPATHS_EMAIL_CHANGE: ${api_url}/auth/v1/verify
      GOTRUE_RATE_LIMIT_HEADER: X-Forwarded-For
      GOTRUE_RATE_LIMIT_EMAIL_SENT: 2
    networks:
      - supabase-net

  # ── PostgREST ───────────────────────────────────────────────────────────────
  rest:
    container_name: supabase-rest
    image: postgrest/postgrest:v12.2.0
    restart: unless-stopped
    depends_on:
      db:
        condition: service_healthy
    environment:
      PGRST_DB_URI: postgres://authenticator:${postgres_password}@db:5432/postgres
      PGRST_DB_SCHEMAS: public,storage,graphql_public
      PGRST_DB_ANON_ROLE: anon
      PGRST_JWT_SECRET: ${jwt_secret}
      PGRST_DB_USE_LEGACY_GUCS: "false"
      PGRST_APP_SETTINGS_JWT_SECRET: ${jwt_secret}
      PGRST_APP_SETTINGS_JWT_EXP: 3600
    command: ["postgrest"]
    networks:
      - supabase-net

  # ── Realtime ─────────────────────────────────────────────────────────────────
  realtime:
    container_name: supabase-realtime
    image: supabase/realtime:v2.30.34
    restart: unless-stopped
    depends_on:
      db:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-sSfL", "--head", "-o", "/dev/null", "http://localhost:4000/api/tenants/realtime-dev/health"]
      interval: 10s
      timeout: 5s
      retries: 5
    environment:
      PORT: 4000
      DB_HOST: db
      DB_PORT: 5432
      DB_USER: supabase_admin
      DB_PASSWORD: ${postgres_password}
      DB_NAME: postgres
      DB_AFTER_CONNECT_QUERY: SET search_path TO _realtime
      DB_ENC_KEY: supabaserealtime
      API_JWT_SECRET: ${jwt_secret}
      FLY_ALLOC_ID: fly123
      FLY_APP_NAME: realtime
      SECRET_KEY_BASE: ${jwt_secret}
      ERL_AFLAGS: -proto_dist inet_tcp
      ENABLE_TAILSCALE: "false"
      DNS_NODES: "''"
    command: >
      sh -c "/app/bin/migrate && /app/bin/realtime eval 'Realtime.Release.seeds(Realtime.Repo)' && /app/bin/server"
    networks:
      - supabase-net

  # ── Supabase Storage (S3 backend → OCI Object Storage) ─────────────────────
  storage:
    container_name: supabase-storage
    image: supabase/storage-api:v1.11.13
    restart: unless-stopped
    depends_on:
      db:
        condition: service_healthy
      rest:
        condition: service_started
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:5000/status"]
      interval: 10s
      timeout: 5s
      retries: 5
    environment:
      ANON_KEY: __ANON_KEY__
      SERVICE_KEY: __SERVICE_ROLE_KEY__
      POSTGREST_URL: http://rest:3000
      PGRST_JWT_SECRET: ${jwt_secret}
      DATABASE_URL: postgres://supabase_storage_admin:${postgres_password}@db:5432/postgres
      FILE_SIZE_LIMIT: 52428800
      STORAGE_BACKEND: s3
      GLOBAL_S3_BUCKET: ${storage_bucket}
      REGION: ${storage_region}
      GLOBAL_S3_ENDPOINT: https://${storage_namespace}.compat.objectstorage.${storage_region}.oraclecloud.com
      GLOBAL_S3_FORCE_PATH_STYLE: "true"
      GLOBAL_S3_PROTOCOL: https
      AWS_ACCESS_KEY_ID: ${storage_access_key}
      AWS_SECRET_ACCESS_KEY: ${storage_secret_key}
      STORAGE_S3_MAX_SOCKETS: 200
      IS_MULTITENANT: "false"
      TENANT_ID: stub
      IMGPROXY_URL: http://imgproxy:5001
    networks:
      - supabase-net

  # ── Image proxy ──────────────────────────────────────────────────────────────
  imgproxy:
    container_name: supabase-imgproxy
    image: darthsim/imgproxy:v3
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "imgproxy", "health"]
      interval: 10s
      timeout: 5s
      retries: 5
    environment:
      IMGPROXY_BIND: ":5001"
      IMGPROXY_LOCAL_FILESYSTEM_ROOT: /
      IMGPROXY_USE_ETAG: "true"
      IMGPROXY_ENABLE_WEBP_DETECTION: "true"
    networks:
      - supabase-net

  # ── PostgreSQL Meta (schema introspection for Studio) ────────────────────────
  meta:
    container_name: supabase-meta
    image: supabase/postgres-meta:v0.83.2
    restart: unless-stopped
    depends_on:
      db:
        condition: service_healthy
    environment:
      PG_META_PORT: 8080
      PG_META_DB_HOST: db
      PG_META_DB_PORT: 5432
      PG_META_DB_NAME: postgres
      PG_META_DB_USER: supabase_admin
      PG_META_DB_PASSWORD: ${postgres_password}
    networks:
      - supabase-net

  # ── Edge Functions (Deno) ───────────────────────────────────────────────────
  functions:
    container_name: supabase-functions
    image: supabase/edge-runtime:v1.56.2
    restart: unless-stopped
    depends_on:
      db:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-sSfL", "--head", "-o", "/dev/null", "http://localhost:9000/health"]
      interval: 10s
      timeout: 5s
      retries: 5
    environment:
      JWT_SECRET: ${jwt_secret}
      SUPABASE_URL: http://kong:8000
      SUPABASE_ANON_KEY: __ANON_KEY__
      SUPABASE_SERVICE_ROLE_KEY: __SERVICE_ROLE_KEY__
      SUPABASE_DB_URL: postgresql://postgres:${postgres_password}@db:5432/postgres
      VERIFY_JWT: "false"
      FRA_CRON_SECRET: ${fra_cron_secret}
      STRIPE_WEBHOOK_SECRET: ${stripe_webhook_secret}
    volumes:
      - functions-data:/home/deno/functions:z
    command:
      - start
      - --main-service
      - /home/deno/functions/main
    networks:
      - supabase-net

  # ── Kong API Gateway ─────────────────────────────────────────────────────────
  kong:
    container_name: supabase-kong
    image: kong:2.8.1
    restart: unless-stopped
    depends_on:
      db:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "kong", "health"]
      interval: 10s
      timeout: 5s
      retries: 5
    environment:
      KONG_DATABASE: "off"
      KONG_DECLARATIVE_CONFIG: /home/kong/kong.yml
      KONG_DNS_ORDER: LAST,A,CNAME
      KONG_PLUGINS: request-transformer,cors,key-auth,acl,basic-auth
      KONG_NGINX_PROXY_PROXY_BUFFER_SIZE: 160k
      KONG_NGINX_PROXY_PROXY_BUFFERS: 64 160k
      SUPABASE_ANON_KEY: __ANON_KEY__
      SUPABASE_SERVICE_KEY: __SERVICE_ROLE_KEY__
      DASHBOARD_USERNAME: supabase
      DASHBOARD_PASSWORD: ${dashboard_password}
    volumes:
      - /data/supabase/volumes/api/kong.yml:/home/kong/kong.yml:ro,z
    networks:
      - supabase-net
      - coolify
    labels:
      - "traefik.enable=true"
      - "traefik.docker.network=coolify"
      - "traefik.http.routers.supabase-api.rule=Host(`api.${domain_name}`)"
      - "traefik.http.routers.supabase-api.entrypoints=websecure"
      - "traefik.http.routers.supabase-api.tls=true"
      - "traefik.http.routers.supabase-api.tls.certresolver=letsencrypt"
      - "traefik.http.services.supabase-api.loadbalancer.server.port=8000"
      - "traefik.http.routers.supabase-api-http.rule=Host(`api.${domain_name}`)"
      - "traefik.http.routers.supabase-api-http.entrypoints=web"
      - "traefik.http.routers.supabase-api-http.middlewares=redirect-to-https"

  # ── Supabase Studio ──────────────────────────────────────────────────────────
  studio:
    container_name: supabase-studio
    image: supabase/studio:20241028-c3a578b
    restart: unless-stopped
    depends_on:
      kong:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "node", "-e", "fetch('http://localhost:3000/api/profile').then(r=>process.exit(r.ok?0:1))"]
      interval: 10s
      timeout: 5s
      retries: 5
    environment:
      STUDIO_PG_META_URL: http://meta:8080
      POSTGRES_PASSWORD: ${postgres_password}
      DEFAULT_ORGANIZATION_NAME: FundRates Arb
      DEFAULT_PROJECT_NAME: fra-saas
      SUPABASE_URL: http://kong:8000
      SUPABASE_REST_URL: ${api_url}/rest/v1/
      SUPABASE_ANON_KEY: __ANON_KEY__
      SUPABASE_SERVICE_KEY: __SERVICE_ROLE_KEY__
      AUTH_JWT_SECRET: ${jwt_secret}
      LOGFLARE_LOGGER_BACKEND_API_KEY: your-logflare-key
      LOGFLARE_API_URL: http://localhost:4000
      NEXT_ANALYTICS_BACKEND_PROVIDER: postgres
    networks:
      - supabase-net
      - coolify
    labels:
      - "traefik.enable=true"
      - "traefik.docker.network=coolify"
      - "traefik.http.routers.supabase-studio.rule=Host(`studio.${domain_name}`)"
      - "traefik.http.routers.supabase-studio.entrypoints=websecure"
      - "traefik.http.routers.supabase-studio.tls=true"
      - "traefik.http.routers.supabase-studio.tls.certresolver=letsencrypt"
      - "traefik.http.services.supabase-studio.loadbalancer.server.port=3000"
