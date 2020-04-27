import React, { PropsWithChildren } from 'react';
import { Tree, WizardContext, WizardContextProps } from './Shared';

export interface ControlHook<T extends Tree> {
  step: keyof T;
  tree: T;
  destinations: Record<keyof T, () => void>;
}

/**
 * A react hook that exposes the current step, possible destinations, and the tree being used.
 * Destinations is an object where the keys are possible destinations and the values are
 * functions to move the wizard there.
 */
export function useControls<T extends Tree>(): ControlHook<T> {
  const { getControls, step, tree } = React.useContext(
    WizardContext as React.Context<WizardContextProps<T>>
  );
  return { step, tree, destinations: getControls() };
}

export interface ControlProps<T extends Tree> {
  children: (steps: ControlHook<T>) => React.ReactNode;
}

/**
 * Controls React Component
 * @param ChildrenRenderProp Children is a function that exposes the current step, possible destinations,
 * and the tree being used. Destinations is an object where the keys are possible destinations and the
 * values are functions to move the wizard there.
 */
export function Controls<T extends Tree>({
  children,
}: PropsWithChildren<ControlProps<T>>) {
  const getControls = useControls<T>();
  return <>{children({ ...getControls })}</>;
}
