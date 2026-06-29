import type { StateStore, PersistedState } from './types';
/**
 * File-system persistence for Node.js and Capacitor native environments.
 * Uses JSON file storage for crash recovery of open positions.
 *
 * In Capacitor, use the Filesystem API path (e.g. via @capacitor/filesystem).
 * In Node.js, pass an absolute or relative file path.
 */
export declare class FileSystemStore implements StateStore {
    private filePath;
    private readFile;
    private writeFile;
    private deleteFile;
    constructor(options: {
        filePath: string;
        readFile: (path: string) => Promise<string>;
        writeFile: (path: string, data: string) => Promise<void>;
        deleteFile: (path: string) => Promise<void>;
    });
    /**
     * Create a FileSystemStore using Node.js `fs/promises`.
     * Usage: `FileSystemStore.node('./arb-state.json')`
     */
    static node(filePath: string): FileSystemStore;
    save(state: PersistedState): Promise<void>;
    load(): Promise<PersistedState | null>;
    clear(): Promise<void>;
}
