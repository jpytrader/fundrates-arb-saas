# Tenant Isolation — 7-Layer Model

`@vireson/funding-rate-arb` is a **single-tenant** component by design (one
browser tab = one trader). The `supabase-saas/` layer multiplexes it across
many users on shared infrastructure. This document enumerates the seven
independent boundaries that keep one user's state, keys, and order flow from
ever reaching another user, and provides a concrete test case for each.

If **any** single layer holds, cross-tenant leakage is impossible. We require
all seven so a bug, misconfiguration, or compromised key in one layer cannot
cascade.

---

## Layer summary

| # | Layer                          | Mechanism                                                                | Failure blast radius if bypassed alone |
|---|--------------------------------|--------------------------------------------------------------------------|----------------------------------------|
| 1 | Component gating               | `<FundingRateArb />` only mounts inside `<SubscriptionGate />` with a non-null `store` from `useSupabaseFra(supabase)` | Unsubscribed user sees app shell but no engine instance |
| 2 | State RLS                      | `public.fra_state` policies `USING (auth.uid() = user_id)`               | DB rejects cross-user SELECT/UPDATE    |
| 3 | Realtime channel filter + RLS  | Client subscribes with `filter: user_id=eq.<uid>`; server re-checks RLS  | Realtime broker drops unauthorized payloads |
| 4 | Vault-stored exchange keys     | Keys in `vault.secrets` named `fra_<exchange>_key_<user_id>`, never sent to client | Browser process never holds plaintext keys |
| 5 | Server tick ownership          | `fra-engine` enumerates users from `fra_state`, ignores request body. The tick body imports `ArbEngine` from `@vireson/funding-rate-arb` and calls `engine.tick()` per tenant — no parallel server-side engine implementation exists. | Cron caller cannot impersonate a user; client and server execute the same engine code  |
| 6 | JWT identity at edge           | `supabase.auth.getUser(token)` is the only identity source in `create-checkout`, `create-portal-session`, `rotate-exchange-key` | Forged `user_id` in body is ignored    |
| 7 | Subscription gate (billing)    | `useSupabaseFra` returns `store === null` until `public.subscriptions.status ∈ {active, trialing}`; **`fra-engine` re-checks server-side every tick (cached ~45s, fail-closed)** | Lapsed user cannot mount the engine and cannot receive server ticks |

---

## Layer 1 — Component gating

**Mechanism**. `useSupabaseFra(supabase)` returns `{ store, userId, revision, subscription }`. `store` is `null` while either:

- `supabase.auth.getUser()` returns no user, or
- `useSubscription` reports no active row in `public.subscriptions`.

`<SubscriptionGate>` refuses to render `children` until `subscription.active === true`. The example wiring `{store && <FundingRateArb persistenceStore={store} key={revision} />}` makes mounting structurally impossible without a store.

**Test**.

```tsx
// supabase-saas/__tests__/gate.test.tsx
it('does not mount FundingRateArb without active subscription', async () => {
  mockSubscription({ status: null });
  const { queryByTestId } = render(<index />);
  expect(queryByTestId('fra-root')).toBeNull();
});

it('mounts FundingRateArb when subscription becomes active', async () => {
  const { sub } = mockSubscription({ status: 'trialing' });
  const { findByTestId } = render(<index />);
  await findByTestId('fra-root');
  sub.update({ status: 'canceled' });
  await waitFor(() => expect(screen.queryByTestId('fra-root')).toBeNull());
});
```

---

## Layer 2 — State RLS

**Mechanism**. `public.fra_state` has:

```sql
CREATE POLICY "own state read"  ON public.fra_state FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "own state write" ON public.fra_state FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own state mod"   ON public.fra_state FOR UPDATE USING (auth.uid() = user_id);
```

Anonymous role has no policies → zero rows visible.

**Test**.

```sql
-- run as user A
SET LOCAL role = 'authenticated';
SET LOCAL request.jwt.claims = '{"sub":"<uuid-A>"}';
SELECT count(*) FROM public.fra_state;     -- expect: 1 (own row)

SET LOCAL request.jwt.claims = '{"sub":"<uuid-B>"}';
SELECT count(*) FROM public.fra_state WHERE user_id = '<uuid-A>'; -- expect: 0

-- attempt cross-user write
UPDATE public.fra_state SET state = '{}'::jsonb WHERE user_id = '<uuid-A>';
-- expect: 0 rows updated (silent under RLS)
```

