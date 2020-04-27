import { PropsWithChildren, ReactElement } from 'react';
import { Tree } from './Shared';
export interface WizardProps<T extends Tree> {
    tree: T;
    first: keyof T;
}
/**
 * Declarative Wizard component for React.
 * @param props Takes in a tree, the first step of the wizard, and children.
 */
export declare function Wizard<T extends Tree>({ children, tree, first, }: PropsWithChildren<WizardProps<T>>): ReactElement;
