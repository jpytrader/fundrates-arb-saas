import React from 'react';
import type { ArbConfig, ExchangeKeys, FundingRate } from '../types';
interface ConfigPanelProps {
    config: ArbConfig;
    onChange: (partial: Partial<ArbConfig>) => void;
    exchangeKeys?: ExchangeKeys;
    onKeysChange?: (keys: ExchangeKeys) => void;
    disabled?: boolean;
    fundingRates?: FundingRate[];
    /** Live exchange balance in USD (null = dry-run / unavailable) */
    liveBalance?: number | null;
}
export declare const ConfigPanel: React.FC<ConfigPanelProps>;
export {};
