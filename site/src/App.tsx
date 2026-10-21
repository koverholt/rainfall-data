import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SiteSelector } from './components/SiteSelector';
import { RainfallCards } from './components/RainfallCards';
import { StackedTimeline } from './components/StackedTimeline';
import { useRainfallData } from './hooks/useRainfallData';

function getSiteFromUrl(): number {
  const params = new URLSearchParams(window.location.search);
  const siteParam = params.get('site');
  if (siteParam) {
    const siteId = parseInt(siteParam, 10);
    if (!isNaN(siteId)) {
      return siteId;
    }
  }
  return 2959; // Default site
}

function App() {
  const [siteId, setSiteId] = useState<number>(getSiteFromUrl);
  const { data, listOfSites, loading, error } = useRainfallData(siteId);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setSiteId(getSiteFromUrl());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSiteChange = (newSiteId: number) => {
    setSiteId(newSiteId);
    const url = new URL(window.location.href);
    url.searchParams.set('site', String(newSiteId));
    window.history.pushState({}, '', url.toString());
  };

  return (
    <div className="min-h-dvh lg:h-dvh flex flex-col lg:overflow-hidden bg-white dark:bg-gray-800">
      <Header data={data} />

      <main className="mx-auto w-[92vw] flex-1 flex flex-col min-h-0 py-2 sm:w-[85vw] lg:w-[85vw]">
        <SiteSelector
          currentLocation={data?.location ?? (error ? 'Unavailable' : 'Loading...')}
          sites={listOfSites}
          onSiteChange={handleSiteChange}
        />

        {error && !loading ? (
          <div className="m-4 rounded-lg border border-amber-300 bg-amber-50 p-6 text-center text-amber-900 dark:border-amber-700 dark:bg-amber-900/20 dark:text-amber-200">
            <p className="text-lg font-semibold">Unable to load rainfall gauge data</p>
            <p className="mt-1 text-sm opacity-80">{error}</p>
          </div>
        ) : (
          <>
            <RainfallCards data={data} loading={loading} />

            {/* Stacked Timeline */}
            <div className="mt-2 px-2 pb-3 flex-1 min-h-0 flex flex-col">
              <StackedTimeline data={data} loading={loading} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
