// supabase/functions/stripe-webhook-fra/index.ts
//
// Native Stripe webhook handler — defense in depth alongside Stripe Sync Engine.
// Verifies signature, upserts public.subscriptions, and on any failure parks
// the event in public.fra_webhook_dlq for the reconcile-subscriptions cron
// to retry.
//
// Companion migration: migrations/0004_billing_resilience.sql
// Companion docs: docs/BILLING.md §Native webhook fallback

import { createClient } from 'jsr:@supabase/supabase-js@2';
import Stripe from 'npm:stripe@14.25.0';
import { createLogger } from '../_shared/logger.ts';

const log = createLogger('stripe-webhook-fra');
const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!);
const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET_FRA')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, content-type, stripe-signature',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return new Response('method not allowed', { status: 405 });

  const sig = req.headers.get('stripe-signature');
  const body = await req.text();
  if (!sig) return new Response('missing signature', { status: 400 });

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, sig, webhookSecret);
  } catch (err) {
    log.warn('signature_verification_failed', { error: String(err) });
    return new Response('invalid signature', { status: 400 });
  }

  const admin = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  try {
    await handleEvent(admin, event);
    log.info('processed', { event_id: event.id, event_type: event.type });
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    log.error('handler_failed', { event_id: event.id, error: errMsg });
    // Park in DLQ — reconcile-subscriptions will retry.
    await admin.from('fra_webhook_dlq').upsert(
      {
        event_id: event.id,
        event_type: event.type,
        payload: event as unknown as Record<string, unknown>,
        last_error: errMsg,
        retry_count: 0,
        next_attempt_at: new Date(Date.now() + 60_000).toISOString(),
      },
      { onConflict: 'event_id' },
    );
    // Return 210 so Stripe doesn't keep retrying — DLQ owns the retry now.
    return new Response(JSON.stringify({ ok: false, parked: true }), {
      status: 210,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
async function handleEvent(
  admin: ReturnType<typeof createClient>,
  event: Stripe.Event,
): Promise<void> {
  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription;
      const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer.id;
      
      // Extract the Supabase Auth User UUID sent during checkout metadata
      const targetUserId = sub.metadata?.supabase_user_id || sub.metadata?.user_id;
      let userIdToAssign = targetUserId;

      // 🌟 FIX: If metadata is missing, safely pull the correct 'user_id' column from customers
      if (!userIdToAssign) {
        const { data: customerRow } = await admin
          .from('customers')
          .select('user_id') // Select 'user_id' natively mapping to auth.users
          .eq('stripe_customer_id', customerId)
          .maybeSingle();
          
        if (!customerRow?.user_id) {
          throw new Error(`Critical: Event missing metadata tracking tokens and unknown stripe_customer_id: ${customerId}`);
        }
        
        userIdToAssign = customerRow.user_id;
      }

      // Safe date calculations from the previous 'Invalid time value' bug
      const periodEndTimestamp = sub.items?.data?.[0]?.current_period_end;
      const numericTimestamp = periodEndTimestamp ? Number(periodEndTimestamp) : null;
      const isoPeriodEnd = event.type === 'customer.subscription.deleted' ? new Date().toISOString() :
        (numericTimestamp && !isNaN(numericTimestamp)) ? new Date(numericTimestamp * 1000).toISOString() :
         new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
      ;

      // Execute your clean primary user subscription access upsert into public schema
      const { error: upsertError } = await admin.from('subscriptions').upsert(
        {
          user_id: userIdToAssign,
          stripe_customer_id: customerId,
          stripe_subscription_id: sub.id,
          status: sub.status,
          current_period_end: isoPeriodEnd,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' },
      );

      if (upsertError) throw upsertError;
      return;
    }
    default:
      return;
  }
}

