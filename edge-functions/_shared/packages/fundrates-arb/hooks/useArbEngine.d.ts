import type { ArbConfig, EngineState, ExecutionEvent, ExchangeAdapter, ExchangeKeys } from '../types';
import type { StateStore, PnlSnapshot } from '../persistence/types';
export type ZScoreWarmupEntry = {
    pair: string;
    samples: number;
    required: number;
    ready: boolean;
};
export declare function useArbEngine(exchangeKeys?: ExchangeKeys, initialConfig?: Partial<ArbConfig>, onExecution?: (e: ExecutionEvent) => void, onError?: (err: Error) => void, persistenceStore?: StateStore): {
    config: ArbConfig;
    state: EngineState;
    pnlHistory: PnlSnapshot[];
    zScoreWarmup: ZScoreWarmupEntry[];
    updateConfig: (partial: Partial<ArbConfig>) => void;
    start: () => void;
    stop: () => void;
    closeAllPositions: () => Promise<void>;
    adapter: ExchangeAdapter | null;
    running: boolean;
};
export { HyperliquidWebSocket } from '../exchanges/hyperliquid';
export { OKXWebSocket } from '../exchanges/okx';
