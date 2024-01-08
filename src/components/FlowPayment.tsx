import React, { useState } from 'react';
import Steps from './Steps';
import FormCustomer from './FormCustomer';
import CustomerFeedback from './CustomerFeedback';
import Details from './Details';

const FlowPayment: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const handleStep = (step:number) => {
        setCurrentStep(step);
    };
    const steps = [
        'Datos',
        'Detalles y pago',
        'Resultado',
    ];
    return (
        <div className="container mx-auto">
            <Steps currentStep={currentStep} steps={steps} />
            <div className="mt-8">
                {currentStep === 0 && <FormCustomer handleStep={handleStep} />}
                {currentStep === 1 && <Details handleStep={handleStep} />}
                {currentStep === 2 && <CustomerFeedback handleStep={handleStep} />}
            </div>
        </div>
    );
};

export default FlowPayment;
