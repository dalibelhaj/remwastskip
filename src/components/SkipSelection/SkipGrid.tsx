import React from 'react';
import SkipCard from './SkipCard';
import { Skip } from '../../types';

interface SkipGridProps {
  skips: Skip[];
  selectedSkip: Skip | null;
  onSelectSkip: (skip: Skip) => void;
}

const SkipGrid: React.FC<SkipGridProps> = ({
  skips,
  selectedSkip,
  onSelectSkip
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {skips.map((skip) => (
        <SkipCard
          key={skip.id}
          skip={skip}
          selected={selectedSkip?.id === skip.id}
          onSelect={onSelectSkip}
        />
      ))}
    </div>
  );
};

export default SkipGrid;