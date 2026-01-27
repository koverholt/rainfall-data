import { useDarkMode } from '../hooks/useDarkMode';
import type { RainfallData } from '../types';

interface StackedTimelineProps {
  data: RainfallData | null;
  loading: boolean;
}

function getIntensityClass(value: number, maxValue: number, isDark: boolean): string {
  if (value === 0) {
    return isDark ? 'bg-gray-700' : 'bg-gray-200';
  }

  const ratio = maxValue > 0 ? value / maxValue : 0;

  if (ratio < 0.2) {
    return isDark ? 'bg-sky-900' : 'bg-sky-100';
  } else if (ratio < 0.4) {
    return isDark ? 'bg-sky-700' : 'bg-sky-200';
  } else if (ratio < 0.6) {
    return isDark ? 'bg-sky-600' : 'bg-sky-300';
  } else if (ratio < 0.8) {
    return isDark ? 'bg-sky-500' : 'bg-sky-400';
  } else {
    return isDark ? 'bg-sky-400' : 'bg-sky-500';
  }
}

interface TimelineBarProps {
  label: string;
  mobileLabel?: string;
  value: number;
  maxValue: number;
  isDark: boolean;
  isTotal?: boolean;
  isToday?: boolean;
}

function TimelineBar({ label, mobileLabel, value, maxValue, isDark, isTotal, isToday }: TimelineBarProps) {
  const heightPercent = maxValue > 0 ? (value / maxValue) * 100 : 0;
  const intensityClass = isTotal
    ? isDark ? 'bg-sky-400' : 'bg-sky-600'
    : getIntensityClass(value, maxValue, isDark);

  return (
    <div className="group relative flex-1 min-w-0">
      {/* Label - show mobile version on small screens */}
      <div className={`mb-1 text-center text-xs font-semibold sm:mb-2 sm:text-base ${isToday ? 'text-sky-600 dark:text-sky-400' : 'text-gray-700 dark:text-gray-200'}`}>
        <span className="sm:hidden">{mobileLabel || label}</span>
        <span className="hidden sm:inline">{label}</span>
      </div>

      {/* Bar container */}
      <div className={`relative w-full rounded-lg h-16 sm:h-24 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
        {/* Filled bar (grows from bottom) */}
        <div
          className={`absolute bottom-0 left-0 right-0 rounded-lg transition-all duration-300 ${intensityClass} ${isTotal ? 'border-2 border-sky-600 dark:border-sky-400' : ''}`}
          style={{ height: `${Math.max(heightPercent, value > 0 ? 12 : 0)}%` }}
        />

        {/* Value overlay */}
        <div className="absolute inset-0 flex items-center justify-center px-1">
          <span
            className={`text-xs font-bold sm:text-lg ${
              heightPercent > 50
                ? 'text-white'
                : isDark ? 'text-gray-200' : 'text-gray-800'
            } ${isTotal ? 'sm:text-xl' : ''}`}
          >
            {value > 0 ? `${value}` : '-'}
          </span>
        </div>
      </div>
    </div>
  );
}

export function StackedTimeline({ data, loading }: StackedTimelineProps) {
  const isDark = useDarkMode();

  if (loading) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-4 h-5 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="flex gap-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex-1">
              <div className="mb-1 h-3 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  // Get weekday names for past days
  const getWeekdayName = (daysAgo: number): string => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  // Daily data for the main timeline (chronological: oldest to newest, total at end)
  const days = [
    { label: getWeekdayName(4), value: data['4 days ago'] },
    { label: getWeekdayName(3), value: data['3 days ago'] },
    { label: getWeekdayName(2), value: data['2 days ago'] },
    { label: getWeekdayName(1), value: data['1 day ago'] },
    { label: 'Today', value: data['Since midnight'], isToday: true },
    { label: '5 Day Total', mobileLabel: '5d', value: data['5 day total'], isTotal: true },
  ];

  // Hourly breakdown (most recent first, 24h as summary at end)
  const todayDetail = [
    { label: '1 Hour', mobileLabel: '1h', value: data['Previous 1 hour'] },
    { label: '3 Hours', mobileLabel: '3h', value: data['Previous 3 hours'] },
    { label: '6 Hours', mobileLabel: '6h', value: data['Previous 6 hours'] },
    { label: 'Today', value: data['Since midnight'], isToday: true },
    { label: '24 Hours', mobileLabel: '24h', value: data['Previous 24 hours'], isTotal: true },
  ];

  // Scale daily bars relative to 5d Total, hourly bars relative to max(24h, Today)
  const dailyMax = Math.max(data['5 day total'], 0.1);
  const hourlyMax = Math.max(data['Previous 24 hours'], data['Since midnight'], 0.1);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800">
      {/* Header */}
      <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
        Rainfall Timeline
      </h3>

      {/* Main 5-day timeline */}
      <div className="mb-6">
        <div className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
          Daily Totals
        </div>
        <div className="flex gap-1 sm:gap-2">
          {days.map((day, index) => (
            <TimelineBar
              key={index}
              label={day.label}
              mobileLabel={day.mobileLabel}
              value={day.value}
              maxValue={dailyMax}
              isDark={isDark}
              isToday={day.isToday}
              isTotal={day.isTotal}
            />
          ))}
        </div>
      </div>

      {/* Hourly detail */}
      <div>
        <div className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
          Hourly Totals
        </div>
        <div className="flex gap-1 sm:gap-2">
          {todayDetail.map((period, index) => (
            <TimelineBar
              key={index}
              label={period.label}
              mobileLabel={period.mobileLabel}
              value={period.value}
              maxValue={hourlyMax}
              isDark={isDark}
              isToday={period.isToday}
              isTotal={period.isTotal}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
