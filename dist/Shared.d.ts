import React from 'react';
export interface Tree {
    readonly [step: string]: readonly string[];
}
export declare type ControlType<T extends Tree> = Record<keyof T, () => void>;
export interface WizardContextProps<T extends Tree> {
    tree: T;
    step: string;
    setStep: React.Dispatch<React.SetStateAction<keyof T>>;
    getControls: () => ControlType<T>;
}
export declare const WizardContext: React.Context<WizardContextProps<any>>;
