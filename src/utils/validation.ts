/**
 * Validation and Data Integrity Utilities
 */

/**
 * Checks if a candidate result is numerically valid.
 */
export function isValidVoteCount(votes: unknown): boolean {
  return typeof votes === 'number' && !isNaN(votes) && votes >= 0 && Number.isInteger(votes);
}

/**
 * Checks if total valid votes is valid and strictly positive for ratio denominators.
 */
export function isValidDenominator(val: unknown): boolean {
  return typeof val === 'number' && !isNaN(val) && val > 0;
}

/**
 * Validates whether candidate vote sum is consistent with published valid votes.
 * Returns difference if any discrepancy exists.
 */
export function checkVoteSumDiscrepancy(
  candidateVotesSum: number,
  reportedValidVotes: number
): { isConsistent: boolean; difference: number } {
  const diff = reportedValidVotes - candidateVotesSum;
  return {
    isConsistent: Math.abs(diff) <= 1, // Tolerance for small rounding or NOTA inclusion variations
    difference: diff,
  };
}

/**
 * Sanitizes search input to prevent regex injection or excessive whitespace.
 */
export function sanitizeSearchQuery(query: string): string {
  return query.trim().toLowerCase().replace(/[^\w\s-]/g, '');
}
