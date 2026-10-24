import { useState, useEffect } from 'react';
import { electionService } from '../services/electionService';
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

export function useConstituencyOverview() {
  const [constituency, setConstituency] = useState<ConstituencyMetadata | null>(null);
  const [latestElection, setLatestElection] = useState<ParliamentaryElectionRecord | null>(null);
  const [segments, setSegments] = useState<AssemblyConstituencyMetadata[]>([]);
  const [demographics, setDemographics] = useState<DemographicIndicator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        setLoading(true);
        const [meta, elections, segs, demos] = await Promise.all([
          electionService.getConstituencyMetadata(),
          electionService.getParliamentaryElections(),
          electionService.getAssemblyConstituencies(),
          electionService.getDemographics(),
        ]);
        if (isMounted) {
          setConstituency(meta);
          setLatestElection(elections[0] ?? null);
          setSegments(segs);
          setDemographics(demos);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load constituency data');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return { constituency, latestElection, segments, demographics, loading, error };
}

export function useParliamentaryData() {
  const [elections, setElections] = useState<ParliamentaryElectionRecord[]>([]);
  const [partyTrends, setPartyTrends] = useState<PartyVoteShareTrendPoint[]>([]);
  const [marginTrends, setMarginTrends] = useState<MarginTrendPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        setLoading(true);
        const [allElections, pTrends, mTrends] = await Promise.all([
          electionService.getParliamentaryElections(),
          electionService.getPartyVoteShareTrends(),
          electionService.getWinningMarginTrends(),
        ]);
        if (isMounted) {
          setElections(allElections);
          setPartyTrends(pTrends);
          setMarginTrends(mTrends);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load parliamentary records');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return { elections, partyTrends, marginTrends, loading, error };
}

export function useAssemblyData() {
  const [segments, setSegments] = useState<AssemblyConstituencyMetadata[]>([]);
  const [allResults, setAllResults] = useState<AssemblyElectionRecord[]>([]);
  const [availableYears, setAvailableYears] = useState<number[]>([2024, 2014]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        setLoading(true);
        const [metaList, resultsList, years] = await Promise.all([
          electionService.getAssemblyConstituencies(),
          electionService.getAssemblyResults(),
          electionService.getAvailableAssemblyYears(),
        ]);
        if (isMounted) {
          setSegments(metaList);
          setAllResults(resultsList);
          setAvailableYears(years);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load assembly records');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return { segments, allResults, availableYears, loading, error };
}

export function useSourcesData() {
  const [sources, setSources] = useState<DataSourceMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        setLoading(true);
        const data = await electionService.getDataSources();
        if (isMounted) {
          setSources(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load sources');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return { sources, loading, error };
}