---

## Layer 3 — Realtime channel filter + server RLS

**Mechanism**. `SupabaseStateStore` opens:

```ts
supabase.channel(`fra_state:${userId}`)
  .on('postgres_changes',
      { event: '*', schema: 'public', table: 'fra_state',
        filter: `user_id=eq.${userId}` },
      handler);
```

The realtime server **also** runs the row through RLS before broadcasting. A
malicious client that omits `filter` still receives nothing, because the
postgres_changes extension respects RLS on the user JWT.

**Test**.

```ts
it('does not receive other users postgres_changes payloads', async () => {
  const sbA = createClientWithJwt(userA.jwt);
  const received: any[] = [];
  sbA.channel('attack')
     .on('postgres_changes',
         { event: '*', schema: 'public', table: 'fra_state' /* no filter */ },
         (p) => received.push(p))
     .subscribe();

  // userB writes via service role
  await admin.from('fra_state').update({ state: { ping: Date.now() } })
                               .eq('user_id', userB.id);

  await wait(2000);
  expect(received.find(p => p.new.user_id === userB.id)).toBeUndefined();
});
```

---

## Layer 4 — Vault-stored exchange keys

**Mechanism**. Keys live in `vault.secrets` under the deterministic name
`fra_<exchange>_key_<user_id>`. The SaaS client passes `exchangeKeys={}` to
`<FundingRateArb />`. Only the `fra-engine` edge function (service role)
calls `vault.decrypted_secrets` to fetch them at tick time.

**Test**.

```ts
it('client never holds plaintext exchange keys', () => {
  // grep build artefact / runtime memory
  const html = readFileSync('dist/index.html', 'utf8');
  expect(html).not.toMatch(/HL_PRIVATE_KEY|OKX_API_SECRET/);
  // also: window.localStorage / sessionStorage should be empty of keys
  expect(JSON.stringify(localStorage)).not.toMatch(/0x[a-f0-9]{64}/i);
});

// SQL: vault is service-role only
SET LOCAL role = 'authenticated';
SELECT * FROM vault.decrypted_secrets;  -- expect: permission denied
```

---

## Layer 5 — Server tick ownership

**Mechanism**. `fra-engine` is invoked by `pg_cron` with a shared
`FRA_CRON_SECRET`. It then:

```ts
const { data: rows } = await admin.from('fra_state').select('user_id, state');
for (const row of rows) {
  const keys = await loadVaultKeys(row.user_id);
  await tickFor(row.user_id, row.state, keys);
}
```

The function **never trusts** a `user_id` from the request body. A leaked
cron secret would let an attacker trigger a tick, but they still cannot
target a specific victim or substitute keys.

**Test**.

```ts
it('ignores user_id in request body', async () => {
  const res = await fetch(`${url}/functions/v1/fra-engine`, {
    method: 'POST',
    headers: { 'x-cron-secret': SECRET, 'content-type': 'application/json' },
    body: JSON.stringify({ user_id: VICTIM_UUID, hijack: true }),
  });
  const log = await readEdgeLogs('fra-engine');
  expect(log).not.toMatch(/hijack/);
  expect(log).toMatch(/processed \d+ users/);
});
```

---

## Layer 6 — JWT identity at edge

**Mechanism**. Every user-facing edge function follows:

```ts
const authHeader = req.headers.get('Authorization')!;
const token = authHeader.replace('Bearer ', '');
const { data: { user }, error } = await supabase.auth.getUser(token);
if (error || !user) return new Response('unauthorized', { status: 401 });

// user.id is the ONLY source of identity from here on
```

Body fields like `user_id`, `email`, `customer_id` are never read for
authorization decisions.

**Test**.

