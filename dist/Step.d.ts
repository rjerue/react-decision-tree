import { PropsWithChildren } from 'react';
import { Tree } from './Shared';
export interface StepProps<T> {
    name: keyof T;
}
export declare function Step<T extends Tree>({ children, name, }: PropsWithChildren<StepProps<T>>): JSX.Element;
