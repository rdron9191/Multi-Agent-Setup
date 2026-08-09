import React from 'react';
import { DisasterEvent } from '../types/disaster';
import { ShieldAlert, AlertTriangle, Flame, Waves, Sun, Activity, Radio, Globe, BarChart2 } from 'lucide-react';

interface AnalyticsDashboardProps {
  events: DisasterEvent[];
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ events }) => {
  const criticalCount = events.filter((e) => e.severity === 'critical').length;
  const highCount = events.filter((e) => e.severity === 'high').length;

  const earthquakeCount = events.filter((e) => e.category === 'earthquake').length;
  const wildfireCount = events.filter((e) => e.category === 'wildfire').length;
  const stormCount = events.filter((e) => e.category === 'storm').length;
  const heatwaveCount = events.filter((e) => e.category === 'heatwave').length;
  const tsunamiCount = events.filter((e) => e.tsunamiAlert).length;

  const maxMag = Math.max(...events.map((e) => e.magnitude || 0), 0);

  return (
    <div className="p-4 space-y-4 pb-24 overflow-y-auto h-full">
      <div className="flex items-center justify-between px-1 mb-1">
        <div>
          <h2 className="text-sm font-bold text-slate-100 font-heading">Global Crisis Metrics</h2>
          <p className="text-[11px] text-slate-400">Real-time incident distribution & telemetry</p>
        </div>
        <div className="flex items-center space-x-1 px-2 py-1 bg-rose-500/10 border border-rose-500/30 rounded-lg text-rose-400 text-[10px] font-bold">
          <Radio className="w-3 h-3 animate-pulse" />
          <span>LIVE FEED</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#151c2e] border border-slate-800 rounded-2xl p-4 flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] uppercase font-bold tracking-wider">Total Active</span>
            <Globe className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-extrabold text-slate-100 font-heading">{events.length}</p>
          <p className="text-[10px] text-slate-500 mt-1">Tracked globally</p>
        </div>

        <div className="bg-[#151c2e] border border-rose-500/30 rounded-2xl p-4 flex flex-col justify-between shadow-lg shadow-rose-500/5">
          <div className="flex items-center justify-between text-rose-400 mb-2">
            <span className="text-[10px] uppercase font-bold tracking-wider">Critical Threats</span>
            <ShieldAlert className="w-4 h-4 text-rose-400 animate-pulse" />
          </div>
          <p className="text-2xl font-extrabold text-rose-400 font-heading">{criticalCount}</p>
          <p className="text-[10px] text-rose-300/80 mt-1">Immediate danger</p>
        </div>
      </div>

      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
          <Activity className="w-4 h-4 text-amber-400" />
          <span>Global Telemetry Summary</span>
        </h3>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60">
            <span className="text-[10px] text-slate-400 block">Tsunami Advisories</span>
            <span className={`text-sm font-bold ${tsunamiCount > 0 ? 'text-rose-400' : 'text-slate-300'}`}>
              {tsunamiCount} Active
            </span>
          </div>

          <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60">
            <span className="text-[10px] text-slate-400 block">Peak Magnitude</span>
            <span className="text-sm font-bold text-amber-400">
              {maxMag > 0 ? `M ${maxMag.toFixed(1)}` : 'N/A'}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-[#151c2e] border border-slate-800 rounded-2xl p-4 space-y-3">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
          <BarChart2 className="w-4 h-4 text-cyan-400" />
          <span>Incident Breakdown by Type</span>
        </h3>

        <div className="space-y-2.5 text-xs">
          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span className="flex items-center space-x-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>Earthquakes</span>
              </span>
              <span className="font-bold text-slate-200">{earthquakeCount}</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-500 rounded-full transition-all duration-500" 
                style={{ width: `${events.length ? (earthquakeCount / events.length) * 100 : 0}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span className="flex items-center space-x-1.5">
                <Flame className="w-3.5 h-3.5 text-orange-500" />
                <span>Wildfires</span>
              </span>
              <span className="font-bold text-slate-200">{wildfireCount}</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-orange-500 rounded-full transition-all duration-500" 
                style={{ width: `${events.length ? (wildfireCount / events.length) * 100 : 0}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span className="flex items-center space-x-1.5">
                <Waves className="w-3.5 h-3.5 text-cyan-400" />
                <span>Storms & Hurricanes</span>
              </span>
              <span className="font-bold text-slate-200">{stormCount}</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-cyan-400 rounded-full transition-all duration-500" 
                style={{ width: `${events.length ? (stormCount / events.length) * 100 : 0}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span className="flex items-center space-x-1.5">
                <Sun className="w-3.5 h-3.5 text-yellow-400" />
                <span>Heatwaves & Thermal</span>
              </span>
              <span className="font-bold text-slate-200">{heatwaveCount}</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-yellow-400 rounded-full transition-all duration-500" 
                style={{ width: `${events.length ? (heatwaveCount / events.length) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
