// supabase/functions/revoke-exchange-key/index.ts
//
// Permanently delete a tenant's exchange API keys from Vault and write a
// `revoke` audit row to public.fra_key_rotations.
//
// Companion migration: migrations/0004_billing_resilience.sql
// Companion docs: docs/ARCHITECTURE.md §Vault rotation v2

import { createClient } from 'jsr:@supabase/supabase-js@2';
import { z } from 'npm:zod@3.23.8';
import { createLogger } from '../_shared/logger.ts';

const log = createLogger('revoke-exchange-key');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, content-type, apikey, x-client-info',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const Body = z.object({ exchange: z.enum(['hyperliquid', 'okx']) });

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'method not allowed' }, 405);

  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) return json({ error: 'unauthorized' }, 401);
  const token = authHeader.replace('Bearer ', '');

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: authHeader } } },
  );
  const { data: userData, error: userErr } = await supabase.auth.getUser(token);
  if (userErr || !userData.user) return json({ error: 'unauthorized' }, 401);
  const userId = userData.user.id;

  let raw: unknown;
  try { raw = await req.json(); } catch { return json({ error: 'invalid json' }, 400); }
  const parsed = Body.safeParse(raw);
  if (!parsed.success) return json({ error: parsed.error.flatten().fieldErrors }, 400);
  const { exchange } = parsed.data;

  const admin = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );
  const vaultName = `fra_${exchange}_key_${userId}`;
  const { error: rpcErr } = await admin.rpc('revoke_vault_secret', {
    p_name: vaultName,
    p_user_id: userId,
  });
  if (rpcErr) {
    const userIdHash = await log.hashUserId(userId);
    log.error('rpc_failed', { user_id_hash: userIdHash, error: rpcErr.message });
    return json({ error: 'revocation failed' }, 500);
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    null;
  await admin.from('fra_key_rotations').insert({
    user_id: userId,
    exchange,
    ip,
    action: 'revoke',
  });

  return json({ ok: true, revokedAt: new Date().toISOString() });
});
