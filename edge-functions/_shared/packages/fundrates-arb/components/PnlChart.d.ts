import React from 'react';
import type { PnlSnapshot } from '../persistence/types';
export type TimeRange = '1d' | '7d' | '30d';
interface PnlChartProps {
    snapshots: PnlSnapshot[];
    /** Chart height in px (default 180) */
    height?: number;
    /** Default time range (default '30d') */
    defaultRange?: TimeRange;
}
export declare const PnlChart: React.FC<PnlChartProps>;
export {};
