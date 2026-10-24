import React from 'react';
import {
  Users,
  Vote,
  MapPin,
  Building,
  Scale,
  Calendar,
  AlertCircle,
  FileText,
  PieChart as PieIcon,
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useConstituencyOverview } from '../hooks/useElectionData';
import { KpiCard } from '../components/cards/KpiCard';
import { LoadingSpinner } from '../components/feedback/LoadingSpinner';
import { ErrorMessage } from '../components/feedback/ErrorMessage';
import { DataFreshnessNotice } from '../components/feedback/DataFreshnessNotice';
import { formatIndianNumber, formatPercentage } from '../utils/formatters';

export const Overview: React.FC = () => {
  const { constituency, latestElection, segments, demographics, loading, error } =
    useConstituencyOverview();

  if (loading) {
    return <LoadingSpinner message="Loading constituency profile..." size="lg" />;
  }

  if (error || !constituency) {
    return (
      <ErrorMessage
        title="Could not load constituency overview"
        message={error || 'Constituency records not found'}
      />
    );
  }

  const genderData = [
    { name: 'Male Electors', value: 875938, color: '#0284c7' },
    { name: 'Female Electors', value: 871808, color: '#ec4899' },
    { name: 'Third Gender Electors', value: 64, color: '#8b5cf6' },
  ];

  const districtCounts = segments.reduce<Record<string, number>>((acc, s) => {
    acc[s.district] = (acc[s.district] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-brand-950 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden border border-slate-800">
        <div className="relative z-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
              PC-02 • {constituency.state}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              General Category (GEN)
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-700/60 text-slate-300 border border-slate-600">
              Post-2022 Delimitation
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {constituency.name} Parliamentary Constituency
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            Major parliamentary constituency located in the Kashmir Valley of Jammu and Kashmir. Following the 2022 Delimitation Commission order, Srinagar PC spans <strong>18 Assembly Segments</strong> across 5 administrative districts: Srinagar, Ganderbal, Budgam, Pulwama, and Shopian.
          </p>

          <div className="mt-5 flex flex-wrap gap-4 text-xs sm:text-sm text-slate-300 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-1.5">
              <Building className="w-4 h-4 text-brand-400" />
              <span>HQ: <strong>{constituency.headquarters}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-brand-400" />
              <span>Segments: <strong>18 Legislative Assembly Seats</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-brand-400" />
              <span>Latest General Election: <strong>May 13, 2024</strong></span>
            </div>
          </div>
        </div>
      </div>

      <DataFreshnessNotice
        referenceYear="2024 (Electoral) / 2011 (Demographics)"
        sourceTitle="Election Commission of India (Form 20 / Results Portal) & Census of India 2011"
        delimitationNote="Demographic figures from Census 2011 reflect pre-delimitation district boundaries as Census 2021 was officially postponed."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Registered Electors"
          value={formatIndianNumber(latestElection?.registeredElectors)}
          referenceYear="2024"
          unit="Voters"
          icon={Users}
          subValue="Certified ECI Electoral Roll for 2024 Lok Sabha"
          accentColor="brand"
        />

        <KpiCard
          title="2024 Voter Turnout"
          value={formatPercentage(latestElection?.turnoutPercentage)}
          referenceYear="2024"
          unit="Turnout"
          icon={Vote}
          trend={{
            value: 24.2,
            label: 'vs 2019 (14.43%)',
          }}
          subValue={`${formatIndianNumber(latestElection?.votesPolled)} certified votes (38.49% poll-day EVM est.)`}
          accentColor="emerald"
        />

        <KpiCard
          title="Winning Margin (2024)"
          value={formatIndianNumber(latestElection?.winningMargin)}
          referenceYear="2024"
          unit="Votes"
          icon={Scale}
          subValue={`${formatPercentage(latestElection?.winningMarginPercentage)} of valid votes`}
          footnote="Aga Syed Ruhullah Mehdi (JKNC)"
          accentColor="indigo"
        />

        <KpiCard
          title="Assembly Segments"
          value={constituency.totalAssemblySegments}
          referenceYear="2022 Order"
          unit="Seats"
          icon={MapPin}
          subValue="Spanning 5 Administrative Districts"
          accentColor="amber"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/90 p-6 shadow-sm">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Delimitation Framework & Boundary Evolution
              </h2>
              <p className="text-xs text-slate-500">
                Statutory Order No. 477/J&K/2022 implemented for the 2024 General Elections
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            {constituency.delimitationSummary}
          </p>

          <div className="space-y-3 pt-3 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Assembly Segments Distribution Across Districts
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(districtCounts).map(([district, count]) => {
                const districtSegments = segments.filter((s) => s.district === district);
                return (
                  <div
                    key={district}
                    className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 text-xs"
                  >
                    <div className="flex items-center justify-between font-bold text-slate-800 mb-1.5">
                      <span>{district} District</span>
                      <span className="px-2 py-0.5 rounded-full bg-brand-100 text-brand-800 text-[10px]">
                        {count} {count === 1 ? 'Segment' : 'Segments'}
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      {districtSegments.map((s) => `${s.number}-${s.name}${s.reservation !== 'GEN' ? ` (${s.reservation})` : ''}`).join(', ')}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <PieIcon className="w-4 h-4 text-brand-600" />
                <h3 className="text-sm font-bold text-slate-900">Electorate Gender Ratio</h3>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                2024 Roll
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-2">
              Gender distribution of certified registered voters in Srinagar PC
            </p>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={3}
                  >
                    {genderData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const item = payload[0];
                        return (
                          <div className="custom-recharts-tooltip">
                            <p className="font-bold text-white">{item.name}</p>
                            <p className="text-xs text-brand-300 font-mono mt-1">
                              {formatIndianNumber(item.value as number)} Electors ({formatPercentage(((item.value as number) / 1747810) * 100)})
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-600" /> Male Electors
                </span>
                <span className="font-mono font-semibold text-slate-900">8,75,938 (50.12%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-pink-500" /> Female Electors
                </span>
                <span className="font-mono font-semibold text-slate-900">8,71,808 (49.88%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Third Gender
                </span>
                <span className="font-mono font-semibold text-slate-900">64 Electors</span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-2.5 bg-brand-50/70 rounded-lg border border-brand-100 text-[11px] text-brand-900">
            <strong>Gender Parity:</strong> 995 female electors per 1,000 male electors, significantly higher than national average.
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Verified Demographic Indicators
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Socio-economic indicators with explicit reference years and geographical limitations
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>Note: 2021 Census of India was officially postponed</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-2.5 px-3">Indicator Name</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3 text-right">Value</th>
                <th className="py-2.5 px-3 text-center">Reference Year</th>
                <th className="py-2.5 px-3">Geographic Scope</th>
                <th className="py-2.5 px-3">Source & Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {demographics.map((demo) => (
                <tr key={demo.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3 font-semibold text-slate-900">
                    {demo.indicatorName}
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                      {demo.category}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                    {demo.formattedValue}
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-slate-600">
                    {demo.referenceYear}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium ${
                        demo.isConstituencyExact
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {demo.geographicLevel}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-500 text-[11px] leading-relaxed max-w-xs">
                    <p>{demo.notes}</p>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Source: {demo.sourceTitle}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
