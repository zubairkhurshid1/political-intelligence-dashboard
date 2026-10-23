import React, { useState, useMemo } from 'react';
import { ArrowUpDown, Award, CheckCircle2, AlertCircle } from 'lucide-react';
import type { CandidateResult } from '../../types/election';
import { formatIndianNumber, formatPercentage, getPartyBadgeClasses } from '../../utils/formatters';
import { SearchInput } from '../filters/SearchInput';
import { EmptyState } from '../feedback/EmptyState';

interface ResultsTableProps {
  candidates: CandidateResult[];
  totalValidVotes: number;
  notaVotes?: number;
  electionYear: number;
}

type SortField = 'resultPosition' | 'candidateName' | 'partyName' | 'votes' | 'voteSharePercentage';
type SortDirection = 'asc' | 'desc';

export const ResultsTable: React.FC<ResultsTableProps> = ({
  candidates,
  totalValidVotes,
  notaVotes,
  electionYear,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('resultPosition');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      // Default to desc for numerical metrics, asc for names
      setSortDirection(field === 'votes' || field === 'voteSharePercentage' ? 'desc' : 'asc');
    }
  };

  const filteredCandidates = useMemo(() => {
    if (!searchQuery.trim()) return candidates;
    const q = searchQuery.toLowerCase().trim();
    return candidates.filter(
      (c) =>
        c.candidateName.toLowerCase().includes(q) ||
        c.partyName.toLowerCase().includes(q) ||
        c.partyAbbreviation.toLowerCase().includes(q)
    );
  }, [candidates, searchQuery]);

  const sortedCandidates = useMemo(() => {
    return [...filteredCandidates].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (aVal === undefined) aVal = 0;
      if (bVal === undefined) bVal = 0;

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDirection === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      return sortDirection === 'asc'
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });
  }, [filteredCandidates, sortField, sortDirection]);

  const winnerVotes = candidates.find((c) => c.isWinner)?.votes || 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden">
      {/* Table Header Controls */}
      <div className="p-4 border-b border-slate-200/80 bg-slate-50/50 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            Candidate-wise Results — {electionYear} General Election
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Showing {sortedCandidates.length} of {candidates.length} recorded candidates (Total Valid Votes: {formatIndianNumber(totalValidVotes)})
          </p>
        </div>
        <div className="w-full sm:w-auto">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search candidate or party..."
            id="candidate-search"
          />
        </div>
      </div>

      {sortedCandidates.length === 0 ? (
        <div className="p-6">
          <EmptyState
            title="No candidates found"
            description={`No candidate or political party matches "${searchQuery}". Clear your search term to see full election results.`}
            actionText="Reset search"
            onAction={() => setSearchQuery('')}
          />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <th
                  scope="col"
                  onClick={() => handleSort('resultPosition')}
                  className="py-3 px-4 cursor-pointer hover:bg-slate-200/60 transition-colors w-16"
                >
                  <div className="flex items-center gap-1">
                    Pos
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  scope="col"
                  onClick={() => handleSort('candidateName')}
                  className="py-3 px-4 cursor-pointer hover:bg-slate-200/60 transition-colors min-w-[200px]"
                >
                  <div className="flex items-center gap-1">
                    Candidate Name
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  scope="col"
                  onClick={() => handleSort('partyName')}
                  className="py-3 px-4 cursor-pointer hover:bg-slate-200/60 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    Party Affiliation
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  scope="col"
                  onClick={() => handleSort('votes')}
                  className="py-3 px-4 text-right cursor-pointer hover:bg-slate-200/60 transition-colors"
                >
                  <div className="flex items-center justify-end gap-1">
                    Votes Received
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  scope="col"
                  onClick={() => handleSort('voteSharePercentage')}
                  className="py-3 px-4 text-right cursor-pointer hover:bg-slate-200/60 transition-colors min-w-[130px]"
                >
                  <div className="flex items-center justify-end gap-1">
                    Vote Share
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th scope="col" className="py-3 px-4 text-right">
                  Margin from Winner
                </th>
                <th scope="col" className="py-3 px-4 text-center">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedCandidates.map((cand) => {
                const badge = getPartyBadgeClasses(cand.partyAbbreviation);
                const voteDiff = cand.isWinner ? 0 : cand.votes - winnerVotes;
                const depositForfeited =
                  cand.depositLost ??
                  (cand.voteSharePercentage !== undefined && cand.voteSharePercentage < 16.67 && !cand.isWinner);

                return (
                  <tr
                    key={cand.candidateId}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      cand.isWinner ? 'bg-amber-50/40 font-semibold' : ''
                    }`}
                  >
                    <td className="py-3 px-4 text-slate-700">
                      {cand.isWinner ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-bold text-xs">
                          <Award className="w-3.5 h-3.5" />
                        </span>
                      ) : (
                        <span className="font-mono text-slate-500 pl-1">{cand.resultPosition}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-900">
                      <div className="flex items-center gap-1.5">
                        {cand.candidateName}
                        {cand.isWinner && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                            Elected MP
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${badge.bg} ${badge.border}`}
                      >
                        {cand.partyAbbreviation} — {cand.partyName}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-medium text-slate-800">
                      {formatIndianNumber(cand.votes)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden hidden sm:block">
                          <div
                            className="bg-brand-500 h-1.5 rounded-full"
                            style={{ width: `${Math.min(cand.voteSharePercentage || 0, 100)}%` }}
                          />
                        </div>
                        <span className="font-mono font-medium text-slate-800">
                          {formatPercentage(cand.voteSharePercentage)}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-slate-500">
                      {cand.isWinner ? (
                        <span className="text-emerald-700 font-semibold">Winner</span>
                      ) : (
                        <span className="text-rose-600 font-mono">
                          -{formatIndianNumber(Math.abs(voteDiff))}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {cand.isWinner ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Won
                        </span>
                      ) : depositForfeited ? (
                        <span
                          className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-500"
                          title="Candidate received less than 1/6th (16.67%) of total valid votes cast"
                        >
                          <AlertCircle className="w-3 h-3 text-slate-400" />
                          Deposit Lost
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-600 font-medium">Runner-up</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Table Footer */}
      <div className="p-3 bg-slate-50/70 border-t border-slate-200 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
        <span className="font-medium">
          Total Valid Votes: {formatIndianNumber(totalValidVotes)}
          {notaVotes !== undefined && ` | NOTA Votes: ${formatIndianNumber(notaVotes)} (${formatPercentage((notaVotes / totalValidVotes) * 100)})`}
        </span>
        <span className="text-slate-400">
          Source: Election Commission of India Statutory Results Declaration
        </span>
      </div>
    </div>
  );
};
