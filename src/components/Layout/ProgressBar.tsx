import React from 'react';
import { MapPin, Package2, Truck, ClipboardCheck, Calendar, CreditCard } from 'lucide-react';

interface Step {
  id: number;
  label: string;
  icon: React.ReactNode;
  active: boolean;
  completed: boolean;
}

interface ProgressBarProps {
  currentStep: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const steps: Step[] = [
    {
      id: 1,
      label: 'Postcode',
      icon: <MapPin size={20} />,
      active: currentStep === 1,
      completed: currentStep > 1
    },
    {
      id: 2,
      label: 'Waste Type',
      icon: <Package2 size={20} />,
      active: currentStep === 2,
      completed: currentStep > 2
    },
    {
      id: 3,
      label: 'Select Skip',
      icon: <Truck size={20} />,
      active: currentStep === 3,
      completed: currentStep > 3
    },
    {
      id: 4,
      label: 'Permit Check',
      icon: <ClipboardCheck size={20} />,
      active: currentStep === 4,
      completed: currentStep > 4
    },
    {
      id: 5,
      label: 'Choose Date',
      icon: <Calendar size={20} />,
      active: currentStep === 5,
      completed: currentStep > 5
    },
    {
      id: 6,
      label: 'Payment',
      icon: <CreditCard size={20} />,
      active: currentStep === 6,
      completed: currentStep > 6
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto py-4 px-4 sm:px-6 overflow-x-auto">
      <div className="flex items-center min-w-max">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step icon and label */}
            <div className="flex flex-col items-center">
              <div 
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center border-2
                  ${step.active ? 'border-blue-700 bg-blue-700 text-white' : 
                    step.completed ? 'border-blue-700 bg-blue-700 text-white' : 
                    'border-gray-300 text-gray-400'}
                  transition-all duration-200
                `}
              >
                {step.icon}
              </div>
              <span 
                className={`
                  mt-2 text-xs font-medium whitespace-nowrap
                  ${step.active || step.completed ? 'text-blue-700' : 'text-gray-500'}
                `}
              >
                {step.label}
              </span>
            </div>
            
            {/* Connector line between steps */}
            {index < steps.length - 1 && (
              <div 
                className={`
                  h-0.5 flex-1 mx-2
                  ${step.completed ? 'bg-blue-700' : 'bg-gray-300'}
                  transition-all duration-200
                `}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;