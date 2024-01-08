import React, { ReactNode } from 'react';

interface StepsProps {
    currentStep: number;
    steps: ReactNode[];
}

const Steps: React.FC<StepsProps> = ({ currentStep, steps }) => {
    return (
        <div className="flex flex-col items-baseline sm:items-center mt-4 gap-4 sm:flex-row sm:justify-center">
            {steps.map((step, index) => (
                <div key={index} className={`flex items-center gap-2 text-center ${index <= currentStep ? 'text-green-500' : 'text-gray-500'}`}>
                    <span
                        className={`text-xl font-bold h-8 w-8 rounded-full flex items-center justify-center p-2 ${index <= currentStep ? 'bg-green-500 text-white' : 'bg-gray-400 text-gray-200'}`}
                    >
                        {index + 1}
                    </span>
                    <div className={`${index <= currentStep ? 'font-bold' : ''}`}>{step}</div>
                </div>
            ))}
        </div>
    );
};

export default Steps;
