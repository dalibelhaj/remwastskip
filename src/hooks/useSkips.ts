import { useState, useEffect } from 'react';
import { Skip, SkipAPIResponse } from '../types';

const API_URL = 'https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft';

export const useSkips = () => {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkips = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error('Failed to fetch skip data');
        }
        
        const data: SkipAPIResponse = await response.json();
        setSkips(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setSkips([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSkips();
  }, []);

  return { skips, loading, error };
};