import React from 'react';
import { Tree } from 'Shared';
import { Wizard as RawWizard, WizardProps } from './Wizard';
import { Step as RawStep, StepProps } from './Step';
import {
  Controls as RawControls,
  useControls as rawUseControls,
  ControlHook,
  ControlProps,
} from './Controls';

interface WizardInput<T> {
  tree: T;
  first: keyof T;
}

export function createWizard<T extends Tree>({ tree, first }: WizardInput<T>) {
  type ControlType = Record<keyof T, () => void>;

  type WizardContext = {
    tree: T;
    step: keyof T;
    setStep: (step: keyof T) => void;
    getControls: () => ControlType;
  };

  const WizardContext = React.createContext<WizardContext>({
    tree,
    step: first,
    setStep: () => {},
    getControls: () => ({} as ControlType),
  });

  const Wizard: React.FC = ({ children }) => {
    const TypedWizard = RawWizard as React.FC<WizardProps<T>>;
    return (
      <TypedWizard tree={tree} first={first}>
        {children}
      </TypedWizard>
    );
  };

  const Step: React.FC<StepProps<T>> = ({ children, name }) => {
    const TypedStep = RawStep as React.FC<StepProps<T>>;
    return <TypedStep name={name}>{children}</TypedStep>;
  };

  const useControls = (): ControlHook<T> => {
    return rawUseControls<T>();
  };

  const Controls: React.FC<ControlProps<T>> = ({ children }) => {
    const TypedControls = RawControls as React.FC<ControlProps<T>>;
    return <TypedControls>{children}</TypedControls>;
  };

  return { Wizard, Step, Controls, useControls };
}
