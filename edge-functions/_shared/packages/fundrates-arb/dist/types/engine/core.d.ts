import type { ArbConfig, EngineState, ExecutionEvent, ExchangeAdapter } from '../types';
import type { StateStore, PnlSnapshot } from '../persistence/types';
export declare class ArbEngine {
    private config;
    private adapter;
    private state;
    private store;
    private pnlHistory;
    private scanTimer;
    private persistTimer;
    private listeners;
    private eventListeners;
    private lastNoopKey;
    private lastNoopEmitAt;
    private suppressedNoopCount;
    private scanCount;
    private manualTick;
    private fundingRestFailCount;
    private fundingHistory;
    constructor(config: ArbConfig, adapter: ExchangeAdapter, store?: StateStore, opts?: {
        manualTick?: boolean;
    });
    start(): Promise<void>;
    stop(): void;
    /**
     * Release timers without mutating engine phase or persisting state.
     * Used when the engine instance is being *replaced* (e.g. adapter change)
     * rather than explicitly stopped by the operator.
     */
    teardown(): void;
    /**
     * Close all open positions (paper mode only).
     * In live mode, positions are managed by the engine's exit conditions.
     */
    closeAllPositions(): Promise<void>;
    updateConfig(next: Partial<ArbConfig>): void;
    subscribe(fn: (s: EngineState) => void): () => void;
    onExecution(fn: (e: ExecutionEvent) => void): () => void;
    /**
     * Check if the user already holds the base asset in their spot wallet.
     * If collateral exists → we only need to short perp (spot = implicit long).
     * If no collateral  → we buy spot + short perp (standard cash-and-carry).
     */
    private hasCollateral;
    getState(): EngineState;
    getPnlHistory(): PnlSnapshot[];
    /** Warmup status for each configured pair's z-score buffer. */
    getZScoreWarmup(): Array<{
        pair: string;
        samples: number;
        required: number;
        ready: boolean;
    }>;
    private schedulePersist;
    private persistNow;
    private restore;
    clearPersistedState(): Promise<void>;
    /**
     * Poll getOrderStatus until the order is filled or rejected, or timeout is reached.
     * Returns the final OrderResult. If adapter doesn't support getOrderStatus,
     * returns the original order result.
     */
    private awaitFill;
    /**
     * Accumulate funding payments for all open positions.
     *
     * Live mode: query actual settlement records from the exchange via getFundingHistory().
     * Paper mode: use time-prorated approximation from current funding rate (no exchange to query).
     *
     * Fallback: if live mode API call fails, use approximation with a warning event.
     */
    private accumulateFunding;
    /**
     * Live mode funding: query actual settlements from exchange.
     *
     * 3-tier resilience chain:
     *   Tier 1: REST with retries (3 attempts, exponential backoff 2s/4s)
     *   Tier 2: WSS fallback (subscribe for up to 15s)
     *   Tier 3: Last-resort approximation (only if both REST and WSS fail)
     */
    private accumulateFundingFromExchange;
    /**
     * Paper mode funding: time-prorated approximation using current funding rate.
     * This is the ONLY funding source in paper mode — correct because there is
     * no exchange account to reconcile against.
     */
    private accumulateFundingApproximation;
    /**
     * Apply auto-compounding: reinvest accumulated funding yield into position size.
     * Only active when yieldMode === 'compound'. Checks each open position's
     * funding-to-position-value ratio against compoundMinPct threshold.
     */
    private applyCompounding;
    /**
     * Fetch live mark prices from exchange API and update all open positions'
     * unrealizedPnl based on on-chain data. Returns a P&L snapshot.
     */
    private updatePnlFromApi;
    /**
     * Compare engine's internal position state against the exchange's actual positions.
     * Only runs in live mode — paper mode has no exchange state to compare against.
     * Emits warnings for drift; does NOT auto-correct.
     */
    private reconcilePositions;
    /**
     * Run exactly one scan/exec cycle. Public so headless hosts (Node/Deno
     * cron, Capacitor BackgroundRunner, tests) can drive the engine without
     * the internal `setInterval`. UI consumers normally rely on `start()`'s
     * timer instead.
     */
    tick(): Promise<void>;
    private scan;
    private checkEntries;
    /**
     * Build a canonical distinctness key from structured noop reasons.
     * Sorted deterministically so pair order doesn't create fake uniqueness.
     */
    private buildNoopKey;
    /**
     * Emit scan_noop only when the canonical key has changed OR
     * at least 3× scanIntervalSecs has elapsed since the last emission.
     * Suppressed duplicates are tracked and folded into the next visible entry.
     */
    private emitNoopIfDistinct;
    /**
     * Resolve the effective position size for a given pair.
     * When useCapitalAllocation is enabled, uses the per-asset allocation.
     * Otherwise falls back to the global positionSizeUsd.
     */
    private getPositionSize;
    /**
     * Open a new arbitrage position with atomic sequential leg execution.
     *
     * Flow (cash-and-carry, no collateral):
     *   1. Place spot buy → poll until filled/rejected
     *   2. If spot rejected → abort
     *   3. If spot filled → place perp sell → poll until filled/rejected
     *   4. If perp rejected → place spot SELL (reduceOnly) to unwind leg 1 → emit error
     *   5. If both filled → create position
     *
     * Flow (collateral-held):
     *   1. Place perp sell → poll until filled/rejected
     *   2. If rejected → abort
     *   3. If filled → create position
     *
     * Dry-run: same sequential flow with instant synthetic fills.
     */
    private openPosition;
    private checkExits;
    private checkRebalances;
    /**
     * Rebalance a position to correct hedge ratio drift.
     * Uses intermediate 'rebalancing' status to prevent scan-loop interference.
     *
     * - Cash-and-carry: close both legs, re-open at current mark prices.
     * - Collateral-held: close and re-open only the perp leg; spot stays.
     *
     * If close succeeds but re-open fails, position enters 'rebalance_failed'
     * status to prevent re-entry and alert the operator.
     */
    private rebalancePosition;
    /** Update a single position's status in-place. */
    private updatePositionStatus;
    private closePosition;
    private update;
    private emit;
}
