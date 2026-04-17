import { createClient } from '@supabase/supabase-js';
import { FundingRateArb } from '@vireson/funding-rate-arb';
import { useSupabaseFra } from './use-supabase-fra';

// Replace with your project credentials (anon key only — never service role)
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

/**
 * ExampleApp — drop-in usage of <FundingRateArb /> with Supabase persistence.
 *
 * The component itself is unchanged; we only pass our external store via the
 * public `persistenceStore` prop. The `key={revision}` ensures the component
 * remounts when the server-side engine writes to our state row, so the UI
 * always reflects authoritative cloud state.
 */
export function ExampleApp() {
  const { store, userId, revision } = useSupabaseFra(supabase);

  if (!userId) {
    return <div>Please sign in to access the arbitrage dashboard.</div>;
  }
  if (!store) return <div>Loading…</div>;

  return (
    <FundingRateArb
      key={revision}
      theme="dark"
      persistenceStore={store}
      defaultConfig={{ dryRun: true }}
      onExecution={(e) => console.log('[FRA]', e)}
      onError={(err) => console.error('[FRA]', err)}
    />
  );
}
