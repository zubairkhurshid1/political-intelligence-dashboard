import React from 'react';
import { ExternalLink, ShieldCheck, AlertTriangle, Database } from 'lucide-react';
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
              Complete metadata, statutory citations, and boundary limitations for 02-Srinagar PC
            </p>
          </div>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed mt-3">
          This dashboard adheres strictly to official records. All parliamentary and assembly election statistics are sourced directly from verified Election Commission of India (ECI) certified reports, Chief Electoral Officer Jammu & Kashmir portals, Delimitation Commission orders, and Census of India publications.
        </p>
      </div>

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
            <strong>2. Demographics Data Reference Year (Census 2011):</strong> The decennial 2021 Census of India was officially postponed by the Government of India and has not yet been executed. Consequently, demographic indicators (literacy, urbanization, population) are derived from the 2011 Census at the district level. Because the parliamentary constituency cuts across portions of 5 districts, district totals must <em>not</em> be mistaken for exact constituency-wide populations.
          </p>
        </div>
      </div>

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
                  <div className="flex items-center gap-2">
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
                </div>

                <a
                  href={src.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 transition-colors shrink-0"
                >
                  <span>Official Document</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
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
                    <span className="font-medium text-amber-700">Unavailable Fields: </span>
                    {src.fieldsUnavailable.join(', ')}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

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
