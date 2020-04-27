import React, { PropsWithChildren } from 'react';
import { Tree } from './Shared';
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
export declare function useControls<T extends Tree>(): ControlHook<T>;
export interface ControlProps<T extends Tree> {
    children: (steps: ControlHook<T>) => React.ReactNode;
}
/**
 * Controls React Component
 * @param ChildrenRenderProp Children is a function that exposes the current step, possible destinations,
 * and the tree being used. Destinations is an object where the keys are possible destinations and the
 * values are functions to move the wizard there.
 */
export declare function Controls<T extends Tree>({ children, }: PropsWithChildren<ControlProps<T>>): JSX.Element;
