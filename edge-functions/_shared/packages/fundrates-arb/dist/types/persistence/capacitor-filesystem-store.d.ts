import { FileSystemStore } from './file-system-store';
/**
 * Capacitor Filesystem adapter for native mobile persistence.
 * Wraps @capacitor/filesystem to provide JSON state storage
 * in the app's Documents directory.
 *
 * Usage:
 * ```ts
 * import { CapacitorFilesystemStore } from '@jpytrader/fundrates-arb';
 * const store = new CapacitorFilesystemStore();
 * const engine = new ArbEngine(config, adapter, store);
 * ```
 *
 * Requires @capacitor/filesystem to be installed in the host app.
 */
export declare class CapacitorFilesystemStore extends FileSystemStore {
    constructor(fileName?: string);
}
