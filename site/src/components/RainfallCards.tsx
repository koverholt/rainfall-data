import type { RainfallData } from '../types';

interface RainfallCardsProps {
  data: RainfallData | null;
  loading: boolean;
}

export function RainfallCards({ data, loading }: RainfallCardsProps) {
  if (loading || !data) {
    return (
      <div className="flex flex-col gap-3 p-4 sm:flex-row">
        <div className="h-32 flex-1 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
        <div className="flex flex-1 flex-col gap-2">
          <div className="h-10 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
          <div className="h-10 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
          <div className="h-10 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 p-4 sm:flex-row">
      {/* Left: Today */}
      <div className="flex flex-1 items-center justify-center rounded-lg border-l-4 border-l-sky-600 bg-sky-50 p-6 dark:bg-sky-900/20">
        <div className="text-center">
          <span className="text-4xl font-bold text-gray-900 dark:text-white">
            {data['Since midnight']} in
          </span>
          <p className="mt-1 text-lg font-medium text-sky-600 dark:text-sky-400">Today</p>
        </div>
      </div>

      {/* Right: 3 stacked */}
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-1 items-center justify-between rounded-lg border-l-4 border-l-gray-300 bg-gray-50 px-4 py-3 dark:border-l-gray-500 dark:bg-gray-700/50">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Last 30 Days</span>
          <span className="text-xl font-bold text-gray-900 dark:text-white">{data['30 day total']} in</span>
        </div>
        <div className="flex flex-1 items-center justify-between rounded-lg border-l-4 border-l-gray-300 bg-gray-50 px-4 py-3 dark:border-l-gray-500 dark:bg-gray-700/50">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">This Year</span>
          <span className="text-xl font-bold text-gray-900 dark:text-white">{data['This year']} in</span>
        </div>
        <div className="flex flex-1 items-center justify-between rounded-lg border-l-4 border-l-gray-300 bg-gray-50 px-4 py-3 dark:border-l-gray-500 dark:bg-gray-700/50">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Year</span>
          <span className="text-xl font-bold text-gray-900 dark:text-white">{data['Last year']} in</span>
        </div>
      </div>
    </div>
  );
}
