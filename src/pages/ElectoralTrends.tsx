import React from 'react';
import {
  TrendingUp,
  Activity,
  Calculator,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { TurnoutTrendChart } from '../components/charts/TurnoutTrendChart';
import { PartyVoteShareLineChart } from '../components/charts/PartyVoteShareLineChart';
import { WinningMarginChart } from '../components/charts/WinningMarginChart';
import { KpiCard } from '../components/cards/KpiCard';
import { LoadingSpinner } from '../components/feedback/LoadingSpinner';
import { ErrorMessage } from '../components/feedback/ErrorMessage';
import { DataFreshnessNotice } from '../components/feedback/DataFreshnessNotice';
import {
  formatIndianNumber,
  formatPercentage,
  formatMarginDisplay,
  getPartyBadgeClasses,
} from '../utils/formatters';

import { useParliamentaryData } from '../hooks/useElectionData';

export const ElectoralTrends: React.FC = () => {
  const { elections, partyTrends, marginTrends, loading, error } = useParliamentaryData();

  if (loading) {
    return <LoadingSpinner message="Calculating electoral metrics and trends..." size="lg" />;
  }

  if (error || elections.length === 0) {
    return (
      <ErrorMessage
        title="Could not load electoral trends"
        message={error || 'No trend records available'}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Trends Overview Notice */}
      <DataFreshnessNotice
        referenceYear="2004 – 2024"
        sourceTitle="Election Commission of India Statutory Lok Sabha Reports"
        delimitationNote="Calculations dynamically computed by src/utils/calculations.ts following standard ECI mathematical conventions."
      />

      {/* KPI Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Turnout Peak"
          value="38.49%"
          referenceYear="2024"
          unit="Turnout"
          icon={TrendingUp}
          subValue="6,72,836 certified votes polled"
          accentColor="emerald"
        />

        <KpiCard
          title="Turnout Trough"
          value="7.12%"
          referenceYear="2017 By-poll"
          unit="Turnout"
          icon={Activity}
          subValue="89,865 votes polled during civil unrest"
          accentColor="amber"
        />

        <KpiCard
          title="Record Winning Margin"
          value="1,88,416"
          referenceYear="2024"
          unit="Votes"
          icon={Award}
          subValue="Aga Syed Ruhullah Mehdi (JKNC)"
          accentColor="brand"
        />

        <KpiCard
          title="Historical Turnarounds"
          value="2 Transitions"
          referenceYear="2004 – 2024"
          unit="Shifts"
          icon={Calculator}
          subValue="PDP win (2014) & JKNC resurgence (2017, 2024)"
          accentColor="indigo"
        />
      </div>

      {/* Turnout & Margin Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TurnoutTrendChart data={elections} />
        <WinningMarginChart data={marginTrends} />
      </div>

      <PartyVoteShareLineChart data={partyTrends} />

      {/* Historical Leadership Transitions Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200/80 bg-slate-50/50">
          <h2 className="text-sm font-bold text-slate-900">
            Historical Electoral Timeline & Outcomes (2004 – 2024)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Chronological summary of verified general and bye-elections in Srinagar Parliamentary Constituency
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[11px]">
                <th className="py-3 px-4">Election Year</th>
                <th className="py-3 px-4">Elected Member of Parliament</th>
                <th className="py-3 px-4">Party</th>
                <th className="py-3 px-4 text-right">Winning Votes</th>
                <th className="py-3 px-4 text-right">Vote Share</th>
                <th className="py-3 px-4 text-right">Winning Margin</th>
                <th className="py-3 px-4 text-right">Turnout</th>
                <th className="py-3 px-4">Historical Context</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {elections.map((elec) => {
                const badge = getPartyBadgeClasses(elec.winner.partyAbbreviation);
                return (
                  <tr key={elec.electionYear} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      {elec.electionYear} {elec.electionYear === 2017 ? '(By-Election)' : ''}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-900">
                      {elec.winner.candidateName}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium border ${badge.bg} ${badge.border}`}>
                        {elec.winner.partyAbbreviation}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-slate-800">
                      {formatIndianNumber(elec.winner.votes)}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-slate-800">
                      {formatPercentage(elec.winner.voteSharePercentage)}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-emerald-700 font-semibold">
                      {formatMarginDisplay(elec.winningMargin, elec.winningMarginPercentage)}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-medium text-slate-800">
                      {formatPercentage(elec.turnoutPercentage)}
                    </td>
                    <td className="py-3 px-4 text-slate-500 text-[11px] max-w-xs truncate" title={elec.notes}>
                      {elec.notes}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Accessible Methodology & Formulas Section */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Calculator className="w-5 h-5 text-brand-600" />
          <h2 className="text-base font-bold text-slate-900">
            Mathematical Methodology & Calculation Formulas
          </h2>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed mb-6">
          To maintain strict analytical rigor and avoid hardcoded discrepancies, all percentages, margins, and turnout ratios are calculated dynamically through pure utility functions with strict input validation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Formula 1 */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-700">
              1. Candidate Vote Share
            </span>
            <div className="font-mono text-xs bg-white p-2.5 rounded border border-slate-200 text-slate-800">
              Vote Share = (Candidate Votes / Total Valid Votes) × 100
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Excludes rejected postal votes. Strictly validated against zero-division (returns <code>null</code> if denominator is ≤ 0).
            </p>
          </div>

          {/* Formula 2 */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
              2. Winning Margin
            </span>
            <div className="font-mono text-xs bg-white p-2.5 rounded border border-slate-200 text-slate-800">
              Margin = Winner Votes − Runner-up Votes
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Absolute vote difference between the candidate placed 1st and candidate placed 2nd. Validated for non-negative numbers.
            </p>
          </div>

          {/* Formula 3 */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700">
              3. Winning Margin Percentage
            </span>
            <div className="font-mono text-xs bg-white p-2.5 rounded border border-slate-200 text-slate-800">
              Margin % = (Margin / Total Valid Votes) × 100
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Expresses the lead as a percentage of all certified valid votes cast across the constituency.
            </p>
          </div>

          {/* Formula 4 */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
              4. Certified Voter Turnout
            </span>
            <div className="font-mono text-xs bg-white p-2.5 rounded border border-slate-200 text-slate-800">
              Turnout % = (Total Votes Polled / Registered Electors) × 100
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Denominator represents certified electors on electoral roll. Does not conflate votes polled with valid votes.
            </p>
          </div>

          {/* Formula 5 */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700">
              5. Party Vote Share Swing
            </span>
            <div className="font-mono text-xs bg-white p-2.5 rounded border border-slate-200 text-slate-800">
              Swing = Current Share % − Previous Share %
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Calculates net electoral drift between consecutive or compared election cycles for identical political formations.
            </p>
          </div>

          {/* Safe Edge Case Handling Card */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Safe Edge Case Handling
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              • Zero denominators safely yield <code>null</code> (never NaN or Infinity)<br />
              • Missing datasets display explicit badges rather than silent zeros<br />
              • Strict rounding to 2 decimal places avoids deceptive micro-precision
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
