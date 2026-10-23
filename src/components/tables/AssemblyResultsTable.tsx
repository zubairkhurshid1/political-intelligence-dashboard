import React, { useState, useMemo } from 'react';
import { ArrowUpDown, HelpCircle } from 'lucide-react';
import type { AssemblyElectionRecord } from '../../types/election';
import {
  formatPercentage,
  formatMarginDisplay,
  getPartyBadgeClasses,
} from '../../utils/formatters';
import { SearchInput } from '../filters/SearchInput';
import { EmptyState } from '../feedback/EmptyState';
import { MissingDataBadge } from '../feedback/MissingDataBadge';

interface AssemblyResultsTableProps {
  records: AssemblyElectionRecord[];
  electionYear: number;
}

type SortField =
  | 'assemblyNumber'
  | 'assemblyName'
  | 'district'
  | 'turnoutPercentage'
  | 'winningMargin'
  | 'winningMarginPercentage';
type SortDirection = 'asc' | 'desc';

export const AssemblyResultsTable: React.FC<AssemblyResultsTableProps> = ({
  records,
  electionYear,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('assemblyNumber');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection(
        field === 'turnoutPercentage' || field === 'winningMargin' || field === 'winningMarginPercentage'
          ? 'desc'
          : 'asc'
      );
    }
  };

  const filteredRecords = useMemo(() => {
    if (!searchQuery.trim()) return records;
    const q = searchQuery.toLowerCase().trim();
    return records.filter(
      (r) =>
        r.assemblyName.toLowerCase().includes(q) ||
        r.assemblyNumber.toString().includes(q) ||
        r.district.toLowerCase().includes(q) ||
        (r.winner && r.winner.candidateName.toLowerCase().includes(q)) ||
        (r.winner && r.winner.partyAbbreviation.toLowerCase().includes(q)) ||
        (r.runnerUp && r.runnerUp.candidateName.toLowerCase().includes(q))
    );
  }, [records, searchQuery]);

  const sortedRecords = useMemo(() => {
    return [...filteredRecords].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (aVal === null || aVal === undefined) aVal = -1;
      if (bVal === null || bVal === undefined) bVal = -1;

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDirection === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      return sortDirection === 'asc'
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });
  }, [filteredRecords, sortField, sortDirection]);

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden">
      {/* Table Header Controls */}
      <div className="p-4 border-b border-slate-200/80 bg-slate-50/50 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            Assembly Segments Overview — {electionYear} Elections
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            18 Assembly Segments legally associated with 02-Srinagar Parliamentary Constituency
          </p>
        </div>
        <div className="w-full sm:w-auto">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search segment, district, winner..."
            id="assembly-search"
          />
        </div>
      </div>

      {sortedRecords.length === 0 ? (
        <div className="p-6">
          <EmptyState
            title="No Assembly Segments match search"
            description={`No segment or candidate matching "${searchQuery}" was found for ${electionYear}.`}
            actionText="Clear search"
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
                  onClick={() => handleSort('assemblyNumber')}
                  className="py-3 px-4 cursor-pointer hover:bg-slate-200/60 transition-colors w-20"
                >
                  <div className="flex items-center gap-1">
                    AC No.
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  scope="col"
                  onClick={() => handleSort('assemblyName')}
                  className="py-3 px-4 cursor-pointer hover:bg-slate-200/60 transition-colors min-w-[150px]"
                >
                  <div className="flex items-center gap-1">
                    Segment Name
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  scope="col"
                  onClick={() => handleSort('district')}
                  className="py-3 px-4 cursor-pointer hover:bg-slate-200/60 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    District
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  scope="col"
                  onClick={() => handleSort('turnoutPercentage')}
                  className="py-3 px-4 text-right cursor-pointer hover:bg-slate-200/60 transition-colors"
                >
                  <div className="flex items-center justify-end gap-1">
                    Voter Turnout
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th scope="col" className="py-3 px-4 min-w-[190px]">
                  Winner Candidate & Party
                </th>
                <th scope="col" className="py-3 px-4 min-w-[180px]">
                  Runner-up Candidate & Party
                </th>
                <th
                  scope="col"
                  onClick={() => handleSort('winningMargin')}
                  className="py-3 px-4 text-right cursor-pointer hover:bg-slate-200/60 transition-colors min-w-[140px]"
                >
                  <div className="flex items-center justify-end gap-1">
                    Winning Margin
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th scope="col" className="py-3 px-4 text-center">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedRecords.map((record) => {
                const winnerBadge = record.winner ? getPartyBadgeClasses(record.winner.partyAbbreviation) : null;
                const runnerUpBadge = record.runnerUp ? getPartyBadgeClasses(record.runnerUp.partyAbbreviation) : null;

                return (
                  <tr key={`${record.assemblyId}-${record.electionYear}`} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-semibold text-slate-700">
                      AC-{record.assemblyNumber}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-900">
                      {record.assemblyName}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      <span className="px-2 py-0.5 rounded text-[11px] bg-slate-100 font-medium">
                        {record.district}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-medium">
                      {record.isDataAvailable && record.turnoutPercentage !== null ? (
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-semibold ${
                            record.turnoutPercentage >= 50
                              ? 'text-emerald-700 bg-emerald-50'
                              : 'text-amber-700 bg-amber-50'
                          }`}
                        >
                          {formatPercentage(record.turnoutPercentage)}
                        </span>
                      ) : (
                        <MissingDataBadge reason={record.notes} />
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {record.isDataAvailable && record.winner && winnerBadge ? (
                        <div>
                          <p className="font-semibold text-slate-900">{record.winner.candidateName}</p>
                          <span
                            className={`inline-block mt-0.5 px-1.5 py-0.2 rounded text-[10px] font-medium border ${winnerBadge.bg} ${winnerBadge.border}`}
                          >
                            {record.winner.partyAbbreviation} ({formatPercentage(record.winner.voteSharePercentage)})
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-xs italic">Data unavailable</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {record.isDataAvailable && record.runnerUp && runnerUpBadge ? (
                        <div>
                          <p className="text-slate-700">{record.runnerUp.candidateName}</p>
                          <span
                            className={`inline-block mt-0.5 px-1.5 py-0.2 rounded text-[10px] font-medium border ${runnerUpBadge.bg} ${runnerUpBadge.border}`}
                          >
                            {record.runnerUp.partyAbbreviation} ({formatPercentage(record.runnerUp.voteSharePercentage)})
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-xs italic">N/A</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right font-mono">
                      {record.isDataAvailable && record.winningMargin !== null ? (
                        <span className="font-semibold text-slate-800">
                          {formatMarginDisplay(record.winningMargin, record.winningMarginPercentage)}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">N/A</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {record.notes ? (
                        <span
                          className="inline-flex cursor-help text-slate-400 hover:text-slate-600"
                          title={record.notes}
                        >
                          <HelpCircle className="w-4 h-4" />
                        </span>
                      ) : (
                        <span className="text-slate-300">-</span>
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
          Total Assembly Segments: {records.length} across Ganderbal, Srinagar, Budgam, Pulwama, and Shopian districts
        </span>
        <span className="text-slate-400">
          Source: Election Commission of India Official Assembly Election Declarations
        </span>
      </div>
    </div>
  );
};
