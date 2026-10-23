import React from 'react';
import { Calendar } from 'lucide-react';

interface ElectionYearFilterProps {
  years: number[];
  selectedYear: number;
  onYearChange: (year: number) => void;
  label?: string;
  disabled?: boolean;
}

export const ElectionYearFilter: React.FC<ElectionYearFilterProps> = ({
  years,
  selectedYear,
  onYearChange,
  label = 'Election Year',
  disabled = false,
}) => {
  return (
    <div className="flex items-center gap-2">
      {label && (
        <label
          htmlFor="election-year-select"
          className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 whitespace-nowrap"
        >
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          {label}:
        </label>
      )}
      <div className="relative">
        <select
          id="election-year-select"
          value={selectedYear}
          onChange={(e) => onYearChange(Number(e.target.value))}
          disabled={disabled}
          className="bg-white border border-slate-300 text-slate-900 text-sm font-medium rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 block w-full py-1.5 px-3 pr-8 shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year} General Election {year === 2017 ? '(By-Election)' : ''}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
