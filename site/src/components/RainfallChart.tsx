import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ChartSkeleton } from './LoadingSkeleton';
import type { RainfallData } from '../types';

interface RainfallChartProps {
  data: RainfallData | null;
  loading: boolean;
}

export function RainfallChart({ data, loading }: RainfallChartProps) {
  if (loading) {
    return <ChartSkeleton />;
  }

  if (!data) {
    return null;
  }

  const fiveDayTotal = data['5 day total'];

  if (fiveDayTotal === 0) {
    return (
      <div className="mx-4 my-6 lg:mx-20">
        <div className="rounded-lg border border-yellow-300 bg-yellow-50 p-4 text-center text-xl text-yellow-800 dark:border-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400">
          No rainfall in the past five days
        </div>
      </div>
    );
  }

  const chartData = [
    { label: 'Last 1 hour', value: data['Previous 1 hour'] },
    { label: 'Last 3 hours', value: data['Previous 3 hours'] },
    { label: 'Last 6 hours', value: data['Previous 6 hours'] },
    { label: 'Last 24 hours', value: data['Previous 24 hours'] },
    { label: 'Since midnight', value: data['Since midnight'] },
    { label: '1 day ago', value: data['1 day ago'] },
    { label: '2 days ago', value: data['2 days ago'] },
    { label: '3 days ago', value: data['3 days ago'] },
    { label: '4 days ago', value: data['4 days ago'] },
    { label: '5 day total', value: data['5 day total'] },
  ];

  return (
    <div className="h-[45vh] w-full pt-6">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <XAxis
            dataKey="label"
            tick={{ fill: '#374151', fontSize: 12, fontWeight: 500 }}
            interval={0}
          />
          <YAxis
            tick={{ fill: '#374151', fontSize: 12, fontWeight: 500 }}
            tickCount={7}
            domain={[0, 'auto']}
            label={{
              value: 'Rainfall Amount (in)',
              angle: -90,
              position: 'insideLeft',
              fill: '#374151',
              style: { textAnchor: 'middle', fontSize: 13, fontWeight: 500 },
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              border: 'none',
              borderRadius: '8px',
            }}
            labelStyle={{ color: '#F9FAFB' }}
            itemStyle={{ color: '#F9FAFB' }}
            formatter={(value) => [`${value} in`, 'Rainfall']}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill="#0ea5e9" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
