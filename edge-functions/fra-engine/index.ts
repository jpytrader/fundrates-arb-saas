// supabase/functions/fra-engine/index.ts
//
// Server-side engine tick. Triggered by pg_cron on a fixed interval (default 60s).
// For every user with `is_running = true` AND an active/trialing subscription,
// loads their state, runs ONE scan/exec tick via the *real* ArbEngine, and writes
// state back. Exchange keys are read from Supabase Vault.
//
// ─── Why we now import ArbEngine directly ───────────────────────────────────
// Earlier revisions of this file re-implemented a minimal time-prorated
// funding-accrual loop to avoid pulling the React/DOM-heavy component into a
// Deno isolate. That stub drifted from the canonical engine semantics
// (Z-score gating, exit checks, reconciliation, execution-cost tracking, …)
// and violated the project rule that "Live and Paper modes must execute
// identical sequential logic" — the server tick is "Paper-on-server".
//
// `ArbEngine`, the exchange adapter factories, and `MemoryStore` are exported
// from `@vireson/funding-rate-arb` (F1). None of them touch `window`,
// `document`, `localStorage`, or React — they're plain TypeScript classes,
// safe to run in Deno. The component remains 100% self-contained: this file
// is a *consumer*, not a fork.
//
// ─── Subscription enforcement (Layer 7 of TENANT_ISOLATION.md) ─────────────
// Every tick, we intersect the running tenants with the set of users whose
// public.subscriptions row is in {'active','trialing'}. The set is cached
// in-memory for SUB_CACHE_TTL_MS (~45s) to avoid hammering the DB. On query
// failure we fail closed (reuse last cache or empty), so canceled users
// never receive ticks.

import { createClient } from 'jsr:@supabase/supabase-js@2';
import {
  ArbEngine,
  MemoryStore,
  DEFAULT_CONFIG,
  createHyperliquidAdapter,
  createDryRunHyperliquidAdapter,
  createOKXAdapter,
  createDryRunOKXAdapter,
  type ArbConfig,
  type ExchangeAdapter,
  type PersistedState,
} from 'npm:@vireson/funding-rate-arb@^0.1.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, content-type, x-cron-secret',
};

interface PersistedStateRow {
  user_id: string;
  state: Record<string, unknown>;
  is_running: boolean;
}

// ---------------------------------------------------------------------------
// Subscription cache — module-scoped so it survives across invocations within
// the same warm Deno isolate. Cold starts simply rebuild it on first tick.
// ---------------------------------------------------------------------------
const SUB_CACHE_TTL_MS = 45_000; // 30–60s positive cache window
let subCache: { fetchedAt: number; ids: Set<string> } | null = null;

