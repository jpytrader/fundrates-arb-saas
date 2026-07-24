// edge-functions/admin-clear-state/index.ts
//
// S14 — Admin-only factory reset for a single tenant.
//
// Deletes fra_state for the specified user_id (which cascades to fra_positions
// and fra_pnl_history via ON DELETE CASCADE).  This is the operator-facing
// equivalent of calling engine.clearPersistedState() — it surfaces via an
// authenticated HTTP endpoint so operators never need raw Supabase access.
//
// Authorization: the calling user must be authenticated AND have admin role
// set server-side in Supabase app_metadata:
//   supabase.auth.admin.updateUserById(userId, {
//     app_metadata: { role: 'admin' }
//   })
// app_metadata is JWT-signed by Supabase and cannot be spoofed by the user.
//
// Body: { "user_id": "<uuid of the tenant to reset>" }

import { createClient } from 'jsr:@supabase/supabase-js@2';
import { createLogger } from '../_shared/logger.ts';

const log = createLogger('admin-clear-state');

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

  // ── Auth ──────────────────────────────────────────────────────────────────
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'missing Authorization header' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
  const token = authHeader.replace('Bearer ', '');

  // Verify JWT via auth.getUser — user_id always comes from the verified token.
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

  // ── Admin role check ──────────────────────────────────────────────────────
  // app_metadata is set only via service role — it cannot be written by the user.
  const isAdmin =
    user.app_metadata?.role === 'admin' ||
    user.app_metadata?.admin === true;
  if (!isAdmin) {
    const callerHash = await log.hashUserId(user.id);
    log.warn('clear_state_forbidden', { caller_id_hash: callerHash });
    return new Response(JSON.stringify({ error: 'forbidden — admin role required' }), {
      status: 403,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // ── Parse target user_id from body ────────────────────────────────────────
  let targetUserId: string;
  try {
    const body = await req.json() as Record<string, unknown>;
    if (typeof body?.user_id !== 'string' || !body.user_id) throw new Error('invalid');
    targetUserId = body.user_id;
  } catch {
    return new Response(
      JSON.stringify({ error: 'request body must be { "user_id": "<uuid>" }' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }

  // ── Clear fra_state (cascades to fra_positions + fra_pnl_history) ─────────
  // Service role bypasses RLS — this is intentional; only admins reach here.
  const { error: deleteErr } = await supabase
    .from('fra_state')
    .delete()
    .eq('user_id', targetUserId);

  if (deleteErr) {
    log.error('clear_state_failed', { error: deleteErr.message });
    return new Response(JSON.stringify({ error: deleteErr.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const adminHash = await log.hashUserId(user.id);
  const targetHash = await log.hashUserId(targetUserId);
  log.info('clear_state_complete', {
    admin_id_hash: adminHash,
    target_id_hash: targetHash,
  });

  return new Response(
    JSON.stringify({ ok: true, cleared: targetUserId }),
    { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
  );
});
