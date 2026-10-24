import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { PartyVoteShareTrendPoint } from '../../types/election';
import { formatPercentage, PARTY_COLORS } from '../../utils/formatters';

interface PartyVoteShareLineChartProps {
  data: PartyVoteShareTrendPoint[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: number;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-recharts-tooltip min-w-[180px]">
        <p className="font-bold text-slate-100 border-b border-slate-700 pb-1.5 mb-2">
          {label} Lok Sabha Election
        </p>
        <div className="space-y-1.5">
          {payload.map((item) => (
            <div key={item.name} className="flex items-center justify-between gap-4 text-xs">
              <span className="flex items-center gap-1.5 font-medium" style={{ color: item.color }}>
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                {item.name}:
              </span>
              <span className="font-mono font-bold text-white">
                {formatPercentage(item.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export const PartyVoteShareLineChart: React.FC<PartyVoteShareLineChartProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            Historical Party Vote-Share Trends (2004 – 2024)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Electoral trajectory of major political formations in Srinagar Parliamentary Constituency
          </p>
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
          Unit: % of Valid Votes
        </span>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="year"
              tick={{ fill: '#64748b', fontSize: 11 }}
              axisLine={{ stroke: '#cbd5e1' }}
            />
            <YAxis
              domain={[0, 70]}
              tickFormatter={(val) => `${val}%`}
              tick={{ fill: '#64748b', fontSize: 11 }}
              axisLine={{ stroke: '#cbd5e1' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              formatter={(value) => <span className="text-xs font-medium text-slate-700">{value}</span>}
            />
            <Line
              type="monotone"
              dataKey="JKNC"
              name="JKNC"
              stroke={PARTY_COLORS.JKNC}
              strokeWidth={2.5}
              dot={{ r: 4, strokeWidth: 1.5, fill: '#fff' }}
              activeDot={{ r: 6 }}
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="JKPDP"
              name="JKPDP"
              stroke={PARTY_COLORS.JKPDP}
              strokeWidth={2.5}
              dot={{ r: 4, strokeWidth: 1.5, fill: '#fff' }}
              activeDot={{ r: 6 }}
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="BJP"
              name="BJP"
              stroke={PARTY_COLORS.BJP}
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={{ r: 3, fill: PARTY_COLORS.BJP }}
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="APNI PARTY"
              name="Apni Party"
              stroke={PARTY_COLORS['APNI PARTY']}
              strokeWidth={2}
              dot={{ r: 4, fill: PARTY_COLORS['APNI PARTY'] }}
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 text-[11px] text-slate-500 leading-normal bg-slate-50 p-2.5 rounded-lg border border-slate-100">
        <span className="font-semibold text-slate-700">Analytical Insight:</span> JKNC has historically retained the largest vote share in Srinagar, with PDP achieving a notable breakthrough victory in 2014 (50.58%). In 2024, JKNC regained over 53% vote share amidst boundary restructuring.
      </div>
    </div>
  );
};
