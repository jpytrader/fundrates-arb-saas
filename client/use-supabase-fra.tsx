import { useEffect, useMemo, useState } from 'react';
import type { SupabaseClient, RealtimeChannel } from '@supabase/supabase-js';
import { SupabaseStateStore } from './supabase-state-store';

/**
 * useSupabaseFra — wires Supabase auth + realtime into a StateStore instance
 * suitable for passing as the `persistenceStore` prop to <FundingRateArb />.
 *
 * Returns `null` while the user session is loading or absent.
 * Subscribes to realtime changes on `fra_state` so the client UI reflects
 * server-side engine writes within ~1s.
 */
export function useSupabaseFra(supabase: SupabaseClient) {
  const [userId, setUserId] = useState<string | null>(null);

  // Track auth session
  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active) setUserId(data.session?.user.id ?? null);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      setUserId(session?.user.id ?? null);
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [supabase]);

  const store = useMemo(
    () => (userId ? new SupabaseStateStore(supabase, userId) : null),
    [supabase, userId],
  );

  // Realtime: bump a token whenever the server updates our state row, so the
  // <FundingRateArb /> can be remounted (or the consumer can manually reload)
  // to pick up engine-side changes.
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    if (!userId) return;
    const channel: RealtimeChannel = supabase
      .channel(`fra_state:${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'fra_state',
          filter: `user_id=eq.${userId}`,
        },
        () => setRevision((r) => r + 1),
      )
      .subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [supabase, userId]);

  return { store, userId, revision };
}
