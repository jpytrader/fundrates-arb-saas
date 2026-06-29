import type { ArbPosition, ArbConfig, SupportedPair, ExchangeId } from '../types';
export declare function createPosition(pair: SupportedPair, exchange: ExchangeId, spotOrderId: string, perpOrderId: string, spotEntry: number, perpEntry: number, sizeUsd: number): ArbPosition;
/**
 * Determine if a position should be exited.
 *
 * Exit conditions (ALL must be met — AND logic):
 *   1. Funding rate has flipped to ≤ 0 (no longer profitable)
 *   AND
 *   2. Max hold time has been exceeded
 *
 * The delta-neutral structure ensures the position is unliquidatable,
 * so there is no urgency to exit on a single condition. The engine
 * waits for both conditions to confirm the position is no longer viable.
 */
export declare function shouldExit(pos: ArbPosition, currentFundingRate: number, maxHoldMs: number, zScore?: number | null): {
    exit: boolean;
    reason: string;
};
/**
 * Calculate margin health percentage for a position.
 *
 * Margin health = (collateral value / position notional) * 100
 * In a delta-neutral setup, the spot position IS the collateral for the perp.
 *
 * As long as spot value ≈ perp notional, margin health stays near 100%.
 * Divergence is temporary (basis risk) and self-corrects at funding intervals.
 *
 * This is purely informational — it never triggers exits.
 */
export declare function calculateMarginHealth(spotValue: number, perpNotional: number): number;
/**
 * Check if a position needs rebalancing to correct hedge ratio drift.
 *
 * Rebalancing is required IF AND ONLY IF:
 *   1. `config.rebalanceDays > 0` (slider is not "Off")
 *   2. The active exchange's margin mode is DISABLED
 *      (Portfolio Margin for Hyperliquid, Unified Account for OKX)
 *   3. The position has been open/since-last-rebalance for >= rebalanceDays
 *   4. The position is still open
 *
 * When margin mode is enabled, the exchange handles cross-margining natively,
 * so rebalancing is unnecessary and this function always returns false.
 */
export declare function needsRebalance(pos: ArbPosition, config: ArbConfig, now?: number): {
    rebalance: boolean;
    reason: string;
};
