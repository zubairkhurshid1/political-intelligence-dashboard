import React from 'react';
import { Menu, ExternalLink, ShieldCheck, MapPin } from 'lucide-react';

interface HeaderProps {
  onToggleMobileNav: () => void;
  title: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleMobileNav,
  title,
  subtitle,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={onToggleMobileNav}
          className="p-2 -ml-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-slate-500 hidden sm:block mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Top Header Right Indicators */}
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
          <MapPin className="w-3.5 h-3.5 text-brand-600" />
          <span>Srinagar PC • 18 Assembly Segments</span>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Official ECI Data</span>
        </div>

        <a
          href="https://results.eci.gov.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-brand-700 hover:text-brand-900 transition-colors"
          title="Visit Official Election Commission of India Results Portal"
        >
          <span>ECI Portal</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </header>
  );
};
