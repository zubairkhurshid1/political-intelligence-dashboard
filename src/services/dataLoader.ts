/**
 * Raw Data Loader Service
 * 
 * Simulates an asynchronous data fetch layer for local verified JSON datasets.
 * In a production architecture with a remote API, this module would execute HTTP requests.
 */

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

// Simulated network latency (fast for test/dev, but validates async loading states)
const SIMULATED_LATENCY_MS = 60;

function simulateDelay<T>(data: T, delay: number = SIMULATED_LATENCY_MS): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
}

export async function fetchConstituencyMetadata(): Promise<ConstituencyMetadata> {
  return simulateDelay(constituencyMetadataRaw as ConstituencyMetadata);
}

export async function fetchParliamentaryElections(): Promise<ParliamentaryElectionRecord[]> {
  return simulateDelay(parliamentaryElectionsRaw as ParliamentaryElectionRecord[]);
}

export async function fetchAssemblyMetadata(): Promise<AssemblyConstituencyMetadata[]> {
  return simulateDelay(assemblyDataRaw.segments as AssemblyConstituencyMetadata[]);
}

export async function fetchAssemblyResults(): Promise<AssemblyElectionRecord[]> {
  return simulateDelay(assemblyDataRaw.assemblyResults as AssemblyElectionRecord[]);
}

export async function fetchDemographics(): Promise<DemographicIndicator[]> {
  return simulateDelay(demographicsRaw as DemographicIndicator[]);
}

export async function fetchDataSources(): Promise<DataSourceMetadata[]> {
  return simulateDelay(dataSourcesRaw as DataSourceMetadata[]);
}
