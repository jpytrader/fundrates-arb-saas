# Deltametrician — Supabase SaaS Wrapper (`supabase-saas`)

## Project overview

This project is **not a standalone web app** — it is the Supabase-backed SaaS layer for
`@jpytrader/fundrates-arb` (the sibling `fundrates-arb` package). It provides:

- A React component tree (`client/`) that wraps `<FundingRateArb />` with auth, Stripe subscription gating, and realtime state persistence.
- Seven Supabase Edge Functions (`edge-functions/`) for the server-side engine tick, Stripe billing, and exchange key management.
- SQL migrations (`migrations/`) that define Postgres tables, RLS policies, lock primitives, and the Stripe→Supabase sync trigger.

The deployed product is called **Deltametrician**. Users sign in with email/password (+ optional OTP MFA), subscribe via Stripe, then the `<FundingRateArb />` component is unlocked.

---

## Stack

| Layer | Technology |
|---|---|
| Client framework | React 18 + TypeScript |
| Backend | Supabase (Postgres, Auth, Realtime, Edge Functions, Vault) |
| Billing | Stripe (Checkout, Customer Portal, Webhook + DLQ) |
| Exchange adapters | Hyperliquid (DEX), OKX (CEX) — via `@jpytrader/fundrates-arb` |
| Build | Bun (`bun build`) |
| Lint | oxlint |
| Private dep | `@jpytrader/fundrates-arb` — downloaded via `scripts/install-arb.mjs` using `GH_DEP_TOKEN` |

---

## Folder layout

```
supabase-saas/
├── client/
│   ├── FundratesArb.tsx          ← Root component; creates the Supabase client, composes gate + FRA
│   ├── SubscriptionGate.tsx      ← Auth UI (sign in/up/OTP) + subscription enforcement UI
│   ├── supabase-state-store.ts   ← StateStore adapter: PersistedState ↔ fra_state JSONB
│   ├── use-supabase-fra.tsx      ← Auth + realtime + subscription wiring; hands out `store`
│   ├── use-subscription.tsx      ← Reads public.subscriptions; exposes checkout/portal helpers
│   ├── supabase-utils.ts         ← executeGlobalSignOut() + shared inline styles object
│   ├── EngineMetrics.tsx         ← Admin component: polls fra_engine_metrics (last 24 h)
│   └── RotateKeyDialog.tsx       ← Settings modal: rotates exchange API keys via Vault
├── edge-functions/
│   ├── fra-engine/               ← pg_cron-driven headless ArbEngine tick (Deno)
│   ├── create-checkout/          ← Authenticated Stripe Checkout session creator
│   ├── create-portal-session/    ← Authenticated Stripe Customer Portal redirector
│   ├── stripe-webhook-fra/       ← Native Stripe webhook handler + DLQ parking
│   ├── reconcile-subscriptions/  ← Hourly: drains DLQ + Stripe→DB drift correction
│   ├── rotate-exchange-key/      ← Vault key rotation (smoke-tests keys before writing)
│   ├── revoke-exchange-key/      ← Removes a user's Vault key entry + audit row
│   └── _shared/
│       └── logger.ts             ← Structured JSON logger (hashes user IDs in error events)
├── migrations/
│   ├── 0001_init.sql             ← Core tables: fra_state, fra_positions, fra_pnl_history, fra_events; realtime publication; updated_at trigger; pg_cron scaffold comment
│   ├── 0002_subscriptions.sql    ← public.subscriptions + sync_stripe_to_public() trigger (requires Stripe Sync Engine)
│   ├── 0003_vault_admin.sql      ← fra_key_rotations audit table + rotate_vault_secret() SECURITY DEFINER fn
│   └── 0004_billing_resilience.sql ← fra_webhook_dlq (DLQ), fra_engine_metrics, fra_engine_locks + fra_try_lock/fra_unlock RPCs, uq_fra_events idempotency index, revoke_vault_secret() fn
├── scripts/
│   ├── install-arb.mjs           ← Downloads @jpytrader/fundrates-arb tarball from GitHub (needs GH_DEP_TOKEN)
│   └── bundle-arb.mjs            ← Bundles the pre-staged fundrates-arb dist into a single Deno-friendly ESM file
├── index.ts                      ← Bun HTTP server: serves HTML shell + compiled client bundle (production only)
├── index.cli.tsx                 ← Client entry point: mounts <Deltametrician /> into #root
├── .env.example                  ← Template for required env vars
└── tsconfig.json
```

---

## Migration dependency order

Apply migrations in order. Each has a prerequisite:

