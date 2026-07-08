import type { ArbPosition, ArbConfig, EnginePhase } from '../types';
/** A point-in-time P&L snapshot sourced from on-chain / exchange API data */
export interface PnlSnapshot {
    timestamp: number;
    /** Total unrealized P&L across all open positions (from API mark prices) */
    totalUnrealizedPnl: number;
    /** Cumulative realized P&L (closed positions) */
    totalRealizedPnl: number;
    /** Total funding payments collected (from exchange API) */
    totalFundingCollected: number;
    /** Net P&L = realized + unrealized + funding */
    netPnl: number;
    /** Number of open positions at snapshot time */
    openPositionCount: number;
    /** Cumulative execution cost (slippage + fees) across all fills */
    totalExecutionCost: number;
    /** Per-position mark prices fetched from exchange API */
    positionMarks: Array<{
        positionId: string;
        pair: string;
        spotMarkPrice: number;
        perpMarkPrice: number;
        unrealizedPnl: number;
    }>;
}
/** Serializable snapshot of engine state for crash recovery */
export interface PersistedState {
    version: number;
    savedAt: number;
    phase: EnginePhase;
    positions: ArbPosition[];
    totalFundingCollected: number;
    /** Cumulative execution cost (slippage) across all fills — persisted so analytics survive restarts */
    totalExecutionCost?: number;
    config: ArbConfig;
    /** Historical P&L snapshots (capped at MAX_PNL_SNAPSHOTS) */
    pnlHistory: PnlSnapshot[];
    /** Whether the engine was actively running (scanning) when last persisted */
    isRunning?: boolean;
}
/** Abstract storage backend – implementations can target localStorage, file system, etc. */
export interface StateStore {
    save(state: PersistedState): Promise<void>;
    load(): Promise<PersistedState | null>;
    clear(): Promise<void>;
}
export declare const PERSISTENCE_VERSION = 5;
export declare const DEFAULT_STORAGE_KEY = "fra-arb-state";
/** Legacy storage keys from previous versions — checked during migration */
export declare const LEGACY_STORAGE_KEYS: readonly ["vireson_arb_state", "fra-arb-config"];
export declare const MAX_PNL_SNAPSHOTS = 1440;
