import React from 'react';
interface ToggleProps {
    label: string;
    checked: boolean;
    onChange: (v: boolean) => void;
    disabled?: boolean;
    /** For mutually exclusive toggles, show left/right labels */
    offLabel?: string;
    onLabel?: string;
    /** Tooltip text shown on hover */
    tooltip?: string;
    /** Tooltip position */
    tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
}
export declare const Toggle: React.FC<ToggleProps>;
export {};
