// edge-functions/close-all-positions/index.ts
//
// User-initiated close of all open positions.
//
// S11 — Bug 4: duplicate close orders.
// The per-tenant DB lock (`fra-tick:<user_id>`) is the same key the cron tick
// acquires in fra-engine.  Holding that lock here means a concurrent cron tick
// will see it is already held and skip; a concurrent second HTTP call to this
// function will receive 409 and must retry.  This eliminates the race where two
// concurrent closeAllPositions() calls issue duplicate live orders for the same
// position.
//
// Flow:
//   1. Verify user JWT → user_id  (body user_id is never trusted)
//   2. Acquire fra-tick:<user_id> lock (TTL 90 s — same as cron per-tenant lock)
//   3. Abort with 409 if lock is already held (cron tick in progress; caller retries)
//   4. Mark fra_state.is_running = false so subsequent cron ticks skip this user
//   5. Run one engine stop() cycle — closes open positions, sets phase → 'idle'
//   6. Persist updated state (with is_running = false)
//   7. Mirror execution events into fra_events
//   8. Release lock

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
  type PersistedState,
} from 'npm:@jpytrader/fundrates-arb@^0.1.0';
import { createLogger } from '../_shared/logger.ts';

const log = createLogger('close-all-positions');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // ── 1. Verify JWT — user_id is derived from the token only ──────────────
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'missing Authorization header' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
  const token = authHeader.replace('Bearer ', '');

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  const { data: { user }, error: authErr } = await supabase.auth.getUser(token);
  if (authErr || !user) {
    return new Response(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
  const userId = user.id;
  const tenantKey = `fra-tick:${userId}`;

  // ── 2. Acquire per-tenant lock (same key as cron tick) ──────────────────
  const { data: gotLock } = await supabase
    .rpc('fra_try_lock', { p_key: tenantKey, p_ttl_secs: 90 });

  if (!gotLock) {
    // A cron tick or a concurrent close call is in progress for this user.
    // Return 409 so the caller can retry after a short delay.
    return new Response(
      JSON.stringify({
        error: 'tenant_locked',
        message: 'A tick is currently in progress for this account. Retry in a few seconds.',
      }),
      { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }

  try {
    // ── 3. Load current state ──────────────────────────────────────────────
    const { data: row } = await supabase
      .from('fra_state')
      .select('state, is_running, version')
      .eq('user_id', userId)
      .maybeSingle();

    if (!row) {
      return new Response(
        JSON.stringify({ ok: true, message: 'no engine state found — nothing to close' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    if (!row.is_running) {
      return new Response(
        JSON.stringify({ ok: true, message: 'engine is already stopped' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // ── 4. Mark engine stopped before the close tick ─────────────────────
    // The cron tick's mid-tick stop guard checks is_running after its own lock
    // releases; setting it false here ensures any subsequent tick skips this user.
    await supabase
      .from('fra_state')
      .update({ is_running: false })
      .eq('user_id', userId);

    // ── 5. Run engine.stop() — closes all open positions ─────────────────
    const persisted = row.state as unknown as PersistedState;
    const config: ArbConfig = { ...DEFAULT_CONFIG, ...(persisted?.config ?? {}) };

    const store = new MemoryStore();
    await store.save(persisted);

    // Resolve adapter (live keys or dry-run fallback)
    const { data: keyRow } = await supabase
      .from('fra_user_exchanges')
      .select('exchange, vault_secret_name')
      .eq('user_id', userId)
      .maybeSingle();

    const exchange = (keyRow?.exchange as 'hyperliquid' | 'okx' | undefined) ?? 'hyperliquid';
    let vaultPayload: Record<string, string> | null = null;
    if (keyRow?.vault_secret_name) {
      const { data: secret } = await supabase
        .schema('vault')
        .from('decrypted_secrets')
        .select('decrypted_secret')
        .eq('name', keyRow.vault_secret_name)
        .maybeSingle();
      if (secret?.decrypted_secret) {
        try {
          vaultPayload = JSON.parse(secret.decrypted_secret as string) as Record<string, string>;
        } catch {
          vaultPayload = null;
        }
      }
    }

    const adapter = vaultPayload === null
      ? (exchange === 'okx'
          ? createDryRunOKXAdapter(config)
          : createDryRunHyperliquidAdapter(config))
      : exchange === 'okx'
        ? createOKXAdapter(
            {
              apiKey: vaultPayload.apiKey,
              apiSecret: vaultPayload.apiSecret,
              passphrase: vaultPayload.passphrase ?? '',
            },
            config,
          )
        : createHyperliquidAdapter(
            {
              apiKey: vaultPayload.apiKey,
              apiSecret: vaultPayload.apiSecret,
              walletPrivateKey: vaultPayload.walletPrivateKey ?? vaultPayload.apiSecret,
            },
            config,
          );

    const engine = new ArbEngine(config, adapter, store, { manualTick: true });
    const events: Array<{ type: string; timestamp: number; data: unknown }> = [];
    engine.onExecution((e) => events.push(e));

    await engine.start();
    // stop() closes all open positions and transitions phase → 'idle'
    await engine.stop();
    engine.teardown();

    // ── 6. Persist closed state ───────────────────────────────────────────
    const updated = await store.load();
    if (updated) {
      await supabase
        .from('fra_state')
        .update({
          state: updated as unknown as Record<string, unknown>,
          version: updated.version,
          is_running: false,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId);
    }

    // ── 7. Mirror execution events ────────────────────────────────────────
    if (events.length > 0) {
      await supabase.from('fra_events').upsert(
        events.map((e) => ({
          user_id: userId,
          type: e.type,
          timestamp: new Date(e.timestamp).toISOString(),
          data: {
            ...(e.data as Record<string, unknown>),
            source: 'close-all-positions',
          },
        })),
        { onConflict: 'user_id,type,timestamp', ignoreDuplicates: true },
      );
    }

    const userIdHash = await log.hashUserId(userId);
    log.info('close_all_positions_complete', {
      user_id_hash: userIdHash,
      events_mirrored: events.length,
    });

    return new Response(
      JSON.stringify({ ok: true, eventsMirrored: events.length }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } finally {
    // ── 8. Always release the lock ────────────────────────────────────────
    await supabase.rpc('fra_unlock', { p_key: tenantKey });
  }
});
