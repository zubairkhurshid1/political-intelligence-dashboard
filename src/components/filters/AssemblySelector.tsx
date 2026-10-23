import React from 'react';
import { MapPin, Filter } from 'lucide-react';
import type { AssemblyConstituencyMetadata } from '../../types/election';

interface AssemblySelectorProps {
  segments: AssemblyConstituencyMetadata[];
  selectedSegmentId: string; // 'ALL' or specific segment id like 'AC-17'
  onSegmentChange: (segmentId: string) => void;
  selectedDistrict: string; // 'ALL' or district name
  onDistrictChange: (district: string) => void;
}

export const AssemblySelector: React.FC<AssemblySelectorProps> = ({
  segments,
  selectedSegmentId,
  onSegmentChange,
  selectedDistrict,
  onDistrictChange,
}) => {
  const districts = ['ALL', ...Array.from(new Set(segments.map((s) => s.district)))];

  const filteredSegments =
    selectedDistrict === 'ALL'
      ? segments
      : segments.filter((s) => s.district === selectedDistrict);

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* District Filter */}
      <div className="flex items-center gap-1.5">
        <label htmlFor="district-select" className="text-xs font-semibold text-slate-500 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" />
          District:
        </label>
        <select
          id="district-select"
          value={selectedDistrict}
          onChange={(e) => {
            onDistrictChange(e.target.value);
            onSegmentChange('ALL'); // Reset selected segment when district changes
          }}
          className="bg-white border border-slate-300 text-slate-800 text-xs font-medium rounded-lg py-1.5 px-2.5 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 shadow-sm cursor-pointer"
        >
          {districts.map((d) => (
            <option key={d} value={d}>
              {d === 'ALL' ? 'All 5 Districts' : `${d} District`}
            </option>
          ))}
        </select>
      </div>

      {/* Segment Selector */}
      <div className="flex items-center gap-1.5">
        <label htmlFor="segment-select" className="text-xs font-semibold text-slate-500 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5" />
          Assembly Segment:
        </label>
        <select
          id="segment-select"
          value={selectedSegmentId}
          onChange={(e) => onSegmentChange(e.target.value)}
          className="bg-white border border-slate-300 text-slate-900 text-xs font-semibold rounded-lg py-1.5 px-3 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 shadow-sm cursor-pointer min-w-[200px]"
        >
          <option value="ALL">All Assembly Segments ({segments.length})</option>
          {filteredSegments.map((seg) => (
            <option key={seg.id} value={seg.id}>
              {seg.number} - {seg.name} {seg.reservation !== 'GEN' ? `(${seg.reservation})` : ''} ({seg.district})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
