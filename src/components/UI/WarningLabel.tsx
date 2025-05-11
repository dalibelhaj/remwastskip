import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface WarningLabelProps {
  text: string;
  variant?: 'warning' | 'danger';
}

const WarningLabel: React.FC<WarningLabelProps> = ({
  text,
  variant = 'warning'
}) => {
  const baseStyles = 'flex items-center text-xs font-medium px-2 py-1 rounded';
  
  const variantStyles = {
    warning: 'bg-amber-900/80 text-amber-50',
    danger: 'bg-red-900/80 text-red-50'
  };
  
  return (
    <div className={`${baseStyles} ${variantStyles[variant]}`}>
      <AlertTriangle size={14} className="mr-1.5" />
      <span>{text}</span>
    </div>
  );
};

export default WarningLabel;