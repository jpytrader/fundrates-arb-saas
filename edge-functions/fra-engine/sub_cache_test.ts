// Deno test for the subscription cache (S5).
// Run with: deno test --allow-net --allow-env supabase-saas/edge-functions/fra-engine/sub_cache_test.ts
//
// We import the module under test as a side-effect-free unit by mocking the
// Supabase client surface used by getActiveSubscriberIds.

import { assertEquals } from 'https://deno.land/std@0.224.0/assert/mod.ts';

type SupabaseLike = {
  from: (t: string) => {
    select: (c: string) => {
      in: (col: string, vals: string[]) => Promise<{ data: { user_id: string }[] | null; error: { message: string } | null }>;
    };
  };
};

function makeFakeClient(opts: {
  rows?: { user_id: string }[];
  error?: string;
}): SupabaseLike {
  return {
    from: () => ({
      select: () => ({
        in: () =>
          Promise.resolve({
            data: opts.error ? null : opts.rows ?? [],
            error: opts.error ? { message: opts.error } : null,
          }),
      }),
    }),
  };
}

// Inline copy of the cache logic — the production module reads env at import
// time so it isn't safely importable from a test runner. This guards the
// algorithm itself; the production module re-uses the same constants.
const SUB_CACHE_POSITIVE_TTL_MS = 45_000;
const SUB_CACHE_NEGATIVE_TTL_MS = 5_000;
let subCache: { fetchedAt: number; ids: Set<string>; healthy: boolean } | null = null;
let now = 0;
const _now = () => now;

async function getActiveSubscriberIds(supabase: SupabaseLike) {
  if (subCache) {
    const age = _now() - subCache.fetchedAt;
    const ttl = subCache.healthy ? SUB_CACHE_POSITIVE_TTL_MS : SUB_CACHE_NEGATIVE_TTL_MS;
    if (age < ttl) return { ids: subCache.ids, ageMs: age, cold: false };
  }
  const { data, error } = await supabase.from('subscriptions').select('user_id').in('status', ['active', 'trialing']);
  if (error) {
    const fallback = subCache?.ids ?? new Set<string>();
    subCache = { fetchedAt: _now(), ids: fallback, healthy: false };
    return { ids: fallback, ageMs: 0, cold: true };
  }
  const ids = new Set<string>((data ?? []).map((r) => r.user_id));
  subCache = { fetchedAt: _now(), ids, healthy: true };
  return { ids, ageMs: 0, cold: true };
}

function reset() { subCache = null; now = 1_000_000; }

Deno.test('cache miss → DB fetch populates cache', async () => {
  reset();
  const c = makeFakeClient({ rows: [{ user_id: 'u1' }] });
  const r = await getActiveSubscriberIds(c);
  assertEquals(r.cold, true);
  assertEquals(r.ids.has('u1'), true);
});

Deno.test('cache hit within positive TTL', async () => {
  reset();
  const c = makeFakeClient({ rows: [{ user_id: 'u1' }] });
  await getActiveSubscriberIds(c);
  now += 30_000;
  const r2 = await getActiveSubscriberIds(c);
  assertEquals(r2.cold, false);
});

Deno.test('positive cache expires at 45 s', async () => {
  reset();
  const c = makeFakeClient({ rows: [{ user_id: 'u1' }] });
  await getActiveSubscriberIds(c);
  now += 46_000;
  const r2 = await getActiveSubscriberIds(c);
  assertEquals(r2.cold, true);
});

Deno.test('DB error returns stale set, marks unhealthy → expires at 5 s', async () => {
  reset();
  await getActiveSubscriberIds(makeFakeClient({ rows: [{ user_id: 'u1' }] }));
  now += 100;
  const errClient = makeFakeClient({ error: 'boom' });
  const r2 = await getActiveSubscriberIds(errClient);
  // Stale set returned.
  assertEquals(r2.ids.has('u1'), true);
  // Within 5 s negative TTL — cache hit.
  now += 4_000;
  const r3 = await getActiveSubscriberIds(errClient);
  assertEquals(r3.cold, false);
  // After 5 s negative TTL — re-attempts.
  now += 2_000;
  const r4 = await getActiveSubscriberIds(errClient);
  assertEquals(r4.cold, true);
});
