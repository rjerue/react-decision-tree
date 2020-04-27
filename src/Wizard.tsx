import React, { PropsWithChildren, ReactElement } from 'react';
import { Tree, ControlType, WizardContext } from './Shared';

export interface WizardProps<T extends Tree> {
  tree: T;
  first: keyof T;
}

/**
 * Declarative Wizard component for React.
 * @param props Takes in a tree, the first step of the wizard, and children.
 */
export function Wizard<T extends Tree>({
  children,
  tree,
  first,
}: PropsWithChildren<WizardProps<T>>): ReactElement {
  // Check tree for bad values
  React.useEffect(() => {
    const allSteps = Object.keys(tree);
    if (!allSteps.includes(first as string)) {
      console.warn(`First step ${first} is now found in tree as key`);
    }
  }, [first, tree]);
  React.useEffect(() => {
    const allSteps = Object.keys(tree);
    Object.entries(tree).forEach(([key, dests]) => {
      dests.forEach(d => {
        if (!allSteps.includes(d)) {
          console.warn(
            `Tree definition includes path to ${d} from ${key}. However ${d} is not in tree as a key.`
          );
        }
      });
    });
  }, [tree]);

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
