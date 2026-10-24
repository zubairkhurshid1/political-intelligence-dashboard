import React, { useState } from 'react';
import {
  MapPin,
  Vote,
  Award,
  Scale,
  Calendar,
  Layers,
} from 'lucide-react';
import { useAssemblyData } from '../hooks/useElectionData';
import { AssemblySelector } from '../components/filters/AssemblySelector';
import { AssemblyResultsTable } from '../components/tables/AssemblyResultsTable';
import { AssemblyComparisonChart } from '../components/charts/AssemblyComparisonChart';
import { KpiCard } from '../components/cards/KpiCard';
import { LoadingSpinner } from '../components/feedback/LoadingSpinner';
import { ErrorMessage } from '../components/feedback/ErrorMessage';
import { EmptyState } from '../components/feedback/EmptyState';
import { DataFreshnessNotice } from '../components/feedback/DataFreshnessNotice';
import {
  formatIndianNumber,
  formatPercentage,
  getPartyBadgeClasses,
} from '../utils/formatters';

export const AssemblyExplorer: React.FC = () => {
  const { segments, allResults, availableYears, loading, error } = useAssemblyData();
  const [selectedSegmentId, setSelectedSegmentId] = useState<string>('ALL');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('ALL');
  const [selectedYear, setSelectedYear] = useState<number>(2024);

  if (loading) {
    return <LoadingSpinner message="Loading Assembly segment records..." size="lg" />;
  }

  if (error || segments.length === 0) {
    return (
      <ErrorMessage
        title="Could not load Assembly segments"
        message={error || 'No Assembly Constituency records found'}
      />
    );
  }

  const yearResults = allResults.filter((r) => r.electionYear === selectedYear);

  const filteredRecords = yearResults.filter((r) => {
    if (selectedDistrict !== 'ALL' && r.district !== selectedDistrict) {
      return false;
    }
    if (selectedSegmentId !== 'ALL' && r.assemblyId !== selectedSegmentId) {
      return false;
    }
    return true;
  });

  const selectedMeta = segments.find((s) => s.id === selectedSegmentId);
  const singleRecord = selectedSegmentId !== 'ALL' ? filteredRecords[0] : null;

  const validTurnoutRecords = filteredRecords.filter((r) => r.turnoutPercentage !== null);
  const avgTurnout =
    validTurnoutRecords.length > 0
      ? validTurnoutRecords.reduce((sum, r) => sum + (r.turnoutPercentage || 0), 0) /
        validTurnoutRecords.length
      : 0;

  const partyTally = filteredRecords.reduce<Record<string, number>>((acc, r) => {
    if (r.winner) {
      const p = r.winner.partyAbbreviation;
      acc[p] = (acc[p] || 0) + 1;
    }
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <AssemblySelector
          segments={segments}
          selectedSegmentId={selectedSegmentId}
          onSegmentChange={setSelectedSegmentId}
          selectedDistrict={selectedDistrict}
          onDistrictChange={setSelectedDistrict}
        />

        <div className="flex items-center gap-2">
          <label htmlFor="assembly-year-select" className="text-xs font-semibold text-slate-500 flex items-center gap-1 whitespace-nowrap">
            <Calendar className="w-3.5 h-3.5" />
            Assembly Election:
          </label>
          <select
            id="assembly-year-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="bg-white border border-slate-300 text-slate-900 text-xs font-semibold rounded-lg py-1.5 px-3 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 shadow-sm cursor-pointer"
          >
            {availableYears.map((yr) => (
              <option key={yr} value={yr}>
                {yr} J&K Assembly Elections
              </option>
            ))}
          </select>

          {(selectedSegmentId !== 'ALL' || selectedDistrict !== 'ALL') && (
            <button
              onClick={() => {
                setSelectedSegmentId('ALL');
                setSelectedDistrict('ALL');
              }}
              className="text-xs text-brand-700 hover:text-brand-900 font-medium px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      <DataFreshnessNotice
        referenceYear={selectedYear}
        sourceTitle="Election Commission of India Assembly Election Certified Returns"
        delimitationNote="Under Delimitation Order 2022, 18 segments form Srinagar PC. Earlier 2014 assembly seats reflect pre-delimitation boundaries."
      />

      {selectedSegmentId !== 'ALL' && selectedMeta ? (
        <div className="space-y-6">
          <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-brand-500 text-white font-mono">
                    AC-{selectedMeta.number}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                    {selectedMeta.district} District
                  </span>
                  {selectedMeta.reservation !== 'GEN' && (
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Reserved: {selectedMeta.reservation}
                    </span>
                  )}
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-white">
                  {selectedMeta.name} Assembly Segment
                </h1>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  {selectedMeta.delimitationNotes}
                </p>
              </div>

              {selectedMeta.totalElectors2024 && (
                <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 text-right">
                  <span className="text-xs text-slate-400">Total Electors (2024 Roll)</span>
                  <p className="text-lg font-mono font-bold text-white">
                    {formatIndianNumber(selectedMeta.totalElectors2024)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {!singleRecord || !singleRecord.isDataAvailable ? (
            <EmptyState
              title={`No Assembly Election Data for ${selectedMeta.name} in ${selectedYear}`}
              description={
                singleRecord?.notes ||
                `${selectedMeta.name} was not an active constituency during the ${selectedYear} Legislative Assembly elections. It was instituted under the 2022 Delimitation Order.`
              }
              actionText="View 2024 Assembly Results"
              onAction={() => setSelectedYear(2024)}
              icon="alert"
            />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <KpiCard
                  title="Elected MLA"
                  value={singleRecord.winner?.candidateName}
                  referenceYear={singleRecord.electionYear}
                  unit={singleRecord.winner?.partyAbbreviation}
                  icon={Award}
                  subValue={`${formatIndianNumber(singleRecord.winner?.votes)} votes (${formatPercentage(singleRecord.winner?.voteSharePercentage)})`}
                  accentColor="emerald"
                />

                <KpiCard
                  title="Runner-Up"
                  value={singleRecord.runnerUp?.candidateName}
                  referenceYear={singleRecord.electionYear}
                  unit={singleRecord.runnerUp?.partyAbbreviation}
                  icon={Vote}
                  subValue={`${formatIndianNumber(singleRecord.runnerUp?.votes)} votes (${formatPercentage(singleRecord.runnerUp?.voteSharePercentage)})`}
                  accentColor="amber"
                />

                <KpiCard
                  title="Winning Margin"
                  value={formatIndianNumber(singleRecord.winningMargin)}
                  referenceYear={singleRecord.electionYear}
                  unit="Votes"
                  icon={Scale}
                  subValue={`${formatPercentage(singleRecord.winningMarginPercentage)} of valid votes`}
                  accentColor="indigo"
                />

                <KpiCard
                  title="Voter Turnout"
                  value={formatPercentage(singleRecord.turnoutPercentage)}
                  referenceYear={singleRecord.electionYear}
                  unit="Turnout"
                  icon={MapPin}
                  subValue={`${formatIndianNumber(singleRecord.validVotes)} valid votes cast`}
                  accentColor="brand"
                />
              </div>

              <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-6">
                <h2 className="text-sm font-bold text-slate-900 mb-4">
                  Candidate Vote Distribution in {selectedMeta.name} ({singleRecord.electionYear})
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[11px]">
                        <th className="py-2.5 px-3">Position</th>
                        <th className="py-2.5 px-3">Candidate</th>
                        <th className="py-2.5 px-3">Party</th>
                        <th className="py-2.5 px-3 text-right">Votes</th>
                        <th className="py-2.5 px-3 text-right">Vote Share</th>
                        <th className="py-2.5 px-3 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {singleRecord.candidates.map((cand) => {
                        const badge = getPartyBadgeClasses(cand.partyAbbreviation);
                        return (
                          <tr key={cand.candidateId} className={cand.isWinner ? 'bg-amber-50/40 font-semibold' : ''}>
                            <td className="py-3 px-3 font-mono text-slate-500">#{cand.resultPosition}</td>
                            <td className="py-3 px-3 font-medium text-slate-900">{cand.candidateName}</td>
                            <td className="py-3 px-3">
                              <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium border ${badge.bg} ${badge.border}`}>
                                {cand.partyAbbreviation} — {cand.partyName}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-right font-mono font-medium text-slate-800">
                              {formatIndianNumber(cand.votes)}
                            </td>
                            <td className="py-3 px-3 text-right font-mono font-bold text-slate-800">
                              {formatPercentage(cand.voteSharePercentage)}
                            </td>
                            <td className="py-3 px-3 text-center">
                              {cand.isWinner ? (
                                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                                  Elected MLA
                                </span>
                              ) : (
                                <span className="text-slate-400 text-[11px]">Contender</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard
              title="Assembly Segments Shown"
              value={filteredRecords.length}
              referenceYear={selectedYear}
              unit="Seats"
              icon={Layers}
              subValue={selectedDistrict === 'ALL' ? 'Across all 5 districts' : `In ${selectedDistrict} District`}
              accentColor="brand"
            />

            <KpiCard
              title="Average Voter Turnout"
              value={formatPercentage(avgTurnout)}
              referenceYear={selectedYear}
              unit="Turnout"
              icon={Vote}
              subValue="Mean turnout across displayed segments"
              accentColor="emerald"
            />

            <KpiCard
              title="JKNC Seat Tally"
              value={partyTally['JKNC'] || 0}
              referenceYear={selectedYear}
              unit="Seats"
              icon={Award}
              subValue="Swept major urban and valley seats"
              accentColor="rose"
            />

            <KpiCard
              title="JKPDP & Others Tally"
              value={(partyTally['JKPDP'] || 0) + (partyTally['INC'] || 0) + (partyTally['IND'] || 0)}
              referenceYear={selectedYear}
              unit="Seats"
              icon={Scale}
              subValue={`JKPDP: ${partyTally['JKPDP'] || 0}, INC: ${partyTally['INC'] || 0}, IND: ${partyTally['IND'] || 0}`}
              accentColor="indigo"
            />
          </div>

          <AssemblyComparisonChart
            records={filteredRecords}
            electionYear={selectedYear}
          />

          <AssemblyResultsTable
            records={filteredRecords}
            electionYear={selectedYear}
          />
        </div>
      )}
    </div>
  );
};
