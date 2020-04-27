import React, { PropsWithChildren } from 'react';
import { WizardContext, Tree } from 'Shared';

export interface StepProps<T> {
  name: keyof T;
}

export function Step<T extends Tree>({
  children,
  name,
}: PropsWithChildren<StepProps<T>>) {
  const { step } = React.useContext(WizardContext);
  return <>{step === name && children}</>;
}
