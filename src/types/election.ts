/**
 * Type definitions for Political Intelligence Dashboard
 * Srinagar Parliamentary Constituency (PC-02), Jammu & Kashmir
 */

export type ReservationStatus = 'GEN' | 'SC' | 'ST';

export interface ConstituencyMetadata {
  id: string;
  name: string;
  number: number;
  state: string;
  type: 'Parliamentary';
  reservation: ReservationStatus;
  headquarters: string;
  currentDelimitationYear: number;
  delimitationSummary: string;
  districtsCovered: string[];
  totalAssemblySegments: number;
  assemblySegmentIds: string[];
  officialSourceId: string;
}

export interface AssemblyConstituencyMetadata {
  id: string;
  number: number;
  name: string;
  district: string;
  reservation: ReservationStatus;
  delimitationStatus: 'Post-2022 Delimitation' | 'Pre-2022 Delimitation';
  delimitationNotes?: string;
  historicalParentPc?: string;
  totalElectors2024?: number | null;
}

export interface CandidateResult {
  candidateId: string;
  candidateName: string;
  partyName: string;
  partyAbbreviation: string;
  votes: number;
  voteSharePercentage?: number;
  resultPosition: number;
  isWinner: boolean;
  depositLost?: boolean;
}

export interface ParliamentaryElectionRecord {
  electionYear: number;
  pollDate: string;
  registeredElectors: number;
  votesPolled: number;
  validVotes: number;
  rejectedVotes: number;
  notaVotes?: number;
  turnoutPercentage: number;
  officialProvisionalTurnoutPercentage?: number;
  provisionalVotesPolled?: number;
  marginDenominator?: string;
  winner: {
    candidateName: string;
    partyName: string;
    partyAbbreviation: string;
    votes: number;
    voteSharePercentage: number;
  };
  runnerUp: {
    candidateName: string;
    partyName: string;
    partyAbbreviation: string;
    votes: number;
    voteSharePercentage: number;
  };
  winningMargin: number;
  winningMarginPercentage: number;
  totalCandidates: number;
  candidates: CandidateResult[];
  sourceId: string;
  notes?: string;
}

export interface AssemblyElectionRecord {
  assemblyId: string;
  assemblyNumber: number;
  assemblyName: string;
  district: string;
  electionYear: number;
  registeredElectors: number | null;
  validVotes: number | null;
  turnoutPercentage: number | null;
  winner: {
    candidateName: string;
    partyName: string;
    partyAbbreviation: string;
    votes: number;
    voteSharePercentage?: number | null;
  } | null;
  runnerUp: {
    candidateName: string;
    partyName: string;
    partyAbbreviation: string;
    votes: number;
    voteSharePercentage?: number | null;
  } | null;
  winningMargin: number | null;
  winningMarginPercentage: number | null;
  candidates: CandidateResult[];
  sourceId: string;
  isDataAvailable: boolean;
  notes?: string;
}

export interface DemographicIndicator {
  id: string;
  category: 'Population' | 'Literacy' | 'Gender' | 'Urbanization' | 'Electorate';
  indicatorName: string;
  value: string | number;
  formattedValue: string;
  unit?: string;
  referenceYear: string;
  geographicLevel: 'Constituency Estimate' | 'District Aggregate' | 'Census Sub-district';
  sourceTitle: string;
  sourceUrl?: string;
  isConstituencyExact: boolean;
  notes: string;
}

export interface DataSourceMetadata {
  sourceId: string;
  title: string;
  publisher: string;
  sourceUrl: string;
  archivedUrl?: string;
  relevantTableOrPage?: string;
  electionOrReferenceYear: string;
  geographicScope: string;
  dateAccessed: string;
  fieldsIncluded: string[];
  fieldsUnavailable: string[];
  assumptionsAndLimitations: string;
  reliabilityTier: 'Official Statutory Source' | 'Official Portal' | 'Public Records';
}

export interface CalculatedElectoralMetrics {
  voteShare: number | null;
  winningMargin: number | null;
  winningMarginPercentage: number | null;
  turnoutPercentage: number | null;
}

export interface PartyVoteShareTrendPoint {
  year: number;
  turnout: number;
  JKNC?: number;
  JKPDP?: number;
  BJP?: number;
  INC?: number;
  'APNI PARTY'?: number;
  JKPC?: number;
  [party: string]: number | undefined;
}

export interface MarginTrendPoint {
  year: number;
  winningMargin: number;
  winningMarginPercentage: number;
  winner: string;
  party: string;
  turnout: number;
}

