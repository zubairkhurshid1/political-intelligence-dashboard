import React, { useState } from 'react';
import { Vote, Users, Award, Scale, GitCompare } from 'lucide-react';
import { useParliamentaryData } from '../hooks/useElectionData';
import { KpiCard } from '../components/cards/KpiCard';
import { ElectionYearFilter } from '../components/filters/ElectionYearFilter';
import { YearComparisonFilter } from '../components/filters/YearComparisonFilter';
import { CandidateVoteBarChart } from '../components/charts/CandidateVoteBarChart';
import { PartyVoteShareLineChart } from '../components/charts/PartyVoteShareLineChart';
import { WinningMarginChart } from '../components/charts/WinningMarginChart';
import { ResultsTable } from '../components/tables/ResultsTable';
import { LoadingSpinner } from '../components/feedback/LoadingSpinner';
import { ErrorMessage } from '../components/feedback/ErrorMessage';
import { DataFreshnessNotice } from '../components/feedback/DataFreshnessNotice';
import { formatIndianNumber, formatPercentage } from '../utils/formatters';
import { compareElectionOutcomes } from '../utils/calculations';

export const ParliamentaryResults: React.FC = () => {
  const { elections, partyTrends, marginTrends, loading, error } = useParliamentaryData();
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [isComparing, setIsComparing] = useState<boolean>(false);
  const [compareYear, setCompareYear] = useState<number>(2019);

  if (loading) {
    return <LoadingSpinner message="Loading parliamentary records..." size="lg" />;
  }

  if (error || elections.length === 0) {
    return (
      <ErrorMessage
        title="Could not load election results"
        message={error || 'No historical parliamentary records available'}
      />
    );
  }

  const availableYears = elections.map((e) => e.electionYear);
  const currentRecord = elections.find((e) => e.electionYear === selectedYear) ?? elections[0];
  const compareRecord = elections.find((e) => e.electionYear === compareYear) ?? elections[1];

  const outcomeShift = isComparing ? compareElectionOutcomes(compareRecord, currentRecord) : null;
  const turnoutDifference = isComparing
    ? currentRecord.turnoutPercentage - compareRecord.turnoutPercentage
    : null;

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <ElectionYearFilter
          years={availableYears}
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
          label="Select Lok Sabha Election"
        />

        <YearComparisonFilter
          years={availableYears}
          baseYear={selectedYear}
          compareYear={compareYear}
          onBaseYearChange={setSelectedYear}
          onCompareYearChange={setCompareYear}
          isComparisonActive={isComparing}
          onToggleComparison={setIsComparing}
        />
      </div>

      <DataFreshnessNotice
        referenceYear={currentRecord.electionYear}
        sourceTitle="Election Commission of India Certified Statistical Declaration"
        delimitationNote={currentRecord.notes}
      />

      {isComparing && (
        <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 shadow-md">
          <div className="flex items-center gap-2 text-brand-400 text-xs font-bold uppercase tracking-wider mb-2">
            <GitCompare className="w-4 h-4" />
            <span>Cycle Comparison: {selectedYear} vs {compareYear}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-3 bg-slate-800/70 rounded-lg border border-slate-700/60">
              <span className="text-xs text-slate-400">Political Outcome Transition</span>
              <p className="text-sm font-bold text-white mt-1">
                {outcomeShift?.description}
              </p>
            </div>

            <div className="p-3 bg-slate-800/70 rounded-lg border border-slate-700/60">
              <span className="text-xs text-slate-400">Voter Turnout Swing</span>
              <p className="text-sm font-bold text-white mt-1 flex items-center gap-1">
                {turnoutDifference !== null && (
                  <span className={turnoutDifference >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                    {turnoutDifference >= 0 ? `+${turnoutDifference.toFixed(2)}%` : `${turnoutDifference.toFixed(2)}%`}
                  </span>
                )}
                <span className="text-xs text-slate-400 font-normal">
                  ({compareRecord.turnoutPercentage}% in {compareYear} → {currentRecord.turnoutPercentage}% in {selectedYear})
                </span>
              </p>
            </div>

            <div className="p-3 bg-slate-800/70 rounded-lg border border-slate-700/60">
              <span className="text-xs text-slate-400">Winning Margin Shift</span>
              <p className="text-sm font-bold text-white mt-1">
                {formatIndianNumber(currentRecord.winningMargin)} votes vs {formatIndianNumber(compareRecord.winningMargin)} votes
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Winning Candidate"
          value={currentRecord.winner.candidateName}
          referenceYear={currentRecord.electionYear}
          unit={currentRecord.winner.partyAbbreviation}
          icon={Award}
          subValue={`${formatIndianNumber(currentRecord.winner.votes)} votes (${formatPercentage(currentRecord.winner.voteSharePercentage)})`}
          accentColor="emerald"
        />

        <KpiCard
          title="Runner-Up Candidate"
          value={currentRecord.runnerUp.candidateName}
          referenceYear={currentRecord.electionYear}
          unit={currentRecord.runnerUp.partyAbbreviation}
          icon={Users}
          subValue={`${formatIndianNumber(currentRecord.runnerUp.votes)} votes (${formatPercentage(currentRecord.runnerUp.voteSharePercentage)})`}
          accentColor="amber"
        />

        <KpiCard
          title="Winning Margin"
          value={formatIndianNumber(currentRecord.winningMargin)}
          referenceYear={currentRecord.electionYear}
          unit="Votes"
          icon={Scale}
          subValue={`${formatPercentage(currentRecord.winningMarginPercentage)} of total valid votes`}
          accentColor="indigo"
        />

        <KpiCard
          title="Voter Turnout"
          value={formatPercentage(currentRecord.turnoutPercentage)}
          referenceYear={currentRecord.electionYear}
          unit="Turnout"
          icon={Vote}
          subValue={`${formatIndianNumber(currentRecord.votesPolled)} of ${formatIndianNumber(currentRecord.registeredElectors)} electors`}
          accentColor="brand"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CandidateVoteBarChart
          candidates={currentRecord.candidates}
          electionYear={currentRecord.electionYear}
        />

        <PartyVoteShareLineChart data={partyTrends} />
      </div>

      <WinningMarginChart data={marginTrends} />

      <ResultsTable
        candidates={currentRecord.candidates}
        totalValidVotes={currentRecord.validVotes}
        notaVotes={currentRecord.notaVotes}
        electionYear={currentRecord.electionYear}
      />
    </div>
  );
};
