import React from 'react';
interface TooltipProps {
    text: string;
    children: React.ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
}
export declare const Tooltip: React.FC<TooltipProps>;
/** Small "?" info icon */
export declare const InfoIcon: React.FC<{
    size?: number;
}>;
export {};
