# Funding Rate Arbitrage — Supabase SaaS

A standalone wrapper that turns `@jpytrader/fundrates-arb` into a multi-tenant cloud
service backed by Supabase. The component itself is **never modified** — this folder
only consumes it as a dependency and supplies an external `SupabaseStateStore`
adapter plus a server-side engine runner.

```
┌──────────────────────────────────────────────────────────────────┐
│                         Ionic / Web Client                       │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  <FundingRateArb persistenceStore={supabaseStore} />       │  │
│  │     ▲                                                      │  │
│  │     │ realtime subscribe                                   │  │
│  └─────┼──────────────────────────────────────────────────────┘  │
│        │                                                         │
└────────┼─────────────────────────────────────────────────────────┘
         │  Supabase JS  (RLS-scoped to auth.uid())
         ▼
┌──────────────────────────────────────────────────────────────────┐
│                          Supabase                                │
│  ┌─────────────────────┐    ┌─────────────────────────────────┐  │
│  │  Postgres + RLS     │    │  Edge Function: fra-engine      │  │
│  │  • fra_state        │◀──▶│ Triggered by pg_cron           │  │
│  │  • fra_positions    │    │  Loads state → runs scan tick → │  │
│  │  • fra_pnl_history  │    │  saves state                    │  │
│  │  • fra_events       │    │  Secrets in Supabase Vault      │  │
│  └─────────────────────┘    └─────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

## Folder layout

```
supabase-saas/
├── README.md                          ← you are here
├── package.json                       ← consumes @jpytrader/fundrates-arb
├── tsconfig.json
├── .env.example
├── client/
│   ├── supabase-state-store.ts        ← StateStore adapter (PersistedState ↔ fra_state)
│   ├── use-supabase-fra.tsx           ← Hook: auth + realtime + mandatory sub gate
│   ├── use-subscription.tsx           ← Hook: reads public.subscriptions + realtime
│   ├── SubscriptionGate.tsx           ← Mandatory wrapper around <FundingRateArb />
│   └── index.tsx                      ← Drop-in client fronttend
├── edge-functions/
│   ├── fra-engine/
│   │   └── index.ts                   ← Server-side engine tick (pg_cron driven)
│   ├── create-checkout/
│   │   └── index.ts                   ← Stripe Checkout session (auth via getUser)
│   └── create-portal-session/
│       └── index.ts                   ← Stripe Customer Portal session
├── migrations/
│   ├── 0001_init.sql                  ← FRA tables, RLS, realtime, cron scaffolding
│   └── 0002_subscriptions.sql         ← public.subscriptions + Stripe Sync trigger
└── docs/
    ├── DEPLOYMENT.md                  ← Step-by-step deploy of FRA tables + engine
    ├── BILLING.md                     ← Stripe Sync Engine + subscription gate setup
    ├── ARCHITECTURE.md                ← Design decisions, billing sequence diagram, vault rotation v2
    └── TENANT_ISOLATION.md            ← 7-layer isolation model with test cases
```

> A condensed, single-page deploy walk-through aimed at first-time users lives in
> [`../fundrates-arb/E2E_BILLING.md`](../fundrates-arb/E2E_BILLING.md).

## Quick start

1. **Install** — `cd supabase-saas && npm install`
2. **Link Supabase project** — `supabase link --project-ref <ref>`
3. **Apply operational schema** — `supabase db push migrations/0001_init.sql`
4. **Apply billing schema** — `supabase db push migrations/0002_subscriptions.sql` (after installing the Stripe Sync Engine — see [`docs/BILLING.md`](./docs/BILLING.md))
5. **Deploy functions** — `supabase functions deploy fra-engine create-checkout create-portal-session`
6. **Set secrets** — see [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md) and [`docs/BILLING.md`](./docs/BILLING.md)
7. **Drop the client component into your app** — see [`client/FundratesArb.tsx`](./client/FundratesArb.tsx)

## Billing (Mandatory)

Every signed-in user must hold an **active or trialing Stripe subscription**
to access `<FundingRateArb />`. The gate is enforced two ways:

1. **`<SubscriptionGate />`** wraps the dashboard, shows a CTA, and
   auto-redirects to Stripe Checkout when no active subscription exists.
2. **`useSupabaseFra()`** internally calls `useSubscription()` and only hands
   out a non-null `store` once `isActive === true` — so even if a developer
   forgets to mount the gate, the engine cannot persist or load state.

The Stripe **Sync Engine** mirrors `stripe.subscriptions` into
`public.subscriptions` via the `sync_stripe_to_public()` trigger. Realtime
keeps the client gate in sync within ~1s of any Stripe webhook. Full setup
in [`docs/BILLING.md`](./docs/BILLING.md).

## Design constraint

The `fundrates-arb` package remains project-agnostic. **All Supabase-specific
code lives in this folder.** The store adapter implements the public `StateStore`
interface exported from the component; no internal APIs are touched.
