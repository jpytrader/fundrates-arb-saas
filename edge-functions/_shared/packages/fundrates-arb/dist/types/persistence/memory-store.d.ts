import type { StateStore, PersistedState } from './types';
/**
 * In-memory store useful for testing and environments without persistent storage.
 */
export declare class MemoryStore implements StateStore {
    private data;
    save(state: PersistedState): Promise<void>;
    load(): Promise<PersistedState | null>;
    clear(): Promise<void>;
}
