// supabase-saas/edge-functions/create-checkout/index.ts
//
// Authenticated Stripe Checkout session creator. Per the production guide:
//   • Auth via supabase.auth.getUser(token) — Lovable-agnostic.
//   • Blocks duplicate active/trialing subscriptions.
//   • Sets metadata.supabase_user_id so the SQL trigger can scope rows.
//
// Deploy:  supabase functions deploy create-checkout --no-verify-jwt
// (we authenticate manually via the Authorization header)

import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4';
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2024-06-20',
  httpClient: Stripe.createFetchHttpClient(),
});

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    // 1. Authenticate user via Bearer token (guide pattern)
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing Authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 2. Block duplicate subscriptions
    const { data: activeSub } = await supabase
      .from('subscriptions')
      .select('status')
      .eq('user_id', user.id)
      .in('status', ['active', 'trialing'])
      .maybeSingle();

    if (activeSub) {
      return new Response(
        JSON.stringify({ error: 'Active subscription already exists' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      );
    }

    // 3. Validate body
    const body = await req.json().catch(() => ({}));
    const priceId = typeof body.priceId === 'string' ? body.priceId : null;
    if (!priceId || !priceId.startsWith('price_')) {
      return new Response(JSON.stringify({ error: 'Invalid priceId' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const origin = req.headers.get('origin') ?? '';

    // 4. Create recurring Checkout session
    const session = await stripe.checkout.sessions.create({
      customer_email: user.email ?? undefined,
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${origin}/?fra_billing=success`,
      cancel_url: `${origin}/?fra_billing=cancelled`,
      metadata: { supabase_user_id: user.id },
      subscription_data: {
        // Mirrors metadata onto the subscription itself — the SQL trigger
        // reads metadata.supabase_user_id from stripe.subscriptions.
        metadata: { supabase_user_id: user.id },
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[create-checkout]', err);
    const message = err instanceof Error ? err.message : 'Internal error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
