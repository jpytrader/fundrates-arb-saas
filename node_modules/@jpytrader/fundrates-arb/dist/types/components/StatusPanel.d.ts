import React from 'react';
import type { EngineState, Position } from '../types';
import type { ZScoreWarmupEntry } from '../hooks/useArbEngine';
interface StatusPanelProps {
    state: EngineState;
    wsConnected?: boolean;
    spotBalances?: Position[];
    maxSlippagePct?: number;
    targetExchange?: 'hyperliquid' | 'okx';
    dryRun?: boolean;
    positionSizeUsd?: number;
    settlementBalance?: number | null;
    zScoreWarmup?: ZScoreWarmupEntry[];
}
export declare const StatusPanel: React.FC<StatusPanelProps>;
export {};
