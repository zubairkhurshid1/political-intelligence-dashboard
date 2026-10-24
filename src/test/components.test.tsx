import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { KpiCard } from '../components/cards/KpiCard';
import { EmptyState } from '../components/feedback/EmptyState';
import { ElectionYearFilter } from '../components/filters/ElectionYearFilter';
import { ResultsTable } from '../components/tables/ResultsTable';
import type { CandidateResult } from '../types/election';

const mockCandidates: CandidateResult[] = [
  {
    candidateId: 'C1',
    candidateName: 'Aga Syed Ruhullah Mehdi',
    partyName: 'Jammu & Kashmir National Conference',
    partyAbbreviation: 'JKNC',
    votes: 356866,
    voteSharePercentage: 53.04,
    resultPosition: 1,
    isWinner: true,
  },
  {
    candidateId: 'C2',
    candidateName: 'Waheed Ur Rehman Para',
    partyName: 'Jammu & Kashmir Peoples Democratic Party',
    partyAbbreviation: 'JKPDP',
    votes: 168450,
    voteSharePercentage: 25.04,
    resultPosition: 2,
    isWinner: false,
  },
  {
    candidateId: 'C3',
    candidateName: 'Mohammad Ashraf Mir',
    partyName: 'Jammu and Kashmir Apni Party',
    partyAbbreviation: 'APNI PARTY',
    votes: 65954,
    voteSharePercentage: 9.8,
    resultPosition: 3,
    isWinner: false,
  },
];

describe('Component & Interaction Tests', () => {
  describe('KpiCard', () => {
    it('renders title, value, unit, and subValue correctly', () => {
      render(
        <KpiCard
          title="Total Registered Electors"
          value="17,47,810"
          unit="Electors"
          referenceYear="2024"
          subValue="Certified ECI Roll"
        />
      );

      expect(screen.getByText('Total Registered Electors')).toBeInTheDocument();
      expect(screen.getByText('17,47,810')).toBeInTheDocument();
      expect(screen.getByText('Electors')).toBeInTheDocument();
      expect(screen.getByText('2024')).toBeInTheDocument();
      expect(screen.getByText('Certified ECI Roll')).toBeInTheDocument();
    });

    it('renders missing data badge when data is unavailable', () => {
      render(
        <KpiCard
          title="Booth-Level Turnout"
          value={null}
          isDataAvailable={false}
          missingReason="Booth level breakdown not published"
        />
      );

      expect(screen.getByText('Booth-Level Turnout')).toBeInTheDocument();
      expect(screen.getByText('Data unavailable')).toBeInTheDocument();
    });
  });

  describe('EmptyState', () => {
    it('renders empty state message and triggers action button', () => {
      const handleAction = vi.fn();
      render(
        <EmptyState
          title="No records found"
          description="Try broadening your search criteria."
          actionText="Reset filters"
          onAction={handleAction}
        />
      );

      expect(screen.getByText('No records found')).toBeInTheDocument();
      expect(screen.getByText('Try broadening your search criteria.')).toBeInTheDocument();

      const button = screen.getByRole('button', { name: 'Reset filters' });
      fireEvent.click(button);
      expect(handleAction).toHaveBeenCalledTimes(1);
    });
  });

  describe('ElectionYearFilter', () => {
    it('renders year dropdown and fires onYearChange', () => {
      const handleYearChange = vi.fn();
      render(
        <ElectionYearFilter
          years={[2024, 2019, 2014]}
          selectedYear={2024}
          onYearChange={handleYearChange}
        />
      );

      const select = screen.getByRole('combobox');
      expect(select).toBeInTheDocument();
      expect(select).toHaveValue('2024');

      fireEvent.change(select, { target: { value: '2019' } });
      expect(handleYearChange).toHaveBeenCalledWith(2019);
    });
  });

  describe('ResultsTable', () => {
    it('renders candidates and allows searching by candidate name', () => {
      render(
        <ResultsTable
          candidates={mockCandidates}
          totalValidVotes={672836}
          electionYear={2024}
        />
      );

      expect(screen.getByText('Aga Syed Ruhullah Mehdi')).toBeInTheDocument();
      expect(screen.getByText('Waheed Ur Rehman Para')).toBeInTheDocument();
      expect(screen.getByText('Mohammad Ashraf Mir')).toBeInTheDocument();

      // Search for specific candidate
      const searchInput = screen.getByPlaceholderText('Search candidate or party...');
      fireEvent.change(searchInput, { target: { value: 'Ruhullah' } });

      expect(screen.getByText('Aga Syed Ruhullah Mehdi')).toBeInTheDocument();
      expect(screen.queryByText('Waheed Ur Rehman Para')).not.toBeInTheDocument();
    });

    it('shows empty state when search matches no candidates', () => {
      render(
        <ResultsTable
          candidates={mockCandidates}
          totalValidVotes={672836}
          electionYear={2024}
        />
      );

      const searchInput = screen.getByPlaceholderText('Search candidate or party...');
      fireEvent.change(searchInput, { target: { value: 'Nonexistent Candidate' } });

      expect(screen.getByText('No candidates found')).toBeInTheDocument();
    });
  });
});
