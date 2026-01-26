import type { Site } from '../types';

interface SiteSelectorProps {
  currentLocation: string;
  sites: Site[];
  onSiteChange: (siteId: number) => void;
}

export function SiteSelector({ currentLocation, sites, onSiteChange }: SiteSelectorProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const siteId = parseInt(value, 10);
    if (!isNaN(siteId)) {
      onSiteChange(siteId);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-4 text-sm text-sky-800 dark:text-sky-400 lg:text-xl">
      <span>Showing rainfall from the</span>
      <div className="relative">
        <input
          type="text"
          list="sitelist"
          placeholder={currentLocation}
          onChange={handleChange}
          className="rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:border-sky-500 focus:ring-sky-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-sky-500 dark:focus:ring-sky-500"
        />
        <datalist id="sitelist">
          {sites.map((site) => (
            <option key={site.site} value={site.site} label={site.location} />
          ))}
        </datalist>
      </div>
      <a
        href="https://hydromet.lcra.org"
        className="hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        LCRA Hydromet weather gauge
      </a>
    </div>
  );
}
