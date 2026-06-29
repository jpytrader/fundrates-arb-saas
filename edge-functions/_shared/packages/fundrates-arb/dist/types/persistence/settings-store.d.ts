/**
 * Lightweight persistence for UI settings (theme, collapsed panels, etc.)
 * and engine configuration. Uses localStorage with dedicated key namespaces
 * to avoid conflicts with the engine state persistence layer.
 */
import type { ArbConfig } from '../types';
export interface UISettings {
    theme: 'light' | 'dark';
    configOpen?: boolean;
}
export declare function loadUISettings(): UISettings;
export declare function saveUISettings(settings: Partial<UISettings>): void;
export declare function loadEngineConfig(): ArbConfig;
export declare function saveEngineConfig(config: ArbConfig): void;
