---
name: Terraform dry-run validate
description: How to validate the Terraform configuration without real OCI/Stripe credentials.
---

## Rule
`terraform validate` (preceded by `terraform init -backend=false`) validates HCL syntax and module wiring without making any OCI or Stripe API calls.

**Why:** `terraform plan` requires live provider authentication (OCI API key). Contributors and CI runs on branches without OCI secrets need a credential-free check that catches mis-wired module outputs, missing variable references, and schema errors before they reach a real apply.

## Files added
- `terraform/ci.tfvars` — syntactically-valid placeholder values for all required variables (safe to commit; never use real credentials here)
- `scripts/tf-validate.sh` — shell script: `terraform init -backend=false -input=false` then `terraform validate`
- `.github/workflows/validate.yml` — GitHub Actions workflow that runs the validate on every push to `dev`/`test` and every PR targeting `test`/`main`; supplies required vars via `TF_VAR_*` env vars so no file needs to be read from disk

## How to apply
- Local dry-run: `bash scripts/tf-validate.sh`
- CI: automatic on all dev/test pushes and PRs (validate.yml)
- Any new required Terraform variable must also be added to `terraform/ci.tfvars` and to the `env:` block in `validate.yml`
