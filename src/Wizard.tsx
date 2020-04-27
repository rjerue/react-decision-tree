import React, { PropsWithChildren, ReactElement } from 'react';
import { Tree, ControlType, WizardContext } from './Shared';

export interface WizardProps<T extends Tree> {
  tree: T;
  first: keyof T;
}

export function Wizard<T extends Tree>({
  children,
  tree,
  first,
}: PropsWithChildren<WizardProps<T>>): ReactElement {
  const [step, setStep] = React.useState<keyof T>(first);

  const getControls = () => {
    const possibleSteps = tree[step];
    return possibleSteps.reduce<ControlType<T>>((accum, step) => {
      const next = {
        [step]: () => {
          setStep(step);
        },
      };
      return {
        ...accum,
        ...next,
      };
    }, {} as ControlType<T>);
  };

  return (
    <WizardContext.Provider
      value={{
        tree,
        step: step as string,
        setStep: setStep as React.Dispatch<React.SetStateAction<any>>,
        getControls: getControls as () => Record<string, any>,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
}
