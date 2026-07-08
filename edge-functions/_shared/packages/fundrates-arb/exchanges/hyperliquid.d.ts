import type { ArbConfig, ExchangeAdapter } from '../types';
/**
 * Hyperliquid exchange adapter with production-ready EIP-712 signing
 * and WebSocket support for real-time funding rate streaming.
 *
 * Margin configuration:
 *   - All perp positions use CROSS margin (isCross: true)
 *   - Portfolio margin is enabled on first use via `userPortfolioMargin` action,
 *     which unifies spot balances + perp positions under a single margin pool.
 *     This is critical for delta-neutral arb: the spot collateral directly
 *     offsets the perp position, making liquidation virtually impossible.
 *
 * L1 Actions (orders, cancels) use the phantom agent signing pattern:
 *   1. msgpack-encode the action → keccak256 hash
 *   2. Construct a phantom agent { source, connectionId }
 *   3. Sign the agent via EIP-712 (domain: Exchange/1/chainId 1337)
 *   4. POST { action, nonce, signature, vaultAddress } to /exchange
 */
interface HLKeys {
    apiKey: string;
    apiSecret: string;
}
export interface HLWebSocketCallbacks {
    /** rate is always 8h-equivalent; intervalHours=1 signals HL's hourly settlement cadence */
    onFundingRate?: (pair: string, rate: number, nextFundingTime: number, intervalHours: number) => void;
    onError?: (error: Error) => void;
    onConnect?: () => void;
    onDisconnect?: () => void;
}
export declare class HyperliquidWebSocket {
    private ws;
    private callbacks;
    private reconnectTimer;
    private subscribedPairs;
    private isDestroyed;
    constructor(callbacks: HLWebSocketCallbacks);
    connect(): void;
    subscribeToFundingRates(pairs: string[]): void;
    private handleMidsUpdate;
    private scheduleReconnect;
    disconnect(): void;
    get connected(): boolean;
}
export declare function createHyperliquidAdapter(keys: HLKeys, config?: Partial<ArbConfig>): ExchangeAdapter;
export declare function createDryRunHyperliquidAdapter(config?: Partial<ArbConfig>): ExchangeAdapter;
export {};
