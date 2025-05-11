import React, { useEffect, useRef, useState } from 'react';
import { useSkips } from '../../hooks/useSkips';
import ProgressBar from '../Layout/ProgressBar';
import SkipGrid from './SkipGrid';
import Button from '../UI/Button';
import { Skip } from '../../types';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import skipImage from '../../assets/images/skip-example.png';

const SkipSelectionPage: React.FC = () => {
  const { skips, loading, error } = useSkips();
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contentRef.current && 
          !contentRef.current.contains(event.target as Node) &&
          !(event.target as Element).closest('.fixed.bottom-0')) {
        setSelectedSkip(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Add search filter
  const filteredSkips = skips.filter(skip => 
    skip.size.toString().includes(searchQuery.toLowerCase())
  );
  const handleSelectSkip = (skip: Skip) => {
    setSelectedSkip(skip);
  };

  const handleContinue = () => {
    if (selectedSkip) {
      console.log('Continuing with skip:', selectedSkip);
      // In a real app, this would navigate to the next step or update a context
    }
  };

  const formatPrice = (price: number, vat: number) => {
    const totalPrice = price * (1 + vat / 100);
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0
    }).format(totalPrice);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Progress bar */}
      <ProgressBar currentStep={3} />
      
      {/* Main content with click area */}
      <div ref={contentRef} className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black">Choose Your Skip Size</h1>
          <p className="mt-2 text-gray-400">Select the skip size that best suits your needs</p>
        </div>

        {/* Combined Search and Filters */}
        <div className="flex items-center gap-4 mb-8">
          {/* Search Input */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search skip sizes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
          
          {/* Filter Buttons */}
          <div className="flex space-x-4">
            <button className="flex items-center px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" 
                   stroke="currentColor" strokeWidth="2" className="mr-2 text-blue-600">
                <path d="M5 12h14"/><path d="M10 18l6-6-6-6"/>
              </svg>
              <span className="font-medium text-gray-900">All Skips</span>
            </button>
            
            <button className="flex items-center px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" 
                   stroke="currentColor" strokeWidth="2" className="mr-2 text-green-600">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <span className="font-medium text-gray-900">Road Allowed</span>
            </button>
            
            <button className="flex items-center px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" 
                   stroke="currentColor" strokeWidth="2" className="mr-2 text-purple-600">
                <path d="M12 22v-6"/><path d="M12 8V2"/><path d="M4 12h16"/>
              </svg>
              <span className="font-medium text-gray-900">Heavy Waste</span>
            </button>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-700"></div>
          </div>
        )}
        
        {/* Error state */}
        {error && (
          <div className="bg-red-900/20 border border-red-500/20 rounded-md p-4 mt-4">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-red-400">{error}</p>
            </div>
          </div>
        )}
        
        {/* Skips grid */}
        {!loading && !error && filteredSkips.length > 0 && (
          <SkipGrid 
            skips={filteredSkips} 
            selectedSkip={selectedSkip}
            onSelectSkip={handleSelectSkip}
          />
        )}
      </div>

      {/* Sidebar Detail View */}
      <div className={`
        fixed inset-0 z-50 bg-black/50 transition-opacity
        ${selectedSkip ? 'opacity-100 visible' : 'opacity-0 invisible'}
      `}>
        <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transition-transform duration-300 ease-in-out">
          <div className="p-6 h-full flex flex-col">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedSkip(null)}
              className="absolute left-4 top-4 rounded-full p-2 hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/3000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                   stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            {/* Skip Image */}
            <div className="relative h-48 w-full mb-6">
              <img 
                src={skipImage}
                alt={`${selectedSkip?.size} Yard Skip`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Skip Details */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">{selectedSkip?.size} Yard Skip</h2>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">{selectedSkip?.hire_period_days} day hire</span>
                <span className="text-xl font-bold text-blue-700">
                  {selectedSkip && formatPrice(selectedSkip.price_before_vat, selectedSkip.vat)}
                </span>
              </div>

              {/* Add description */}
              <p className="text-gray-600">
                This skip is ideal for medium-sized projects including home renovations, garden clearances, 
                and construction waste. Suitable for both residential and commercial use with proper permits.
              </p>

            </div>

            {/* Continue Button - Move to bottom */}
            <div className="mt-auto pt-6">
              <Button
                variant="primary"
                onClick={handleContinue}
                // className="w-full"
                icon={<ArrowRight size={20} />}
              >
                Continue with Selection
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Remove the bottom bar code */}
      {/* <div className={`
        fixed bottom-0 left-0 right-0 z-10 bg-gray-300 backdrop-blur-sm border-t border-gray-400
        transform transition-all duration-300 ease-in-out
        ${selectedSkip ? 'translate-y-0' : 'translate-y-full'}
      `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Selected skip info */}
            {/* <div className="flex items-center space-x-4">
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-black">
                  {selectedSkip?.size} Yard Skip
                </span>
                <span className="text-sm text-gray-800">
                  {selectedSkip?.hire_period_days} day hire
                </span>
              </div>
              <div className="text-2xl font-bold text-blue-700">
                {selectedSkip && formatPrice(selectedSkip.price_before_vat, selectedSkip.vat)}
              </div>
            </div>  */}

            {/* Navigation buttons */}
            {/* <div className="flex items-center space-x-3">
              <Button
                variant="secondary"
                onClick={() => console.log('Go back')}
                icon={<ArrowLeft size={16} />}
              >
                Back
              </Button>
              <Button
                variant="primary"
                onClick={handleContinue}
                icon={<ArrowRight size={16} />}
              >
                Continue
              </Button>
            </div>
          </div>
        </div> */}
      {/* </div> */}
    </div>
  );
};

export default SkipSelectionPage;