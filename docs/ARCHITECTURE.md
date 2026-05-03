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
| Source code          | `@vireson/funding-rate-arb` (`<FundingRateArb />`) | `edge-functions/fra-engine` — **imports** `ArbEngine` from the same package |
| Runtime              | Browser / WebView                   | Deno on Supabase Edge                |
| Triggers scans       | Yes (UI-driven, `setInterval`)      | Yes (pg_cron, every 60s, `manualTick: true` + `engine.tick()`) |
| Places real orders   | Yes (when user has keys configured) | Yes — adapter is built from Vault payload; falls back to dry-run when keys are absent |
| Reads/writes state   | via `SupabaseStateStore`            | hydrates a `MemoryStore` from the JSONB blob, runs one `tick()`, writes the blob back |
| Reads exchange keys  | from props                          | from Supabase Vault (`fra_user_exchanges` → `vault.decrypted_secrets`) |

Both write to the same `fra_state.state` JSONB blob, which is exactly the
`PersistedState` shape produced by the component's existing stores. Because
the server tick runs the *same* `ArbEngine` class as the browser, the
project rule that "Live and Paper modes must execute identical sequential
logic" extends naturally to client vs. server ticks — there is no second
implementation to drift.


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
  empty `exchangeKeys` and runs in dry-run; the server tick reads keys from
  Vault and constructs a real adapter (or a dry-run adapter when no row
  exists in `fra_user_exchanges`).

- **Cron endpoint** is gated by a long random `FRA_CRON_SECRET` shared between
  Postgres and the edge function. JWT verification is disabled because cron
  cannot present a user token.

## Limitations & v2 roadmap

| Limitation                                       | Planned fix                              |
| ------------------------------------------------ | ---------------------------------------- |
| ~~Server tick only accrues funding, no order exec~~ | **Done (F1)**: edge function now imports `ArbEngine` from `@vireson/funding-rate-arb` and runs `engine.tick()` per tenant. No accrual logic is duplicated server-side. |
| No per-user cron frequency                       | Add a `tick_interval_secs` column and per-user schedule |
| No self-service rotation UI inside the SaaS app  | Ship `<VaultKeysAdmin />` page consuming the already-shipped `rotate-exchange-key` function (see §Vault rotation v2) |
| Webhook resilience relies entirely on Stripe Sync Engine | Add native `stripe-webhook-fra` + DLQ + hourly reconciliation (S3) |

## Server tick (F1 — headless ArbEngine)

The edge function `fra-engine` no longer carries its own funding-accrual loop.
Per running, subscribed tenant per tick it:

1. Hydrates a `MemoryStore` from the `fra_state.state` JSONB blob.
2. Loads the user's exchange + Vault payload from `fra_user_exchanges`
   (`createHyperliquidAdapter` / `createOKXAdapter`, or the matching
   `createDryRun*Adapter` when no keys are stored).
3. Constructs `new ArbEngine(config, adapter, store, { manualTick: true })`.
   The `manualTick` flag — added in F1 — opts out of the internal
   `setInterval` so the cron caller drives ticks itself.
4. Calls `await engine.start()` (restores state into the engine without
   starting a timer) followed by `await engine.tick()` (one
   scan/exec/accrual cycle, identical to a single client-side scan).
5. Reads the updated blob back from the `MemoryStore` and writes it to
   `fra_state.state`.
6. Mirrors any `ExecutionEvent`s collected via `engine.onExecution(...)`
   into `fra_events` with `data.source = 'server'`.

The component itself remains 100% self-contained — `ArbEngine`,
`MemoryStore`, and the adapter factories are plain TypeScript with no DOM
or React dependencies. The SaaS is a *consumer* of those exports, not a
fork.


## Subscription enforcement at tick time

`fra-engine` enforces Layer 7 of the tenant isolation model on every tick.
After fetching all `fra_state` rows where `is_running = true`, it intersects
them with the set of `user_id`s whose `public.subscriptions.status` is
`active` or `trialing`. The set is cached in a module-scoped variable for
`SUB_CACHE_TTL_MS` (45s by default — chosen as a balance between DB load and
cancellation latency, well inside the 30–60s window).

