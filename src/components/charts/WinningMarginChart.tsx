import React from 'react';
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
import type { MarginTrendPoint } from '../../types/election';
import { formatIndianNumber, formatPercentage, getPartyColor } from '../../utils/formatters';

interface WinningMarginChartProps {
  data: MarginTrendPoint[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: MarginTrendPoint;
  }>;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="custom-recharts-tooltip">
        <p className="font-bold text-slate-100 border-b border-slate-700 pb-1 mb-1.5">
          {item.year} Election Result
        </p>
        <p className="text-xs text-slate-300">
          Winner: <span className="font-semibold text-white">{item.winner}</span> ({item.party})
        </p>
        <div className="mt-2 pt-2 border-t border-slate-700/80 space-y-1">
          <p className="text-xs text-slate-300">
            Winning Margin: <span className="font-mono font-bold text-emerald-400">+{formatIndianNumber(item.winningMargin)} votes</span>
          </p>
          <p className="text-xs text-slate-300">
            Margin % of Valid Votes: <span className="font-mono font-bold text-white">{formatPercentage(item.winningMarginPercentage)}</span>
          </p>
          <p className="text-xs text-slate-400">
            Turnout: <span className="font-mono text-slate-200">{formatPercentage(item.turnout)}</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export const WinningMarginChart: React.FC<WinningMarginChartProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            Historical Winning Margin Trajectory
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Difference between winning candidate and runner-up votes across election cycles
          </p>
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
          Unit: Margin in Votes
        </span>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis
              dataKey="year"
              tick={{ fill: '#64748b', fontSize: 11 }}
              axisLine={{ stroke: '#cbd5e1' }}
            />
            <YAxis
              tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
              tick={{ fill: '#64748b', fontSize: 11 }}
              axisLine={{ stroke: '#cbd5e1' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="winningMargin" radius={[4, 4, 0, 0]} maxBarSize={40}>
              {data.map((entry) => (
                <Cell key={entry.year} fill={getPartyColor(entry.party)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 text-xs text-slate-500 flex items-center justify-between border-t border-slate-100 pt-3">
        <span>Highest Margin: <strong>1,88,416 votes</strong> (2024 - Ruhullah Mehdi)</span>
        <span>Narrowest Margin: <strong>10,776 votes</strong> (2017 By-poll)</span>
      </div>
    </div>
  );
};
