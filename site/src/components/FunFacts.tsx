import { useState } from 'react';
import type { RainfallData } from '../types';

function InfoIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
      />
    </svg>
  );
}

interface FunFactsProps {
  data: RainfallData;
}

export function FunFacts({ data }: FunFactsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime() + (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
  const oneDay = 1000 * 60 * 60 * 24;
  const currentDay = Math.floor(diff / oneDay);
  const currentYear = now.getFullYear();
  const numDaysInYear = (currentYear % 4 === 0 && currentYear % 100 > 0) || currentYear % 400 === 0 ? 366 : 365;
  const percentYearComplete = Math.round((currentDay / numDaysInYear) * 100);

  const thisYear = data['This year'] ?? 0;
  const lastYear = data['Last year'] ?? 0;
  const thisMonth = data['This month'] ?? 0;

  const rainYoY = lastYear > 0 ? Math.round((thisYear / lastYear) * 100) : 0;
  const rainMoY = thisYear > 0 ? Math.round((thisMonth / thisYear) * 100) : 0;

  return (
    <div className="relative">
      <button
        type="button"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-lg p-2.5 text-slate-300 hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
      >
        <InfoIcon />
      </button>
      {isOpen && (
        <div className="absolute right-0 top-12 z-10 w-72 overflow-hidden rounded-xl bg-gradient-to-b from-slate-800 to-slate-900 shadow-2xl ring-1 ring-white/10">
          <div className="border-b border-slate-700/50 px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Fun Facts
            </p>
          </div>
          <div className="divide-y divide-slate-700/50">
            <div className="px-4 py-3">
              <span className="text-2xl font-bold text-sky-400">{percentYearComplete}%</span>
              <p className="mt-0.5 text-sm text-slate-400">of the way through the year</p>
            </div>
            <div className="px-4 py-3">
              <span className="text-2xl font-bold text-sky-400">{rainYoY}%</span>
              <p className="mt-0.5 text-sm text-slate-400">of last year's rainfall so far</p>
            </div>
            <div className="px-4 py-3">
              <span className="text-2xl font-bold text-sky-400">{rainMoY}%</span>
              <p className="mt-0.5 text-sm text-slate-400">of this year's rain fell in the last 30 days</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
