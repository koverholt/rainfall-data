import { CardSkeleton } from './LoadingSkeleton';
import type { RainfallData } from '../types';

interface CardProps {
  value: number;
  label: string;
}

function Card({ value, label }: CardProps) {
  return (
    <div className="flex-1 rounded-lg border border-gray-200 bg-white p-4 text-center shadow dark:border-gray-700 dark:bg-gray-800">
      <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white lg:text-2xl">
        {value} in
      </h5>
      <p className="text-sm font-normal leading-tight text-gray-700 dark:text-gray-400 lg:text-base">
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
      <div className="space-y-2 p-2">
        <div className="flex space-x-4">
          <div className="flex-1"><CardSkeleton /></div>
          <div className="flex-1"><CardSkeleton /></div>
          <div className="flex-1"><CardSkeleton /></div>
        </div>
        <div className="flex space-x-4">
          <div className="flex-1"><CardSkeleton /></div>
          <div className="flex-1"><CardSkeleton /></div>
          <div className="flex-1"><CardSkeleton /></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2 p-2">
      <div className="flex space-x-4">
        <Card value={data['Since midnight']} label="Today" />
        <Card value={data['5 day total']} label="Last 5 days" />
        <Card value={data['This year']} label="This year" />
      </div>
      <div className="flex space-x-4">
        <Card value={data['1 day ago']} label="Yesterday" />
        <Card value={data['30 day total']} label="Last 30 days" />
        <Card value={data['Last year']} label="Last year" />
      </div>
    </div>
  );
}
