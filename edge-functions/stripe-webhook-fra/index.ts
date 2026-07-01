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
    // Return 200 so Stripe doesn't keep retrying — DLQ owns the retry now.
    return new Response(JSON.stringify({ ok: false, parked: true }), {
      status: 200,
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
      
      // 🌟 PRODUCTION CORRECTION: 
      // Extract the Supabase Auth User UUID sent during your checkout creation 
      // via client_reference_id or the subscription metadata mapping tags
      const targetUserId = sub.metadata?.supabase_user_id || sub.metadata?.user_id;

      if (!targetUserId) {
        // Fall back to your legacy profile mapping check only if metadata tokens are missing
        const { data: profile } = await admin
          .from('customers')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .maybeSingle();
          
        if (!profile) {
          throw new Error(`Critical: Event missing metadata tracking tokens and unknown stripe_customer_id: ${customerId}`);
        }
      }

      const userIdToAssign = targetUserId || profile.id;

      const periodEndTimestamp = sub.current_period_end;
      const isoPeriodEnd = (periodEndTimestamp && typeof periodEndTimestamp === 'number')
        ? new Date(periodEndTimestamp * 1000).toISOString()
        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // Default to 30 days out if null

      // Execute your clean primary user subscription access upsert
      await admin.from('subscriptions').upsert(
        {
          user_id: userIdToAssign,
          stripe_customer_id: customerId,
          stripe_subscription_id: sub.id,
          status: sub.status,
          current_period_end: isoPeriodEnd,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id' },
      );
      return;
    }
    default:
      return;
  }
}
