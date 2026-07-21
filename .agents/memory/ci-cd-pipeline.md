---
name: CI/CD pipeline — branch flow and deploy order
description: How the dev→test→main pipeline works, what each workflow does, and the Terraform deploy ordering decision.
---

## Branch flow
```
dev (push) → dev.yml → force-push compiled output to test branch
test (push) → test.yml → bundle, generate Dockerfile/docker-entrypoint.sh/docker-compose.yml/railway.toml,
              create release/prod-<sha> branch from main, open PR to main
main (PR merge) → main.yml → provision Supabase then provision OCI
```

## What test.yml puts in the release branch
- `dist/`, `migrations/`, `edge-functions/`, `terraform/`
- `package.json` (rewritten: `supabase` → `bunx supabase`), lock files, `.npmrc`, `*.md`
- Generated: `Dockerfile`, `docker-entrypoint.sh`, `docker-compose.yml`, `railway.toml`
- `.github/` is intentionally excluded (kept only on dev/test, not main)

## main.yml — two-job ordering
1. **provision-supabase** — runs `bash docker-entrypoint.sh true` (reuses the generated entrypoint script already in the repo after merge). Passes `true` as CMD so `exec "$@"` exits 0 cleanly after provisioning.
2. **provision-oci** (`needs: provision-supabase`) — Terraform apply for OCI self-hosted infra.

**Why this order:** Application layer (migrations, edge functions, cron) must be live before the OCI VM is provisioned, because cloud-init on the VM polls the Supabase API on boot.

## Terraform state persistence
Uses GitHub Actions cache with pattern:
- Save key: `terraform-state-main-${{ github.run_id }}` (unique per run, always saves fresh snapshot)
- Restore key prefix: `terraform-state-main-` (picks up latest from any prior run)
- Uses `actions/cache/restore` + `actions/cache/save` separately (not `actions/cache`) so state is saved even after a failed apply (`if: always()`).

## OCI secret guard
`provision-oci` checks all required OCI secrets at the start. If any are absent it prints instructions and sets `skip=true`. All subsequent steps gate on `steps.check-oci.outputs.skip == 'false'`. This allows the pipeline to run for cloud-only (supabase.com) deployments without failing.

## Required GitHub repository secrets
### Supabase provisioning
SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_ACCESS_TOKEN, SUPABASE_DB_PASSWORD,
FRA_CRON_SECRET, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, STRIPE_WEBHOOK_SECRET_FRA

### OCI Terraform (all optional — skipped if absent)
OCI_TENANCY_OCID, OCI_USER_OCID, OCI_FINGERPRINT, OCI_PRIVATE_KEY (PEM content),
OCI_REGION, OCI_COMPARTMENT_ID, OCI_AD_NAME, DOMAIN_NAME, LETSENCRYPT_EMAIL, SSH_PUBLIC_KEY