Behaviour:

- **Cache hit** (age < TTL): no DB call; tick uses the cached set.
- **Cache miss / cold start**: one `SELECT user_id FROM subscriptions WHERE status IN ('active','trialing')` query, then cache.
- **Query failure**: log + fail closed. Reuse the previous cache if any, else
  return an empty set. Canceled users never tick due to a transient outage.

The response payload now includes `{ tenants, skipped, cacheAgeMs,
cacheRefreshed, activeSubscribers }` for observability — `skipped` reveals
the count of running tenants without an active subscription on the most
recent cache snapshot.

---

## Billing event flow (Stripe → SubscriptionGate)

End-to-end sequence from a successful Stripe Checkout to the client's
`<SubscriptionGate />` unlocking — no page reload required.

```mermaid
sequenceDiagram
    autonumber
    participant U as User (Browser)
    participant GATE as SubscriptionGate
    participant FN as create-checkout (Edge Fn)
    participant STRIPE as Stripe
    participant SYNC as Stripe Sync Engine
    participant STR as stripe.subscriptions
    participant TRG as sync_stripe_to_public (trigger)
    participant PUB as public.subscriptions
    participant RT as Realtime (postgres_changes)
    participant HOOK as useSubscription

    U->>GATE: Mount app, no active sub
    GATE->>HOOK: subscribe to public.subscriptions filter user_id=eq.<uid>
    HOOK->>RT: open channel
    GATE->>U: render "Subscribe" CTA
    U->>FN: click Subscribe → POST /create-checkout
    FN->>STRIPE: checkout.sessions.create({ metadata.supabase_user_id })
    STRIPE-->>FN: session.url
    FN-->>U: 303 redirect to Stripe Checkout
    U->>STRIPE: complete payment
    STRIPE->>SYNC: webhook (customer.subscription.created)
    SYNC->>STR: INSERT row (metadata preserved)
    STR->>TRG: AFTER INSERT fires
    TRG->>PUB: INSERT public.subscriptions (user_id from metadata, status=active)
    PUB->>RT: postgres_changes event
    RT-->>HOOK: payload { status: 'active', ... }
    HOOK->>GATE: setActive(true)
    GATE->>U: unmount CTA, mount <FundingRateArb />
```

**Latency budget**: typical Stripe webhook → Sync Engine → trigger → realtime
broadcast completes in **600–1500 ms**. The user sees the gate unlock without
refreshing the page.

**Failure modes**:
- *Webhook misses Sync Engine*: `stripe.subscriptions` never gets the row →
  trigger never fires. Mitigation: Sync Engine retries with exponential backoff.
- *Trigger raises*: missing `metadata.supabase_user_id` → trigger logs
  `RAISE WARNING` and returns NEW. Stripe row is preserved; ops can repair the
  metadata and re-fire by `UPDATE stripe.subscriptions SET ... WHERE id = ...`.
- *Realtime drop*: `useSubscription` falls back to polling `public.subscriptions`
  on tab focus and on a 30 s interval as a safety net.

---

## Vault rotation v2 — `<VaultKeysAdmin />`

> **Status — partially shipped.** The server-side primitives (audit table,
> atomic RPC, edge function) and the optional `<RotateKeyDialog />` modal in
> `supabase-saas/client/` ship in this package today
> (`migrations/0003_vault_admin.sql` + `edge-functions/rotate-exchange-key/`
> + `client/RotateKeyDialog.tsx`). A read-only audit viewer is wired into the
> host project's Admin page as `<VaultKeyRotations />`. The remaining v2 item
> is the full self-service `<VaultKeysAdmin />` settings page (per-exchange
> cards, last-rotated timestamps, Remove action) inside the SaaS demo app.