async function getActiveSubscriberIds(
  supabase: ReturnType<typeof createClient>,
): Promise<{ ids: Set<string>; ageMs: number; cold: boolean }> {
  const now = Date.now();
  if (subCache && now - subCache.fetchedAt < SUB_CACHE_TTL_MS) {
    return { ids: subCache.ids, ageMs: now - subCache.fetchedAt, cold: false };
  }
  const { data, error } = await supabase
    .from('subscriptions')
    .select('user_id')
    .in('status', ['active', 'trialing']);
  if (error) {
    console.error('[fra-engine] subscription lookup failed:', error.message);
    // Fail closed: reuse stale cache if any, else empty set.
    const fallback = subCache?.ids ?? new Set<string>();
    return { ids: fallback, ageMs: subCache ? now - subCache.fetchedAt : -1, cold: true };
  }
  const ids = new Set<string>(((data ?? []) as Array<{ user_id: string }>).map((r) => r.user_id));
  subCache = { fetchedAt: now, ids };
  return { ids, ageMs: 0, cold: true };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  // Auth: cron secret
  const cronSecret = req.headers.get('x-cron-secret');
  if (cronSecret !== Deno.env.get('FRA_CRON_SECRET')) {
    return new Response(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  // Fetch all running tenants
  const { data: rows, error } = await supabase
    .from('fra_state')
    .select('user_id, state, is_running')
    .eq('is_running', true);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Layer 7 enforcement: intersect with active subscribers.
  const { ids: activeIds, ageMs: cacheAgeMs, cold } = await getActiveSubscriberIds(supabase);
  const allRows = (rows ?? []) as PersistedStateRow[];
  const eligible = allRows.filter((r) => activeIds.has(r.user_id));
  const skipped = allRows.length - eligible.length;

  const results: Array<{ userId: string; ok: boolean; error?: string }> = [];
  for (const row of eligible) {
    try {
      await tickUser(supabase, row);
      results.push({ userId: row.user_id, ok: true });
    } catch (err) {
      results.push({
        userId: row.user_id,
        ok: false,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  return new Response(
    JSON.stringify({
      tenants: results.length,
      skipped,
      cacheAgeMs,
      cacheRefreshed: cold,
      activeSubscribers: activeIds.size,
      results,
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
  );
});

// ---------------------------------------------------------------------------
// Per-tenant tick — delegates to ArbEngine. No accrual logic lives here.
// ---------------------------------------------------------------------------

interface VaultKeyPayload {
  apiKey: string;
  apiSecret: string;
  walletPrivateKey?: string; // hyperliquid
  passphrase?: string;       // okx
  [k: string]: unknown;
}

async function loadAdapter(
  supabase: ReturnType<typeof createClient>,
  userId: string,
  config: ArbConfig,
): Promise<ExchangeAdapter> {
  // Look up the user's preferred exchange + vault payload. Fall back to a dry-run
  // adapter when keys are absent so paper-mode tenants still get their tick.
  const { data: keyRow } = await supabase
    .from('fra_user_exchanges')
    .select('exchange, vault_secret_name')
    .eq('user_id', userId)
    .maybeSingle();

  const exchange = (keyRow?.exchange as 'hyperliquid' | 'okx' | undefined) ?? 'hyperliquid';

  let payload: VaultKeyPayload | null = null;
  if (keyRow?.vault_secret_name) {
    const { data: secret } = await supabase
      .schema('vault')
      .from('decrypted_secrets')
      .select('decrypted_secret')
      .eq('name', keyRow.vault_secret_name)
      .maybeSingle();
    if (secret?.decrypted_secret) {
      try {
        payload = JSON.parse(secret.decrypted_secret as string) as VaultKeyPayload;
      } catch {
        payload = null;
      }
    }
  }

  if (!payload) {
    return exchange === 'okx'
      ? createDryRunOKXAdapter(config)
      : createDryRunHyperliquidAdapter(config);
  }

  if (exchange === 'okx') {
    return createOKXAdapter(
      {
        apiKey: payload.apiKey,
        apiSecret: payload.apiSecret,
        passphrase: payload.passphrase ?? '',
      },
      config,
    );
  }
  return createHyperliquidAdapter(
    {
      apiKey: payload.apiKey,
      apiSecret: payload.apiSecret,
      walletPrivateKey: payload.walletPrivateKey ?? payload.apiSecret,
    },
    config,
  );
}

/**
 * One real ArbEngine tick for a single tenant.
 *
 * Pipeline:
 *   1. Hydrate a MemoryStore from the row's `state` JSONB (canonical blob).
 *   2. Build the adapter (live or dry-run) from the user's vault row.
 *   3. `new ArbEngine(config, adapter, store, { manualTick: true })`.
 *   4. `await engine.start()` (restores state into the engine).
 *   5. `await engine.tick()` (one scan/exec/accrual cycle).
 *   6. Read MemoryStore back and UPDATE fra_state with the new blob.
 *   7. Forward execution events into fra_events.
 */
async function tickUser(
  supabase: ReturnType<typeof createClient>,
  row: PersistedStateRow,
): Promise<void> {
  const persisted = row.state as unknown as PersistedState;
  const config: ArbConfig = { ...DEFAULT_CONFIG, ...(persisted?.config ?? {}) };

  // (1) Hydrate store
  const store = new MemoryStore();
  await store.save(persisted);

  // (2) Adapter
  const adapter = await loadAdapter(supabase, row.user_id, config);

  // (3-4) Engine
  const engine = new ArbEngine(config, adapter, store, { manualTick: true });

  // Capture execution events for fra_events
  const events: Array<{ type: string; timestamp: number; data: unknown }> = [];
  engine.onExecution((e) => events.push(e));

  await engine.start();
  // (5) One cycle
  await engine.tick();
  // Release timers (manualTick mode never set them, but be defensive).
  engine.teardown();

  // (6) Persist updated blob
  const updated = await store.load();
  if (updated) {
    await supabase
      .from('fra_state')
      .update({
        state: updated as unknown as Record<string, unknown>,
        version: updated.version,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', row.user_id);
  }

  // (7) Mirror events
  if (events.length > 0) {
    await supabase.from('fra_events').insert(
      events.map((e) => ({
        user_id: row.user_id,
        type: e.type,
        timestamp: new Date(e.timestamp).toISOString(),
        data: { ...(e.data as Record<string, unknown>), source: 'server' },
      })),
    );
  }
}
