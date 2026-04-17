# Architecture & Trade-offs

## Goals

1. **Zero modifications** to `@vireson/funding-rate-arb`. The package's
   isolation constraint (project-agnostic, no host backend dependencies) is
   preserved by injecting all Supabase wiring through the public
   `persistenceStore` prop and the public `StateStore` interface.
2. **Multi-tenant** — one Supabase row per user, RLS-scoped to `auth.uid()`.
3. **Server-side liveness** — engine state advances even when the user closes
   their browser, via a `pg_cron`-triggered edge function.

## Two engines, one state

| Concern              | Client engine                       | Server engine (edge fn)              |
|----------------------|-------------------------------------|--------------------------------------|
| Source code          | `@vireson/funding-rate-arb`         | `edge-functions/fra-engine`          |
| Runtime              | Browser / WebView                   | Deno on Supabase Edge                |
| Triggers scans       | Yes (UI-driven)                     | Yes (pg_cron, every 60s)             |
| Places real orders   | Yes (when user has keys configured) | No (read/accrue only in v1)          |
| Reads/writes state   | via `SupabaseStateStore`            | direct service-role SQL              |
| Reads exchange keys  | from props                          | from Supabase Vault                  |

Both write to the same `fra_state.state` JSONB blob. The client treats the row
as authoritative on load (so server-accrued funding shows up immediately) and
the server treats existing positions as immutable (it only advances time-based
fields like `lastFundingAccrualAt`).

## Why JSONB blob + denormalized mirrors?

- **JSONB blob** keeps perfect parity with the in-memory `PersistedState`
  shape that `LocalStorageStore` already saves. The component's version-guard
  and migration logic continues to work unchanged.
- **Mirror tables** (`fra_positions`, `fra_pnl_history`, `fra_events`) enable
  SQL queries, indexed lookups, realtime subscriptions and analytics — none of
  which are practical against a single JSONB blob.

Mirror writes are best-effort: if they fail, the engine keeps running.

## Realtime pattern

The client subscribes to `postgres_changes` on `fra_state` filtered by its own
`user_id`. When the server-side tick fires, the client's `revision` counter
bumps, the `<FundingRateArb />` is remounted (`key={revision}`), and the
component re-runs `store.load()` to pick up the new state.

For higher-frequency UI updates (per-event push), the client can additionally
subscribe to `fra_events` — see the example app for a starting point.

## Security model

- **Client never sees other users' state** — RLS is mandatory on every table.
- **Exchange keys never reach the browser** in SaaS mode. The client passes
  empty `exchangeKeys` and runs in dry-run, while the server tick reads keys
  from Vault. (Wiring real-order execution server-side is a v2 enhancement.)
- **Cron endpoint** is gated by a long random `FRA_CRON_SECRET` shared between
  Postgres and the edge function. JWT verification is disabled because cron
  cannot present a user token.

## Limitations & v2 roadmap

| Limitation                                       | Planned fix                              |
|--------------------------------------------------|------------------------------------------|
| Server tick only accrues funding, no order exec  | Publish a headless engine entrypoint from the package and import it in the edge function |
| Single fallback funding rate (0.01% / 8h)        | Cache last-seen rates in `fra_state.state.lastRates` |
| No per-user cron frequency                       | Add a `tick_interval_secs` column and per-user schedule |
| Vault key rotation requires manual SQL           | Add an admin UI page in the SaaS app     |
