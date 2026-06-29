/**
 * Discord webhook notification dispatcher for FRA engine events.
 * Posts color-coded embeds for position opens/closes, margin warnings, and daily P&L summaries.
 * All calls are fire-and-forget — failures never block the engine.
 */
import type { EngineState, ExecutionEvent } from '../types';
export declare function notifyPositionOpened(webhookUrl: string, data: Record<string, unknown>): void;
export declare function notifyPositionClosed(webhookUrl: string, data: Record<string, unknown>): void;
export declare function notifyMarginWarning(webhookUrl: string, data: Record<string, unknown>): void;
export declare function notifyDailySummary(webhookUrl: string, state: EngineState, exchange: string): void;
export declare function sendTestNotification(webhookUrl: string): Promise<boolean>;
export declare function dispatchDiscordNotification(webhookUrl: string | undefined, event: ExecutionEvent): void;
