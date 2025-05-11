import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Skip } from '../../types';
import Badge from '../UI/Badge';
import WarningLabel from '../UI/WarningLabel';
import skipImage from '../../assets/images/skip-example.png';

interface SkipCardProps {
  skip: Skip;
  selected?: boolean;
  onSelect: (skip: Skip) => void;
}

const SkipCard: React.FC<SkipCardProps> = ({
  skip,
  selected = false,
  onSelect
}) => {
  const formatPrice = (price: number, vat: number) => {
    const totalPrice = price * (1 + vat / 100);
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0
    }).format(totalPrice);
  };

  const getRestrictions = (skip: Skip): string[] => {
    const restrictions: string[] = [];
    
    if (!skip.allowed_on_road) {
      restrictions.push('Not Allowed On The Road');
    }
    if (!skip.allows_heavy_waste) {
      restrictions.push('Not Suitable for Heavy Waste');
    }
    
    return restrictions;
  };

  return (
    <div 
      className={`
        relative flex flex-col bg-white rounded-lg overflow-hidden transition-all duration-300
        ${!skip.allows_heavy_waste ? 'opacity-75 cursor-not-allowed bg-gray-100' : 
          selected ? 'ring-2 ring-blue-700 shadow-lg transform scale-[1.02]' 
          : 'border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-200'}
      `}
      onClick={() => {
        if (!skip.allows_heavy_waste) return;
        onSelect(skip);
      }}
    >
      <div className="absolute top-3 right-3 z-10">
        <Badge variant="primary" size="lg">{skip.size} Yards</Badge>
      </div>
      <div className="relative h-48 bg-gradient-to-b from-gray-100 to-gray-200">
        <img 
          src={skipImage}
          alt={`${skip.size} Yard Skip`}
          className="w-full h-full object-cover"
        />
        {getRestrictions(skip).length > 0 && (
          <div className="absolute bottom-2 left-2 right-2 flex flex-col gap-1.5">
            {getRestrictions(skip).map((restriction, index) => (
              <WarningLabel 
                key={index} 
                text={restriction} 
                variant={restriction.includes('Not Allowed') ? 'danger' : 'warning'} 
              />
            ))}
          </div>
        )}
      </div>
      
      <div className="flex flex-col p-4 flex-grow">
        <h3 className="text-lg font-bold text-gray-900">{skip.size} Yard Skip</h3>
        <p className="text-sm text-gray-600 mt-1">{skip.hire_period_days} day hire period</p>
        
        <div className="mt-4 flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium">Price (inc. VAT)</span>
            <span className="text-2xl font-bold text-blue-800">
              {formatPrice(skip.price_before_vat, skip.vat)}
            </span>
          </div>
          
          <button 
            className={`
              inline-flex items-center justify-center rounded-md text-sm font-medium px-4 py-2 
              transition-all duration-200 ${!skip.allows_heavy_waste ? 'bg-gray-300 text-gray-600 cursor-not-allowed' :
                selected ? 'bg-blue-700 text-white' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}
            `}
            disabled={!skip.allows_heavy_waste}
          >
            {!skip.allows_heavy_waste ? 'Not Available' : (
              <>
                Select 
                {selected && <ChevronRight size={16} className="ml-1" />}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkipCard;
