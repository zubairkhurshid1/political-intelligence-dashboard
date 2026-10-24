// Basic sanity checks for user inputs and data integrity

export const isValidVoteCount = (votes: unknown): boolean =>
  typeof votes === 'number' && !Number.isNaN(votes) && votes >= 0 && Number.isInteger(votes);

export const isValidDenominator = (val: unknown): boolean =>
  typeof val === 'number' && !Number.isNaN(val) && val > 0;

// Verifies candidate vote sum matches reported valid votes (allows 1-vote delta for rounding)
export const checkVoteSumDiscrepancy = (
  candidateVotesSum: number,
  reportedValidVotes: number
): { isConsistent: boolean; difference: number } => {
  const difference = reportedValidVotes - candidateVotesSum;
  return {
    isConsistent: Math.abs(difference) <= 1,
    difference,
  };
};

export const sanitizeSearchQuery = (query: string): string =>
  query.trim().toLowerCase().replace(/[^\w\s-]/g, '');
