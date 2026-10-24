import { describe, it, expect } from 'vitest';
import {
  calculateVoteShare,
  calculateWinningMargin,
  calculateWinningMarginPercentage,
  calculateVoterTurnout,
  calculateVoteShareChange,
  compareElectionOutcomes,
} from '../utils/calculations';

describe('Electoral Calculations — Formula & Edge-Case Unit Tests', () => {
  describe('calculateVoteShare', () => {
    it('calculates correct vote share percentage for winner (52.85%)', () => {
      // 2024 Srinagar certified: Aga Ruhullah 356,866 out of 675,242 certified votes = 52.85%
      const share = calculateVoteShare(356866, 675242);
      expect(share).toBe(52.85);
    });

    it('calculates correct vote share percentage for runner-up (24.95%)', () => {
      // 2024 Srinagar certified: Waheed Para 168,450 out of 675,242 certified votes = 24.95%
      const runnerUpShare = calculateVoteShare(168450, 675242);
      expect(runnerUpShare).toBe(24.95);
    });

    it('calculates correct vote share for NOTA (0.89%)', () => {
      // 2024 NOTA: 5,998 out of 675,242 certified votes = 0.89%
      const notaShare = calculateVoteShare(5998, 675242);
      expect(notaShare).toBe(0.89);
    });

    it('demonstrates discrepancy if using unverified provisional EVM denominator (672,836)', () => {
      // 356,866 / 672,836 = 53.04% (the discredited third-party figure)
      const erroneousShare = calculateVoteShare(356866, 672836);
      expect(erroneousShare).toBe(53.04);
      // Demonstrates that ECI official table strictly used 675,242
      expect(calculateVoteShare(356866, 675242)).toBe(52.85);
    });

    it('returns null when valid votes denominator is zero', () => {
      expect(calculateVoteShare(100, 0)).toBeNull();
    });

    it('returns null when valid votes denominator is negative', () => {
      expect(calculateVoteShare(100, -500)).toBeNull();
    });

    it('returns null for negative candidate votes', () => {
      expect(calculateVoteShare(-50, 1000)).toBeNull();
    });

    it('returns null when candidate votes is null or undefined', () => {
      expect(calculateVoteShare(null, 1000)).toBeNull();
      expect(calculateVoteShare(undefined, 1000)).toBeNull();
    });

    it('returns null when totalValidVotes is null or undefined', () => {
      expect(calculateVoteShare(100, null)).toBeNull();
      expect(calculateVoteShare(100, undefined)).toBeNull();
    });

    it('returns null when inputs are NaN', () => {
      expect(calculateVoteShare(NaN, 1000)).toBeNull();
      expect(calculateVoteShare(100, NaN)).toBeNull();
    });

    it('handles zero candidate votes safely (0.00%)', () => {
      expect(calculateVoteShare(0, 5000)).toBe(0);
    });
  });

  describe('calculateWinningMargin', () => {
    it('calculates absolute difference between winner and runner-up votes', () => {
      // 2024: 356866 - 168450 = 188416
      expect(calculateWinningMargin(356866, 168450)).toBe(188416);
    });

    it('returns null if either candidate votes is null or undefined', () => {
      expect(calculateWinningMargin(null, 1000)).toBeNull();
      expect(calculateWinningMargin(1000, null)).toBeNull();
      expect(calculateWinningMargin(undefined, undefined)).toBeNull();
    });

    it('returns null if input values are negative', () => {
      expect(calculateWinningMargin(-10, 50)).toBeNull();
      expect(calculateWinningMargin(50, -10)).toBeNull();
    });

    it('returns null for NaN inputs', () => {
      expect(calculateWinningMargin(NaN, 100)).toBeNull();
      expect(calculateWinningMargin(100, NaN)).toBeNull();
    });

    it('handles tie gracefully (0 margin)', () => {
      expect(calculateWinningMargin(5000, 5000)).toBe(0);
    });
  });

  describe('calculateWinningMarginPercentage', () => {
    it('calculates margin as percentage of total valid votes', () => {
      // 188,416 margin on 675,242 certified votes = 27.90%
      expect(calculateWinningMarginPercentage(188416, 675242)).toBe(27.9);
    });

    it('calculates margin as percentage of registered electors when using electorate denominator', () => {
      // 188,416 margin on 1,747,810 registered electors = 10.78%
      expect(calculateWinningMarginPercentage(188416, 1747810)).toBe(10.78);
    });

    it('returns null when totalValidVotes is zero', () => {
      expect(calculateWinningMarginPercentage(100, 0)).toBeNull();
    });

    it('returns null when inputs are null or undefined', () => {
      expect(calculateWinningMarginPercentage(null, 500)).toBeNull();
      expect(calculateWinningMarginPercentage(100, null)).toBeNull();
    });
  });

  describe('calculateVoterTurnout', () => {
    it('calculates turnout percentage from polled votes and registered electors', () => {
      // 675,242 certified polled / 1,747,810 registered = 38.6336... -> 38.63%
      const turnout = calculateVoterTurnout(675242, 1747810);
      expect(turnout).toBe(38.63);
    });

    it('handles poll-day provisional turnout estimate calculation accurately', () => {
      // 672,836 provisional / 1,747,810 registered = 38.4959... rounded to 2 decimal places = 38.5%
      const provisional = calculateVoterTurnout(672836, 1747810);
      expect(provisional).toBe(38.5);
    });

    it('returns null when registered electors is zero', () => {
      expect(calculateVoterTurnout(500, 0)).toBeNull();
    });

    it('returns null when registered electors is negative', () => {
      expect(calculateVoterTurnout(500, -100)).toBeNull();
    });

    it('returns null for null, undefined, or NaN inputs', () => {
      expect(calculateVoterTurnout(null, 1000)).toBeNull();
      expect(calculateVoterTurnout(500, null)).toBeNull();
      expect(calculateVoterTurnout(NaN, 1000)).toBeNull();
    });
  });

  describe('calculateVoteShareChange', () => {
    it('calculates positive vote share change correctly', () => {
      // e.g. 52.85% - 37.04% = +15.81%
      expect(calculateVoteShareChange(52.85, 37.04)).toBe(15.81);
    });

    it('calculates negative vote share swing correctly', () => {
      // e.g. 24.95% - 50.58% = -25.63%
      expect(calculateVoteShareChange(24.95, 50.58)).toBe(-25.63);
    });

    it('returns null when either share is null or undefined', () => {
      expect(calculateVoteShareChange(null, 30)).toBeNull();
      expect(calculateVoteShareChange(30, null)).toBeNull();
    });
  });

  describe('compareElectionOutcomes', () => {
    it('identifies retention by same candidate', () => {
      const outcome = compareElectionOutcomes(
        { electionYear: 2014, winner: { candidateName: 'Farooq Abdullah', partyName: 'National Conference', partyAbbreviation: 'JKNC' } },
        { electionYear: 2019, winner: { candidateName: 'Farooq Abdullah', partyName: 'National Conference', partyAbbreviation: 'JKNC' } }
      );
      expect(outcome?.isSameCandidate).toBe(true);
      expect(outcome?.isSameParty).toBe(true);
      expect(outcome?.description).toContain('Retained by Farooq Abdullah');
    });

    it('identifies party shift', () => {
      const outcome = compareElectionOutcomes(
        { electionYear: 2009, winner: { candidateName: 'Farooq Abdullah', partyName: 'National Conference', partyAbbreviation: 'JKNC' } },
        { electionYear: 2014, winner: { candidateName: 'Tariq Hameed Karra', partyName: 'Peoples Democratic Party', partyAbbreviation: 'JKPDP' } }
      );
      expect(outcome?.isSameParty).toBe(false);
      expect(outcome?.isSameCandidate).toBe(false);
      expect(outcome?.description).toContain('Shift from JKNC (Farooq Abdullah) to JKPDP (Tariq Hameed Karra)');
    });

    it('returns null safely if records are incomplete', () => {
      expect(compareElectionOutcomes(null, null)).toBeNull();
    });
  });
});
