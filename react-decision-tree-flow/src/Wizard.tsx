import React from 'react';

interface Wizard{
    tree: {
        [step: string]: string
    }
    middleware: []
}

export interface WizardContextProps extends Wizard {
    step: string | null,
    setStep: React.Dispatch<React.SetStateAction<string>>}

export interface WizardProps extends Wizard{
    firstStep: string;
}

export const WizardContext = React.createContext<WizardContextProps>({
    tree: {},
    step: null,
    middleware: [],
    setStep: () => {}
})

export const Wizard: React.FC<WizardProps> = ({children, tree, firstStep, middleware}) => {
    const [step, setStep] = React.useState<string>(firstStep)
    return <WizardContext.Provider value={{tree, step, middleware, setStep}} >
        {children}
    </WizardContext.Provider>
}

interface StepProps {
    name: string
}

export const Step: React.FC<StepProps> = ({children, name}) => {
    const { step } = React.useContext(WizardContext)
    return <>{step === name && children}</>
}