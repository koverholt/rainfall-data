import { useState, useEffect } from 'react';
import type { RainfallData, Site, ApiResponse } from '../types';

const API_URL = 'https://rainfall-data-67ugd5bjtq-uc.a.run.app';

export function useRainfallData(siteId: number) {
  const [data, setData] = useState<RainfallData | null>(null);
  const [listOfSites, setListOfSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ site: siteId }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const res: ApiResponse = await response.json();

        if (!cancelled) {
          setData(res.rainfall_amounts[0] ?? null);
          setListOfSites(res.list_of_sites);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unknown error');
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [siteId]);

  return { data, listOfSites, loading, error };
}
