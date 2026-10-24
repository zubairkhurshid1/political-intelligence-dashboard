// Electoral calculations following standard Election Commission of India formulas

const isValidNumber = (val: unknown): val is number =>
  typeof val === 'number' && !Number.isNaN(val);

const round2 = (num: number): number => Number(num.toFixed(2));

/**
 * Calculates candidate vote share percentage: (votes / totalValidVotes) * 100
 */
export function calculateVoteShare(
  candidateVotes: number | null | undefined,
  totalValidVotes: number | null | undefined
): number | null {
  if (!isValidNumber(candidateVotes) || !isValidNumber(totalValidVotes)) return null;
  if (totalValidVotes <= 0 || candidateVotes < 0) return null;

  return round2((candidateVotes / totalValidVotes) * 100);
}

/**
 * Calculates winning margin in raw votes: winner - runnerUp
 */
export function calculateWinningMargin(
  winnerVotes: number | null | undefined,
  runnerUpVotes: number | null | undefined
): number | null {
  if (!isValidNumber(winnerVotes) || !isValidNumber(runnerUpVotes)) return null;
  if (winnerVotes < 0 || runnerUpVotes < 0) return null;

  return winnerVotes - runnerUpVotes;
}

/**
 * Calculates winning margin as a percentage of total valid votes
 */
export function calculateWinningMarginPercentage(
  winningMargin: number | null | undefined,
  totalValidVotes: number | null | undefined
): number | null {
  if (!isValidNumber(winningMargin) || !isValidNumber(totalValidVotes)) return null;
  if (totalValidVotes <= 0) return null;

  return round2((winningMargin / totalValidVotes) * 100);
}

/**
 * Calculates voter turnout percentage: (polled / electors) * 100
 */
export function calculateVoterTurnout(
  votesPolled: number | null | undefined,
  registeredElectors: number | null | undefined
): number | null {
  if (!isValidNumber(votesPolled) || !isValidNumber(registeredElectors)) return null;
  if (registeredElectors <= 0 || votesPolled < 0) return null;

  return round2((votesPolled / registeredElectors) * 100);
}

/**
 * Calculates percentage swing between two cycles for a party
 */
export function calculateVoteShareChange(
  currentShare: number | null | undefined,
  previousShare: number | null | undefined
): number | null {
  if (!isValidNumber(currentShare) || !isValidNumber(previousShare)) return null;
  return round2(currentShare - previousShare);
}

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
  if (!recordA?.winner || !recordB?.winner) return null;

  const isSameParty =
    recordA.winner.partyAbbreviation.trim().toUpperCase() ===
    recordB.winner.partyAbbreviation.trim().toUpperCase();

  const isSameCandidate =
    recordA.winner.candidateName.trim().toLowerCase() ===
    recordB.winner.candidateName.trim().toLowerCase();

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
