// supabase/functions/rotate-exchange-key/index.ts
//
// User-facing edge function that rotates an exchange API key in Supabase Vault.
// Enforces:
//   * JWT identity (auth.getUser) — body `user_id` is ignored (Layer 6).
//   * Per-exchange smoke test — bad credentials never reach Vault.
//   * Atomic vault rotate via public.rotate_vault_secret (defined in
//     migrations/0003_vault_admin.sql).
//   * Audit row in public.fra_key_rotations with caller IP.
//
// Companion docs: docs/ARCHITECTURE.md §Vault rotation v2
// 🌟 PMaps the raw definition file directly to your standalone JavaScript bundle!
// @deno-types="../../_shared/packages/fundrates-arb/index.d.ts"

import { createClient } from 'jsr:@supabase/supabase-js@2';
import { z } from 'npm:zod@3.23.8';
import {
  createHyperliquidAdapter,
  createOKXAdapter,
  DEFAULT_CONFIG,
} from 'npm:@jpytrader/fundrates-arb@^0.1.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, content-type, apikey, x-client-info',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const Body = z.object({
  exchange: z.enum(['hyperliquid', 'okx']),
  apiKey: z.string().min(8).max(512),
  apiSecret: z.string().min(8).max(512),
  extra: z.record(z.unknown()).optional(),
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

/**
 * Real signed smoke test — uses the same adapter the engine uses (F2).
 * Bad credentials (wrong key/secret, missing OKX passphrase, expired key,
 * IP not whitelisted, …) are rejected before anything is written to Vault.
 * There is no second signing implementation here — drift impossible.
 */
async function validateExchangeKeys(
  exchange: 'hyperliquid' | 'okx',
  apiKey: string,
  apiSecret: string,
  extra?: Record<string, unknown>,
): Promise<{ ok: true } | { ok: false; reason: string }> {
  try {
    if (exchange === 'hyperliquid') {
      const adapter = createHyperliquidAdapter(
        {
          apiKey,
          apiSecret,
          walletPrivateKey: (extra?.walletPrivateKey as string | undefined) ?? apiSecret,
        },
        DEFAULT_CONFIG,
      );
      return await adapter.validateKeys!();
    }
    const adapter = createOKXAdapter(
      {
        apiKey,
        apiSecret,
        passphrase: (extra?.passphrase as string | undefined) ?? '',
      },
      DEFAULT_CONFIG,
    );
    return await adapter.validateKeys!();
  } catch (err) {
    return { ok: false, reason: err instanceof Error ? err.message : String(err) };
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'method not allowed' }, 405);

  try {
    // 1. Identity (Layer 6).
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return json({ error: 'unauthorized' }, 401);
    }
    const token = authHeader.replace('Bearer ', '');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } },
    );
    const { data: userData, error: userErr } = await supabase.auth.getUser(token);
    if (userErr || !userData.user) return json({ error: 'unauthorized' }, 401);
    const userId = userData.user.id;

    // 2. Validate body.
    let raw: unknown;
    try {
      raw = await req.json();
    } catch {
      return json({ error: 'invalid json' }, 400);
    }
    const parsed = Body.safeParse(raw);
    if (!parsed.success) {
      return json({ error: parsed.error.flatten().fieldErrors }, 400);
    }
    const { exchange, apiKey, apiSecret, extra } = parsed.data;

    // 3. Real signed validation before writing (F2 + S2).
    const validation = await validateExchangeKeys(exchange, apiKey, apiSecret, extra);
    if (!validation.ok) {
      return json({ error: `exchange validation failed: ${validation.reason}` }, 400);
    }

    // 4. Atomic vault rotate (service role).
    const admin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );
    const vaultName = `fra_${exchange}_key_${userId}`;
    const payload = JSON.stringify({ apiKey, apiSecret, ...(extra ?? {}) });

    const { error: rpcErr } = await admin.rpc('rotate_vault_secret', {
      p_name: vaultName,
      p_payload: payload,
      p_user_id: userId,
    });
    if (rpcErr) {
      console.error('[rotate-exchange-key] rpc error:', rpcErr);
      return json({ error: 'rotation failed' }, 500);
    }

    // 5. Richer audit row with IP. (RPC inserts a minimal row without IP.)
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      req.headers.get('x-real-ip') ??
      null;
    await admin.from('fra_key_rotations').insert({
      user_id: userId,
      exchange,
      ip,
    });

    return json({ ok: true, rotatedAt: new Date().toISOString() });
  } catch (err) {
    console.error('[rotate-exchange-key] unhandled:', err);
    return json({ error: 'internal error' }, 500);
  }
});
