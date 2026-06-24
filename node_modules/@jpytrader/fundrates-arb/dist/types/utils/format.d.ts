/**
 * Compact USD formatter: $1.2k, $3.4m, $1.2b
 * For small amounts (<1000), shows 2 decimal places.
 */
export declare function formatUsd(v: number): string;
/**
 * Compact USD value without the '$' prefix: 12.5k, 3.4m, 450.00
 * Used when the '$' symbol is already in the stat card title.
 */
export declare function formatUsdValue(v: number): string;
/**
 * Compact USD with sign prefix for P&L display: +$1.2k, -$450.00
 */
export declare function formatPnl(v: number): string;
