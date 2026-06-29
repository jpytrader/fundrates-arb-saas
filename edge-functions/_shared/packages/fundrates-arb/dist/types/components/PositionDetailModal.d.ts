import React from 'react';
import type { ArbPosition, FundingRate } from '../types';
interface PositionDetailModalProps {
    position: ArbPosition;
    fundingRate?: FundingRate;
    maxSlippagePct: number;
    onClose: () => void;
}
export declare const PositionDetailModal: React.FC<PositionDetailModalProps>;
export {};