```ts
it('create-checkout uses JWT identity, not body user_id', async () => {
  const res = await fetch(`${url}/functions/v1/create-checkout`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${userA.jwt}`, 'content-type': 'application/json' },
    body: JSON.stringify({ user_id: userB.id, priceId: PRICE }),
  });
  const { sessionId } = await res.json();
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  expect(session.metadata.supabase_user_id).toBe(userA.id); // not userB
});
```

---

## Layer 7 — Subscription gate (billing)

**Mechanism**. `useSubscription(supabase, userId)` SELECTs the latest row
from `public.subscriptions` and subscribes to realtime updates filtered by
`user_id`. `active === ['active','trialing'].includes(status)`. When
`active` flips false, `useSupabaseFra` clears `store` to `null`, which
unmounts `<FundingRateArb />` and stops the in-browser engine on the next
render cycle.

**Test**.

```ts
it('unmounts engine within 2s of subscription cancel', async () => {
  const { sub } = mockSubscription({ status: 'active' });
  const { findByTestId, queryByTestId } = render(<index />);
  await findByTestId('fra-root');

  sub.update({ status: 'canceled' });
  await waitFor(() => expect(queryByTestId('fra-root')).toBeNull(), { timeout: 2000 });
});

it('blocks server tick for canceled users', async () => {
  // Enforced server-side in fra-engine (Option B). Subscription IDs are
  // cached ~45s, so a canceled user has at most one cache window of
  // residual accrual; query failures fail closed (no tick).
  await admin.from('subscriptions').update({ status: 'canceled' }).eq('user_id', userA.id);
  await waitForCacheExpiry(45_000);
  const before = await admin.from('fra_state').select('state').eq('user_id', userA.id).single();
  await invokeCron();
  const after  = await admin.from('fra_state').select('state').eq('user_id', userA.id).single();
  expect(after.data!.state.lastFundingAccrualAt)
    .toBe(before.data!.state.lastFundingAccrualAt);
});
```

> **Server-side enforcement**. Layer 7 is enforced inside `fra-engine` via a
> cached `getActiveSubscriberIds()` lookup against `public.subscriptions`. The
> cache TTL (~45s) caps residual accrual after cancellation to a single window;
> a DB error on the lookup fails closed (reuse stale cache or empty set), so a
> canceled user can never receive a fresh tick due to a transient outage. The
> client-side `<SubscriptionGate />` remains the first line of defence; the
> server filter is defence in depth.

---

## Combined attack scenarios

| Scenario                                                     | Layers that catch it           |
|--------------------------------------------------------------|--------------------------------|
| Forged JWT with another user's `sub`                         | 2, 3, 6 (signature check fails first) |
| Compromised anon key dumped publicly                         | 2, 3, 4 (anon has no policies) |
| Malicious React patch removes `<SubscriptionGate />`         | 2, 4, 7 (still no keys, still no other-user state) |
| Stolen service-role key                                       | None — operator must rotate immediately. Mitigation: key never in repo, only in Supabase secrets. |
| XSS in a third-party dependency                              | 4 (no keys to steal), 6 (cannot impersonate other users via edge fn) |
| Cron secret leaked                                            | 5 (cannot target a victim), 4 (cannot read other-user keys without service role) |

---

## Verification checklist for new contributors

Before merging anything that touches `fra_state`, `subscriptions`,
`vault.secrets`, or any edge function:

- [ ] Run `pnpm test --filter tenant-isolation` (suite covering all 7 cases above)
- [ ] `supabase db lint` shows no RLS-disabled tables in `public`
- [ ] Grep build output for `0x[a-f0-9]{64}` and known exchange API key prefixes
- [ ] New edge functions call `supabase.auth.getUser(token)` before any user-scoped action
- [ ] New realtime subscriptions include a `filter: user_id=eq.${userId}` clause

## Layer 8 — Concurrency isolation via locks (S4)

Two reentrant TTL-backed locks live in `public.fra_engine_locks` (preferred
over `pg_advisory_lock` because edge-function HTTP calls don't share a
Postgres session):

- `fra-engine-tick` (TTL 120 s) — only one engine tick runs globally at a time.
- `fra-tick:<user_id>` (TTL 90 s) — only one tick per tenant runs at a time.

A retried cron invocation, a manual replay, or a slow tick that bleeds into
the next minute can no longer double-process a tenant. Combined with the new
`UNIQUE (user_id, type, timestamp)` index on `fra_events`, accrual events
are also idempotent at the row level — duplicate inserts collapse via
`ON CONFLICT DO NOTHING`.

### Subscription cache (Layer 7) hardening

Negative cache (`SUB_CACHE_NEGATIVE_TTL_MS = 5 s`) ensures that a transient
DB error during the subscription lookup never pins stale data through the
full 45 s positive-cache window — see `edge-functions/fra-engine/index.ts`
and the Deno test in `edge-functions/fra-engine/sub_cache_test.ts`.
