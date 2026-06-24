# @jpytrader/fundrates-arb

A self-contained, project-agnostic React component for **delta-neutral funding rate arbitrage** on **Hyperliquid** or **OKX**. Drop it into any React app — no backend required.

---

## Table of Contents

- [Install](#install)
- [Quick Start](#quick-start)
- [How It Works](#how-it-works)
- [Component API](#component-api)
- [Hooks](#hooks)
  - [useArbEngine](#usearbengine)
  - [useFundingRates](#usefundingrates)
- [Engine Class](#engine-class)
- [Exported Types](#exported-types)
- [Persistence Layer](#persistence-layer)
- [WebSocket Classes](#websocket-classes)
- [Configuration Controls](#configuration-controls)
- [Theming](#theming)
- [Integration Examples](#integration-examples)
- [Build](#build)
- [Project Structure](#project-structure)
- [License](#license)

---

## Install

```bash
npm install @jpytrader/funding-rate-arb
# or
yarn add @jpytrader/fundrates-arb
```

**Peer dependencies:** `react >=17.0.0`, `react-dom >=17.0.0`

---

## Quick Start

```tsx
import { FundingRateArb } from '@jpytrader/fundrates-arb';

function App() {
  return (
    <FundingRateArb
      exchangeKeys={{
        hyperliquid: { apiKey: '0x...', apiSecret: '' },
      }}
      onExecution={(event) => console.log(event)}
      onError={(err) => console.error(err)}
      theme="dark"
      defaultConfig={{
        targetExchange: 'hyperliquid',
        pairs: ['BTC/USDT', 'ETH/USDT'],
      }}
    />
  );
}
```

That's it. The component renders a full status panel, P&L chart, and settings modal — no routing or backend wiring needed.

---

## How It Works

1. **Select exchange** — Toggle between Hyperliquid and OKX. All execution happens on the single selected exchange.
2. **Configure** — Set trading pairs, min funding rate threshold, position size, max hold time, and risk controls.
3. **Engine scans** — Polls funding rates every 60 seconds. When a rate exceeds the threshold, it opens a delta-neutral position: **buy spot + sell perp** on the same exchange.
4. **Monitor & Exit** — Tracks P&L via real-time mark prices, collects funding payments, and exits on: funding flip, slippage control hit, max hold time, or manual close.

---

## Component API

### `<FundingRateArb />`

The top-level drop-in component.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `exchangeKeys` | `ExchangeKeys` | No | `{}` | API keys for Hyperliquid and/or OKX. If omitted, the built-in KeysPanel UI lets users enter keys at runtime. |
| `onExecution` | `(event: ExecutionEvent) => void` | No | — | Callback fired on every engine event (open, close, funding, rebalance, error, snapshot). |
| `onError` | `(err: Error) => void` | No | — | Callback for errors. |
| `theme` | `'light' \| 'dark'` | No | `'dark'` | Color theme. Uses CSS custom properties (`--fra-*`). |
| `defaultConfig` | `Partial<ArbConfig>` | No | `DEFAULT_CONFIG` | Override any default configuration value. |

---

## Hooks

### `useArbEngine`

Full engine lifecycle hook. Creates the adapter, engine, and manages state.

```ts
import { useArbEngine } from '@jpytrader/fundrates-arb';

const { config, state, pnlHistory, updateConfig, start, stop, adapter } = useArbEngine(
  exchangeKeys,   // ExchangeKeys
  initialConfig?,  // Partial<ArbConfig>
  onExecution?,    // (e: ExecutionEvent) => void
  onError?,        // (err: Error) => void
);
```

**Returns:**

| Field | Type | Description |
|-------|------|-------------|
| `config` | `ArbConfig` | Current merged configuration. |
| `state` | `EngineState` | Live engine state (phase, positions, rates, P&L). |
| `pnlHistory` | `PnlSnapshot[]` | Historical P&L snapshots for charting. |
| `updateConfig` | `(partial: Partial<ArbConfig>) => void` | Merge partial config updates. |
| `start` | `() => void` | Enable and start the engine. |
| `stop` | `() => void` | Stop the engine and disable. |
| `adapter` | `ExchangeAdapter \| null` | The active exchange adapter (or null if no keys). |

---

### `useFundingRates`

Standalone hook for streaming funding rates via WebSocket with REST polling fallback.

```ts
import { useFundingRates } from '@jpytrader/fundrates-arb';

const { rates, loading, error, wsConnected, refetch } = useFundingRates(
  adapter,    // ExchangeAdapter | null
  pairs,      // string[]
  enabled,    // boolean
  exchange?,  // ExchangeId (default: 'hyperliquid')
);
```

**Returns:**

| Field | Type | Description |
|-------|------|-------------|
| `rates` | `FundingRate[]` | Current funding rates for subscribed pairs. |
| `loading` | `boolean` | True during REST fetch. |
| `error` | `string \| null` | Last error message. |
| `wsConnected` | `boolean` | Whether the WebSocket is connected. |
| `refetch` | `() => Promise<void>` | Manually trigger a REST fetch. |

---

## Engine Class

### `ArbEngine`

The core arbitrage engine. Used internally by `useArbEngine` but can be instantiated directly for non-React contexts.

```ts
import { ArbEngine } from '@jpytrader/fundrates-arb/engine/core';

const engine = new ArbEngine(config, adapter, store?, opts?);
```

**Constructor:**

| Param | Type | Description |
|-------|------|-------------|
| `config` | `ArbConfig` | Full configuration object. |
| `adapter` | `ExchangeAdapter` | Exchange adapter (Hyperliquid or OKX). |
| `store` | `StateStore` | Optional persistence backend for crash recovery. |
| `opts.manualTick` | `boolean` | When `true`, `start()` restores state but does NOT spin up an internal `setInterval`. The caller drives ticks via `tick()`. Used by Capacitor `BackgroundRunner` and the SaaS edge-function (`supabase-saas/edge-functions/fra-engine`). |

**Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `start()` | `async start(): Promise<void>` | Restore persisted state and begin scanning (timer or manual depending on `manualTick`). |
| `tick()` | `async tick(): Promise<void>` | Run exactly one scan/exec/accrual cycle. Required entry point in `manualTick: true` mode. |
| `stop()` | `stop(): void` | Stop scanning, persist state, set phase to idle. |
| `teardown()` | `teardown(): void` | Release timers without mutating phase or persisting (used when replacing the instance). |
| `updateConfig()` | `updateConfig(next: Partial<ArbConfig>): void` | Hot-update configuration. |
| `subscribe()` | `subscribe(fn: (s: EngineState) => void): () => void` | Subscribe to state changes. Returns unsubscribe function. |
| `onExecution()` | `onExecution(fn: (e: ExecutionEvent) => void): () => void` | Subscribe to execution events. Returns unsubscribe function. |
| `getPnlHistory()` | `getPnlHistory(): PnlSnapshot[]` | Get the current P&L snapshot history. |

> **Headless usage:** `ArbEngine` has no DOM/React dependency. It is consumed
> as-is by the SaaS edge-function and the Capacitor background runner — there
> is exactly **one** engine implementation across browser, mobile, and server.

**ExchangeAdapter.validateKeys()** — every adapter (Hyperliquid + OKX, live
and dry-run) implements `validateKeys(): Promise<{ ok: true } | { ok: false; reason: string }>`.
It performs a signed read against the exchange (Hyperliquid: `clearinghouseState`;
OKX: `GET /api/v5/account/config`) and never throws. Used by the `KeysPanel`
"Test connection" button and by the SaaS `rotate-exchange-key` edge-function
to reject bad credentials before they reach Vault.

**Scan loop (60s interval):**
1. Fetch funding rates via `adapter.getFundingRates()`
2. Check daily loss limit
3. For each pair above `minFundingRatePct` → open delta-neutral position (spot buy + perp sell)
4. For each open position → check exit conditions (max hold, funding flip, slippage)
5. Fetch mark prices → compute unrealized P&L → emit `pnl_snapshot` event
6. Persist state (debounced at 5s)

---

## Exported Types

All types are importable from the package root:

```ts
import type {
  FundingRateArbProps,
  ArbConfig,
  ArbPosition,
  EngineState,
  ExecutionEvent,
  ExchangeKeys,
  ExchangeId,
  SupportedPair,
  FundingRate,
  ExchangeAdapter,
  MarkPrice,
  OrderParams,
  OrderResult,
  Position,
} from '@jpytrader/fundrates-arb';
```

### `ExchangeId`

```ts
type ExchangeId = 'hyperliquid' | 'okx';
```

### `ExchangeKeys`

```ts
interface ExchangeKeys {
  hyperliquid?: { apiKey: string; apiSecret: string };
  okx?: { apiKey: string; apiSecret: string; passphrase: string };
}
```

### `SupportedPair`

```ts
const SUPPORTED_PAIRS = ['BTC/USDT', 'ETH/USDT', 'OP/USDT', 'SOL/USDT', 'XRP/USDT', 'HYPE/USDT'] as const;
type SupportedPair = (typeof SUPPORTED_PAIRS)[number];
```

### `ArbConfig`

```ts
interface ArbConfig {
  enabled: boolean;
  dryRun: boolean;
  targetExchange: ExchangeId;
  pairs: SupportedPair[];
  minFundingRatePct: number;     // 0.01 – 0.500
  positionSizeUsd: number;       // 1,000 – 100,000
  maxHoldDays: number;           // 90 – 1,095 (step 90)
  slippageControlPct: number;    // 1 – 20
  capitalAllocationPct: number;  // 20 – 100
  rebalanceDays: number;         // 0 = off, valid: 7, 14, 30, 60, 90
  maxDailyLossUsd: number;       // 500 – 50,000
}
```

### `DEFAULT_CONFIG`

```ts
const DEFAULT_CONFIG: ArbConfig = {
  enabled: false,
  dryRun: true,
  targetExchange: 'hyperliquid',
  pairs: ['BTC/USDT', 'ETH/USDT'],
  minFundingRatePct: 0.01,
  positionSizeUsd: 10_000,
  maxHoldDays: 180,
  slippageControlPct: 5,
  capitalAllocationPct: 50,
  rebalanceDays: 0,           // Off by default (margin modes default to enabled)
  maxDailyLossUsd: 5_000,
};
```

> **Rebalance auto-enable:** When Portfolio Margin (Hyperliquid) or Unified Account (OKX) is disabled, `rebalanceDays` automatically sets to 7. When the margin mode is re-enabled, it resets to 0 (off). The user can manually adjust the slider (7/14/30/60/90) when margin mode is off.

### `FundingRate`

```ts
interface FundingRate {
  pair: string;
  rate: number;             // decimal, e.g. 0.0001 = 0.01%
  nextFundingTime: number;  // epoch ms
}
```

### `MarkPrice`

```ts
interface MarkPrice {
  pair: string;
  spotPrice: number;
  perpPrice: number;
  timestamp: number;
}
```

### `OrderParams`

```ts
interface OrderParams {
  pair: string;
  side: 'buy' | 'sell';
  sizeUsd: number;
  reduceOnly?: boolean;
  orderType?: 'market' | 'limit';
  limitPrice?: number;
}
```

### `OrderResult`

```ts
interface OrderResult {
  orderId: string;
  filledSize: number;
  avgPrice: number;
  status: 'filled' | 'partial' | 'rejected';
}
```

### `Position`

```ts
interface Position {
  pair: string;
  side: 'long' | 'short';
  size: number;
  entryPrice: number;
  markPrice: number;
  unrealizedPnl: number;
  instrument: 'spot' | 'perp';
}
```

### `ArbPosition`

```ts
interface ArbPosition {
  id: string;
  pair: SupportedPair;
  exchange: ExchangeId;
  spotOrderId: string;
  perpOrderId: string;
  spotEntry: number;
  perpEntry: number;
  sizeUsd: number;
  openedAt: number;
  fundingCollected: number;
  unrealizedPnl: number;
  status: 'open' | 'closing' | 'closed';
}
```

### `EngineState`

```ts
type EnginePhase = 'idle' | 'scanning' | 'executing' | 'monitoring' | 'exiting' | 'error';

interface EngineState {
  phase: EnginePhase;
  positions: ArbPosition[];
  fundingRates: FundingRate[];
  dailyPnl: number;
  totalFundingCollected: number;
  totalRealizedPnl: number;
  lastScanAt: number | null;
  errors: string[];
}
```

### `ExecutionEvent`

```ts
interface ExecutionEvent {
  type: 'position_opened' | 'position_closed' | 'funding_collected' | 'rebalance' | 'error' | 'pnl_snapshot';
  timestamp: number;
  data: Record<string, unknown>;
}
```

### `ExchangeAdapter`

The interface any exchange integration must implement:

```ts
interface ExchangeAdapter {
  getFundingRates(pairs: string[]): Promise<FundingRate[]>;
  placeSpotOrder(params: OrderParams): Promise<OrderResult>;
  placePerpOrder(params: OrderParams): Promise<OrderResult>;
  getPositions(): Promise<Position[]>;
  cancelOrder(orderId: string): Promise<void>;
  getMarkPrices(pairs: string[]): Promise<MarkPrice[]>;
}
```

---

## Persistence Layer

All persistence types are importable:

```ts
import type { StateStore, PersistedState, PnlSnapshot } from '@jpytrader/fundrates-arb';
import { PERSISTENCE_VERSION, DEFAULT_STORAGE_KEY, MAX_PNL_SNAPSHOTS } from '@jpytrader/fundrates-arb';
```

### `StateStore` interface

```ts
interface StateStore {
  save(state: PersistedState): Promise<void>;
  load(): Promise<PersistedState | null>;
  clear(): Promise<void>;
}
```

### `PersistedState`

```ts
interface PersistedState {
  version: number;
  savedAt: number;
  phase: EnginePhase;
  positions: ArbPosition[];
  dailyPnl: number;
  totalFundingCollected: number;
  config: ArbConfig;
  pnlHistory: PnlSnapshot[];
}
```

### `PnlSnapshot`

```ts
interface PnlSnapshot {
  timestamp: number;
  totalUnrealizedPnl: number;
  totalRealizedPnl: number;
  totalFundingCollected: number;
  netPnl: number;
  openPositionCount: number;
  positionMarks: Array<{
    positionId: string;
    pair: string;
    spotMarkPrice: number;
    perpMarkPrice: number;
    unrealizedPnl: number;
  }>;
}
```

### Built-in Store Implementations

| Store | Import | Environment | Description |
|-------|--------|-------------|-------------|
| `LocalStorageStore` | `@jpytrader/fundrates-arb` | Browser | Uses `localStorage`. Default key: `vireson_arb_state`. |
| `MemoryStore` | `@jpytrader/fundrates-arb` | Any | In-memory, no persistence across restarts. Good for testing. |
| `FileSystemStore` | `@jpytrader/fundrates-arb` | Node.js / Generic | Accepts `readFile`/`writeFile`/`deleteFile` callbacks. Has a `.node()` static factory for Node.js `fs/promises`. |
| `CapacitorFilesystemStore` | `@jpytrader/fundrates-arb/persistence/capacitor-filesystem-store` | Capacitor (iOS/Android) | Extends `FileSystemStore` with `@capacitor/filesystem`. Stores state in the app's Documents directory. Requires `@capacitor/filesystem` as a peer dependency. |

**Example — Browser localStorage (default):**

```ts
import { LocalStorageStore } from '@jpytrader/fundrates-arb';

const store = new LocalStorageStore('my-custom-key');
const engine = new ArbEngine(config, adapter, store);
```

**Example — Node.js file persistence:**

```ts
import { FileSystemStore } from '@jpytrader/fundrates-arb';

const store = FileSystemStore.node('/data/arb-state.json');
const engine = new ArbEngine(config, adapter, store);
```

**Example — Capacitor native mobile (iOS/Android):**

```ts
import { CapacitorFilesystemStore } from '@jpytrader/fundrates-arb/persistence/capacitor-filesystem-store';

// Stores JSON state in the app's Documents directory via @capacitor/filesystem
const store = new CapacitorFilesystemStore('arb-state.json');
const engine = new ArbEngine(config, adapter, store);
```

> **Note:** `@capacitor/filesystem` is an optional peer dependency. It is lazy-loaded at runtime so non-Capacitor environments won't encounter import errors.

**Example — Custom storage backend:**

Implement the `StateStore` interface to target any storage system (e.g., IndexedDB, SQLite, cloud storage):

```ts
import type { StateStore, PersistedState } from '@jpytrader/fundrates-arb';

class MyCustomStore implements StateStore {
  async save(state: PersistedState): Promise<void> { /* write to your backend */ }
  async load(): Promise<PersistedState | null> { /* read from your backend */ }
  async clear(): Promise<void> { /* delete from your backend */ }
}

const store = new MyCustomStore();
const engine = new ArbEngine(config, adapter, store);
```

### Constants

| Constant | Value | Description |
|----------|-------|-------------|
| `PERSISTENCE_VERSION` | `2` | Persisted state schema version. Stale versions are discarded on load. |
| `DEFAULT_STORAGE_KEY` | `'vireson_arb_state'` | Default localStorage key. |
| `MAX_PNL_SNAPSHOTS` | `1440` | Max snapshots retained (24h at 1-min intervals). |

---

## WebSocket Classes

Exported from `useArbEngine` for direct usage:

```ts
import { HyperliquidWebSocket, OKXWebSocket } from '@jpytrader/fundrates-arb';
```

Both classes share the same callback interface:

```ts
const callbacks = {
  onFundingRate: (pair: string, rate: number, nextFundingTime: number) => void,
  onConnect: () => void,
  onDisconnect: () => void,
  onError: (err: Error) => void,
};
```

**Methods:** `connect()`, `disconnect()`, `subscribeToFundingRates(pairs: string[])`

---

## Configuration Controls

| Setting | Control | Range |
|---------|---------|-------|
| Enabled | Toggle | on/off |
| Dry Run | Toggle | on/off |
| Target Exchange | Toggle | Hyperliquid ↔ OKX |
| Trading Pairs | Checkbox group | BTC, ETH, OP, SOL, XRP, HYPE |
| Min Funding Rate | Slider | 0.01% – 0.500% |
| Position Size USD | Slider | $1K – $100K |
| Max Hold Time | Slider | 90d – 1,095d (step 90d) |
| Slippage Control | Slider | 1% – 20% |
| Capital Allocation | Slider | 20% – 100% |
| Rebalance Weekly | Toggle | on/off |
| Max Daily Loss | Slider | $500 – $50K |

---

## Theming

Pass `theme="dark"` or `theme="light"`. Override any CSS custom property:

```css
.my-container {
  --fra-bg: #0a0a0a;
  --fra-card: #141414;
  --fra-border: #2a2a2a;
  --fra-heading: #f9fafb;
  --fra-text: #d1d5db;
  --fra-muted: #9ca3af;
  --fra-accent: #8b5cf6;
  --fra-track: #374151;
  --fra-thumb: #ffffff;
}
```

---

## Integration Examples

### Minimal — Drop-in with built-in key management

```tsx
import { FundingRateArb } from '@jpytrader/fundrates-arb';

// No keys passed → component shows built-in KeysPanel for user input
export default function TradingPage() {
  return <FundingRateArb theme="dark" />;
}
```

### With pre-configured keys

```tsx
import { FundingRateArb } from '@jpytrader/fundrates-arb';

export default function TradingPage() {
  return (
    <FundingRateArb
      exchangeKeys={{
        okx: {
          apiKey: process.env.OKX_API_KEY!,
          apiSecret: process.env.OKX_API_SECRET!,
          passphrase: process.env.OKX_PASSPHRASE!,
        },
      }}
      defaultConfig={{
        targetExchange: 'okx',
        dryRun: false,
        pairs: ['BTC/USDT', 'ETH/USDT', 'SOL/USDT'],
        positionSizeUsd: 25_000,
      }}
      onExecution={(event) => {
        if (event.type === 'position_opened') {
          notifySlack(`New position: ${JSON.stringify(event.data)}`);
        }
      }}
      onError={(err) => Sentry.captureException(err)}
    />
  );
}
```

### Headless — Hook only, custom UI

```tsx
import { useArbEngine, useFundingRates } from '@jpytrader/fundrates-arb';
import type { ExchangeKeys } from '@jpytrader/fundrates-arb';

function CustomDashboard({ keys }: { keys: ExchangeKeys }) {
  const { config, state, pnlHistory, start, stop, adapter } = useArbEngine(keys, {
    targetExchange: 'hyperliquid',
    pairs: ['BTC/USDT'],
  });

  const { rates, wsConnected } = useFundingRates(
    adapter,
    config.pairs,
    config.enabled,
    config.targetExchange,
  );

  return (
    <div>
      <p>Phase: {state.phase}</p>
      <p>WS: {wsConnected ? '🟢' : '🔴'}</p>
      <p>Positions: {state.positions.length}</p>
      <p>Daily P&L: ${state.dailyPnl.toFixed(2)}</p>
      <p>Total Funding: ${state.totalFundingCollected.toFixed(2)}</p>
      <button onClick={config.enabled ? stop : start}>
        {config.enabled ? 'Stop' : 'Start'}
      </button>
      <ul>
        {rates.map((r) => (
          <li key={r.pair}>{r.pair}: {(r.rate * 100).toFixed(4)}%</li>
        ))}
      </ul>
    </div>
  );
}
```

### Server-side / Node.js — Engine without React

```ts
import { ArbEngine } from '@jpytrader/fundrates-arb/engine/core';
import { createHyperliquidAdapter } from '@jpytrader/fundrates-arb/exchanges/hyperliquid';
import { FileSystemStore } from '@jpytrader/fundrates-arb';
import { DEFAULT_CONFIG } from '@jpytrader/fundrates-arb';

const adapter = createHyperliquidAdapter({ apiKey: '0x...', apiSecret: '' });
const store = await FileSystemStore.fromNodeFS('./arb-state.json');

const engine = new ArbEngine(
  { ...DEFAULT_CONFIG, enabled: true, dryRun: false, pairs: ['BTC/USDT'] },
  adapter,
  store,
);

engine.onExecution((event) => console.log('[ARB]', event.type, event.data));
engine.subscribe((state) => console.log('[STATE]', state.phase, state.positions.length));

await engine.start();

// Graceful shutdown
process.on('SIGINT', () => { engine.stop(); process.exit(0); });
```

### Multi-tenant SaaS — Supabase persistence + mandatory subscription gate

For deployments that need per-user state, server-side liveness, and Stripe-gated access, use the sibling **`@vireson/supabase-saas`** package. It supplies:

- `SupabaseStateStore` — implements the public `StateStore` interface and persists each user's `PersistedState` JSONB to a row in `public.fra_state`, RLS-scoped to `auth.uid()`.
- `useSupabaseFra(supabase)` — wires auth, realtime, and the **mandatory** `useSubscription()` check into a single hook. The returned `store` is `null` until the user is signed in **and** holds an `active`/`trialing` subscription in `public.subscriptions`.
- `<SubscriptionGate priceId>` — drop-in wrapper that auto-redirects to Stripe Checkout when no active subscription exists; unlocks within ~1s of the Stripe Sync Engine writing a row.

```tsx
import { FundingRateArb } from '@jpytrader/fundrates-arb';
import { useSupabaseFra, SubscriptionGate } from '@vireson/supabase-saas';

const { store, userId, revision, subscription } = useSupabaseFra(supabase);

return (
  <SubscriptionGate supabase={supabase} userId={userId} priceId={import.meta.env.VITE_STRIPE_PRICE_ID}>
    {store && (
      <FundingRateArb
        key={revision}                /* remount when server tick writes state */
        persistenceStore={store}      /* SupabaseStateStore implements StateStore */
        exchangeKeys={{}}             /* SaaS reads keys from Vault server-side */
        defaultConfig={{ dryRun: true }}
      />
    )}
  </SubscriptionGate>
);
```

> The `funding-rate-arb` package itself never imports `@supabase/supabase-js` — its [isolation constraint](https://github.com/) is preserved by injecting Supabase wiring exclusively through the public `persistenceStore` prop. End-to-end deploy guide: [`funding-rate-arb/E2E_BILLING.md`](./E2E_BILLING.md).

---

## Build

```bash
cd funding-rate-arb
npm install
npm run build        # Outputs ESM + CJS bundles in dist/
npm run typecheck    # Type checking only (no emit)
```

**Output:**
- `dist/esm/index.js` — ES Module bundle
- `dist/cjs/index.js` — CommonJS bundle
- `dist/types/index.d.ts` — TypeScript declarations

**Build tool:** Webpack 5 with `ts-loader` and `MiniCssExtractPlugin`.

---

## Project Structure

```
funding-rate-arb/
├── package.json                 # Package manifest, scripts, dependencies
├── tsconfig.json                # TypeScript configuration
├── webpack.config.ts            # Dual ESM/CJS build config
├── README.md                    # This file
└── src/
    ├── index.ts                 # Barrel export (all public API)
    ├── types.ts                 # All type definitions and constants
    │
    ├── components/
    │   ├── FundingRateArb.tsx    # Top-level drop-in component
    │   ├── ConfigPanel.tsx       # Settings modal content
    │   ├── StatusPanel.tsx       # Live status display
    │   ├── PnlChart.tsx          # SVG P&L chart with tooltips
    │   ├── KeysPanel.tsx         # API key input/management UI
    │   └── controls/
    │       ├── Checkbox.tsx      # Styled checkbox
    │       ├── Slider.tsx        # Range slider
    │       └── Toggle.tsx        # Toggle switch
    │
    ├── engine/
    │   ├── core.ts              # ArbEngine class (scan loop, P&L, persistence)
    │   └── position.ts          # Position creation and exit-condition logic
    │
    ├── exchanges/
    │   ├── hyperliquid.ts       # Hyperliquid adapter + WebSocket (EIP-712 signing)
    │   └── okx.ts               # OKX adapter + WebSocket (HMAC-SHA256 signing)
    │
    ├── hooks/
    │   ├── useArbEngine.ts      # React hook wrapping ArbEngine lifecycle
    │   └── useFundingRates.ts   # WebSocket + REST polling hook
    │
    └── persistence/
        ├── types.ts             # StateStore interface, PnlSnapshot, PersistedState
        ├── local-storage-store.ts
        ├── memory-store.ts
        ├── file-system-store.ts
        └── capacitor-filesystem-store.ts
```

---

## License

MIT
