/**
 * Election Service
 * 
 * Provides unified, typed, and normalized access to electoral datasets.
 * Encapsulates filtering, sorting, trend aggregation, and edge-case handling.
 */

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
} from '../types/election';

export class ElectionService {
  /**
   * Retrieves Parliamentary Constituency metadata.
   */
  static async getConstituencyMetadata(): Promise<ConstituencyMetadata> {
    return fetchConstituencyMetadata();
  }

  /**
   * Retrieves all historical Parliamentary election records.
   */
  static async getParliamentaryElections(): Promise<ParliamentaryElectionRecord[]> {
    const records = await fetchParliamentaryElections();
    // Sort descending by election year
    return [...records].sort((a, b) => b.electionYear - a.electionYear);
  }

  /**
   * Retrieves a specific Parliamentary election record by year.
   */
  static async getParliamentaryElectionByYear(
    year: number
  ): Promise<ParliamentaryElectionRecord | null> {
    const elections = await this.getParliamentaryElections();
    return elections.find((e) => e.electionYear === year) || null;
  }

  /**
   * Returns list of available Parliamentary election years.
   */
  static async getAvailableParliamentaryYears(): Promise<number[]> {
    const elections = await this.getParliamentaryElections();
    return elections.map((e) => e.electionYear);
  }

  /**
   * Retrieves metadata for all 18 Assembly segments.
   */
  static async getAssemblyConstituencies(): Promise<AssemblyConstituencyMetadata[]> {
    const list = await fetchAssemblyMetadata();
    return [...list].sort((a, b) => a.number - b.number);
  }

  /**
   * Retrieves Assembly election records with optional filtering.
   */
  static async getAssemblyResults(
    assemblyId?: string,
    electionYear?: number
  ): Promise<AssemblyElectionRecord[]> {
    let results = await fetchAssemblyResults();

    if (assemblyId) {
      results = results.filter((r) => r.assemblyId === assemblyId);
    }

    if (electionYear) {
      results = results.filter((r) => r.electionYear === electionYear);
    }

    return results;
  }

  /**
   * Returns available Assembly election years.
   */
  static async getAvailableAssemblyYears(): Promise<number[]> {
    const results = await fetchAssemblyResults();
    const years = Array.from(new Set(results.map((r) => r.electionYear)));
    return years.sort((a, b) => b - a);
  }

  /**
   * Retrieves demographic indicators.
   */
  static async getDemographics(): Promise<DemographicIndicator[]> {
    return fetchDemographics();
  }

  /**
   * Retrieves all verified data sources.
   */
  static async getDataSources(): Promise<DataSourceMetadata[]> {
    return fetchDataSources();
  }

  /**
   * Aggregates historical party vote share trends over time for Recharts.
   */
  static async getPartyVoteShareTrends(): Promise<Array<{
    year: number;
    JKNC?: number;
    JKPDP?: number;
    INC?: number;
    BJP?: number;
    'APNI PARTY'?: number;
    JKPC?: number;
    NOTA?: number;
    turnout: number;
  }>> {
    const elections = await this.getParliamentaryElections();
    // Sort ascending for chronological trend lines
    const sorted = [...elections].sort((a, b) => a.electionYear - b.electionYear);

    return sorted.map((record) => {
      const entry: {
        year: number;
        JKNC?: number;
        JKPDP?: number;
        INC?: number;
        BJP?: number;
        'APNI PARTY'?: number;
        JKPC?: number;
        NOTA?: number;
        turnout: number;
      } = {
        year: record.electionYear,
        turnout: record.turnoutPercentage,
      };

      // Extract candidate vote shares for top parties
      for (const cand of record.candidates) {
        const abbr = cand.partyAbbreviation.toUpperCase();
        if (['JKNC', 'JKPDP', 'INC', 'BJP', 'APNI PARTY', 'JKPC', 'NOTA'].includes(abbr)) {
          if (cand.voteSharePercentage !== undefined) {
            (entry as Record<string, unknown>)[abbr] = cand.voteSharePercentage;
          }
        }
      }

      return entry;
    });
  }

  /**
   * Aggregates winning margin trends across election years.
   */
  static async getWinningMarginTrends(): Promise<Array<{
    year: number;
    winningMargin: number;
    winningMarginPercentage: number;
    winner: string;
    party: string;
    turnout: number;
  }>> {
    const elections = await this.getParliamentaryElections();
    const sorted = [...elections].sort((a, b) => a.electionYear - b.electionYear);

    return sorted.map((r) => ({
      year: r.electionYear,
      winningMargin: r.winningMargin,
      winningMarginPercentage: r.winningMarginPercentage,
      winner: r.winner.candidateName,
      party: r.winner.partyAbbreviation,
      turnout: r.turnoutPercentage,
    }));
  }
}
