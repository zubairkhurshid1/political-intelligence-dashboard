import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { AssemblyElectionRecord } from '../../types/election';
import { formatPercentage, formatIndianNumber, getPartyColor } from '../../utils/formatters';

interface AssemblyComparisonChartProps {
  records: AssemblyElectionRecord[];
  electionYear: number;
}

type MetricType = 'turnout' | 'margin' | 'winnerShare';

interface SegmentChartPoint {
  assemblyId: string;
  name: string;
  fullName: string;
  number: number;
  district: string;
  winner: string;
  party: string;
  turnout: number;
  margin: number;
  marginPct: number;
  winnerShare: number;
  displayValue: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: SegmentChartPoint;
  }>;
}

const SegmentTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="custom-recharts-tooltip">
        <p className="font-bold text-slate-100 border-b border-slate-700 pb-1 mb-1.5">
          {item.fullName} (AC-{item.number}) — {item.district}
        </p>
        <div className="space-y-1 text-xs">
          <p className="text-slate-300">
            Winner: <span className="text-white font-semibold">{item.winner}</span> ({item.party})
          </p>
          <p className="text-slate-300">
            Turnout: <span className="font-mono text-brand-300 font-bold">{formatPercentage(item.turnout)}</span>
          </p>
          <p className="text-slate-300">
            Winning Margin: <span className="font-mono text-white font-bold">{formatIndianNumber(item.margin)} ({formatPercentage(item.marginPct)})</span>
          </p>
          <p className="text-slate-300">
            Winner Vote Share: <span className="font-mono text-emerald-300 font-bold">{formatPercentage(item.winnerShare)}</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export const AssemblyComparisonChart: React.FC<AssemblyComparisonChartProps> = ({
  records,
  electionYear,
}) => {
  const [metric, setMetric] = useState<MetricType>('turnout');

  // Filter records with valid data
  const validRecords = records.filter((r) => r.isDataAvailable && r.winner !== null);

  const chartData: SegmentChartPoint[] = validRecords.map((r) => {
    let value = 0;
    if (metric === 'turnout') {
      value = r.turnoutPercentage || 0;
    } else if (metric === 'margin') {
      value = r.winningMarginPercentage || 0;
    } else {
      value = r.winner?.voteSharePercentage || 0;
    }

    return {
      assemblyId: r.assemblyId,
      name: `${r.assemblyNumber}-${r.assemblyName}`,
      fullName: r.assemblyName,
      number: r.assemblyNumber,
      district: r.district,
      winner: r.winner?.candidateName || 'N/A',
      party: r.winner?.partyAbbreviation || 'OTHERS',
      turnout: r.turnoutPercentage || 0,
      margin: r.winningMargin || 0,
      marginPct: r.winningMarginPercentage || 0,
      winnerShare: r.winner?.voteSharePercentage || 0,
      displayValue: value,
    };
  });

  // Sort descending by selected metric
  const sortedData = [...chartData].sort((a, b) => b.displayValue - a.displayValue);

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            Assembly Segments Cross-Comparison — {electionYear}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Comparing electoral dynamics across the 18 segments of Srinagar Parliamentary Constituency
          </p>
        </div>

        {/* Metric Selector Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            onClick={() => setMetric('turnout')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              metric === 'turnout'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Voter Turnout %
          </button>
          <button
            onClick={() => setMetric('margin')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              metric === 'margin'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Winning Margin %
          </button>
          <button
            onClick={() => setMetric('winnerShare')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              metric === 'winnerShare'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Winner Vote Share %
          </button>
        </div>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sortedData}
            margin={{ top: 10, right: 10, left: 0, bottom: 45 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              interval={0}
              height={55}
              tick={{ fill: '#475569', fontSize: 10, fontWeight: 500 }}
              axisLine={{ stroke: '#cbd5e1' }}
            />
            <YAxis
              tickFormatter={(val) => `${val}%`}
              tick={{ fill: '#64748b', fontSize: 11 }}
              axisLine={{ stroke: '#cbd5e1' }}
            />
            <Tooltip content={<SegmentTooltip />} />
            <Bar dataKey="displayValue" radius={[4, 4, 0, 0]} maxBarSize={28}>
              {sortedData.map((entry) => (
                <Cell key={entry.assemblyId} fill={getPartyColor(entry.party)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 text-xs text-slate-500 flex flex-wrap items-center justify-between border-t border-slate-100 pt-3 gap-2">
        <span>Bar colors represent winning political party in each Assembly segment.</span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600" /> JKNC
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" /> JKPDP
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> INC
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-500" /> IND
          </span>
        </div>
      </div>
    </div>
  );
};
