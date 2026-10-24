// Formatting helpers for Indian numbering system, percentages, and party themes

export function formatIndianNumber(val: number | null | undefined): string {
  if (val === null || val === undefined || Number.isNaN(val)) {
    return 'Data unavailable';
  }
  return new Intl.NumberFormat('en-IN').format(val);
}

export function formatPercentage(val: number | null | undefined, includeSign = false): string {
  if (val === null || val === undefined || Number.isNaN(val)) {
    return 'Data unavailable';
  }
  const prefix = includeSign && val > 0 ? '+' : '';
  return `${prefix}${val.toFixed(2)}%`;
}

export function formatMarginDisplay(
  margin: number | null | undefined,
  marginPct?: number | null | undefined
): string {
  if (margin === null || margin === undefined || Number.isNaN(margin)) {
    return 'Data unavailable';
  }
  const count = formatIndianNumber(margin);
  if (marginPct !== null && marginPct !== undefined && !Number.isNaN(marginPct)) {
    return `${count} votes (${marginPct.toFixed(2)}%)`;
  }
  return `${count} votes`;
}

export const PARTY_COLORS: Record<string, string> = {
  JKNC: '#dc2626',
  JKPDP: '#16a34a',
  INC: '#2563eb',
  BJP: '#ea580c',
  JKPC: '#9333ea',
  'APNI PARTY': '#0891b2',
  PDF: '#d97706',
  IND: '#64748b',
  NOTA: '#94a3b8',
  OTHERS: '#475569',
};

export function getPartyColor(partyAbbr?: string): string {
  if (!partyAbbr) return '#64748b';
  return PARTY_COLORS[partyAbbr.trim().toUpperCase()] ?? '#64748b';
}

export function getPartyBadgeClasses(partyAbbr?: string): { bg: string; text: string; border: string } {
  const party = (partyAbbr ?? '').trim().toUpperCase();
  switch (party) {
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
