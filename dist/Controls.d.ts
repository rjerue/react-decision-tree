import React, { PropsWithChildren } from 'react';
import { Tree } from 'Shared';
export interface ControlHook<T extends Tree> {
    step: keyof T;
    tree: T;
    destinations: Record<keyof T, () => void>;
}
export declare function useControls<T extends Tree>(): ControlHook<T>;
export interface ControlProps<T extends Tree> {
    children: (steps: ControlHook<T>) => React.ReactNode;
}
export declare function Controls<T extends Tree>({ children, }: PropsWithChildren<ControlProps<T>>): JSX.Element;
