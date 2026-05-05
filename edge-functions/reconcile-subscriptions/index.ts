// supabase/functions/reconcile-subscriptions/index.ts
//
// Hourly cron — two jobs:
//   1. Drain public.fra_webhook_dlq (retry parked Stripe events, capped retries).
//   2. For every distinct stripe_customer_id in public.profiles, ask Stripe
//      for the latest subscription state and correct any drift in
//      public.subscriptions. Cheap insurance against a missed/dropped webhook.
//
// Triggered by pg_cron with `x-cron-secret`.

import { createClient } from 'jsr:@supabase/supabase-js@2';
import Stripe from 'npm:stripe@14.25.0';
import { createLogger } from '../_shared/logger.ts';

const log = createLogger('reconcile-subscriptions');
const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, { apiVersion: '2024-04-10' });

const MAX_RETRIES = 8;

Deno.serve(async (req) => {
  const cronSecret = req.headers.get('x-cron-secret');
  if (cronSecret !== Deno.env.get('FRA_CRON_SECRET')) {
    return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401 });
  }

  const admin = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  const dlqResult = await drainDlq(admin);
  const reconResult = await reconcile(admin);

  log.info('done', { ...dlqResult, ...reconResult });
  return new Response(JSON.stringify({ ok: true, ...dlqResult, ...reconResult }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
});

async function drainDlq(admin: ReturnType<typeof createClient>) {
  const { data: rows, error } = await admin
    .from('fra_webhook_dlq')
    .select('id, event_id, event_type, payload, retry_count')
    .is('resolved_at', null)
    .lte('next_attempt_at', new Date().toISOString())
    .lt('retry_count', MAX_RETRIES)
    .limit(50);
  if (error) {
    log.error('dlq_query_failed', { error: error.message });
    return { dlq_drained: 0, dlq_failed: 0 };
  }
  let drained = 0;
  let failed = 0;
  for (const row of rows ?? []) {
    try {
      const event = row.payload as unknown as Stripe.Event;
      await replayEvent(admin, event);
      await admin.from('fra_webhook_dlq')
        .update({ resolved_at: new Date().toISOString() })
        .eq('id', row.id);
      drained++;
    } catch (err) {
      failed++;
      const next = Date.now() + Math.min(2 ** row.retry_count, 3600) * 1000;
      await admin.from('fra_webhook_dlq')
        .update({
          retry_count: row.retry_count + 1,
          next_attempt_at: new Date(next).toISOString(),
          last_error: err instanceof Error ? err.message : String(err),
        })
        .eq('id', row.id);
    }
  }
  return { dlq_drained: drained, dlq_failed: failed };
}

async function replayEvent(
  admin: ReturnType<typeof createClient>,
  event: Stripe.Event,
): Promise<void> {
  if (
    event.type !== 'customer.subscription.created' &&
    event.type !== 'customer.subscription.updated' &&
    event.type !== 'customer.subscription.deleted'
  ) return;
  const sub = event.data.object as Stripe.Subscription;
  const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer.id;
  const { data: profile } = await admin
    .from('profiles').select('id').eq('stripe_customer_id', customerId).maybeSingle();
  if (!profile) throw new Error(`unknown stripe_customer_id: ${customerId}`);
  await admin.from('subscriptions').upsert({
    user_id: profile.id,
    stripe_customer_id: customerId,
    stripe_subscription_id: sub.id,
    status: sub.status,
    current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id' });
}

async function reconcile(admin: ReturnType<typeof createClient>) {
  const { data: profiles } = await admin
    .from('profiles')
    .select('id, stripe_customer_id')
    .not('stripe_customer_id', 'is', null);
  let corrected = 0;
  for (const p of profiles ?? []) {
    const customerId = (p as { stripe_customer_id: string }).stripe_customer_id;
    try {
      const subs = await stripe.subscriptions.list({ customer: customerId, limit: 1, status: 'all' });
      const sub = subs.data[0];
      if (!sub) continue;
      const { data: existing } = await admin
        .from('subscriptions').select('status').eq('user_id', (p as { id: string }).id).maybeSingle();
      if (!existing || existing.status !== sub.status) {
        await admin.from('subscriptions').upsert({
          user_id: (p as { id: string }).id,
          stripe_customer_id: customerId,
          stripe_subscription_id: sub.id,
          status: sub.status,
          current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id' });
        corrected++;
      }
    } catch (err) {
      log.warn('reconcile_customer_failed', { customer: customerId, error: String(err) });
    }
  }
  return { reconciled_corrected: corrected };
}
