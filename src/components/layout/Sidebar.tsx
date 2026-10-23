import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Vote,
  MapPin,
  TrendingUp,
  BookOpen,
  ShieldCheck,
} from 'lucide-react';

interface SidebarProps {
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile }) => {
  const navItems = [
    {
      to: '/',
      label: 'Constituency Overview',
      icon: LayoutDashboard,
      badge: 'Core',
    },
    {
      to: '/parliamentary',
      label: 'Parliamentary Elections',
      icon: Vote,
      badge: 'Lok Sabha',
    },
    {
      to: '/assembly',
      label: 'Assembly Explorer',
      icon: MapPin,
      badge: '18 Segments',
    },
    {
      to: '/trends',
      label: 'Electoral Trends',
      icon: TrendingUp,
      badge: 'Analytics',
    },
    {
      to: '/sources',
      label: 'Sources & Methodology',
      icon: BookOpen,
      badge: 'Audit',
    },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-200 flex flex-col h-full border-r border-slate-800 shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-brand-600 flex items-center justify-center text-white shadow-md shadow-brand-900/40">
            <Vote className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white uppercase font-mono">
              Constituency Intel
            </h1>
            <p className="text-[11px] text-slate-400 font-medium">
              Political Analytics Dashboard
            </p>
          </div>
        </div>

        {/* Constituency Badge */}
        <div className="mt-4 p-2.5 bg-slate-850 rounded-lg border border-slate-800 text-xs">
          <div className="flex items-center justify-between text-slate-400 text-[10px] font-semibold uppercase tracking-wider">
            <span>Jurisdiction</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Post-2022
            </span>
          </div>
          <p className="text-sm font-bold text-white mt-1">02-Srinagar PC</p>
          <p className="text-[11px] text-slate-400">Jammu & Kashmir, India</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto" aria-label="Main Navigation">
        <div className="px-3 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          Intelligence Modules
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-sm shadow-brand-600/30'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/70'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 group-hover:bg-slate-700 text-slate-400 group-hover:text-slate-300">
                {item.badge}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40 text-[11px] text-slate-400 space-y-2">
        <div className="flex items-center gap-1.5 text-slate-300 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Statutory Verified Data</span>
        </div>
        <p className="text-[10px] text-slate-500 leading-normal">
          Delimitation Order 2022. Certified results from Election Commission of India.
        </p>
      </div>
    </aside>
  );
};
