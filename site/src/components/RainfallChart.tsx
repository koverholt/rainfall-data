import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ChartSkeleton } from './LoadingSkeleton';
import { useIsMobile } from '../hooks/useIsMobile';
import { useDarkMode } from '../hooks/useDarkMode';
import type { RainfallData } from '../types';

interface RainfallChartProps {
  data: RainfallData | null;
  loading: boolean;
}

export function RainfallChart({ data, loading }: RainfallChartProps) {
  const isMobile = useIsMobile();
  const isDark = useDarkMode();
  const axisColor = isDark ? '#9CA3AF' : '#374151';

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

  const chartData = isMobile
    ? [
        { label: '1h', fullLabel: 'Last 1 hour', value: data['Previous 1 hour'] },
        { label: '3h', fullLabel: 'Last 3 hours', value: data['Previous 3 hours'] },
        { label: '6h', fullLabel: 'Last 6 hours', value: data['Previous 6 hours'] },
        { label: '24h', fullLabel: 'Last 24 hours', value: data['Previous 24 hours'] },
        { label: 'Now', fullLabel: 'Since midnight', value: data['Since midnight'] },
        { label: '-1d', fullLabel: '1 day ago', value: data['1 day ago'] },
        { label: '-2d', fullLabel: '2 days ago', value: data['2 days ago'] },
        { label: '-3d', fullLabel: '3 days ago', value: data['3 days ago'] },
        { label: '-4d', fullLabel: '4 days ago', value: data['4 days ago'] },
        { label: '5d', fullLabel: '5 day total', value: data['5 day total'] },
      ]
    : [
        { label: '1 hour', fullLabel: '1 hour', value: data['Previous 1 hour'] },
        { label: '3 hours', fullLabel: '3 hours', value: data['Previous 3 hours'] },
        { label: '6 hours', fullLabel: '6 hours', value: data['Previous 6 hours'] },
        { label: '24 hours', fullLabel: '24 hours', value: data['Previous 24 hours'] },
        { label: 'Today', fullLabel: 'Today', value: data['Since midnight'] },
        { label: '1 day ago', fullLabel: '1 day ago', value: data['1 day ago'] },
        { label: '2 days ago', fullLabel: '2 days ago', value: data['2 days ago'] },
        { label: '3 days ago', fullLabel: '3 days ago', value: data['3 days ago'] },
        { label: '4 days ago', fullLabel: '4 days ago', value: data['4 days ago'] },
        { label: '5 day total', fullLabel: '5 day total', value: data['5 day total'] },
      ];

  return (
    <div className="h-[50vh] w-full pt-4 sm:h-[45vh] sm:pt-6">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={
            isMobile
              ? { top: 10, right: 5, left: -10, bottom: 40 }
              : { top: 10, right: 20, left: 10, bottom: 20 }
          }
        >
          <XAxis
            dataKey="label"
            tick={{ fill: axisColor, fontSize: isMobile ? 10 : 12, fontWeight: 500 }}
            interval={0}
            angle={isMobile ? -45 : 0}
            textAnchor={isMobile ? 'end' : 'middle'}
            height={isMobile ? 50 : 30}
          />
          <YAxis
            tick={{ fill: axisColor, fontSize: isMobile ? 11 : 12, fontWeight: 500 }}
            tickCount={6}
            domain={[0, 'auto']}
            width={isMobile ? 40 : 50}
            label={{
              value: 'Rainfall (in)',
              angle: -90,
              position: 'insideLeft',
              fill: axisColor,
              style: { textAnchor: 'middle', fontSize: isMobile ? 11 : 13, fontWeight: 500 },
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
            labelFormatter={(_, payload) => payload[0]?.payload?.fullLabel ?? ''}
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
