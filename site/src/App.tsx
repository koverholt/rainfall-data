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
  const { data, listOfSites, loading } = useRainfallData(siteId);

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
          currentLocation={data?.location ?? 'Loading...'}
          sites={listOfSites}
          onSiteChange={handleSiteChange}
        />

        <RainfallCards data={data} loading={loading} />

        {/* Stacked Timeline */}
        <div className="mt-2 px-2 pb-3 flex-1 min-h-0 flex flex-col">
          <StackedTimeline data={data} loading={loading} />
        </div>
      </main>
    </div>
  );
}

export default App;
