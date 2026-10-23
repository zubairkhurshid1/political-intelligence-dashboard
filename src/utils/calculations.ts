/**
 * Electoral Calculation Utilities
 * 
 * Implements standard election analytics formulas adhering strictly to
 * Election Commission of India (ECI) guidelines and edge-case handling.
 */

/**
 * Calculates candidate vote share percentage.
 * Formula: (candidateVotes / totalValidVotes) * 100
 * 
 * @param candidateVotes Total valid votes received by the candidate
 * @param totalValidVotes Total valid votes cast in the constituency
 * @returns Vote share rounded to 2 decimal places, or null if invalid/unavailable
 */
export function calculateVoteShare(
  candidateVotes: number | null | undefined,
  totalValidVotes: number | null | undefined
): number | null {
  if (
    candidateVotes === null ||
    candidateVotes === undefined ||
    totalValidVotes === null ||
    totalValidVotes === undefined
  ) {
    return null;
  }

  if (typeof candidateVotes !== 'number' || typeof totalValidVotes !== 'number') {
    return null;
  }

  if (isNaN(candidateVotes) || isNaN(totalValidVotes)) {
    return null;
  }

  if (totalValidVotes <= 0 || candidateVotes < 0) {
    return null;
  }

  const share = (candidateVotes / totalValidVotes) * 100;
  return Number(share.toFixed(2));
}

/**
 * Calculates winning margin in votes.
 * Formula: winnerVotes - runnerUpVotes
 * 
 * @param winnerVotes Votes secured by the 1st position candidate
 * @param runnerUpVotes Votes secured by the 2nd position candidate
 * @returns Absolute vote difference or null if either input is invalid/unavailable
 */
export function calculateWinningMargin(
  winnerVotes: number | null | undefined,
  runnerUpVotes: number | null | undefined
): number | null {
  if (
    winnerVotes === null ||
    winnerVotes === undefined ||
    runnerUpVotes === null ||
    runnerUpVotes === undefined
  ) {
    return null;
  }

  if (typeof winnerVotes !== 'number' || typeof runnerUpVotes !== 'number') {
    return null;
  }

  if (isNaN(winnerVotes) || isNaN(runnerUpVotes)) {
    return null;
  }

  if (winnerVotes < 0 || runnerUpVotes < 0) {
    return null;
  }

  return winnerVotes - runnerUpVotes;
}

/**
 * Calculates winning margin as a percentage of total valid votes.
 * Formula: (winningMargin / totalValidVotes) * 100
 * 
 * @param winningMargin Absolute vote difference between winner and runner-up
 * @param totalValidVotes Total valid votes cast
 * @returns Margin percentage rounded to 2 decimal places, or null if invalid
 */
export function calculateWinningMarginPercentage(
  winningMargin: number | null | undefined,
  totalValidVotes: number | null | undefined
): number | null {
  if (
    winningMargin === null ||
    winningMargin === undefined ||
    totalValidVotes === null ||
    totalValidVotes === undefined
  ) {
    return null;
  }

  if (typeof winningMargin !== 'number' || typeof totalValidVotes !== 'number') {
    return null;
  }

  if (isNaN(winningMargin) || isNaN(totalValidVotes)) {
    return null;
  }

  if (totalValidVotes <= 0) {
    return null;
  }

  const percentage = (winningMargin / totalValidVotes) * 100;
  return Number(percentage.toFixed(2));
}

/**
 * Calculates voter turnout percentage.
 * Formula: (totalVotesPolled / registeredElectors) * 100
 * 
 * @param votesPolled Total votes polled (or valid votes if certified polled count is identical)
 * @param registeredElectors Total registered voters on the electoral roll
 * @returns Turnout percentage rounded to 2 decimal places, or null if invalid
 */
export function calculateVoterTurnout(
  votesPolled: number | null | undefined,
  registeredElectors: number | null | undefined
): number | null {
  if (
    votesPolled === null ||
    votesPolled === undefined ||
    registeredElectors === null ||
    registeredElectors === undefined
  ) {
    return null;
  }

  if (typeof votesPolled !== 'number' || typeof registeredElectors !== 'number') {
    return null;
  }

  if (isNaN(votesPolled) || isNaN(registeredElectors)) {
    return null;
  }

  if (registeredElectors <= 0 || votesPolled < 0) {
    return null;
  }

  const turnout = (votesPolled / registeredElectors) * 100;
  return Number(turnout.toFixed(2));
}

/**
 * Calculates party vote share change between two comparable election cycles.
 * Formula: currentShare - previousShare
 * 
 * @param currentShare Current election vote share percentage
 * @param previousShare Previous election vote share percentage
 * @returns Vote share swing percentage rounded to 2 decimal places, or null if not comparable
 */
export function calculateVoteShareChange(
  currentShare: number | null | undefined,
  previousShare: number | null | undefined
): number | null {
  if (
    currentShare === null ||
    currentShare === undefined ||
    previousShare === null ||
    previousShare === undefined
  ) {
    return null;
  }

  if (typeof currentShare !== 'number' || typeof previousShare !== 'number') {
    return null;
  }

  if (isNaN(currentShare) || isNaN(previousShare)) {
    return null;
  }

  const diff = currentShare - previousShare;
  return Number(diff.toFixed(2));
}

/**
 * Determines outcome retention or political change between two election years.
 */
export interface OutcomeComparison {
  yearA: number;
  yearB: number;
  winnerA: string;
  partyA: string;
  winnerB: string;
  partyB: string;
  isSameParty: boolean;
  isSameCandidate: boolean;
  description: string;
}

export function compareElectionOutcomes(
  recordA: { electionYear: number; winner: { candidateName: string; partyName: string; partyAbbreviation: string } } | null | undefined,
  recordB: { electionYear: number; winner: { candidateName: string; partyName: string; partyAbbreviation: string } } | null | undefined
): OutcomeComparison | null {
  if (!recordA || !recordB || !recordA.winner || !recordB.winner) {
    return null;
  }

  const isSameParty =
    recordA.winner.partyAbbreviation.toUpperCase() === recordB.winner.partyAbbreviation.toUpperCase();
  const isSameCandidate =
    recordA.winner.candidateName.toLowerCase().trim() === recordB.winner.candidateName.toLowerCase().trim();

  let description = '';
  if (isSameCandidate) {
    description = `Retained by ${recordB.winner.candidateName} (${recordB.winner.partyAbbreviation})`;
  } else if (isSameParty) {
    description = `Retained by ${recordB.winner.partyAbbreviation} with new candidate (${recordB.winner.candidateName})`;
  } else {
    description = `Shift from ${recordA.winner.partyAbbreviation} (${recordA.winner.candidateName}) to ${recordB.winner.partyAbbreviation} (${recordB.winner.candidateName})`;
  }

  return {
    yearA: recordA.electionYear,
    yearB: recordB.electionYear,
    winnerA: recordA.winner.candidateName,
    partyA: recordA.winner.partyAbbreviation,
    winnerB: recordB.winner.candidateName,
    partyB: recordB.winner.partyAbbreviation,
    isSameParty,
    isSameCandidate,
    description,
  };
}
