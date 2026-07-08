import React, { useState } from 'react'; // Fix: Added React import for FC types
import { createClient } from '@supabase/supabase-js';
import { FundingRateArb } from '@jpytrader/fundrates-arb';
import { useSupabaseFra } from './use-supabase-fra';
import { SubscriptionGate } from './SubscriptionGate';
import { executeGlobalSignOut } from './supabase-utils';
 
export const SUPABASE_URL = import.meta.env?.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
export const SUPABASE_ANON_KEY = import.meta.env?.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
export const STRIPE_PRICE_ID = import.meta.env?.VITE_STRIPE_PRICE_ID || process.env.STRIPE_PRICE_ID;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* ── Subscription icon SVG ── */
const SubscriptionIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v1.5" />
    <rect x={3} y={7.5} width={18} height={12.5} rx={2} />
    <line x1={3} y1={11.5} x2={21} y2={11.5} />
  </svg>
);

/* ── Logout icon SVG ── */
const LogoutIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1={21} y1={12} x2={9} y2={12} />
  </svg>
);

// Fix: Capitalized to 'Index' so React safely recognizes hooks inside it
export function index() {
  const { store, userId, subscription } = useSupabaseFra(supabase);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleDashboardLogout = async () => {
    setIsLoggingOut(true);
    try {
      await executeGlobalSignOut(supabase);
    } catch (err: any) {
      console.error('[Deltametrician Logout Failed]', err.message);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const headerSlotContainer = (
    // Fix: Added display flex and gap utilities to separate and align both action buttons
    <div style={{ display: 'flex', alignItems: 'right', gap: '10px'}}>
      <button
        type="button"
        title="Manage Subscription"
        onClick={() => void subscription.openPortal()}
        style={{
          padding: 6,
          borderRadius: 6,
          border: '1px solid var(--fra-border)',
          backgroundColor: 'transparent',
          color: 'var(--fra-muted)',
          gap: '8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <SubscriptionIcon size={14}/>
      </button>
      <button
        type="button"
        title="Sign Out"
        disabled={isLoggingOut}
        onClick={handleDashboardLogout}
        style={{
          padding: 6,
          borderRadius: 6,
          border: '1px solid var(--fra-border)',
          backgroundColor: 'transparent',
          color: 'var(--fra-muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: isLoggingOut ? 'not-allowed' : 'pointer',
          opacity: isLoggingOut ? 0.6 : 1,
        }}
      >
        {isLoggingOut ? (
          <>Signing out...</>
        ) : (
          <>
            <LogoutIcon size={14} />
          </>
        )}
      </button>
    </div>
  );
  
  return (
    <SubscriptionGate supabase={supabase} userId={userId} priceId={STRIPE_PRICE_ID} subscription={subscription}>
      {store ? (
        <>
          <FundingRateArb
            engineName="Deltamaths"
            headerSlot={headerSlotContainer}
            theme="dark"
            persistenceStore={store}
            defaultConfig={{ dryRun: true }}
            onExecution={(e) => console.log('[FRA]', e)}
            onError={(err) => console.error('[FRA]', err)}
          />
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: 24, color: '#f1f5f9' }}>Loading dashboard…</div>
      )}
    </SubscriptionGate>
  );
}
