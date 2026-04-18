import { useEffect, type ReactNode } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { useSubscription } from './use-subscription';

interface SubscriptionGateProps {
  supabase: SupabaseClient;
  userId: string | null;
  /** Stripe Price ID for the recurring plan (price_xxx). */
  priceId: string;
  /** Auto-redirect to Stripe Checkout when no active subscription exists. */
  autoRedirect?: boolean;
  children: ReactNode;
}

/**
 * SubscriptionGate — MANDATORY wrapper for the SaaS deployment.
 *
 * Renders children only when the signed-in user has an active or trialing
 * subscription. Otherwise shows a CTA (and optionally auto-redirects to
 * Stripe Checkout). Realtime keeps the gate in sync with Stripe Sync writes.
 */
export function SubscriptionGate({
  supabase,
  userId,
  priceId,
  autoRedirect = true,
  children,
}: SubscriptionGateProps) {
  const sub = useSubscription(supabase, userId);

  // Auto-redirect to Stripe once we know auth is present + sub is missing.
  useEffect(() => {
    if (!autoRedirect) return;
    if (!userId) return;
    if (sub.loading) return;
    if (sub.isActive) return;
    void sub.redirectToCheckout(priceId).catch((err) => {
      console.error('[SubscriptionGate] checkout redirect failed', err);
    });
  }, [autoRedirect, userId, sub.loading, sub.isActive, sub, priceId]);

  if (!userId) {
    return (
      <div style={styles.center}>
        <p>Please sign in to access the arbitrage dashboard.</p>
      </div>
    );
  }

  if (sub.loading) {
    return (
      <div style={styles.center}>
        <p>Verifying subscription…</p>
      </div>
    );
  }

  if (!sub.isActive) {
    return (
      <div style={styles.center}>
        <h2 style={{ marginBottom: 8 }}>Subscription required</h2>
        <p style={{ marginBottom: 16, opacity: 0.8 }}>
          An active subscription is required to use the Funding Rate Arbitrage dashboard.
        </p>
        <button
          type="button"
          style={styles.button}
          onClick={() => void sub.redirectToCheckout(priceId)}
        >
          Subscribe to continue
        </button>
        {sub.error && (
          <p style={{ marginTop: 12, color: '#ef4444', fontSize: 13 }}>{sub.error}</p>
        )}
      </div>
    );
  }

  return <>{children}</>;
}

const styles: Record<string, React.CSSProperties> = {
  center: {
    minHeight: 240,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    textAlign: 'center',
  },
  button: {
    padding: '10px 18px',
    borderRadius: 8,
    border: 'none',
    background: '#3b82f6',
    color: 'white',
    fontWeight: 600,
    cursor: 'pointer',
  },
};
