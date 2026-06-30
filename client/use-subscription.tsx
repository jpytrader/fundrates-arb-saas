import { useCallback, useEffect, useMemo, useState } from 'react';
import type { SupabaseClient, RealtimeChannel } from '@supabase/supabase-js';

export type SubscriptionStatus =
  | 'active'
  | 'trialing'
  | 'past_due'
  | 'canceled'
  | 'unpaid'
  | null;

export interface SubscriptionState {
  status: SubscriptionStatus;
  isActive: boolean;
  loading: boolean;
  error: string | null;
  /** Calls the create-checkout edge function and redirects to Stripe Checkout. */
  redirectToCheckout: (priceId: string) => Promise<void>;
  /** Calls the create-portal-session edge function and opens the customer portal. */
  openPortal: () => Promise<void>;
  /** Force a re-fetch of subscription state (rarely needed thanks to realtime). */
  refresh: () => Promise<void>;
}

const ACTIVE_STATUSES: ReadonlyArray<NonNullable<SubscriptionStatus>> = [
  'active',
  'trialing',
];

/**
 * useSubscription — reads `public.subscriptions` for the signed-in user and
 * subscribes to realtime updates so the gate unlocks ~1s after Stripe Sync
 * writes. Provides helpers to redirect to Checkout / Customer Portal.
 *
 * Pass `userId={null}` while auth is loading; the hook will sit in
 * `loading: true, isActive: false` until a real user id arrives.
 */
export function useSubscription(
  supabase: SupabaseClient,
  userId: string | null,
): SubscriptionState {
  const [status, setStatus] = useState<SubscriptionStatus>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(async () => {
    if (!userId) {
      setStatus(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error: qErr } = await supabase
      .from('subscriptions')
      .select('status')
      .eq('user_id', userId)
      .in('status', ACTIVE_STATUSES as unknown as string[])
      .maybeSingle();
    if (qErr) {
      setError(qErr.message);
      setStatus(null);
    } else {
      setError(null);
      setStatus((data?.status as SubscriptionStatus) ?? null);
    }
    setLoading(false);
  }, [supabase, userId]);

  useEffect(() => {
    void fetchStatus();
  }, [fetchStatus]);

  // Realtime: react to any change on this user's subscription row.
  useEffect(() => {
    if (!userId) return;
    const uniqueId = Math.random().toString(36).substring(2, 9);
    const channel: RealtimeChannel = supabase
      .channel(`subscriptions:${userId}:${uniqueId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'subscriptions',
          filter: `user_id=eq.${userId}`,
        },
        () => {
          void fetchStatus();
        },
      );

    void channel.subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        console.log(`Subscription channel (subscription:${userId}) ready`);
      }
    });

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [supabase, userId, fetchStatus]);

  const redirectToCheckout = useCallback(
    async (priceId: string) => {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;
      if (!accessToken) throw new Error('Not authenticated');
      const { data, error: invokeErr } = await supabase.functions.invoke<{ url: string }>(
        'create-checkout',
        {
          body: { priceId },
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );
      if (invokeErr) throw invokeErr;
      if (data?.url) window.location.assign(data.url);
    },
    [supabase],
  );

  const openPortal = useCallback(async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const accessToken = sessionData.session?.access_token;
    if (!accessToken) throw new Error('Not authenticated');
    const { data, error: invokeErr } = await supabase.functions.invoke<{ url: string }>(
      'create-portal-session',
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    if (invokeErr) throw invokeErr;
    if (data?.url) window.location.assign(data.url);
  }, [supabase]);

  return useMemo(
    () => ({
      status,
      isActive: status !== null && ACTIVE_STATUSES.includes(status),
      loading,
      error,
      redirectToCheckout,
      openPortal,
      refresh: fetchStatus,
    }),
    [status, loading, error, redirectToCheckout, openPortal, fetchStatus],
  );
}
