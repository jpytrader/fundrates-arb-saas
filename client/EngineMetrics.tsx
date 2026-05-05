// EngineMetrics.tsx — Super-admin only.
//
// Queries public.fra_engine_metrics for the last 24 h and renders a compact
// table + sparkline-friendly summary. Drop into the host Admin page next to
// <VaultKeyRotations />.
//
// Companion: supabase-saas/migrations/0004_billing_resilience.sql
//            supabase-saas/edge-functions/fra-engine/index.ts (S7)

import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface EngineMetricRow {
  id: string;
  ts: string;
  tenants_total: number;
  tenants_eligible: number;
  tenants_skipped: number;
  errors: number;
  duration_ms: number;
  sub_cache_age_ms: number | null;
  sub_cache_cold: boolean;
}

export function EngineMetrics() {
  const [rows, setRows] = useState<EngineMetricRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const since = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
      const { data, error } = await supabase
        .from('fra_engine_metrics' as never)
        .select('*')
        .gte('ts', since)
        .order('ts', { ascending: false })
        .limit(500);
      if (cancelled) return;
      if (error) setErr(error.message);
      else setRows((data as unknown as EngineMetricRow[]) ?? []);
      setLoading(false);
    };
    load();
    const id = setInterval(load, 30_000);
    return () => { cancelled = true; clearInterval(id); };
  }, []);

  if (loading) return <div className="p-4 text-sm text-muted-foreground">Loading engine metrics…</div>;
  if (err) return <div className="p-4 text-sm text-destructive">Error: {err}</div>;

  const last = rows[0];
  const errorRate = rows.length === 0 ? 0 : rows.reduce((s, r) => s + r.errors, 0) / rows.length;
  const avgDuration = rows.length === 0 ? 0 : rows.reduce((s, r) => s + r.duration_ms, 0) / rows.length;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Engine Metrics — last 24 h</h3>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Ticks" value={String(rows.length)} />
        <Stat label="Avg duration" value={`${avgDuration.toFixed(0)} ms`} />
        <Stat label="Avg errors / tick" value={errorRate.toFixed(2)} />
        <Stat label="Last tenants eligible" value={String(last?.tenants_eligible ?? '—')} />
      </div>
      <div className="overflow-x-auto rounded-md border border-border">
        <table className="w-full text-xs">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              <th className="p-2 text-left">When</th>
              <th className="p-2 text-right">Total</th>
              <th className="p-2 text-right">Eligible</th>
              <th className="p-2 text-right">Skipped</th>
              <th className="p-2 text-right">Errors</th>
              <th className="p-2 text-right">Duration</th>
              <th className="p-2 text-right">Cache</th>
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, 50).map((r) => (
              <tr key={r.id} className="border-t border-border">
                <td className="p-2">{new Date(r.ts).toLocaleTimeString()}</td>
                <td className="p-2 text-right">{r.tenants_total}</td>
                <td className="p-2 text-right">{r.tenants_eligible}</td>
                <td className="p-2 text-right">{r.tenants_skipped}</td>
                <td className={`p-2 text-right ${r.errors > 0 ? 'text-destructive' : ''}`}>{r.errors}</td>
                <td className="p-2 text-right">{r.duration_ms} ms</td>
                <td className="p-2 text-right">
                  {r.sub_cache_cold ? 'cold' : `${r.sub_cache_age_ms ?? 0} ms`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-lg font-semibold">{value}</div>
    </div>
  );
}
