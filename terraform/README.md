# FundRates Arb — OCI Free-Tier Self-Hosted Infrastructure

Terraform scripts that provision a fully self-contained, zero-external-SaaS runtime on Oracle Cloud Infrastructure **Always Free** tier. One `terraform apply` creates:

- **1× VM.Standard.A1.Flex** — 4 OCPU / 24 GB RAM (Ampere A1)
- **100 GB Block Volume** — persistent Docker volumes mounted at `/data`
- **OCI Flexible Load Balancer** — 10 Mbps, TCP pass-through to Traefik
- **OCI Object Storage bucket** — S3-compatible backend for Supabase Storage
- **OCI Email Delivery** — SMTP for Supabase Auth transactional emails
- **VCN + public subnet** — internet gateway, security list, instance NSG

Services started by cloud-init on first boot:

| URL | Service |
|---|---|
| `https://api.<domain>` | Supabase API (Kong gateway → auth / rest / realtime / storage / functions) |
| `https://studio.<domain>` | Supabase Studio |
| `https://status.<domain>` | Uptime Kuma |
| `https://metrics.<domain>` | Grafana |
| `https://coolify.<domain>` | Coolify management UI |

TLS is provided by Traefik (managed by Coolify) via Let's Encrypt. The engine tick continues to use the existing `pg_cron → HTTP → fra-engine` mechanism, now running inside the self-hosted Supabase PostgreSQL and Edge Runtime.

---

## Prerequisites