| Migration | Tables / objects introduced | Prerequisite |
|---|---|---|
| `0001_init.sql` | `fra_state`, `fra_positions`, `fra_pnl_history`, `fra_events` | None |
| `0002_subscriptions.sql` | `public.subscriptions`, `sync_stripe_to_public()` trigger | Supabase Stripe Sync Engine installed (creates `stripe` schema) |
| `0003_vault_admin.sql` | `fra_key_rotations`, `rotate_vault_secret()` | `0001` |
| `0004_billing_resilience.sql` | `fra_webhook_dlq`, `fra_engine_metrics`, `fra_engine_locks`, `fra_try_lock()`, `fra_unlock()`, `revoke_vault_secret()`, idempotency index on `fra_events` | `0001`, `0003` |

> **Note**: `fra_user_exchanges` (exchange preference + vault secret name pointer, used by `fra-engine`) is **not** defined in any of the four included migrations. It must exist in an untracked migration or be created manually before deploying `fra-engine`. See `docs/DEPLOYMENT.md`.

---

## How the pieces connect

### Authentication flow (no forgot-password)

```
User arrives → SubscriptionGate renders landing page
  Sign in  → supabase.auth.signInWithPassword()
             If no session returned → OTP step (supabase.auth.verifyOtp())
  Sign up  → supabase.auth.signUp() → email verification link sent
             After verify → auto SIGNED_IN event → gate closes → subscription check
  Sign out → executeGlobalSignOut() (scope: 'global') → clears all devices
```

No forgot-password flow exists. OTP is for MFA/TOTP enforcement by Supabase, not password reset.

### Subscription gate (double-enforced)

The gate runs in **two independent layers**:

1. **Client (`useSubscription`)** — queries `public.subscriptions` for an `active` or `trialing` row; listens to Supabase Realtime so status changes propagate within ~1s of a Stripe event.
2. **Server (`fra-engine`)** — on every cron tick, intersects the set of running tenants against `public.subscriptions` using a 45s in-memory cache. Users whose subscription lapses are silently skipped.

`useSupabaseFra` returns `store = null` until both `userId` and `subscription.isActive` are truthy, so even if a developer forgets `<SubscriptionGate>`, `<FundingRateArb>` receives no persistence store and stays inert.

### State store and realtime sync ("two engines, one state")

```
Client                             Supabase DB                   Edge Function (fra-engine)
──────                             ───────────                   ──────────────────────────
FundingRateArb calls store.save()
  → upserts fra_state (JSONB)  →  fra_state row updated
  → mirrors positions/PnL            │
                                      │ Realtime postgres_changes
                              ────────┘
useSupabaseFra receives UPDATE payload
  → store.hydrate(blob, version, isRunning)
  → version guard: discard if incomingVersion < currentLocalVersion
  → onStateUpdateListener() pushes new state into engine

                                                              pg_cron fires every 60s
                                                              fra-engine validates cron secret
                                                              acquires global lock (fra_try_lock)
                                                              per-tenant lock (fra_try_lock)
                                                              loads fra_state JSONB → MemoryStore
                                                              loads exchange keys from Vault
                                                              ArbEngine.start() + .tick()
                                                              if version changed → UPDATE fra_state
                                                              if is_running flipped off mid-tick → abort
                                                              mirrors events → fra_events
                                                              releases locks (fra_unlock)
```

**Concurrency guard**: `SupabaseStateStore.hydrate()` tracks `currentLocalVersion`. When the server tick writes a new version, the client's realtime listener calls `hydrate()`. If the user pressed "Stop" between the tick start and write, the client version is higher and the stale server update is discarded.

### Billing flow

```
User clicks "Subscribe"
  → useSubscription.redirectToCheckout(priceId)
  → invokes create-checkout edge function (Bearer token auth)
  → create-checkout: verifies user, blocks duplicate subs, creates Stripe Checkout session
  → browser → stripe.com checkout
  → on success: redirect to /?fra_billing=success
  → SubscriptionGate clears URL params, calls sub.refresh()

Stripe also fires a webhook → stripe-webhook-fra edge function
  → verifies Stripe-Signature header
  → upserts public.subscriptions on subscription.created/updated/deleted
  → on any failure: parks raw event in fra_webhook_dlq (HTTP 210 back to Stripe)

reconcile-subscriptions (hourly cron)
  → drains fra_webhook_dlq with exponential back-off (max 8 retries)
  → cross-checks all public.subscriptions against Stripe API, corrects drift

Realtime notifies useSubscription → isActive flips true → gate opens

User clicks "Manage subscription"
  → subscription.openPortal()
  → invokes create-portal-session edge function
  → retrieves customer ID from Stripe API via stored subscription ID
  → creates Stripe Billing Portal session → browser → stripe.com portal
```

**Dual webhook path**: `stripe-webhook-fra` is a native webhook handler (signature-verified). The Supabase Stripe Sync Engine's `sync_stripe_to_public()` trigger (migration `0002`) is a second path. Both write to `public.subscriptions` via upsert; `reconcile-subscriptions` acts as a third safety net.

### Exchange key management

Keys are **never stored in the DB or sent to the browser**. They live in **Supabase Vault**. The `fra_user_exchanges` table stores only the user's preferred exchange name and a vault secret name (pointer). The edge function resolves the pointer at tick time using the service role.

