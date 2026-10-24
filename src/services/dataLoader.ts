// Simulated client for local verified JSON datasets
// Emulates network latency so async UI states (skeletons, spinners) can be verified
import constituencyMetadataRaw from '../data/constituencyMetadata.json';
import parliamentaryElectionsRaw from '../data/parliamentaryElections.json';
import assemblyDataRaw from '../data/assemblyConstituencies.json';
import demographicsRaw from '../data/demographics.json';
import dataSourcesRaw from '../data/dataSources.json';

import type {
  ConstituencyMetadata,
  ParliamentaryElectionRecord,
  AssemblyConstituencyMetadata,
  AssemblyElectionRecord,
  DemographicIndicator,
  DataSourceMetadata,
} from '../types/election';

const delay = <T>(data: T, ms = 40): Promise<T> =>
  new Promise((res) => setTimeout(() => res(data), ms));

export const fetchConstituencyMetadata = (): Promise<ConstituencyMetadata> =>
  delay(constituencyMetadataRaw as ConstituencyMetadata);

export const fetchParliamentaryElections = (): Promise<ParliamentaryElectionRecord[]> =>
  delay(parliamentaryElectionsRaw as ParliamentaryElectionRecord[]);

export const fetchAssemblyMetadata = (): Promise<AssemblyConstituencyMetadata[]> =>
  delay(assemblyDataRaw.segments as AssemblyConstituencyMetadata[]);

export const fetchAssemblyResults = (): Promise<AssemblyElectionRecord[]> =>
  delay(assemblyDataRaw.assemblyResults as AssemblyElectionRecord[]);

export const fetchDemographics = (): Promise<DemographicIndicator[]> =>
  delay(demographicsRaw as DemographicIndicator[]);

export const fetchDataSources = (): Promise<DataSourceMetadata[]> =>
  delay(dataSourcesRaw as DataSourceMetadata[]);
