import React from 'react';
import type { ExchangeKeys, ExchangeId } from '../types';
interface KeysPanelProps {
    exchangeKeys: ExchangeKeys;
    targetExchange: ExchangeId;
    onChange: (keys: ExchangeKeys) => void;
    disabled?: boolean;
}
export declare function loadKeysFromStorage(): ExchangeKeys;
export declare function saveKeysToStorage(keys: ExchangeKeys): void;
export declare function clearKeysFromStorage(): void;
/** Check whether keys are configured for a given exchange */
export declare function hasKeysForExchange(keys: ExchangeKeys, exchange: ExchangeId): boolean;
export declare const KeysPanel: React.FC<KeysPanelProps>;
export {};
