import { DarkModeToggle } from './DarkModeToggle';
import { FunFacts } from './FunFacts';
import type { RainfallData } from '../types';

function RainDropIcon() {
  return (
    <svg className="h-6 w-6 text-sky-400 sm:h-8 sm:w-8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  );
}

interface HeaderProps {
  data: RainfallData | null;
}

export function Header({ data }: HeaderProps) {
  return (
    <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-lg">
      <div className="mx-auto flex w-[92vw] sm:w-[85vw] lg:w-[85vw] items-center justify-between py-3 sm:py-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <RainDropIcon />
          <h1 className="text-base font-semibold text-white sm:text-xl lg:text-2xl">
            Central Texas Rainfall Totals
          </h1>
        </div>
        <div className="flex items-center gap-1">
          {data && <FunFacts data={data} />}
          <DarkModeToggle />
        </div>
      </div>
    </nav>
  );
}
