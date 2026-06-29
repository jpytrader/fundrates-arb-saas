import React from 'react';
import type { ArbPosition, FundingRate, Position } from '../types';
interface OpenPositionsPanelProps {
    positions: ArbPosition[];
    fundingRates: FundingRate[];
    spotBalances: Position[];
    maxSlippagePct: number;
    isDryRun?: boolean;
    onCloseAll?: () => void;
}
export declare const OpenPositionsPanel: React.FC<OpenPositionsPanelProps>;
export {};
