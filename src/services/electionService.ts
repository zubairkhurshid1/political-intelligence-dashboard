import {
  fetchConstituencyMetadata,
  fetchParliamentaryElections,
  fetchAssemblyMetadata,
  fetchAssemblyResults,
  fetchDemographics,
  fetchDataSources,
} from './dataLoader';

import type {
  ConstituencyMetadata,
  ParliamentaryElectionRecord,
  AssemblyConstituencyMetadata,
  AssemblyElectionRecord,
  DemographicIndicator,
  DataSourceMetadata,
  PartyVoteShareTrendPoint,
  MarginTrendPoint,
} from '../types/election';

// Central data access layer for election queries, filtering, and trend aggregation
export const electionService = {
  getConstituencyMetadata: (): Promise<ConstituencyMetadata> => {
    return fetchConstituencyMetadata();
  },

  getParliamentaryElections: async (): Promise<ParliamentaryElectionRecord[]> => {
    const list = await fetchParliamentaryElections();
    // Return newest elections first
    return [...list].sort((a, b) => b.electionYear - a.electionYear);
  },

  getParliamentaryElectionByYear: async (
    year: number
  ): Promise<ParliamentaryElectionRecord | null> => {
    const elections = await electionService.getParliamentaryElections();
    return elections.find((e) => e.electionYear === year) ?? null;
  },

  getAvailableParliamentaryYears: async (): Promise<number[]> => {
    const elections = await electionService.getParliamentaryElections();
    return elections.map((e) => e.electionYear);
  },

  getAssemblyConstituencies: async (): Promise<AssemblyConstituencyMetadata[]> => {
    const list = await fetchAssemblyMetadata();
    return [...list].sort((a, b) => a.number - b.number);
  },

  getAssemblyResults: async (
    assemblyId?: string,
    electionYear?: number
  ): Promise<AssemblyElectionRecord[]> => {
    let results = await fetchAssemblyResults();

    if (assemblyId) {
      results = results.filter((r) => r.assemblyId === assemblyId);
    }
    if (electionYear) {
      results = results.filter((r) => r.electionYear === electionYear);
    }

    return results;
  },

  getAvailableAssemblyYears: async (): Promise<number[]> => {
    const results = await fetchAssemblyResults();
    const years = [...new Set(results.map((r) => r.electionYear))];
    return years.sort((a, b) => b - a);
  },

  getDemographics: (): Promise<DemographicIndicator[]> => {
    return fetchDemographics();
  },

  getDataSources: (): Promise<DataSourceMetadata[]> => {
    return fetchDataSources();
  },

  // Flattens candidate vote share by party across years for line charting
  getPartyVoteShareTrends: async (): Promise<PartyVoteShareTrendPoint[]> => {
    const elections = await electionService.getParliamentaryElections();
    // Chronological order for trend visualization
    const chronological = [...elections].sort((a, b) => a.electionYear - b.electionYear);

    return chronological.map((record) => {
      const entry: PartyVoteShareTrendPoint = {
        year: record.electionYear,
        turnout: record.turnoutPercentage,
      };

      for (const cand of record.candidates) {
        const party = cand.partyAbbreviation.toUpperCase();
        if (['JKNC', 'JKPDP', 'INC', 'BJP', 'APNI PARTY', 'JKPC', 'NOTA'].includes(party)) {
          if (cand.voteSharePercentage !== undefined) {
            entry[party] = cand.voteSharePercentage;
          }
        }
      }

      return entry;
    });
  },

  getWinningMarginTrends: async (): Promise<MarginTrendPoint[]> => {
    const elections = await electionService.getParliamentaryElections();
    const chronological = [...elections].sort((a, b) => a.electionYear - b.electionYear);

    return chronological.map((r) => ({
      year: r.electionYear,
      winningMargin: r.winningMargin,
      winningMarginPercentage: r.winningMarginPercentage,
      winner: r.winner.candidateName,
      party: r.winner.partyAbbreviation,
      turnout: r.turnoutPercentage,
    }));
  },
};

// Backward-compatible alias for existing imports
export const ElectionService = electionService;
