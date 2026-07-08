export type ExchangeId = 'hyperliquid' | 'okx';
export interface ExchangeKeys {
    hyperliquid?: {
        apiKey: string;
        apiSecret: string;
    };
    okx?: {
        apiKey: string;
        apiSecret: string;
        passphrase: string;
    };
}
export declare const SUPPORTED_PAIRS: readonly ["BTC/USDT", "ETH/USDT", "OP/USDT", "SOL/USDT", "XRP/USDT", "HYPE/USDT"];
export type SupportedPair = (typeof SUPPORTED_PAIRS)[number];
export type YieldMode = 'sweep' | 'compound';
export interface ArbConfig {
    dryRun: boolean;
    targetExchange: ExchangeId;
    pairs: SupportedPair[];
    minFundingRatePct: number;
    positionSizeUsd: number;
    maxHoldDays: number;
    marginHealthThresholdPct: number;
    capitalAllocationPct: number;
    rebalanceDays: number;
    maxDailyLossUsd: number;
    maxSlippagePct: number;
    scanIntervalSecs: number;
    usePortfolioMargin: boolean;
    useUnifiedAccount: boolean;
    useCapitalAllocation: boolean;
    assetAllocations: Partial<Record<SupportedPair, number>>;
    discordWebhookUrl?: string;
    yieldMode: YieldMode;
    compoundMinPct: number;
}
export declare const DEFAULT_CONFIG: ArbConfig;
export interface FundingRate {
    pair: string;
    /**
     * Always stored as 8h-equivalent decimal (canonical internal unit).
     * e.g. 0.0001 = 0.01% per 8h
     * HL raw rates (1h) are multiplied by 8 at the adapter boundary before storage.
     * OKX rates are native 8h — no conversion needed.
     */
    rate: number;
    nextFundingTime: number;
    timestamp?: number;
    /**
     * Native settlement cadence for the source exchange.
     * 1 = Hyperliquid (hourly settlements), 8 = OKX (8-hour settlements).
     * Used by display components to show "1h settle" / "8h settle" badges
     * and to contextualise the `nextFundingTime` countdown.
     * The `rate` field is ALWAYS 8h-equivalent regardless of this value.
     */
    intervalHours: number;
}
/**
 * Native funding settlement interval per exchange.
 * The `rate` field in FundingRate is always normalised to 8h-equivalent;
 * this constant records the exchange's real cadence for display purposes.
 */
