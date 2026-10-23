import React from 'react';
import { Info } from 'lucide-react';

interface DataFreshnessNoticeProps {
  referenceYear: string | number;
  sourceTitle: string;
  delimitationNote?: string;
}

export const DataFreshnessNotice: React.FC<DataFreshnessNoticeProps> = ({
  referenceYear,
  sourceTitle,
  delimitationNote,
}) => {
  return (
    <div className="bg-slate-100/80 border border-slate-200/90 rounded-lg p-3 text-xs text-slate-600 flex items-start gap-2.5 my-3">
      <Info className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
      <div>
        <p className="font-medium text-slate-700">
          Official Data Provenance (Ref. Year: {referenceYear})
        </p>
        <p className="mt-0.5 text-slate-500">
          Source: {sourceTitle}. {delimitationNote && <span className="text-slate-600">{delimitationNote}</span>}
        </p>
      </div>
    </div>
  );
};
