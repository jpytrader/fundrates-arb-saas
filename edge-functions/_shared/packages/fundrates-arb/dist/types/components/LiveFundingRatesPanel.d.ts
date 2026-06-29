import React from "react";
import type { FundingRate, ArbPosition } from "../types";
interface LiveFundingRatesPanelProps {
    fundingRates: FundingRate[];
    positions?: ArbPosition[];
    layout?: "grid" | "vertical";
    showTitle?: boolean;
}
export declare const LiveFundingRatesPanel: React.FC<LiveFundingRatesPanelProps>;
export {};
