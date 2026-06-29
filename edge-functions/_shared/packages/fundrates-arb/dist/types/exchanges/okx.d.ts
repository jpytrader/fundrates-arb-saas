import type { ArbConfig, ExchangeAdapter } from '../types';
/**
 * OKX v5 API exchange adapter with HMAC-SHA256 signing
 * and WebSocket support for real-time funding rate streaming.
 *
 * Margin configuration:
 *   - Account mode MUST be set to "Unified" (multi-currency margin or portfolio margin)
 *     via the OKX web UI before using this adapter. The API cannot change account mode.
 *   - Perp positions use COIN-MARGINED contracts (e.g., BTC-USD-SWAP) with cross margin.
 *     Coin margin means the underlying asset (e.g., BTC) serves as collateral,
 *     so the spot holding directly backs the short perp — creating an unliquidatable position.
 *   - tdMode is set to 'cross' for all perp orders (unified cross margin).
 *   - Leverage is explicitly set to 1x per instrument before first trade.
 */
interface OKXKeys {
    apiKey: string;
    apiSecret: string;
    passphrase: string;
}
export interface OKXWebSocketCallbacks {
    onFundingRate?: (pair: string, rate: number, nextFundingTime: number) => void;
    onError?: (error: Error) => void;
    onConnect?: () => void;
    onDisconnect?: () => void;
}
export declare class OKXWebSocket {
    private ws;
    private callbacks;
    private reconnectTimer;
    private pingTimer;
    private subscribedPairs;
    private isDestroyed;
    constructor(callbacks: OKXWebSocketCallbacks);
    connect(): void;
    subscribeToFundingRates(pairs: string[]): void;
    private sendFundingRateSubscription;
    private clearPing;
    private scheduleReconnect;
    disconnect(): void;
    get connected(): boolean;
}
export declare function createOKXAdapter(keys: OKXKeys, config?: Partial<ArbConfig>): ExchangeAdapter;
export declare function createDryRunOKXAdapter(_config?: Partial<ArbConfig>): ExchangeAdapter;
export {};
