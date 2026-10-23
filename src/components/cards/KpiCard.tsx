import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight, ArrowDownRight, HelpCircle } from 'lucide-react';
import { MissingDataBadge } from '../feedback/MissingDataBadge';

interface KpiCardProps {
  title: string;
  value: string | number | null | undefined;
  subValue?: string;
  referenceYear?: string | number;
  unit?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    label: string;
    isPositiveGood?: boolean;
  };
  isDataAvailable?: boolean;
  missingReason?: string;
  footnote?: string;
  accentColor?: 'brand' | 'emerald' | 'amber' | 'rose' | 'indigo';
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  subValue,
  referenceYear,
  unit,
  icon: Icon,
  trend,
  isDataAvailable = true,
  missingReason,
  footnote,
  accentColor = 'brand',
}) => {
  const accentClasses = {
    brand: 'text-brand-600 bg-brand-50 border-brand-100',
    emerald: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    amber: 'text-amber-600 bg-amber-50 border-amber-100',
    rose: 'text-rose-600 bg-rose-50 border-rose-100',
    indigo: 'text-indigo-600 bg-indigo-50 border-indigo-100',
  };

  const isAvailable = isDataAvailable && value !== null && value !== undefined && value !== '';

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0 pr-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {title}
            </span>
            {referenceYear && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600">
                {referenceYear}
              </span>
            )}
          </div>

          <div className="mt-2.5">
            {isAvailable ? (
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold text-slate-900 tracking-tight">
                  {value}
                </span>
                {unit && <span className="text-xs font-medium text-slate-500">{unit}</span>}
              </div>
            ) : (
              <div className="py-1">
                <MissingDataBadge reason={missingReason} />
              </div>
            )}

            {subValue && isAvailable && (
              <p className="mt-1 text-xs text-slate-500 line-clamp-1">{subValue}</p>
            )}
          </div>
        </div>

        {Icon && (
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${accentClasses[accentColor]}`}
          >
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {/* Trend or Footnote */}
      <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        {trend && isAvailable ? (
          <div className="flex items-center gap-1 font-medium">
            {trend.value >= 0 ? (
              <span className="text-emerald-600 flex items-center">
                <ArrowUpRight className="w-3.5 h-3.5" />
                +{trend.value.toFixed(2)}%
              </span>
            ) : (
              <span className="text-rose-600 flex items-center">
                <ArrowDownRight className="w-3.5 h-3.5" />
                {trend.value.toFixed(2)}%
              </span>
            )}
            <span className="text-slate-400 font-normal">{trend.label}</span>
          </div>
        ) : footnote ? (
          <span className="text-slate-400 truncate flex items-center gap-1">
            <HelpCircle className="w-3 h-3 shrink-0" />
            {footnote}
          </span>
        ) : (
          <span className="text-slate-400">Verified official record</span>
        )}
      </div>
    </div>
  );
};
