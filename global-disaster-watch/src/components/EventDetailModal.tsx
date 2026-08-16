import React from 'react';
import { DisasterEvent } from '../types/disaster';
import { X, ExternalLink, MapPin, ShieldAlert, Clock, CheckCircle2, Share2, Compass, Sparkles } from 'lucide-react';

interface EventDetailModalProps {
  event: DisasterEvent | null;
  onClose: () => void;
  onAskCopilot?: (event: DisasterEvent) => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({ event, onClose, onAskCopilot }) => {
  if (!event) return null;

  const isCritical = event.severity === 'critical';
  const isHigh = event.severity === 'high';

  let categoryIcon = '⚠️';
  if (event.category === 'flood') categoryIcon = '🌧️';
  if (event.category === 'drought') categoryIcon = '🏜️';
  if (event.category === 'landslide') categoryIcon = '🪨';
  if (event.category === 'earthquake') categoryIcon = '🌋';
  if (event.category === 'tsunami') categoryIcon = '🌊';
  if (event.category === 'wildfire') categoryIcon = '🔥';
  if (event.category === 'storm') categoryIcon = '🌀';
  if (event.category === 'volcano') categoryIcon = '🌋';
  if (event.category === 'heatwave') categoryIcon = '☀️';

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `🚨 EMERGENCY ALERT: ${event.title} in ${event.locationName}. Active live disaster report from Global Disaster Watch.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${event.title} - ${event.locationName} (${window.location.href})`);
      alert('Emergency disaster details copied to clipboard!');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full sm:max-w-xl bg-[#0d1322] border-t sm:border border-slate-700/90 rounded-t-[32px] sm:rounded-3xl max-h-[88vh] overflow-y-auto shadow-[0_0_80px_rgba(0,0,0,0.9)] flex flex-col font-sans animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile grab handle */}
        <div className="w-12 h-1.5 bg-slate-700/80 rounded-full mx-auto my-3 sm:hidden" />

        {/* Header Bar */}
        <div className="p-5 bg-gradient-to-r from-[#171f38] via-[#131b31] to-[#0d1322] border-b border-slate-800 flex items-start justify-between relative shrink-0">
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-rose-500 via-amber-400 to-purple-500"></div>

          <div className="pr-6 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                isCritical ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30 animate-pulse' :
                isHigh ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20' :
                'bg-emerald-500 text-slate-950 font-bold'
              }`}>
                {event.severity} SEVERITY
              </span>

              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-800/90 text-slate-300 border border-slate-700 flex items-center gap-1">
                <span>{categoryIcon}</span>
                <span>{event.category}</span>
              </span>

              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-purple-950/40 text-purple-300 border border-purple-500/30">
                📡 {event.source || 'GLOBAL SENSORS'}
              </span>
            </div>

            <h2 className="text-base sm:text-lg font-black text-slate-100 font-heading leading-tight tracking-tight">
              {event.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800/80 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 transition-all border border-slate-700/60 cursor-pointer text-sm font-bold shrink-0"
            title="Close Window"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 space-y-4">
          {/* Location & GPS Badge */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 space-y-2.5 shadow-inner">
            <div className="flex items-start space-x-2.5">
              <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Epicenter Location</p>
                <p className="text-xs sm:text-sm font-bold text-slate-100">{event.locationName}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs text-slate-400">
              <div className="flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span className="font-semibold text-slate-300">{new Date(event.timestamp).toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-1 font-mono text-[11px] text-rose-300 bg-slate-950/70 px-2 py-0.5 rounded-lg border border-slate-800">
                <Compass className="w-3.5 h-3.5 text-slate-500" />
                <span>{event.latitude.toFixed(4)}°, {event.longitude.toFixed(4)}°</span>
              </div>
            </div>
          </div>

          {/* Tsunami Alert Banner if Active */}
          {event.tsunamiAlert && (
            <div className="bg-rose-950/60 border border-rose-500/60 rounded-2xl p-3.5 flex items-start space-x-3 text-rose-200 shadow-lg shadow-rose-950/40 animate-pulse">
              <ShieldAlert className="w-6 h-6 text-rose-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-rose-300">Official Tsunami Warning</h4>
                <p className="text-xs mt-0.5 leading-relaxed text-rose-200/90 font-medium">
                  High ocean energy displacement detected. Coastal populations must seek elevation (&gt;30m) or move 2km inland immediately.
                </p>
              </div>
            </div>
          )}

          {/* Telemetry Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {event.magnitude && (
              <div className="bg-slate-900/80 border border-slate-800/90 p-3 rounded-2xl">
                <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Magnitude</p>
                <p className="text-base sm:text-lg font-black text-amber-400 font-heading mt-0.5">M {event.magnitude}</p>
              </div>
            )}
            {event.depthKm && (
              <div className="bg-slate-900/80 border border-slate-800/90 p-3 rounded-2xl">
                <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Focal Depth</p>
                <p className="text-base sm:text-lg font-black text-slate-200 font-heading mt-0.5">{event.depthKm} km</p>
              </div>
            )}
            {event.affectedRadiusKm && (
              <div className="bg-slate-900/80 border border-slate-800/90 p-3 rounded-2xl">
                <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Hazard Radius</p>
                <p className="text-sm sm:text-base font-bold text-rose-300 font-heading mt-0.5">~{event.affectedRadiusKm} km</p>
              </div>
            )}
          </div>

          {/* Event Synopsis / Report */}
          {event.description && (
            <div>
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <span>📝</span>
                <span>Disaster Synopsis & Telemetry Assessment</span>
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
                {event.description}
              </p>
            </div>
          )}

          {/* Emergency Action Plan */}
          {event.safetyAdvice && event.safetyAdvice.length > 0 && (
            <div>
              <h4 className="text-[10px] font-bold text-rose-400 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                <span>Emergency Action Protocols & Guidelines</span>
              </h4>
              <div className="space-y-2">
                {event.safetyAdvice.map((advice, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5 bg-slate-900/50 p-2.5 rounded-xl border border-slate-800/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-200 leading-snug font-medium">{advice}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Copilot Action Banner */}
          <div className="bg-gradient-to-r from-purple-950/40 via-purple-900/30 to-slate-900 border border-purple-500/30 rounded-2xl p-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-300" />
              <div>
                <p className="text-xs font-bold text-purple-200">Need AI Emergency Guidance?</p>
                <p className="text-[10px] text-purple-300/80">Ask Terra Sentinel for step-by-step survival protocols</p>
              </div>
            </div>
            <button
              onClick={() => {
                if (onAskCopilot) onAskCopilot(event);
              }}
              className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-purple-600/30 active:scale-95 cursor-pointer flex items-center space-x-1"
            >
              <span>Ask AI</span>
              <Sparkles className="w-3 h-3 text-amber-200 ml-1" />
            </button>
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#0b0f19] flex items-center space-x-3 shrink-0">
          <button
            onClick={handleShare}
            className="flex-1 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 text-xs font-bold rounded-xl flex items-center justify-center space-x-2 transition-all border border-slate-700 cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Alert</span>
          </button>

          {event.url && (
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 px-4 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 active:scale-95 text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-2 transition-all shadow-lg shadow-rose-600/30 cursor-pointer text-center"
            >
              <span>Official Bulletin</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
