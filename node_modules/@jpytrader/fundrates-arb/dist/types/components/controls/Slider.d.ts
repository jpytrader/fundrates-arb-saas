import React from 'react';
interface SliderProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    unit?: string;
    formatValue?: (v: number) => string;
    onChange: (v: number) => void;
    disabled?: boolean;
    /** Tooltip text shown on hover */
    tooltip?: string;
    tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
}
export declare const Slider: React.FC<SliderProps>;
export {};
