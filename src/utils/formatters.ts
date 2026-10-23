/**
 * Formatting Utilities for Political Intelligence Dashboard
 * 
 * Provides consistent formatting for numbers, percentages, currency, dates,
 * and party badges across all components.
 */

/**
 * Formats a number using the Indian numbering system (Lakhs / Crores) or standard commas.
 * Example: 356866 -> 3,56,866
 */
export function formatIndianNumber(val: number | null | undefined): string {
  if (val === null || val === undefined || isNaN(val)) {
    return 'Data unavailable';
  }
  return new Intl.NumberFormat('en-IN').format(val);
}

/**
 * Formats a percentage with a fixed 2 decimal places.
 * Example: 38.4912 -> "38.49%"
 */
export function formatPercentage(val: number | null | undefined, includeSign: boolean = false): string {
  if (val === null || val === undefined || isNaN(val)) {
    return 'Data unavailable';
  }
  const prefix = includeSign && val > 0 ? '+' : '';
  return `${prefix}${val.toFixed(2)}%`;
}

/**
 * Formats a winning margin with optional percentage.
 * Example: (188416, 27.93) -> "1,88,416 votes (27.93%)"
 */
export function formatMarginDisplay(
  margin: number | null | undefined,
  marginPct?: number | null | undefined
): string {
  if (margin === null || margin === undefined || isNaN(margin)) {
    return 'Data unavailable';
  }
  const formattedMargin = formatIndianNumber(margin);
  if (marginPct !== null && marginPct !== undefined && !isNaN(marginPct)) {
    return `${formattedMargin} votes (${marginPct.toFixed(2)}%)`;
  }
  return `${formattedMargin} votes`;
}

/**
 * Clean party abbreviations and palette colors.
 * Note: These are chosen to ensure high contrast, accessibility, and clean visual representation.
 */
export const PARTY_COLORS: Record<string, string> = {
  JKNC: '#dc2626',      // Red (JKNC historical flag color)
  JKPDP: '#16a34a',     // Green (JKPDP flag color)
  INC: '#2563eb',       // Blue (INC)
  BJP: '#ea580c',       // Saffron / Orange (BJP)
  JKPC: '#9333ea',      // Purple
  'APNI PARTY': '#0891b2', // Cyan / Teal
  PDF: '#d97706',       // Amber
  IND: '#64748b',       // Slate / Gray
  NOTA: '#94a3b8',      // Light Slate
  OTHERS: '#475569',    // Dark Slate
};

export function getPartyColor(partyAbbr: string | undefined): string {
  if (!partyAbbr) return '#64748b';
  const clean = partyAbbr.toUpperCase().trim();
  return PARTY_COLORS[clean] || '#64748b';
}

/**
 * Returns Tailwind CSS badge classes for political parties.
 */
export function getPartyBadgeClasses(partyAbbr: string | undefined): { bg: string; text: string; border: string } {
  const clean = (partyAbbr || '').toUpperCase().trim();
  switch (clean) {
    case 'JKNC':
      return { bg: 'bg-red-50 text-red-700', text: 'text-red-700', border: 'border-red-200' };
    case 'JKPDP':
      return { bg: 'bg-emerald-50 text-emerald-700', text: 'text-emerald-700', border: 'border-emerald-200' };
    case 'INC':
      return { bg: 'bg-blue-50 text-blue-700', text: 'text-blue-700', border: 'border-blue-200' };
    case 'BJP':
      return { bg: 'bg-orange-50 text-orange-700', text: 'text-orange-700', border: 'border-orange-200' };
    case 'JKPC':
      return { bg: 'bg-purple-50 text-purple-700', text: 'text-purple-700', border: 'border-purple-200' };
    case 'APNI PARTY':
      return { bg: 'bg-cyan-50 text-cyan-700', text: 'text-cyan-700', border: 'border-cyan-200' };
    default:
      return { bg: 'bg-slate-100 text-slate-700', text: 'text-slate-700', border: 'border-slate-200' };
  }
}
