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
// from `@jpytrader/fundrates-arb` (F1). None of them touch `window`,
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
} from 'npm:@jpytrader/fundrates-arb@^0.1.0';
import { createLogger } from '../_shared/logger.ts';

const log = createLogger('fra-engine');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, content-type, x-cron-secret',
};

interface PersistedStateRow {
  user_id: string;
  state: Record<string, unknown>;
  is_running: boolean;
  version: number;
}

// ---------------------------------------------------------------------------
// Subscription cache (S5):
//   * Positive TTL  : 45 s — caps DB load at ≤80 lookups/hour per isolate.
//   * Negative TTL  : 5 s  — on DB error we fall back to the stale set, but
//                            only briefly so a transient blip doesn't pin
//                            stale data through a long window.
// ---------------------------------------------------------------------------
const SUB_CACHE_POSITIVE_TTL_MS = 45_000;
const SUB_CACHE_NEGATIVE_TTL_MS = 5_000;
let subCache: { fetchedAt: number; ids: Set<string>; healthy: boolean } | null = null;

async function getActiveSubscriberIds(
  supabase: ReturnType<typeof createClient>,
): Promise<{ ids: Set<string>; ageMs: number; cold: boolean }> {
  const now = Date.now();
  if (subCache) {
    const age = now - subCache.fetchedAt;
    const ttl = subCache.healthy ? SUB_CACHE_POSITIVE_TTL_MS : SUB_CACHE_NEGATIVE_TTL_MS;
    if (age < ttl) return { ids: subCache.ids, ageMs: age, cold: false };
  }
  const { data, error } = await supabase
    .from('subscriptions')
    .select('user_id')
    .in('status', ['active', 'trialing']);
  if (error) {
    log.error('subscription_lookup_failed', { error: error.message });
    const fallback = subCache?.ids ?? new Set<string>();
    // Mark unhealthy so we re-try in 5 s, not 45 s.
    subCache = { fetchedAt: now, ids: fallback, healthy: false };
    return { ids: fallback, ageMs: 0, cold: true };
  }
  const ids = new Set<string>(((data ?? []) as Array<{ user_id: string }>).map((r) => r.user_id));
  subCache = { fetchedAt: now, ids, healthy: true };
  return { ids, ageMs: 0, cold: true };
}

/** Internal — exposed for unit tests only. */
export const __test__ = { reset: () => { subCache = null; }, get: () => subCache };

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

  const startedAt = Date.now();
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  // S4 — global tick lock. Prevents overlap if a tick exceeds the cron interval.
  const { data: gotGlobalLock } = await supabase
    .rpc('fra_try_lock', { p_key: 'fra-engine-tick', p_ttl_secs: 120 });
  if (!gotGlobalLock) {
    log.warn('skipped_tick_locked', {});
    return new Response(JSON.stringify({ skipped: true, reason: 'global lock held' }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    // Fetch all running tenants
    const { data: rows, error } = await supabase
      .from('fra_state')
      .select('user_id, state, is_running, version')
      .eq('is_running', true);

    if (error) {
      log.error('fra_state_query_failed', { error: error.message });
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

    const results: Array<{ userId: string; ok: boolean; error?: string; locked?: boolean }> = [];
    let errorCount = 0;
    for (const row of eligible) {
      // S4 — per-tenant lock. Prevents two ticks from racing on the same user
      // (e.g. cron + manual replay).
      const tenantKey = `fra-tick:${row.user_id}`;
      const { data: gotTenantLock } = await supabase
        .rpc('fra_try_lock', { p_key: tenantKey, p_ttl_secs: 90 });
      if (!gotTenantLock) {
        results.push({ userId: row.user_id, ok: false, locked: true });
        continue;
      }

      try {
        await tickUser(supabase, row);
        results.push({ userId: row.user_id, ok: true });
      } catch (err) {
        errorCount++;
        const userIdHash = await log.hashUserId(row.user_id);
        log.error('tick_failed', { user_id_hash: userIdHash, error: err instanceof Error ? err.message : String(err) });
        results.push({
          userId: row.user_id,
          ok: false,
          error: err instanceof Error ? err.message : String(err),
        });
      } finally {
        await supabase.rpc('fra_unlock', { p_key: tenantKey });
      }
    }

    const durationMs = Date.now() - startedAt;

    // S7 — emit one metrics row per tick.
    await supabase.from('fra_engine_metrics').insert({
      tenants_total: allRows.length,
      tenants_eligible: eligible.length,
      tenants_skipped: skipped,
      errors: errorCount,
      duration_ms: durationMs,
      sub_cache_age_ms: cacheAgeMs,
      sub_cache_cold: cold,
    });

    log.info('tick_complete', {
      tenants_total: allRows.length,
      tenants_eligible: eligible.length,
      tenants_skipped: skipped,
      errors: errorCount,
      duration_ms: durationMs,
    });

    return new Response(
      JSON.stringify({
        tenants: results.length,
        skipped,
        cacheAgeMs,
        cacheRefreshed: cold,
        activeSubscribers: activeIds.size,
        durationMs,
        results,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } finally {
    await supabase.rpc('fra_unlock', { p_key: 'fra-engine-tick' });
  }
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
  row: PersistedStateRow & { version: number },
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
  
  
  // 🌟 GUARD: Only execute an UPDATE network payload if the engine mutated version counters
  if (updated && updated.version !== row.version as any) {
    console.log(`[ArbEngine] Version changed from ${row.version} -> ${updated.version}. Writing changes...`);
    await supabase
      .from('fra_state')
      .update({
        state: updated as unknown as Record<string, unknown>,
        version: updated.version,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', row.user_id);
  } else {
    console.log("[ArbEngine] Diagnostic complete. No changes detected. Skipping database updates.");
  }

  // (7) Mirror events
  if (events.length > 0) {
    // S4 — idempotent under retries via uq_fra_events_user_type_ts.
    await supabase.from('fra_events').upsert(
      events.map((e) => ({
        user_id: row.user_id,
        type: e.type,
        timestamp: new Date(e.timestamp).toISOString(),
        data: { ...(e.data as Record<string, unknown>), source: 'server' },
      })),
      { onConflict: 'user_id,type,timestamp', ignoreDuplicates: true },
    );
  }
}
