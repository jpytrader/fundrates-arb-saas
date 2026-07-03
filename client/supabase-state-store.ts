import type { SupabaseClient } from '@supabase/supabase-js';
import type {
  StateStore,
  PersistedState,
  PnlSnapshot,
} from '@jpytrader/fundrates-arb';
import { PERSISTENCE_VERSION } from '@jpytrader/fundrates-arb';

/**
 * SupabaseStateStore — external StateStore adapter for the fundrates-arb component.
 *
 * Persists engine state, positions and P&L history into a per-user Supabase row,
 * scoped by RLS to `auth.uid()`. Designed to coexist with the server-side engine
 * runner (edge function) — both read/write the same `fra_state` row.
 *
 * Strategy:
 *   • `save()` writes the entire PersistedState as JSONB into `fra_state.state`.
 *   • `load()` reads that JSONB back and runs the same version-guard the
 *     LocalStorageStore uses.
 *   • Positions & PnL history are ALSO mirrored into denormalized tables so the
 *     server-side engine and analytics queries can index them — but the JSONB
 *     blob remains the source of truth for the client to keep parity with the
 *     local store contract.
 */
export class SupabaseStateStore implements StateStore {
  
  // 🌟 NEW PARAMETER: Store a reference to an active reactive update listener
  private onStateUpdateListener: ((state: PersistedState) => void) | null = null;

  constructor(
    private supabase: SupabaseClient,
    private userId: string,
  ) {}

  // 🌟 NEW METHOD: Allows your React workspace to register an update handler
  public onStateUpdate(callback: (state: PersistedState) => void): void {
    this.onStateUpdateListener = callback;
  }

  // 🌟 NEW METHOD: Invoked externally by your Realtime subscription pipeline
  public hydrate(rawState: unknown): void {
    if (!rawState) return;
    const parsed = rawState as PersistedState;

    // Apply the same robust version guards used inside your load() loop string
    if (
      parsed.version !== PERSISTENCE_VERSION &&
      parsed.version !== PERSISTENCE_VERSION - 1
    ) {
      return;
    }

    const standardState: PersistedState = {
      ...parsed,
      version: PERSISTENCE_VERSION,
      isRunning: parsed.isRunning ?? false,
    };

    // 🚀 FIRE LISTENER: Push the fresh state inline straight into the widget framework context
    if (this.onStateUpdateListener) {
      this.onStateUpdateListener(standardState);
    }
  }

  async save(state: PersistedState): Promise<void> {
    // Upsert the canonical JSONB blob
    const { error } = await this.supabase
      .from('fra_state')
      .upsert(
        {
          user_id: this.userId,
          state: state as unknown as Record<string, unknown>,
          version: state.version,
          is_running: state.isRunning ?? false,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id' },
      );

    if (error) {
      // Non-fatal: the engine should keep running on transient persistence loss
      // eslint-disable-next-line no-console
      console.warn('[SupabaseStateStore] save failed:', error.message);
      return;
    }

    // Best-effort denormalized mirror — failures here never block the engine
    void this.mirrorPositions(state);
    void this.mirrorPnlSnapshot(state.pnlHistory);
  }

  async load(): Promise<PersistedState | null> {
    const { data, error } = await this.supabase
      .from('fra_state')
      .select('state, version')
      .eq('user_id', this.userId)
      .maybeSingle();

    if (error || !data) return null;

    const parsed = data.state as PersistedState;

    // Version guard — accept current and one prior, matching LocalStorageStore
    if (
      parsed.version !== PERSISTENCE_VERSION &&
      parsed.version !== PERSISTENCE_VERSION - 1
    ) {
      await this.clear();
      return null;
    }

    return {
      ...parsed,
      version: PERSISTENCE_VERSION,
      isRunning: parsed.isRunning ?? false,
    };
  }

  async clear(): Promise<void> {
    await this.supabase.from('fra_state').delete().eq('user_id', this.userId);
    await this.supabase.from('fra_positions').delete().eq('user_id', this.userId);
    await this.supabase.from('fra_pnl_history').delete().eq('user_id', this.userId);
  }

  // ─── Denormalized mirrors (best-effort) ──────────────────────────────────

  private async mirrorPositions(state: PersistedState): Promise<void> {
    if (!state.positions?.length) return;
    await this.supabase.from('fra_positions').upsert(
      state.positions.map((p) => ({
        id: p.id,
        user_id: this.userId,
        pair: p.pair,
        exchange: p.exchange,
        size_usd: p.sizeUsd,
        opened_at: new Date(p.openedAt).toISOString(),
        funding_collected: p.fundingCollected,
        unrealized_pnl: p.unrealizedPnl,
        status: p.status,
        margin_health_pct: p.marginHealthPct,
        execution_cost: p.executionCost,
        raw: p as unknown as Record<string, unknown>,
      })),
      { onConflict: 'id' },
    );
  }

  private async mirrorPnlSnapshot(history: PnlSnapshot[]): Promise<void> {
    const latest = history[history.length - 1];
    if (!latest) return;
    await this.supabase.from('fra_pnl_history').insert({
      user_id: this.userId,
      timestamp: new Date(latest.timestamp).toISOString(),
      net_pnl: latest.netPnl,
      total_realized_pnl: latest.totalRealizedPnl,
      total_unrealized_pnl: latest.totalUnrealizedPnl,
      total_funding_collected: latest.totalFundingCollected,
      total_execution_cost: latest.totalExecutionCost,
      open_position_count: latest.openPositionCount,
    });
  }
}