| Requirement | Where to get it |
|---|---|
| OCI account with Always Free resources available | [oracle.com/cloud/free](https://oracle.com/cloud/free) |
| OCI API key pair (RSA 2048+) | OCI Console → Profile → API Keys |
| Compartment OCID | OCI Console → Identity → Compartments |
| Availability domain name | `oci iam availability-domain list --compartment-id <tenancy_ocid>` |
| Domain name with DNS access | Any registrar |
| SSH key pair (Ed25519 recommended) | `ssh-keygen -t ed25519` |
| Terraform ≥ 1.5 | [developer.hashicorp.com/terraform](https://developer.hashicorp.com/terraform) |

---

## Quick start

```bash
# 1. Clone / enter the terraform directory
cd terraform

# 2. Initialise providers
terraform init

# 3. Copy and fill in your values
cp terraform.tfvars.example terraform.tfvars
$EDITOR terraform.tfvars

# 4. Review the plan
terraform plan

# 5. Apply (takes ~10 minutes total — VM boot + cloud-init)
terraform apply

# 6. Retrieve sensitive outputs
terraform output -json | jq '{
  grafana_password,
  dashboard_password,
  fra_cron_secret
}'
```

> **Note:** The `smtp_username` and object storage keys are also sensitive outputs. Use `terraform output -raw <name>` to retrieve them individually.

---

## Post-apply DNS checklist

After `terraform apply` completes, run:

```bash
terraform output dns_a_records
terraform output dns_dkim_cname_records
```

At your registrar, create:
1. **A records** — all five subdomains (`api`, `studio`, `status`, `metrics`, `coolify`) pointing at the LB public IP.
2. **DKIM CNAME record** — from `dns_dkim_cname_records`. Required for OCI Email Delivery to sign outbound auth emails.

Allow 5–60 minutes for DNS propagation before Let's Encrypt can issue TLS certificates.

---

## First-login steps

### 1. Coolify
Visit `https://coolify.<domain>` and register the first admin account.

Coolify shows the Supabase and monitoring stacks as externally-managed (started by cloud-init, not created through Coolify's UI). You can still restart, view logs, and manage them through Coolify's interface.

### 2. Supabase Studio
Visit `https://studio.<domain>`. Login credentials:
- **Username:** `supabase`
- **Password:** value of `terraform output -raw dashboard_password`

### 3. Apply app migrations

The four application migrations (`0001_init.sql` → `0004_billing_resilience.sql`) must be applied after first boot. The pg_cron and pg_net extensions are enabled automatically by cloud-init, but the full app schema is not.

Use the Supabase CLI pointed at your self-hosted instance:

```bash
export SUPABASE_ACCESS_TOKEN=<your-service-role-key>

# Run each migration via psql through the Supabase API
supabase db push \
  --db-url "postgresql://postgres:<postgres_password>@api.<domain>:5432/postgres"
```

Or paste each migration file into the **SQL Editor** in Supabase Studio.

### 4. Deploy the fra-engine edge function

```bash
# Set the project URL to your self-hosted instance
supabase functions deploy fra-engine \
  --project-ref "https://api.<domain>" \
  --no-verify-jwt
```

The `FRA_CRON_SECRET` environment variable must be set in the edge function settings (Supabase Studio → Edge Functions → fra-engine → Environment Variables):

```
FRA_CRON_SECRET = <value from: terraform output -raw fra_cron_secret>
```

### 5. Grafana
Visit `https://metrics.<domain>`. Login:
- **Username:** `admin`
- **Password:** value of `terraform output -raw grafana_password`

Two datasources are pre-configured:
- **Prometheus** — Docker host and PostgreSQL metrics
- **PostgreSQL** — direct queries against `fra_engine_metrics` table

Import a dashboard from [grafana.com/grafana/dashboards](https://grafana.com/grafana/dashboards) for cAdvisor (ID 14282) and postgres-exporter (ID 9628), or build a custom one querying `fra_engine_metrics`.

### 6. Uptime Kuma
Visit `https://status.<domain>` and create the first admin account. Add monitors for:
- `https://api.<domain>/health`
- `https://studio.<domain>`
- `https://metrics.<domain>`
- Container health (via the Docker socket monitor)

---

## pgsodium root key rotation

Supabase Vault (`vault.create_secret` / `vault.update_secret`) depends on the **pgsodium** extension, which encrypts secrets at rest using a root key. On `supabase.com`-hosted projects this key is pre-configured automatically. On a self-hosted deploy it must be provided explicitly — without it, Vault RPCs either fail silently or store secrets in plaintext, causing the `rotate-exchange-key` edge function to return HTTP 500.

### How it is set up

Terraform generates a 64-char random hex root key (`random_id.pgsodium_root_key`) and:

1. **Writes it to disk** at `/data/supabase/volumes/db/pgsodium_root.key` (mode `0600`) via cloud-init `write_files`.
2. **Injects it into the `supabase-db` container** via the `PGSODIUM_ROOT_KEY` environment variable in `supabase-compose.yaml.tpl`.

The key is generated once on `terraform apply` and stored in `terraform.tfstate`. Retrieve it with:

```bash
terraform output -raw pgsodium_root_key
```

### Rotating the pgsodium root key independently

> ⚠️ Rotating the pgsodium root key re-encrypts **all** data in `vault.secrets`. Do this during a maintenance window.

1. Stop the Vault-dependent edge functions to prevent reads mid-rotation:
   ```bash
   docker compose -f /data/supabase/docker-compose.yml stop functions
   ```

2. Update the key file on the host:
   ```bash
   NEW_KEY=$(openssl rand -hex 32)
   echo "$NEW_KEY" | sudo tee /data/supabase/volumes/db/pgsodium_root.key
   sudo chmod 600 /data/supabase/volumes/db/pgsodium_root.key
   ```

3. Update the env var in `/data/supabase/docker-compose.yml` (`PGSODIUM_ROOT_KEY`) and restart the DB:
   ```bash
   docker compose -f /data/supabase/docker-compose.yml up -d --no-deps --force-recreate db
   ```

4. Confirm pgsodium is working with a round-trip smoke test (run as `postgres` inside the container):
   ```sql
   SELECT vault.create_secret('smoke-test-value', 'smoke-test');
   SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'smoke-test';
   DELETE FROM vault.secrets WHERE name = 'smoke-test';
   ```

5. Restart the functions service:
   ```bash
   docker compose -f /data/supabase/docker-compose.yml up -d --no-deps --force-recreate functions
   ```

6. Store the new key value externally (password manager / secrets store) — it is **not** persisted back to `terraform.tfstate` unless you run `terraform apply` again after updating the resource.

---

## Architecture notes

### pg_cron → fra-engine (engine tick)
The engine tick uses the existing mechanism, now running entirely on-premise:

```
supabase-db (pg_cron)
  → HTTP POST http://supabase-kong:8000/functions/v1/fra-engine
      (internal Docker network, x-cron-secret header)
  → supabase-functions (Deno edge-runtime)
      → ArbEngine.tick() per tenant
      → write-back to fra_state
```

The Kong URL uses the internal `supabase-net` Docker network hostname (`supabase-kong`), not the public domain. This avoids the internet round-trip and the LB.

### Object Storage (Supabase Storage)
The `supabase-storage` container is configured with `STORAGE_BACKEND=s3` pointing at the OCI Object Storage S3-compatible endpoint:

```
https://<namespace>.compat.objectstorage.<region>.oraclecloud.com
```

All user file uploads go directly to OCI Object Storage. No local disk space is used for storage objects.

### Watchdog
A systemd timer fires every 60 seconds and runs `/usr/local/bin/fra-watchdog.sh`. It inspects Docker health statuses for all Supabase and monitoring containers. After 3 consecutive `unhealthy` readings:
1. Tags the current image as `:previous`
2. Attempts to pull `:stable`; falls back to `:previous`
3. Restarts the service via `docker compose up --no-deps --force-recreate`
4. Sends an SMTP alert via OCI Email Delivery

On recovery, the container is tagged `:stable` and the counter resets.

Tag a known-good image as stable:
```bash
docker tag supabase-kong:latest supabase-kong:stable
```

---

## Upgrade runbook

1. Update image tags in `/data/supabase/docker-compose.yml` or `/data/monitoring/docker-compose.yml`.
2. Pull new images: `docker compose -f /data/supabase/docker-compose.yml pull`
3. Tag the current images as `:stable` before updating.
4. Apply rolling restart: `docker compose -f /data/supabase/docker-compose.yml up -d`
5. Monitor health: `watch 'docker ps --format "table {{.Names}}\t{{.Status}}"'`

---

## Rollback

If an upgrade breaks a service:
```bash
# The watchdog auto-rolls back after 3 failures, or rollback manually:
docker tag supabase-kong:previous supabase-kong:latest
docker compose -f /data/supabase/docker-compose.yml up -d --no-deps --force-recreate kong
```

To roll back via Terraform (infrastructure changes only):
```bash
terraform state list         # review managed resources
terraform apply -target=...  # selectively re-apply
```

To destroy everything:
```bash
terraform destroy
```

---

## Cost

All resources used are within OCI's **Always Free** tier as of July 2026:

| Resource | Always Free limit | Used |
|---|---|---|
| VM.Standard.A1.Flex | 4 OCPU / 24 GB | 4 OCPU / 24 GB |
| Block Storage | 200 GB total | 100 GB |
| Object Storage | 20 GB | varies |
| Load Balancer | 1 × 10 Mbps | 1 × 10 Mbps |
| Outbound data | 10 GB/month | varies |
| Email Delivery | 100 emails/day | varies |

Always verify current limits at [oracle.com/cloud/free](https://oracle.com/cloud/free/faq/) before provisioning.

---

## File structure

```
terraform/
├── versions.tf                     OCI ≥ 5.18, random, tls, local providers
├── main.tf                         Root module — secrets, module wiring, compose locals
├── variables.tf                    All user-facing inputs with descriptions
├── outputs.tf                      Public IPs, DNS records, credentials
├── terraform.tfvars.example        Copy → terraform.tfvars and fill in
├── modules/
│   ├── network/                    VCN, subnet, IGW, security list, NSG
│   ├── compute/                    A1 Flex instance, block volume, volume attachment
│   ├── loadbalancer/               OCI LB, backend sets (80 + 443), TCP listeners
│   ├── objectstorage/              Bucket, IAM user, S3 customer secret key
│   └── email/                      Email domain, DKIM, approved sender, SMTP credential
└── templates/
    ├── cloud-init.yaml.tpl         Full cloud-init: volume mount, Docker, Coolify,
    │                               JWT generation, compose up, pg_cron, watchdog
    ├── supabase-compose.yaml.tpl   Self-hosted Supabase stack (OCI Storage backend)
    ├── monitoring-compose.yaml.tpl Uptime Kuma + Prometheus + Grafana + exporters
    └── watchdog.service.tpl        Watchdog bash script (embedded in cloud-init)
```
