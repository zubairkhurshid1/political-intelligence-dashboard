import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { formatIndianNumber, formatPercentage } from '../../utils/formatters';

export interface TurnoutRecord {
  year?: number;
  electionYear?: number;
  turnoutPercentage: number;
  registeredElectors: number;
  votesPolled: number;
  winnerCandidate?: string;
}

interface TurnoutTrendChartProps {
  data: TurnoutRecord[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: TurnoutRecord & { displayYear: number };
  }>;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="custom-recharts-tooltip">
        <p className="font-bold text-slate-100 border-b border-slate-700 pb-1 mb-1.5">
          {item.displayYear} Voter Turnout
        </p>
        <div className="space-y-1">
          <p className="text-xs text-slate-300">
            Certified Turnout: <span className="font-mono font-bold text-brand-300">{formatPercentage(item.turnoutPercentage)}</span>
          </p>
          <p className="text-xs text-slate-300">
            Total Electors: <span className="font-mono text-white">{formatIndianNumber(item.registeredElectors)}</span>
          </p>
          <p className="text-xs text-slate-300">
            Votes Polled: <span className="font-mono text-white">{formatIndianNumber(item.votesPolled)}</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export const TurnoutTrendChart: React.FC<TurnoutTrendChartProps> = ({ data }) => {
  // Normalize and sort chronological
  const sorted = data
    .map((d) => ({
      ...d,
      displayYear: d.year ?? d.electionYear ?? 0,
    }))
    .sort((a, b) => a.displayYear - b.displayYear);

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            Electoral Participation & Voter Turnout (2004 – 2024)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Turnout trajectory in 02-Srinagar highlighting the historic 2024 surge
          </p>
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-200">
          Turnout %
        </span>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sorted} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="turnoutGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="displayYear"
              tick={{ fill: '#64748b', fontSize: 11 }}
              axisLine={{ stroke: '#cbd5e1' }}
            />
            <YAxis
              domain={[0, 50]}
              tickFormatter={(val) => `${val}%`}
              tick={{ fill: '#64748b', fontSize: 11 }}
              axisLine={{ stroke: '#cbd5e1' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="turnoutPercentage"
              stroke="#0284c7"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#turnoutGradient)"
              dot={{ r: 4, fill: '#0284c7', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 text-[11px] text-slate-500 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex items-start gap-2">
        <span className="font-semibold text-slate-700 shrink-0">Key Milestone:</span>
        <span>
          2024 witnessed a remarkable voter turnout surge to <strong>38.63%</strong> certified (6,75,242 votes polled out of 1,747,810 electors; provisional poll-day EVM estimate was 38.49%), breaking multi-decade lows of 7.12% (2017) and 14.43% (2019).
        </span>
      </div>
    </div>
  );
};
