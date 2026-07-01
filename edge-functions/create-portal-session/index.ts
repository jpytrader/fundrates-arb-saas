// supabase-saas/edge-functions/create-portal-session/index.ts
//
// Returns a Stripe Customer Portal URL so subscribers can manage / cancel
// their plan. Auth via supabase.auth.getUser(token) per the production guide.
//
// Deploy:  supabase functions deploy create-portal-session --no-verify-jwt

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

    // 🌟 FIX: Select the 'customer' column (cus_...) instead of the sub ID 'id' (sub_...).
    // Filter against the JSONB metadata field where the Sync Engine places the user token identifier.
    const { data: customerRow, error: customerErr } = await supabase
      .schema('stripe')
      .from('subscriptions')
      .select('customer')
      .eq('metadata->>supabase_user_id', user.id)
      .order('created_at', { ascending: false }) // FIX: use 'created_at' matching the PostgreSQL column syntax
      .limit(1)
      .maybeSingle();

    if (customerErr) {
      console.error('[create-portal-session] DB Fetch Error:', customerErr.message);
      return new Response(JSON.stringify({ error: 'Database verification failed' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Extracted variable points natively to the matching customer property token
    const customerId = customerRow?.customer;
    if (!customerId) {
      return new Response(
        JSON.stringify({ error: 'No Stripe customer found for this user' }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      );
    }

    const origin = req.headers.get('origin') ?? '';
    const portal = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${origin}/`,
    });

    return new Response(JSON.stringify({ url: portal.url }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[create-portal-session]', err);
    const message = err instanceof Error ? err.message : 'Internal error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
