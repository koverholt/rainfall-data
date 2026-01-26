import { CardSkeleton } from './LoadingSkeleton';
import type { RainfallData } from '../types';
import type { ReactNode } from 'react';

function DropletIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
    </svg>
  );
}

const COLUMN_COLORS = {
  // Most recent - 20% tint (draws eye first)
  daily: {
    text: 'text-sky-600',
    border: 'border-l-4 border-l-sky-600',
    bg: 'bg-sky-100/20 dark:bg-sky-900/20',
  },
  // Medium term - 40% tint
  period: {
    text: 'text-sky-500',
    border: 'border-l-4 border-l-sky-500',
    bg: 'bg-sky-100/40 dark:bg-sky-900/40',
  },
  // Long term - 60% tint (recedes)
  annual: {
    text: 'text-sky-400',
    border: 'border-l-4 border-l-sky-400',
    bg: 'bg-sky-100/60 dark:bg-sky-900/60',
  },
} as const;

interface CardProps {
  value: number;
  label: string;
  icon: ReactNode;
  colors: typeof COLUMN_COLORS[keyof typeof COLUMN_COLORS];
  className?: string;
}

function Card({ value, label, icon, colors, className = '' }: CardProps) {
  return (
    <div className={`flex-1 rounded-lg border border-gray-200 p-3 shadow sm:p-4 ${colors.border} ${colors.bg} ${className}`}>
      <div className={`mb-2 flex items-center justify-center gap-2 ${colors.text}`}>
        {icon}
        <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white sm:text-xl lg:text-2xl">
          {value} in
        </span>
      </div>
      <p className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 sm:text-sm lg:text-base">
        {label}
      </p>
    </div>
  );
}

interface RainfallCardsProps {
  data: RainfallData | null;
  loading: boolean;
}

export function RainfallCards({ data, loading }: RainfallCardsProps) {
  if (loading || !data) {
    return (
      <div className="grid grid-cols-2 gap-2 p-2 sm:grid-cols-3 sm:gap-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 p-2 sm:grid-cols-3 sm:gap-4">
      <Card
        value={data['Since midnight']}
        label="Today"
        icon={<DropletIcon />}
        colors={COLUMN_COLORS.daily}
        className="order-1 sm:order-1"
      />
      <Card
        value={data['1 day ago']}
        label="Yesterday"
        icon={<DropletIcon />}
        colors={COLUMN_COLORS.daily}
        className="order-2 sm:order-4"
      />
      <Card
        value={data['5 day total']}
        label="Last 5 days"
        icon={<ClockIcon />}
        colors={COLUMN_COLORS.period}
        className="order-3 sm:order-2"
      />
      <Card
        value={data['30 day total']}
        label="Last 30 days"
        icon={<ChartIcon />}
        colors={COLUMN_COLORS.period}
        className="order-4 sm:order-5"
      />
      <Card
        value={data['This year']}
        label="This year"
        icon={<CalendarIcon />}
        colors={COLUMN_COLORS.annual}
        className="order-5 sm:order-3"
      />
      <Card
        value={data['Last year']}
        label="Last year"
        icon={<CalendarIcon />}
        colors={COLUMN_COLORS.annual}
        className="order-6 sm:order-6"
      />
    </div>
  );
}
