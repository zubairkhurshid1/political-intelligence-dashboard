import React from 'react';
import { HelpCircle } from 'lucide-react';

interface MissingDataBadgeProps {
  label?: string;
  reason?: string;
}

export const MissingDataBadge: React.FC<MissingDataBadgeProps> = ({
  label = 'Data unavailable',
  reason,
}) => {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200"
      title={reason || 'Official statistical data not available for this metric or boundary'}
    >
      <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
      {label}
    </span>
  );
};
