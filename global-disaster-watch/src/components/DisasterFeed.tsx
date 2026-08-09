import React from 'react';
import { DisasterEvent } from '../types/disaster';
import { AlertTriangle, Flame, Waves, Sun, Clock, MapPin, ChevronRight, ShieldAlert, Zap } from 'lucide-react';

interface DisasterFeedProps {
  events: DisasterEvent[];
  onSelectEvent: (event: DisasterEvent) => void;
}

export const DisasterFeed: React.FC<DisasterFeedProps> = ({ events, onSelectEvent }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'earthquake':
        return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      case 'wildfire':
        return <Flame className="w-5 h-5 text-orange-500" />;
      case 'storm':
        return <Waves className="w-5 h-5 text-cyan-400" />;
      case 'heatwave':
        return <Sun className="w-5 h-5 text-yellow-400" />;
      default:
        return <ShieldAlert className="w-5 h-5 text-rose-400" />;
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const elapsedMs = Date.now() - new Date(timestamp).getTime();
    const minutes = Math.floor(elapsedMs / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center h-full">
        <div className="w-14 h-14 rounded-2xl bg-slate-800/80 flex items-center justify-center mb-4 text-slate-500">
          <ShieldAlert className="w-7 h-7" />
        </div>
        <h3 className="text-base font-bold text-slate-200 mb-1">No Active Disasters Match Filter</h3>
        <p className="text-xs text-slate-400 max-w-xs">
          Try resetting category or severity filters to view all global incidents.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3 pb-24 overflow-y-auto h-full">
      <div className="flex items-center justify-between px-1 mb-1">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          LIVE DISASTER FEED ({events.length})
        </h2>
        <span className="text-[10px] text-slate-500 font-mono">Sorted by severity & date</span>
      </div>

      {events.map((ev) => {
        const isCritical = ev.severity === 'critical';
        const isHigh = ev.severity === 'high';

        return (
          <div
            key={ev.id}
            onClick={() => onSelectEvent(ev)}
            className={`group relative bg-[#151c2e] hover:bg-[#1a233a] border rounded-2xl p-4 cursor-pointer transition-all duration-200 active:scale-[0.99] shadow-lg ${
              isCritical
                ? 'border-rose-500/40 shadow-rose-500/5'
                : isHigh
                ? 'border-amber-500/30 shadow-amber-500/5'
                : 'border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className={`p-2 rounded-xl border ${
                  isCritical ? 'bg-rose-500/10 border-rose-500/30' :
                  isHigh ? 'bg-amber-500/10 border-amber-500/30' :
                  'bg-slate-800 border-slate-700'
                }`}>
                  {getCategoryIcon(ev.category)}
                </div>

                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider ${
                      isCritical ? 'bg-rose-500 text-white' :
                      isHigh ? 'bg-amber-500 text-slate-950' :
                      'bg-slate-700 text-slate-200'
                    }`}>
                      {ev.severity}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                      {ev.source}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center text-[11px] text-slate-400 space-x-1 font-mono">
                <Clock className="w-3 h-3 text-slate-500" />
                <span>{getTimeAgo(ev.timestamp)}</span>
              </div>
            </div>

            <h3 className="text-sm font-bold text-slate-100 mb-1 group-hover:text-rose-400 transition-colors leading-snug">
              {ev.title}
            </h3>

            <div className="flex items-center text-xs text-slate-300 mb-3 space-x-1">
              <MapPin className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
              <span className="truncate">{ev.locationName}</span>
            </div>

            <div className="flex flex-wrap gap-2 text-[11px] font-medium text-slate-300 pt-2 border-t border-slate-800/80">
              {ev.magnitude && (
                <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 flex items-center space-x-1">
                  <Zap className="w-3 h-3 text-amber-400" />
                  <span>Mag {ev.magnitude}</span>
                </span>
              )}
              {ev.depthKm && (
                <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700">
                  Depth {ev.depthKm} km
                </span>
              )}
              {ev.tsunamiAlert && (
                <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold animate-pulse">
                  🌊 TSUNAMI ALERT
                </span>
              )}
              {ev.affectedRadiusKm && (
                <span className="px-2.5 py-1 rounded-lg bg-slate-800/90 text-slate-400">
                  ~{ev.affectedRadiusKm} km zone
                </span>
              )}
            </div>

            <div className="absolute right-3 bottom-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
