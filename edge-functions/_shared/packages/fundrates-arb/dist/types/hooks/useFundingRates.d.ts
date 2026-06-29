import type { ExchangeAdapter, FundingRate, ExchangeId } from '../types';
/**
 * Hook for funding rates with WebSocket streaming (primary)
 * and REST polling (fallback).
 */
export declare function useFundingRates(adapter: ExchangeAdapter | null, pairs: string[], enabled: boolean, exchange?: ExchangeId): {
    rates: FundingRate[];
    loading: boolean;
    error: string | null;
    wsConnected: boolean;
    refetch: () => Promise<void>;
};
