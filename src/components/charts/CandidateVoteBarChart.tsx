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
import type { CandidateResult } from '../../types/election';
import { formatIndianNumber, formatPercentage, getPartyColor } from '../../utils/formatters';

interface CandidateVoteBarChartProps {
  candidates: CandidateResult[];
  electionYear: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: CandidateResult;
  }>;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="custom-recharts-tooltip">
        <p className="font-bold text-slate-100">{data.candidateName}</p>
        <p className="text-xs text-slate-300 font-medium mt-0.5">
          Party: <span className="text-white">{data.partyName} ({data.partyAbbreviation})</span>
        </p>
        <div className="mt-2 pt-2 border-t border-slate-700/80 space-y-1">
          <p className="text-xs text-slate-300">
            Votes Cast: <span className="font-mono font-bold text-white">{formatIndianNumber(data.votes)}</span>
          </p>
          <p className="text-xs text-slate-300">
            Vote Share: <span className="font-mono font-bold text-brand-300">{formatPercentage(data.voteSharePercentage)}</span>
          </p>
          <p className="text-xs text-slate-400">
            Finish Position: <span className="font-semibold text-slate-200">#{data.resultPosition} {data.isWinner ? '(Elected MP)' : ''}</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export const CandidateVoteBarChart: React.FC<CandidateVoteBarChartProps> = ({
  candidates,
  electionYear,
}) => {
  // Sort descending by votes and take top candidates for clean chart presentation
  const chartData = [...candidates]
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 7); // Show top 7 candidates / NOTA

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            Candidate Vote Comparison — {electionYear}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Total votes secured by prominent candidates in 02-Srinagar PC
          </p>
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
          Unit: Valid Votes
        </span>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
            <XAxis
              type="number"
              tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
              tick={{ fill: '#64748b', fontSize: 11 }}
              axisLine={{ stroke: '#cbd5e1' }}
            />
            <YAxis
              type="category"
              dataKey="candidateName"
              tick={{ fill: '#334155', fontSize: 11, fontWeight: 500 }}
              width={140}
              axisLine={{ stroke: '#cbd5e1' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="votes" radius={[0, 4, 4, 0]} maxBarSize={28}>
              {chartData.map((entry) => (
                <Cell key={entry.candidateId} fill={getPartyColor(entry.partyAbbreviation)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Legend with Party Colors */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600">
        {chartData.slice(0, 5).map((entry) => (
          <div key={entry.candidateId} className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: getPartyColor(entry.partyAbbreviation) }}
            />
            <span className="font-medium">{entry.partyAbbreviation}</span>
            <span className="text-slate-400">({formatPercentage(entry.voteSharePercentage)})</span>
          </div>
        ))}
      </div>
    </div>
  );
};