- `RotateKeyDialog` → calls `rotate-exchange-key` edge function → smoke-tests new keys → calls `rotate_vault_secret()` DB function atomically (create or update) → inserts `fra_key_rotations` audit row.
- `revoke-exchange-key` edge function → calls `revoke_vault_secret()` → deletes from `vault.secrets` → inserts audit row with `action = 'revoke'`.

---

## Database schema (all tables)

| Table | Migration | Purpose |
|---|---|---|
| `fra_state` | 0001 | One row per user; canonical JSONB engine state + `is_running` flag |
| `fra_positions` | 0001 | Denormalized mirror of `state.positions` for analytics queries |
| `fra_pnl_history` | 0001 | Append-only PnL time series (one insert per save cycle) |
| `fra_events` | 0001 | Execution events emitted by ArbEngine; unique index added in 0004 |
| `public.subscriptions` | 0002 | Stripe subscription mirror, RLS-scoped; fed by `sync_stripe_to_public()` trigger |
| `fra_key_rotations` | 0003 | Audit log for every key rotation/revocation event |
| `fra_webhook_dlq` | 0004 | Dead-letter queue for failed Stripe webhook events |
| `fra_engine_metrics` | 0004 | One row per cron tick (tenant counts, errors, duration, cache stats) |
| `fra_engine_locks` | 0004 | TTL-based distributed lock table used by `fra_try_lock()` / `fra_unlock()` |
| `fra_user_exchanges` | *(untracked)* | User → exchange preference + Vault secret name pointer |

All tables have RLS enabled. Client writes are scoped to `auth.uid()`. Server-side writes (fra-engine, stripe-webhook-fra, reconcile-subscriptions) use the service role and bypass RLS.

---

## Building and deploying

This project has **no local dev server**. The Bun server in `index.ts` serves the compiled client bundle (`dist/index.cli.js`) — it is a production entry point, not a Vite dev server.

```bash
# 1. Install the private dependency (requires GH_DEP_TOKEN env var)
node scripts/install-arb.mjs

# 2. Bundle the arb package for Deno edge functions
node scripts/bundle-arb.mjs

# 3. Build the client bundle
bun build ./index.ts ./index.cli.tsx --outdir=./dist --naming=[name].js --minify

# 4. Type-check
npm run typecheck

# 5. Lint
npm run lint
```

To deploy to Supabase:

```bash
supabase link --project-ref <ref>
supabase db push migrations/0001_init.sql
supabase db push migrations/0002_subscriptions.sql   # after Stripe Sync Engine is installed
supabase db push migrations/0003_vault_admin.sql
supabase db push migrations/0004_billing_resilience.sql
supabase functions deploy fra-engine create-checkout create-portal-session \
  stripe-webhook-fra reconcile-subscriptions rotate-exchange-key revoke-exchange-key
```

See `docs/DEPLOYMENT.md` and `docs/BILLING.md` for full steps including secrets, pg_cron scheduling, and Stripe webhook registration.

---

## Required environment variables

### Client-side (Vite / bundled into HTML via index.ts)
| Variable | Purpose |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key (safe to expose) |
| `VITE_STRIPE_PRICE_ID` | Stripe recurring Price ID (`price_xxx`) |

### Server-side (Supabase Vault secrets — never shipped to client)
| Variable | Purpose |
|---|---|
| `SUPABASE_SERVICE_ROLE_KEY` | Full DB access for edge functions |
| `FRA_CRON_SECRET` | Shared secret between pg_cron and fra-engine / reconcile-subscriptions |
| `STRIPE_SECRET_KEY` | Stripe secret key for Checkout, Portal, and reconcile functions |
| `STRIPE_WEBHOOK_SECRET_FRA` | Stripe webhook signing secret for stripe-webhook-fra |

### Build / CI only
| Variable | Purpose |
|---|---|
| `GH_DEP_TOKEN` | GitHub token for downloading `@jpytrader/fundrates-arb` tarball |

---

## Design constraints

- `@jpytrader/fundrates-arb` is **never modified** by this project. All Supabase-specific code lives here.
- `SupabaseStateStore` implements the public `StateStore` interface from the arb package — no internal APIs are touched.
- The arb package's `ArbEngine`, `MemoryStore`, and exchange adapters are pure TypeScript (no DOM/React) and run safely in Deno edge functions.
- Exchange keys never transit to the browser. `RotateKeyDialog` sends them directly to the `rotate-exchange-key` edge function over HTTPS; the function smoke-tests them before writing to Vault.
- Server-side subscription enforcement is fail-closed: on DB query failure the engine reuses the last cached subscriber set and retries after 5s (instead of the normal 45s TTL).
- The `fra_try_lock` / `fra_unlock` pair (TTL-based lock table, migration 0004) prevents cron overlaps at both the global tick level and per-tenant level.

---

## User preferences

_None recorded yet._
