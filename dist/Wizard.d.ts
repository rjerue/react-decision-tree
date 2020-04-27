import { PropsWithChildren, ReactElement } from 'react';
import { Tree } from 'Shared';
export interface WizardProps<T extends Tree> {
    tree: T;
    first: keyof T;
}
export declare function Wizard<T extends Tree>({ children, tree, first, }: PropsWithChildren<WizardProps<T>>): ReactElement;
