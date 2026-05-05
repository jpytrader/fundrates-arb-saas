# Operational Runbook

Common incidents and their resolution. All commands assume `psql` is
connected with service-role credentials.

---

## 1. Stuck tick (`fra-engine`)

**Symptom:** No new row in `public.fra_engine_metrics` for >5 min.

```sql
-- Check whether the global lock is held.
SELECT * FROM public.fra_engine_locks WHERE key = 'fra-engine-tick';

-- If expires_at is in the past but the row is still there, force release.
SELECT public.fra_unlock('fra-engine-tick');

-- Then either wait for the next cron tick or invoke manually:
-- curl -H "x-cron-secret: $FRA_CRON_SECRET" \
--   https://<project-ref>.functions.supabase.co/fra-engine
```

If the next tick still fails, check edge-function logs filtered by
`fn=fra-engine level=error`.

---

## 2. Webhook drift (Stripe)

**Symptom:** A user reports "I just paid but the engine still says
unsubscribed".

```sql
-- Look for parked events for this customer.
SELECT * FROM public.fra_webhook_dlq
WHERE payload->'data'->'object'->>'customer' = '<stripe_cus_…>'
  AND resolved_at IS NULL;

-- Force the reconciler to run now (out of cycle).
-- curl -H "x-cron-secret: $FRA_CRON_SECRET" \
--   https://<project-ref>.functions.supabase.co/reconcile-subscriptions

-- Confirm subscription state.
SELECT user_id, status, current_period_end FROM public.subscriptions
WHERE stripe_customer_id = '<stripe_cus_…>';

-- If still wrong, also flush the in-memory cache by deploying the function
-- (each deploy spawns a fresh isolate):
-- supabase functions deploy fra-engine
```

---

## 3. Key rotation failure

**Symptom:** `rotate-exchange-key` returns `400 exchange validation failed: …`.

`validateKeys` (F2) is now real signed I/O. The most common reasons:

| Reason                                | Fix                                                     |
| ------------------------------------- | ------------------------------------------------------- |
| OKX `Invalid Sign`                    | Wrong `apiSecret` or `passphrase`.                      |
| Hyperliquid `Invalid wallet…`         | `walletPrivateKey` not provided / not a 32-byte hex.    |
| `IP not whitelisted`                  | Add the Supabase egress IPs in the exchange dashboard.  |
| `expired API key`                     | User must regenerate the key on the exchange.           |

If the user insists the key is correct and Vault is empty, fall back to
`revoke-exchange-key` first to clear any half-written state, then retry
rotation.

---

## 4. Subscription cache stuck

**Symptom:** A canceled user is still receiving ticks, OR a freshly-paid
user isn't.

```sql
-- Check ground truth.
SELECT status FROM public.subscriptions WHERE user_id = '<uuid>';
```

If the DB row is correct, the cache (≤45 s positive, ≤5 s negative) will
self-heal at the next refresh. To force it immediately, redeploy
`fra-engine` (new isolate = empty cache):

```bash
supabase functions deploy fra-engine
```

---

## 5. Tenant lock stuck

**Symptom:** A specific user is consistently `locked: true` in the
`fra-engine` response payload.

```sql
SELECT * FROM public.fra_engine_locks WHERE key = 'fra-tick:<user_id>';

-- If expired, release.
SELECT public.fra_unlock('fra-tick:<user_id>');
```

The 90 s TTL means stale locks self-clear; manual release is only needed for
rare clock-skew or interrupted-tick scenarios.

---

## 6. DLQ overflow

**Symptom:** `fra_webhook_dlq` has rows with `retry_count >= 8`.

These are dead-lettered events — most often unknown `stripe_customer_id`
because the user signed up via a path that didn't link the customer. Look
up the customer in Stripe, manually attach to the right `profiles.id`, then
mark the DLQ row resolved:

```sql
UPDATE public.fra_webhook_dlq
SET resolved_at = now()
WHERE id = '<dlq_id>';
```
