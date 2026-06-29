import React from 'react';
interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: (v: boolean) => void;
    disabled?: boolean;
}
export declare const Checkbox: React.FC<CheckboxProps>;
export {};
