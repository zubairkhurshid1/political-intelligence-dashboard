import React from 'react';
import { ExternalLink, ShieldCheck, AlertTriangle, Database, CheckCircle2, Bookmark } from 'lucide-react';
import { useSourcesData } from '../hooks/useElectionData';
import { LoadingSpinner } from '../components/feedback/LoadingSpinner';
import { ErrorMessage } from '../components/feedback/ErrorMessage';

export const DataSources: React.FC = () => {
  const { sources, loading, error } = useSourcesData();

  if (loading) {
    return <LoadingSpinner message="Loading data provenance records..." size="lg" />;
  }

  if (error || sources.length === 0) {
    return (
      <ErrorMessage
        title="Could not load data sources"
        message={error || 'No source metadata found'}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">
              Data Sources, Provenance & Audit Trails
            </h1>
            <p className="text-xs text-slate-500">
              Statutory verification matrix, official citations, and boundary limitations for 02-Srinagar PC
            </p>
          </div>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed mt-3">
          This dashboard adheres strictly to statutory records published by the Election Commission of India (ECI), Chief Electoral Officer (CEO) Jammu & Kashmir, the Delimitation Commission of India, and the Census of India. No third-party approximations or unverified estimates are silently substituted.
        </p>
      </div>

      {/* 2024 ECI Statutory Data Verification Matrix */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="p-4 bg-emerald-50/70 border-b border-emerald-100 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-700" />
            <div>
              <h2 className="text-sm font-bold text-emerald-950">
                2024 Lok Sabha Statutory Audit & Verification Matrix
              </h2>
              <p className="text-xs text-emerald-800">
                Audited against official ECI certified declaration (PC 2 - SRINAGAR, UT Code U08)
              </p>
            </div>
          </div>
          <a
            href="https://web.archive.org/web/20240722115110/https://results.eci.gov.in/PcResultGenJune2024/candidateswise-U082.htm"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-700 text-white hover:bg-emerald-800 transition-colors"
          >
            <span>View Archived ECI Source</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-semibold uppercase text-[11px]">
                <th className="py-2.5 px-4">Metric / Parameter</th>
                <th className="py-2.5 px-4">Verified Statutory Value</th>
                <th className="py-2.5 px-4">Explicit Denominator / Method</th>
                <th className="py-2.5 px-4">Primary Official Citation</th>
                <th className="py-2.5 px-4">Audit Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              <tr className="hover:bg-slate-50/80">
                <td className="py-2.5 px-4 font-semibold text-slate-900">Parliamentary Constituency</td>
                <td className="py-2.5 px-4 font-mono font-medium">02-Srinagar (General)</td>
                <td className="py-2.5 px-4 text-slate-600">Union Territory Code: U08, PC Number: 2</td>
                <td className="py-2.5 px-4 text-slate-600">ECI Notification & Delimitation Order 477/J&K/2022</td>
                <td className="py-2.5 px-4"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Verified</span></td>
              </tr>
              <tr className="hover:bg-slate-50/80">
                <td className="py-2.5 px-4 font-semibold text-slate-900">Winning Candidate</td>
                <td className="py-2.5 px-4 font-medium text-slate-900">Aga Syed Ruhullah Mehdi</td>
                <td className="py-2.5 px-4 text-slate-600">Jammu & Kashmir National Conference (JKNC)</td>
                <td className="py-2.5 px-4 text-slate-600">ECI Form 20 / candidateswise-U082.htm</td>
                <td className="py-2.5 px-4"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Verified</span></td>
              </tr>
              <tr className="hover:bg-slate-50/80">
                <td className="py-2.5 px-4 font-semibold text-slate-900">Winner's Votes & Vote Share</td>
                <td className="py-2.5 px-4 font-mono font-bold text-slate-900">3,56,866 votes (52.85%)</td>
                <td className="py-2.5 px-4 font-mono text-slate-600">3,56,866 / 6,75,242 valid votes × 100</td>
                <td className="py-2.5 px-4 text-slate-600">ECI Results Portal June-2024 Table Row 1</td>
                <td className="py-2.5 px-4"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Verified</span></td>
              </tr>
              <tr className="hover:bg-slate-50/80">
                <td className="py-2.5 px-4 font-semibold text-slate-900">Runner-Up Candidate</td>
                <td className="py-2.5 px-4 font-medium text-slate-900">Waheed Ur Rehman Para</td>
                <td className="py-2.5 px-4 text-slate-600">Jammu & Kashmir Peoples Democratic Party (JKPDP)</td>
                <td className="py-2.5 px-4 text-slate-600">ECI Form 20 / candidateswise-U082.htm</td>
                <td className="py-2.5 px-4"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Verified</span></td>
              </tr>
              <tr className="hover:bg-slate-50/80">
                <td className="py-2.5 px-4 font-semibold text-slate-900">Runner-Up's Votes & Share</td>
                <td className="py-2.5 px-4 font-mono font-bold text-slate-900">1,68,450 votes (24.95%)</td>
                <td className="py-2.5 px-4 font-mono text-slate-600">1,68,450 / 6,75,242 valid votes × 100</td>
                <td className="py-2.5 px-4 text-slate-600">ECI Results Portal June-2024 Table Row 2</td>
                <td className="py-2.5 px-4"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Verified</span></td>
              </tr>
              <tr className="hover:bg-slate-50/80">
                <td className="py-2.5 px-4 font-semibold text-slate-900">Winning Margin</td>
                <td className="py-2.5 px-4 font-mono font-bold text-emerald-700">1,88,416 votes (27.90%)</td>
                <td className="py-2.5 px-4 font-mono text-slate-600">1,88,416 / 6,75,242 (10.78% of electorate)</td>
                <td className="py-2.5 px-4 text-slate-600">ECI Declaration Table</td>
                <td className="py-2.5 px-4"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Verified</span></td>
              </tr>
              <tr className="hover:bg-slate-50/80">
                <td className="py-2.5 px-4 font-semibold text-slate-900">Total Valid Votes</td>
                <td className="py-2.5 px-4 font-mono font-bold text-slate-900">6,75,242 votes</td>
                <td className="py-2.5 px-4 text-slate-600">Sum of 24 Candidates (6,69,244) + NOTA (5,998)</td>
                <td className="py-2.5 px-4 text-slate-600">ECI Table Total (EVM 6,70,415 + Postal 4,827)</td>
                <td className="py-2.5 px-4"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Verified</span></td>
              </tr>
              <tr className="hover:bg-slate-50/80">
                <td className="py-2.5 px-4 font-semibold text-slate-900">Total Votes Polled</td>
                <td className="py-2.5 px-4 font-mono font-medium text-slate-900">6,75,242 certified counted</td>
                <td className="py-2.5 px-4 text-slate-600">Provisional poll-day EVM estimate: ~6,72,836</td>
                <td className="py-2.5 px-4 text-slate-600">CEO J&K Press Release & Final ECI Count</td>
                <td className="py-2.5 px-4"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Verified</span></td>
              </tr>
              <tr className="hover:bg-slate-50/80">
                <td className="py-2.5 px-4 font-semibold text-slate-900">Registered Electors</td>
                <td className="py-2.5 px-4 font-mono font-bold text-slate-900">17,47,810 electors</td>
                <td className="py-2.5 px-4 text-slate-600">8,75,938 Male; 8,71,808 Female; 64 Third Gender</td>
                <td className="py-2.5 px-4 text-slate-600">ECI Official Electoral Roll 2024</td>
                <td className="py-2.5 px-4"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Verified</span></td>
              </tr>
              <tr className="hover:bg-slate-50/80">
                <td className="py-2.5 px-4 font-semibold text-slate-900">Certified Voter Turnout</td>
                <td className="py-2.5 px-4 font-mono font-bold text-emerald-700">38.63%</td>
                <td className="py-2.5 px-4 font-mono text-slate-600">6,75,242 votes / 17,47,810 electors × 100</td>
                <td className="py-2.5 px-4 text-slate-600">Independently derived from certified totals</td>
                <td className="py-2.5 px-4"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Verified</span></td>
              </tr>
              <tr className="hover:bg-slate-50/80">
                <td className="py-2.5 px-4 font-semibold text-slate-900">Provisional Poll-Day Turnout</td>
                <td className="py-2.5 px-4 font-mono text-amber-700 font-medium">38.49%</td>
                <td className="py-2.5 px-4 text-slate-600">Interim EVM figure (~6,72,836 / 17,47,810 × 100)</td>
                <td className="py-2.5 px-4 text-slate-600">CEO J&K Press Release (13 May 2024)</td>
                <td className="py-2.5 px-4"><span className="px-2 py-0.5 rounded text-[10px] font-medium bg-amber-100 text-amber-800">Provisional Note</span></td>
              </tr>
              <tr className="hover:bg-slate-50/80">
                <td className="py-2.5 px-4 font-semibold text-slate-900">Booth Demographics</td>
                <td className="py-2.5 px-4 text-slate-500 italic">Not Published</td>
                <td className="py-2.5 px-4 text-slate-500">Form 20 provides booth votes, not voter caste/religion</td>
                <td className="py-2.5 px-4 text-slate-500">ECI Statutory Policy</td>
                <td className="py-2.5 px-4"><span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600">Not Verified</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Critical Limitations */}
      <div className="bg-amber-50 border border-amber-200/90 rounded-xl p-5 text-amber-900 space-y-2">
        <div className="flex items-center gap-2 font-bold text-sm">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
          <span>Critical Geographic & Temporal Boundary Limitations</span>
        </div>
        <div className="text-xs text-amber-800 leading-relaxed space-y-2">
          <p>
            <strong>1. The 2022 Delimitation Reconfiguration:</strong> In May 2022, the Delimitation Commission fundamentally redrew constituency boundaries in Jammu & Kashmir. Srinagar PC previously comprised 15 segments across Srinagar, Budgam, and Ganderbal. Under the new boundaries implemented in 2024, Srinagar PC comprises 18 segments across 5 districts (incorporating Pulwama, Pampore, Tral, Rajpora, and Shopian, while Budgam and Beerwah segments were transferred to Baramulla PC). Historical comparisons between 2024 and pre-2022 elections reflect different geographical jurisdictions.
          </p>
          <p>
            <strong>2. Demographics Data Reference Year (Census 2011):</strong> The decennial 2021 Census of India was officially postponed by the Government of India and has not yet been executed. Consequently, demographic indicators (literacy, urbanization, population) are derived from the 2011 Census at the district level. Because the parliamentary constituency cuts across portions of 5 districts, district totals must <em>not</em> be mistaken for exact constituency-wide populations. Unresolved post-2011 demographics remain marked as "Not verified".
          </p>
        </div>
      </div>

      {/* Catalog of Data Sources */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900">
          Catalog of Verified Data Sources ({sources.length})
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {sources.map((src) => (
            <div
              key={src.sourceId}
              className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-sm hover:shadow-md transition-shadow space-y-3"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {src.sourceId}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {src.reliabilityTier}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Ref Year: {src.electionOrReferenceYear}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {src.title}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Publisher: <strong>{src.publisher}</strong> • Accessed: {src.dateAccessed}
                  </p>
                  {src.relevantTableOrPage && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium pt-1">
                      <Bookmark className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                      <span>{src.relevantTableOrPage}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={src.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 transition-colors"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  {src.archivedUrl && src.archivedUrl !== src.sourceUrl && (
                    <a
                      href={src.archivedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
                    >
                      <span>Archived</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-xs">
                <div>
                  <span className="font-semibold text-slate-700 block mb-1">
                    Geographic Scope:
                  </span>
                  <p className="text-slate-600 bg-slate-50 p-2 rounded border border-slate-100">
                    {src.geographicScope}
                  </p>
                </div>

                <div>
                  <span className="font-semibold text-slate-700 block mb-1">
                    Included Fields:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {src.fieldsIncluded.map((field) => (
                      <span
                        key={field}
                        className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 border border-slate-200"
                      >
                        {field}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200/80">
                <span className="font-semibold text-slate-800">Assumptions & Methodological Constraints:</span>
                <p className="mt-1 leading-relaxed text-slate-600">{src.assumptionsAndLimitations}</p>
                {src.fieldsUnavailable.length > 0 && (
                  <p className="mt-1 text-slate-500 text-[11px]">
                    <span className="font-medium text-amber-700">Unavailable / Unverified Fields: </span>
                    {src.fieldsUnavailable.join(', ')}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decoupled Service Layer Documentation */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-brand-600" />
          <h2 className="text-sm font-bold text-slate-900">
            Adding Additional Election Cycles or Constituencies
          </h2>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          The application follows a strictly decoupled service layer architecture:
        </p>
        <div className="space-y-2 text-xs text-slate-700 bg-slate-50 p-4 rounded-lg font-mono border border-slate-200">
          <p>1. Add raw statutory records in <code>src/data/parliamentaryElections.json</code> or <code>src/data/assemblyConstituencies.json</code>.</p>
          <p>2. Conform to the TypeScript types defined in <code>src/types/election.ts</code>.</p>
          <p>3. Dynamic calculation functions in <code>src/utils/calculations.ts</code> automatically derive vote shares, margins, and turnout without manual recalculation.</p>
          <p>4. Replace <code>src/services/dataLoader.ts</code> with a REST/GraphQL fetcher when deploying against a remote backend.</p>
        </div>
      </div>
    </div>
  );
};
