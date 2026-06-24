import React from 'react';
import type { ExecutionEvent } from '../types';
interface EventLogPanelProps {
    events: ExecutionEvent[];
    pageSize?: number;
}
export declare const EventLogPanel: React.FC<EventLogPanelProps>;
export {};
