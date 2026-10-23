import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileNav } from '../navigation/MobileNav';

export const AppLayout: React.FC = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const location = useLocation();

  const getPageMeta = () => {
    switch (location.pathname) {
      case '/':
        return {
          title: 'Constituency Overview',
          subtitle: 'Demographics, geographical extent & key administrative indicators for 02-Srinagar PC',
        };
      case '/parliamentary':
        return {
          title: 'Historical Parliamentary Elections',
          subtitle: 'Lok Sabha election results, candidate breakdowns & party vote trends (2004 – 2024)',
        };
      case '/assembly':
        return {
          title: 'Assembly Constituency Explorer',
          subtitle: 'Segment-level dynamics across the 18 Legislative Assembly seats under Srinagar PC',
        };
      case '/trends':
        return {
          title: 'Electoral Trends & Indicators',
          subtitle: 'Comparative voter turnout, winning margins, vote share swings & methodology',
        };
      case '/sources':
        return {
          title: 'Data Sources & Methodology',
          subtitle: 'Statutory citations, audit trails, mathematical formulas & data boundary limitations',
        };
      default:
        return {
          title: 'Political Intelligence Dashboard',
          subtitle: '02-Srinagar Parliamentary Constituency, Jammu & Kashmir',
        };
    }
  };

  const { title, subtitle } = getPageMeta();

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Drawer */}
      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          onToggleMobileNav={() => setIsMobileNavOpen(true)}
          title={title}
          subtitle={subtitle}
        />

        <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 max-w-7xl w-full mx-auto space-y-6">
          <Outlet />

          {/* Persistent Disclaimers and Footer */}
          <footer className="mt-12 pt-6 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3 pb-8">
            <p>
              © {new Date().getFullYear()} Political Intelligence Dashboard • 02-Srinagar Parliamentary Constituency
            </p>
            <div className="flex items-center gap-4 text-slate-400">
              <span>ECI Certified Dataset</span>
              <span>•</span>
              <span>Post-2022 Delimitation Order</span>
              <span>•</span>
              <span>Frontend React + TypeScript</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};
