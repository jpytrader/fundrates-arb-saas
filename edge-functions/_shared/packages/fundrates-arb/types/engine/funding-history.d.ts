/**
 * Rolling 7-day funding rate history buffer with Z-Score calculation.
 *
 * Used internally by the engine for statistical entry/exit gating.
 * Not persisted — rebuilds from live data after restart.
 */
/** Rolling window duration: 7 days */
export declare const WINDOW_MS: number;
/** Minimum samples required for a valid Z-Score */
export declare const MIN_SAMPLES = 3;
/** Z-Score threshold for entry gating (top ~2.3% of observations) */
export declare const Z_THRESHOLD = 2;
export declare class FundingRateHistory {
    private buffers;
    /** Append a rate observation and evict entries older than 7 days. */
    record(pair: string, rate: number, timestamp: number): void;
    /** Mean of rates in the rolling window. Returns null if insufficient data. */
    getMean(pair: string): number | null;
    /** Population standard deviation. Returns null if insufficient data. */
    getStdDev(pair: string): number | null;
    /**
     * Z-Score of the latest rate observation: (latest - mean) / stddev.
     * Returns null if fewer than MIN_SAMPLES observations exist (warmup period).
     */
    getZScore(pair: string): number | null;
    /** Number of samples currently in the buffer for a pair. */
    getSampleCount(pair: string): number;
}
