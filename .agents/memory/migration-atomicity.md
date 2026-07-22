---
name: Migration atomicity
description: How the four FRA migrations are made atomic and how cloud-init enforces failure-stops.
---

## Rule
Every migration file must open with `\set ON_ERROR_STOP on` then `BEGIN;` and close with `COMMIT;`.

**Why:** Without a transaction wrapper, a psql error mid-file leaves the DB in a half-applied state with no way to tell which statements ran. The `\set ON_ERROR_STOP on` directive makes psql exit non-zero on the first SQL error, which triggers the `COMMIT` to never execute and the whole file rolls back cleanly.

## Current state
- `0001_init.sql` — `\set ON_ERROR_STOP on` + `BEGIN;` … `COMMIT;` added
- `0002_subscriptions.sql` — same
- `0003_vault_admin.sql` — same
- `0004_billing_resilience.sql` — already had `BEGIN;`/`COMMIT;`; `\set ON_ERROR_STOP on` prepended

## Cloud-init enforcement
Step 11 in `terraform/templates/cloud-init.yaml.tpl` now:
1. Calls psql with `-v ON_ERROR_STOP=1` (runtime equivalent of `\set`)
2. Wraps the call in an `if … ; then … else … exit 1 ; fi` block
3. Only inserts the `_fra_migrations` tracking row if psql exits 0
4. Aborts the entire cloud-init runcmd on first migration failure so the operator sees a clear error in `/var/log/cloud-init-output.log` instead of a silently-corrupt DB

**How to apply:** Any new migration added to the repo must follow the same pattern: `\set ON_ERROR_STOP on`, `BEGIN;`, body, `COMMIT;`.
