import React from 'react';
import { Search, RefreshCw, AlertTriangle, Flame, ShieldAlert, Waves, Sun } from 'lucide-react';
import { DisasterCategory, DisasterSeverity } from '../types/disaster';

interface MobileHeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: DisasterCategory | 'all';
  onCategorySelect: (c: DisasterCategory | 'all') => void;
  selectedSeverity: DisasterSeverity | 'all';
  onSeveritySelect: (s: DisasterSeverity | 'all') => void;
  totalActiveCount: number;
  criticalCount: number;
  isRefreshing: boolean;
  onRefresh: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategorySelect,
  selectedSeverity,
  onSeveritySelect,
  totalActiveCount,
  criticalCount,
  isRefreshing,
  onRefresh,
}) => {
  const categories: { id: DisasterCategory | 'all'; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Incidents', icon: <ShieldAlert className="w-4 h-4 text-rose-400" /> },
    { id: 'earthquake', label: 'Quakes', icon: <AlertTriangle className="w-4 h-4 text-amber-400" /> },
    { id: 'wildfire', label: 'Fires', icon: <Flame className="w-4 h-4 text-orange-500" /> },
    { id: 'storm', label: 'Storms', icon: <Waves className="w-4 h-4 text-cyan-400" /> },
    { id: 'heatwave', label: 'Heat', icon: <Sun className="w-4 h-4 text-yellow-400" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0b0f19]/90 backdrop-blur-md border-b border-slate-800/80 px-4 pt-3 pb-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2.5">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center shadow-lg shadow-rose-600/20">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-100 tracking-tight leading-none font-heading">
              DISASTER<span className="text-rose-500">WATCH</span>
            </h1>
            <p className="text-[10px] font-medium text-slate-400 tracking-wider uppercase">
              Global Live Emergency Monitor
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {criticalCount > 0 && (
            <div className="px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center space-x-1.5 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              <span className="text-xs font-semibold text-rose-400">{criticalCount} Critical</span>
            </div>
          )}

          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 active:scale-95 transition-all border border-slate-700/60 disabled:opacity-50"
            title="Refresh Live Data"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-rose-400' : ''}`} />
          </button>
        </div>
      </div>

      <div className="relative mb-3">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search location, region, or earthquake..."
          className="w-full pl-10 pr-4 py-2 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 transition-all"
        />
      </div>

      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-0.5">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onCategorySelect(cat.id)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-sm shadow-rose-500/10'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