Today, exchange API keys live in Supabase Vault under deterministic names
(`fra_hyperliquid_key_<user_id>`, `fra_okx_key_<user_id>`, etc.). Before this
slice they were inserted/rotated by hand via SQL; now any signed-in user can
rotate via the edge function without secrets ever round-tripping through a
custom backend.

### Goals

1. Keys never round-trip through the browser in plaintext after submit.
2. Old keys are revoked atomically with new-key activation (no race where the
   server tick runs against a half-rotated pair).
3. Full audit trail: who rotated, when, from which IP, and which exchange.

### Surface

- **Route**: `/settings/keys` (lazy-loaded React page, gated by
  `<SubscriptionGate />`).
- **Component**: `<VaultKeysAdmin />` — one card per supported exchange
  (Hyperliquid, OKX, …) with status badge (`Configured` / `Missing` /
  `Rotating`), last-rotated timestamp, and **Rotate** / **Remove** actions.
- **Modal**: `<RotateKeyDialog exchange="hyperliquid">` — collects
  `apiKey` / `apiSecret` (or wallet privkey for HL), validates format
  client-side, then POSTs to the edge function.

### Wire protocol

```
POST /functions/v1/rotate-exchange-key
Authorization: Bearer <user JWT>
Content-Type: application/json

{
  "exchange": "hyperliquid" | "okx" | "...",
  "apiKey":   "...",
  "apiSecret":"...",
  "extra":    { "walletAddress": "0x..." }   // exchange-specific
}
```

### Edge function: `rotate-exchange-key`

```ts
// Pseudocode — full impl in supabase-saas/edge-functions/rotate-exchange-key/
const { data: { user } } = await supabase.auth.getUser(token);
if (!user) return 401;

const { exchange, apiKey, apiSecret, extra } = await req.json();
const vaultName = `fra_${exchange}_key_${user.id}`;
const payload   = JSON.stringify({ apiKey, apiSecret, ...extra });

// 1. Smoke-test the new credentials before storing.
const ok = await probeExchange(exchange, apiKey, apiSecret, extra);
if (!ok) return 400; // never write bad keys to Vault

// 2. Atomic rotate inside a single SQL statement.
await admin.rpc('rotate_vault_secret', {
  p_name:    vaultName,
  p_payload: payload,
  p_user_id: user.id,
});

// 3. Audit.
await admin.from('fra_key_rotations').insert({
  user_id: user.id, exchange, ip: req.headers.get('x-forwarded-for'),
});

return 200;
```

`rotate_vault_secret(p_name, p_payload, p_user_id)` is a SECURITY DEFINER
SQL function that wraps `vault.create_secret` / `vault.update_secret` in a
transaction so the row in `vault.secrets` is replaced atomically.

### RLS & audit

```sql
CREATE TABLE public.fra_key_rotations (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exchange    text NOT NULL,
  ip          inet,
  created_at  timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.fra_key_rotations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own rotations" ON public.fra_key_rotations
  FOR SELECT USING (auth.uid() = user_id);
```

Direct access to `vault.secrets` remains service-role only. The edge function
is the **only** path from a user JWT to a Vault write.

### Migration path

1. ✅ **Shipped** — `rotate_vault_secret` SQL function + `fra_key_rotations`
   table in `migrations/0003_vault_admin.sql`.
2. ✅ **Shipped** — `rotate-exchange-key` edge function (validates JWT in
   code; `verify_jwt = false` is the Lovable default).
3. ✅ **Shipped** — `RotateKeyDialog` modal in `supabase-saas/client/` and
   read-only `<VaultKeyRotations />` audit viewer wired into the host
   project's Admin page (super-admin only).
4. ⏳ **Remaining** — full `<VaultKeysAdmin />` settings page in the SaaS
   demo app (per-exchange status, Remove action). Users keep their
   hand-loaded secrets in the meantime; the existing primitives let them
   rotate today.
5. Optional: a one-shot CLI script `bun run scripts/import-vault-keys.ts`
   that bulk-imports legacy keys from a CSV under service-role.
