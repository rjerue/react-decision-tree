import React from 'react';

export interface Tree {
  readonly [step: string]: readonly (string | Record<string, string>)[];
}

export type ControlType<T extends Tree> = Record<keyof T, () => void>;

export interface WizardContextProps<T extends Tree> {
  tree: T;
  step: string;
  setStep: React.Dispatch<React.SetStateAction<keyof T>>;
  getControls: () => ControlType<T>;
}

export const WizardContext = React.createContext<WizardContextProps<any>>({
  tree: {},
  step: '',
  setStep: () => {},
  getControls: () => ({}),
});