export declare const EXCHANGE_INTERVAL_HOURS: Record<ExchangeId, number>;
/** Exchange-reported funding settlement record */
export interface FundingSettlement {
    pair: string;
    amount: number;
    rate: number;
    settledAt: number;
}
export interface OrderParams {
    pair: string;
    side: 'buy' | 'sell';
    sizeUsd: number;
    reduceOnly?: boolean;
    orderType?: 'market' | 'limit';
    limitPrice?: number;
    /**
     * Current mark price for this leg (spot or perp).
     * Adapters use this to convert `sizeUsd` → exchange-native base-asset qty
     * or contract count before placing the order.
     * Falls back to `limitPrice` when not provided.
     */
    markPrice?: number;
}
export interface OrderResult {
    orderId: string;
    filledSize: number;
    avgPrice: number;
    status: 'filled' | 'partial' | 'rejected';
}
export interface Position {
    pair: string;
    side: 'long' | 'short';
    size: number;
    entryPrice: number;
    markPrice: number;
    unrealizedPnl: number;
    instrument: 'spot' | 'perp';
}
export interface ExchangeAdapter {
    name?: string;
    isLive?: boolean;
    getFundingRates(pairs: string[]): Promise<FundingRate[]>;
    placeSpotOrder(params: OrderParams): Promise<OrderResult>;
    placePerpOrder(params: OrderParams): Promise<OrderResult>;
    getPositions(): Promise<Position[]>;
    cancelOrder(orderId: string, pair?: string): Promise<void>;
    /**
     * Convert a UI pair string (e.g. "BTC/USDT") to the exchange-native
     * instrument identifier used by order-status polling and other API calls.
     * Optional — engine falls back to the raw pair string when absent.
     *
     * type='SPOT' → e.g. "BTC-USDT" (OKX) or "BTC" (HL coin name)
     * type='SWAP' → e.g. "BTC-USD-SWAP" (OKX) or "BTC" (HL coin name)
     */
    toInstId?(pair: string, type: 'SPOT' | 'SWAP'): string;
    /** Fetch current mark prices for pairs from the exchange API (on-chain source of truth) */
    getMarkPrices(pairs: string[]): Promise<MarkPrice[]>;
    /**
     * Query actual funding settlement history from the exchange.
     * Live mode: returns real settlement records for reconciliation.
     * Dry-run: returns empty array (no exchange account exists).
     */
    getFundingHistory?(pairs: string[], sinceMs: number): Promise<FundingSettlement[]>;
    /**
     * WebSocket-based fallback for funding settlement data.
     * Opens a short-lived subscription (up to 15s) to collect settlement events
     * when REST getFundingHistory has exhausted retries.
     * Live mode: subscribes to exchange-specific funding channels.
     * Dry-run: returns empty array.
     */
    getFundingHistoryWs?(pairs: string[], sinceMs: number): Promise<FundingSettlement[]>;
    /**
     * Poll order status by ID. Used for fill verification in atomic execution.
     * Live mode: queries exchange order status endpoint.
     * Dry-run: returns the synthetic fill immediately.
     */
    getOrderStatus?(orderId: string, instId?: string): Promise<OrderResult>;
    /**
     * Transfer realized funding yields from the derivatives/margin wallet to the spot wallet.
     * Called after a position is closed when sweepYieldsToSpot is enabled.
     * Returns true if the transfer succeeded, false otherwise.
     * In unified/portfolio margin modes, this is a no-op (returns true).
     * In non-unified modes, this performs an actual internal transfer.
     */
    transferToSpot?(params: {
        amountUsd: number;
        asset: string;
    }): Promise<boolean>;
    /**
     * Get the available settlement balance (e.g., USDT/USDC) for spot purchases.
     * Used to validate sufficient funds before opening spot positions in live mode.
     * Returns the available balance in USD terms.
     */
    getSettlementBalance?(asset: string): Promise<number>;
    /**
     * Lightweight signed smoke-test of the configured API credentials.
     * Used by:
     *   - the React `KeysPanel` "Test connection" button, and
     *   - the SaaS `rotate-exchange-key` edge function before persisting to Vault.
     *
     * MUST issue a *signed*, authenticated read (not a public endpoint) so that
     * invalid keys, wrong passphrase, or revoked permissions are surfaced.
     * Live adapters: signed account/userState GET. Dry-run adapters: `{ ok: true }`.
     * Implementations must never throw — failures are returned as `{ ok: false, reason }`.
     */
    validateKeys?(): Promise<{
        ok: true;
    } | {
        ok: false;
        reason: string;
    }>;
}
/** Mark price data fetched from exchange API */
export interface MarkPrice {
    pair: string;
    spotPrice: number;
    perpPrice: number;
    timestamp: number;
}
export type EnginePhase = 'idle' | 'scanning' | 'executing' | 'monitoring' | 'exiting' | 'error';
export interface ArbPosition {
    id: string;
    pair: SupportedPair;
    exchange: ExchangeId;
    spotOrderId: string;
    perpOrderId: string;
    spotEntry: number;
    perpEntry: number;
    sizeUsd: number;
    openedAt: number;
    fundingCollected: number;
    unrealizedPnl: number;
    status: 'open' | 'closing' | 'closed' | 'rebalancing' | 'rebalance_failed';
    /** Epoch ms of last funding accrual — used to prorate partial intervals */
    lastFundingAccrualAt: number;
    /** Current margin health ratio (%) — monitored, never triggers exit */
    marginHealthPct: number;
    /** Epoch ms of last rebalance — defaults to openedAt on creation */
    lastRebalancedAt: number;
    /** Cumulative execution cost (slippage) for this position's fills */
    executionCost: number;
}
export interface EngineState {
    phase: EnginePhase;
    positions: ArbPosition[];
    fundingRates: FundingRate[];
    totalFundingCollected: number;
    totalRealizedPnl: number;
    totalExecutionCost: number;
    lastScanAt: number | null;
    errors: string[];
}
export interface ExecutionEvent {
    type: 'position_opened' | 'position_closed' | 'funding_collected' | 'rebalance' | 'error' | 'pnl_snapshot' | 'margin_warning' | 'yield_swept' | 'scan_heartbeat' | 'scan_noop' | 'reconciliation_drift' | 'untracked_position' | 'funding_recovered' | 'funding_compounded';
    timestamp: number;
    data: Record<string, unknown>;
}
import type { StateStore } from './persistence/types';
export interface FundingRateArbProps {
    exchangeKeys?: ExchangeKeys;
    onExecution?: (event: ExecutionEvent) => void;
    onError?: (err: Error) => void;
    theme?: 'light' | 'dark';
    defaultConfig?: Partial<ArbConfig>;
    /** Custom persistence store. Defaults to LocalStorageStore. */
    persistenceStore?: StateStore;
    /**
     * Optional React node rendered inside the FundingRateArb container
     * immediately below the header title row, above the main dashboard content.
     * The slot imposes no styling — the caller owns all visual design.
     * Useful for status banners, account indicators, custom alerts, etc.
     */
    headerSlot?: React.ReactNode;
}
