#!/usr/bin/env bash
# ─── Terraform dry-run validate ───────────────────────────────────────────────
# Validates Terraform configuration syntax and module wiring without real OCI
# credentials.  Uses ci.tfvars (dummy placeholder values — safe to commit) so
# all required variable constraints are satisfied.
#
# Prerequisites: terraform ≥ 1.5 on PATH
# Usage:         bash scripts/tf-validate.sh
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TF_DIR="$ROOT/terraform"

echo "=== Terraform dry-run validate ==="
cd "$TF_DIR"

echo ""
echo "--- terraform init (no backend, no auth required) ---"
terraform init -backend=false -input=false

echo ""
echo "--- terraform validate ---"
terraform validate

echo ""
echo "✅ terraform validate passed — all modules wired correctly, no HCL errors."
