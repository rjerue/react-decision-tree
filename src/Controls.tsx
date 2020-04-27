import React, { PropsWithChildren } from 'react';
import { Tree, WizardContext, WizardContextProps } from './Shared';

export interface ControlHook<T extends Tree> {
  step: keyof T;
  tree: T;
  destinations: Record<keyof T, () => void>;
}

export function useControls<T extends Tree>(): ControlHook<T> {
  const { getControls, step, tree } = React.useContext(
    WizardContext as React.Context<WizardContextProps<T>>
  );
  return { step, tree, destinations: getControls() };
}

export interface ControlProps<T extends Tree> {
  children: (steps: ControlHook<T>) => React.ReactNode;
}

export function Controls<T extends Tree>({
  children,
}: PropsWithChildren<ControlProps<T>>) {
  const getControls = useControls<T>();
  return <>{children({ ...getControls })}</>;
}
