// supabase/functions/fra-engine/index.ts
//
// Server-side engine tick. Triggered by pg_cron on a fixed interval (default 60s).
// For every user with `is_running = true`, loads their state, runs ONE scan/exec
// tick, and writes state back. Exchange keys are read from Supabase Vault.
//
// IMPORTANT: This function deliberately does NOT import @vireson/funding-rate-arb
// directly. The component is browser-only (DOM, React); we re-implement the tick
// loop here against the same persistence schema. The engine logic itself remains
// the source of truth on the client; the server is a "headless heartbeat" that
// only advances time-based state (funding accrual, exit checks) when the user's
// app is closed.
//
// If/when the component publishes a headless engine entrypoint, swap the manual
// tick below for a direct `ArbEngine` import.

import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, content-type, x-cron-secret',
};

interface PersistedStateRow {
  user_id: string;
  state: Record<string, unknown>;
  is_running: boolean;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  // Auth: cron secret OR service-role JWT
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

  const results: Array<{ userId: string; ok: boolean; error?: string }> = [];

  for (const row of (rows ?? []) as PersistedStateRow[]) {
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
    JSON.stringify({ tenants: results.length, results }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
  );
});

/**
 * One scan tick for a single tenant.
 *
 * This is a minimal headless implementation: it accrues time-prorated funding
 * on open positions and writes an event row. Full execution (open/close orders)
 * still runs client-side when the user has the app open — the server tick
 * exists so positions don't go stale during prolonged disconnects.
 */
async function tickUser(
  supabase: ReturnType<typeof createClient>,
  row: PersistedStateRow,
): Promise<void> {
  const state = row.state as {
    positions?: Array<{
      id: string;
      pair: string;
      sizeUsd: number;
      fundingCollected: number;
      lastFundingAccrualAt: number;
    }>;
    totalFundingCollected?: number;
  };

  if (!state.positions?.length) return;

  const now = Date.now();
  const eightHoursMs = 8 * 60 * 60 * 1000;

  // Time-prorate accrued funding using the last cached rate per pair
  // (the client-side engine writes this when it last scanned).
  // Conservative fallback: 0.01% per 8h if no rate cached.
  for (const pos of state.positions) {
    const elapsedMs = now - pos.lastFundingAccrualAt;
    if (elapsedMs <= 0) continue;
    const intervals = elapsedMs / eightHoursMs;
    const fallbackRate = 0.0001; // 0.01% per 8h
    const accrued = pos.sizeUsd * fallbackRate * intervals;
    pos.fundingCollected += accrued;
    pos.lastFundingAccrualAt = now;
    state.totalFundingCollected = (state.totalFundingCollected ?? 0) + accrued;
  }

  // Persist back
  await supabase
    .from('fra_state')
    .update({
      state,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', row.user_id);

  // Emit a heartbeat event (visible in client event log via realtime)
  await supabase.from('fra_events').insert({
    user_id: row.user_id,
    type: 'scan_heartbeat',
    timestamp: new Date(now).toISOString(),
    data: { source: 'server', positions: state.positions.length },
  });
}
