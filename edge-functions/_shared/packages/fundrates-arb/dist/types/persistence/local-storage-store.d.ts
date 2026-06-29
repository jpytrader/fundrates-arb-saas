import type { StateStore, PersistedState } from './types';
/**
 * Browser-compatible persistence using localStorage.
 * Works in Ionic/Capacitor WebView contexts.
 *
 * On first load, checks for legacy storage keys (vireson_arb_state, fra-arb-config)
 * and migrates data to the current key (fra-arb-state) automatically.
 */
export declare class LocalStorageStore implements StateStore {
    private key;
    private migrationDone;
    constructor(key?: string);
    save(state: PersistedState): Promise<void>;
    load(): Promise<PersistedState | null>;
    clear(): Promise<void>;
    /**
     * Check for data under legacy storage keys and migrate to the current key.
     * Legacy keys are removed after successful migration.
     */
    private migrateLegacyKeys;
}
