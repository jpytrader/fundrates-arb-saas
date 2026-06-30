import { useEffect, useMemo, useState } from 'react';
import type { SupabaseClient, RealtimeChannel } from '@supabase/supabase-js';
import { SupabaseStateStore } from './supabase-state-store';
import { useSubscription, type SubscriptionState } from './use-subscription';

/**
 * useSupabaseFra — wires Supabase auth + realtime + MANDATORY subscription
 * gating into a StateStore instance suitable for `<FundingRateArb />`.
 *
 * The returned `store` is `null` until BOTH conditions are met:
 *   1. The user is authenticated.
 *   2. The user has an active or trialing subscription
 *      (verified via `public.subscriptions` and kept fresh via realtime).
 *
 * Consumers should still wrap their UI in `<SubscriptionGate />` to render
 * the appropriate CTA / loader for the unauthenticated and no-sub cases.
 */
export function useSupabaseFra(supabase: SupabaseClient) {
  const [userId, setUserId] = useState<string | null>(null);

  // Track auth session
  useEffect(() => {
    let active = true;
    
    // Force an immediate server validation if a billing redirect is detected
    const params = new URLSearchParams(window.location.search);
    const isReturningFromBilling = params.has('fra_billing') || params.has('session_id');
    

    if (isReturningFromBilling) {
      // Re-validate directly against Supabase Auth servers instead of trusting LocalStorage cache
      supabase.auth.refreshSession().then(({ data, error }) => {
        if (!active) return;
        if (!error && data.session) {
          setUserId(data.session.user.id);
          // Clean the query parameters cleanly so normal navigation handles future refreshes
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      });
    } else {
      // Standard baseline cache read
      supabase.auth.getSession().then(({ data, _err }) => {
        if (!active) return;
        if (_err) {
          // Throw a new Error out of the promise instead of setting local component state
          throw new Error(`Session initialization failed: ${_err.message}`);
        }

        const currentId = data.session?.user.id ?? null;
        setUserId(currentId);
      });
    }

    const { data: sub } = supabase.auth.onAuthStateChange(async (_evt, session) => {
      if (!active) return;

      const userId = session?.user.id ?? null;
      setUserId(userId);

      // "SIGNED_IN" triggers automatically when the email link hash fragment is decoded on mount
      if (_evt === 'SIGNED_IN' && session) {
        console.log("[Deltametrician] Authentication sync successful for user:", userId);
      }
      
      if (_evt === 'SIGNED_OUT') {
        setUserId(null);
      }
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [supabase]);

  // Mandatory subscription check
  const subscription: SubscriptionState = useSubscription(supabase, userId);

  // Only hand out the persistence store when auth + subscription are good.
  const store = useMemo(
    () =>
      userId && subscription.isActive
        ? new SupabaseStateStore(supabase, userId)
        : null,
    [supabase, userId, subscription.isActive],
  );

  // Realtime: bump revision when the engine state row changes server-side.
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    if (!userId || !subscription.isActive) return;
    
    const uniqueId = Math.random().toString(36).substring(2, 9);
    const channel: RealtimeChannel = supabase
      .channel(`fra_state:${userId}:${uniqueId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'fra_state',
          filter: `user_id=eq.${userId}`,
        },
        () => setRevision((r) => r + 1),
      );

    void channel.subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        console.log(`Subscription channel (fra_state:${userId}) ready`);
      }
    });
    
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [supabase, userId, subscription.isActive]);

  return { store, userId, revision, subscription };
}
