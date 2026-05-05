# Billing Setup (Mandatory)

The SaaS wrapper enforces an **active Stripe subscription** before any user can
access the FRA dashboard. This guide walks through enabling the Stripe Sync
Engine, creating a recurring price, and wiring the gate.

## 1. Install the Stripe Sync Engine

In your Supabase project dashboard:

1. **Database → Extensions** — enable `wrappers` if not already enabled.
2. **Integrations → Stripe Sync Engine** — install the integration.
3. Paste your **Stripe Secret Key** (`sk_test_...` for sandbox, `sk_live_...`
   for production).
4. Confirm the `stripe` schema appears under **Database → Schemas** with at
   minimum the `subscriptions`, `customers`, and `prices` tables.

> The Sync Engine continuously mirrors Stripe objects into the `stripe.*`
> schema. The migration `0002_subscriptions.sql` attaches a trigger to
> `stripe.subscriptions` that bridges rows into `public.subscriptions`.

## 2. Create a recurring Product + Price

In the Stripe Dashboard (**Products → + Add product**):

1. Name your tier (e.g. *FRA Pro*).
2. Add a **recurring** price (monthly or yearly).
3. Save and copy the resulting `price_xxx` ID.
4. Set it as `VITE_STRIPE_PRICE_ID` in your client `.env`:

   ```
   VITE_STRIPE_PRICE_ID="price_1QabcDEFghijKLMnop..."
   ```

## 3. Apply the billing migration

```bash
supabase db push migrations/0002_subscriptions.sql
```

This creates `public.subscriptions`, RLS, the `sync_stripe_to_public()`
trigger, and adds the table to the `supabase_realtime` publication.

## 4. Set the Stripe secret for edge functions

```bash
supabase secrets set STRIPE_SECRET_KEY=sk_test_or_live_...
```

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are auto-provided.

## 5. Deploy the billing edge functions

```bash
supabase functions deploy create-checkout      --no-verify-jwt
supabase functions deploy create-portal-session --no-verify-jwt
```

`--no-verify-jwt` is required because both functions authenticate manually
via `supabase.auth.getUser(token)` reading the `Authorization` header.

## 6. Enable the Customer Portal

Stripe Dashboard → **Settings → Billing → Customer portal**:

1. Activate the portal.
2. Allow customers to **cancel subscriptions** and **update payment methods**.
3. Save.

## 7. Verify end-to-end

1. Sign in a test user from the client.
2. The `<SubscriptionGate />` should auto-redirect to Stripe Checkout.
3. Complete the test card flow (`4242 4242 4242 4242`).
4. Within ~1s of returning to the app, the gate should unlock — the trigger
   wrote a row to `public.subscriptions`, realtime pushed the change, and
   `useSubscription` flipped `isActive` to `true`.
5. Click **Manage subscription** to verify the Customer Portal opens.

## How the metadata bridge works

`create-checkout` sets `metadata.supabase_user_id = user.id` on **both** the
Checkout Session AND the resulting Subscription (`subscription_data.metadata`).
The Stripe Sync Engine mirrors this metadata into `stripe.subscriptions`, and
the trigger reads it to populate `public.subscriptions.user_id`. RLS then
restricts each user to their own row.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Trigger never fires | `stripe` schema missing | Install Stripe Sync Engine |
| Row inserted but `user_id` is null | metadata missing on the Stripe sub | Re-deploy `create-checkout`; existing subs created externally won't have it |
| Gate stays locked after Checkout | Realtime not enabled on `public.subscriptions` | Re-run migration step 0002; check Database → Replication |
| `create-portal-session` 404 | No subscription exists yet | User must complete Checkout first |

---

## Native webhook fallback (S3)

Stripe Sync Engine is the primary subscription mirror, but we also run our
own minimal handler `stripe-webhook-fra` for defense in depth:

1. Verifies the Stripe signature (`STRIPE_WEBHOOK_SECRET`).
2. Upserts `public.subscriptions` directly for `customer.subscription.*` events.
3. On failure, parks the event in `public.fra_webhook_dlq` with
   `next_attempt_at` and exponential backoff metadata.
4. Always returns `200` to Stripe — the DLQ owns retries from then on.

## Hourly Stripe reconciliation (S3)

`reconcile-subscriptions` runs every hour via `pg_cron`:

- Drains `public.fra_webhook_dlq` (≤8 retries, exponential backoff capped at 1 h).
- Walks every `stripe_customer_id` in `public.profiles` and asks Stripe for
  the latest subscription state, correcting drift in `public.subscriptions`.

This guarantees Layer 7 (subscription gating) eventually converges even if a
webhook is permanently lost.
