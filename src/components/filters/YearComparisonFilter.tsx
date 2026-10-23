import React from 'react';
import { GitCompare } from 'lucide-react';

interface YearComparisonFilterProps {
  years: number[];
  baseYear: number;
  compareYear: number;
  onBaseYearChange: (year: number) => void;
  onCompareYearChange: (year: number) => void;
  isComparisonActive: boolean;
  onToggleComparison: (active: boolean) => void;
}

export const YearComparisonFilter: React.FC<YearComparisonFilterProps> = ({
  years,
  baseYear,
  compareYear,
  onBaseYearChange,
  onCompareYearChange,
  isComparisonActive,
  onToggleComparison,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm">
      <button
        onClick={() => onToggleComparison(!isComparisonActive)}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
          isComparisonActive
            ? 'bg-brand-600 text-white shadow-sm'
            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
        }`}
      >
        <GitCompare className="w-3.5 h-3.5" />
        {isComparisonActive ? 'Comparing Cycles' : 'Compare Two Election Cycles'}
      </button>

      {isComparisonActive && (
        <div className="flex items-center gap-2 text-xs font-medium text-slate-600 animate-fadeIn">
          <span>Compare</span>
          <select
            value={baseYear}
            onChange={(e) => onBaseYearChange(Number(e.target.value))}
            className="bg-slate-50 border border-slate-300 rounded-md py-1 px-2 text-xs font-semibold text-slate-900 focus:ring-1 focus:ring-brand-500"
          >
            {years.map((y) => (
              <option key={`base-${y}`} value={y}>
                {y}
              </option>
            ))}
          </select>
          <span className="text-slate-400">with</span>
          <select
            value={compareYear}
            onChange={(e) => onCompareYearChange(Number(e.target.value))}
            className="bg-slate-50 border border-slate-300 rounded-md py-1 px-2 text-xs font-semibold text-slate-900 focus:ring-1 focus:ring-brand-500"
          >
            {years.map((y) => (
              <option key={`comp-${y}`} value={y} disabled={y === baseYear}>
                {y} {y === baseYear ? '(Selected)' : ''}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};
