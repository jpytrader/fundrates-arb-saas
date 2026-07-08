import { createClient } from '@supabase/supabase-js';
import { FundingRateArb } from '@jpytrader/fundrates-arb';
import { useSupabaseFra } from './use-supabase-fra';
import { SubscriptionGate } from './SubscriptionGate';
import { executeGlobalSignOut } from './supabase-utils';
import { useState } from 'react';
 
// Replace with your project credentials (anon key only — never service role)// Update your initialization file (e.g., supabaseClient.ts)
export const SUPABASE_URL = import.meta.env?.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
export const SUPABASE_ANON_KEY = import.meta.env?.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
export const STRIPE_PRICE_ID = import.meta.env?.VITE_STRIPE_PRICE_ID || process.env.STRIPE_PRICE_ID;

const supabase = createClient(SUPABASE_URL,SUPABASE_ANON_KEY,);

/**
 * index — drop-in usage of <FundingRateArb /> with Supabase persistence
 * AND a mandatory Stripe subscription gate.
 *
 * Flow:
 *   1. SubscriptionGate verifies auth + active subscription.
 *   2. useSupabaseFra returns a non-null `store` only when the gate is open.
 *   3. <FundingRateArb /> remounts via `key={revision}` whenever the
 *      server-side engine writes to the state row.
 */
export function index() {
  const { store, userId, subscription } = useSupabaseFra(supabase);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleDashboardLogout = async () => {
    setIsLoggingOut(true);
    try {
      await executeGlobalSignOut(supabase);
      // Note: You do not need to clear local states manually here.
      // useSupabaseFra's onAuthStateChange stream catches the SIGNED_OUT event 
      // instantly and flips the landing page layout back on frame.
    } catch (err: any) {
      console.error('[Deltametrician Logout Failed]', err.message);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const headerSlotContainer = (
    <div style={{ textAlign: 'center', marginTop: 16 }}>
      <button
        type="button"
        onClick={() => void subscription.openPortal()}
        style={{
          padding: '6px 14px',
          borderRadius: 6,
          border: '1px solid #334155',
          background: 'transparent',
          color: '#94a3b8',
          cursor: 'pointer',
          fontSize: 13,
        }}
      >
        Manage subscription
      </button>
      <button
        type="button"
        disabled={isLoggingOut}
        onClick={handleDashboardLogout}
        style={{
          padding: '6px 14px',
          borderRadius: 6,
          border: '1px solid #334155',
          background: '#1e293b',
          color: '#f1f5f9',
          cursor: isLoggingOut ? 'not-allowed' : 'pointer',
          fontSize: 13,
          opacity: isLoggingOut ? 0.6 : 1,
        }}
      >
        {isLoggingOut ? 'Signing out...' : 'Sign out'}
      </button>
    </div>
  );
  
  return (
    <SubscriptionGate supabase={supabase} userId={userId} priceId={STRIPE_PRICE_ID} subscription={subscription}>
      {store ? (
        <>
          <FundingRateArb
            headerSlot="TESTING_PROP_DELIVERY"
            theme="dark"
            persistenceStore={store}
            defaultConfig={{ dryRun: true }}
            onExecution={(e) => console.log('[FRA]', e)}
            onError={(err) => console.error('[FRA]', err)}
          />
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: 24 }}>Loading dashboard…</div>
      )}
    </SubscriptionGate>
  );
}
