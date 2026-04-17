# Funding Rate Arbitrage — Supabase SaaS

A standalone wrapper that turns `@vireson/funding-rate-arb` into a multi-tenant cloud
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
│  │  • fra_state        │◀──▶│  Triggered by pg_cron           │  │
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
├── package.json                       ← consumes @vireson/funding-rate-arb
├── tsconfig.json
├── .env.example
├── client/
│   ├── supabase-state-store.ts        ← StateStore adapter
│   ├── use-supabase-fra.tsx           ← React hook wiring auth + store
│   └── ExampleApp.tsx                 ← drop-in client example
├── edge-functions/
│   └── fra-engine/
│       └── index.ts                   ← server-side engine tick
├── migrations/
│   └── 0001_init.sql                  ← tables, RLS, realtime, cron
└── docs/
    ├── DEPLOYMENT.md                  ← step-by-step deploy guide
    └── ARCHITECTURE.md                ← design decisions & trade-offs
```

## Quick start

1. **Install** — `cd supabase-saas && npm install`
2. **Link Supabase project** — `supabase link --project-ref <ref>`
3. **Apply schema** — `supabase db push migrations/0001_init.sql`
4. **Deploy engine** — `supabase functions deploy fra-engine`
5. **Set vault secrets** — see [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md)
6. **Drop the client component into your app** — see [`client/ExampleApp.tsx`](./client/ExampleApp.tsx)

## Design constraint

The `funding-rate-arb` package remains project-agnostic. **All Supabase-specific
code lives in this folder.** The store adapter implements the public `StateStore`
interface exported from the component; no internal APIs are touched.
