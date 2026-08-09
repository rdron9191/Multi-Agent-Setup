import React from 'react';
import { DisasterEvent } from '../types/disaster';
import { X, ExternalLink, MapPin, ShieldAlert, Clock, CheckCircle2, Share2, Compass } from 'lucide-react';

interface EventDetailModalProps {
  event: DisasterEvent | null;
  onClose: () => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({ event, onClose }) => {
  if (!event) return null;

  const isCritical = event.severity === 'critical';
  const isHigh = event.severity === 'high';

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `EMERGENCY ALERT: ${event.title} in ${event.locationName}.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${event.title} - ${event.locationName}`);
      alert('Alert details copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4 transition-all">
      <div 
        className="w-full sm:max-w-lg bg-[#151c2e] border-t sm:border border-slate-700/80 rounded-t-3xl sm:rounded-3xl max-h-[85vh] overflow-y-auto shadow-2xl flex flex-col animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto my-3 sm:hidden" />

        <div className="p-5 border-b border-slate-800 flex items-start justify-between relative">
          <div className="pr-8">
            <div className="flex items-center space-x-2 mb-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                isCritical ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' :
                isHigh ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' :
                'bg-emerald-500 text-slate-950'
              }`}>
                {event.severity} SEVERITY
              </span>

              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-0.5 bg-slate-800 rounded-full border border-slate-700">
                {event.source}
              </span>
            </div>

            <h2 className="text-lg font-bold text-slate-100 font-heading leading-tight">
              {event.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2.5">
            <div className="flex items-start space-x-2.5">
              <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Epicenter Location</p>
                <p className="text-xs font-semibold text-slate-200">{event.locationName}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs text-slate-400">
              <div className="flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>{new Date(event.timestamp).toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-1 font-mono text-[11px] text-slate-400">
                <Compass className="w-3.5 h-3.5 text-slate-500" />
                <span>{event.latitude.toFixed(2)}°, {event.longitude.toFixed(2)}°</span>
              </div>
            </div>
          </div>

          {event.tsunamiAlert && (
            <div className="bg-rose-500/15 border border-rose-500/40 rounded-2xl p-4 flex items-start space-x-3 text-rose-200 animate-pulse">
              <ShieldAlert className="w-6 h-6 text-rose-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300">Official Tsunami Warning</h4>
                <p className="text-xs mt-0.5 leading-relaxed text-rose-200/90">
                  A tsunami warning has been generated for coastal areas within affected range. Seek high elevation immediately.
                </p>
              </div>
            </div>
          )}

          {event.description && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Event Synopsis</h4>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                {event.description}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            {event.magnitude && (
              <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
                <p className="text-[10px] font-bold uppercase text-slate-400">Magnitude</p>
                <p className="text-base font-extrabold text-amber-400 font-heading">M {event.magnitude}</p>
              </div>
            )}
            {event.depthKm && (
              <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
                <p className="text-[10px] font-bold uppercase text-slate-400">Focal Depth</p>
                <p className="text-base font-extrabold text-slate-200 font-heading">{event.depthKm} km</p>
              </div>
            )}
            {event.affectedRadiusKm && (
              <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl col-span-2">
                <p className="text-[10px] font-bold uppercase text-slate-400">Estimated Hazard Radius</p>
                <p className="text-sm font-bold text-slate-200 font-heading">~{event.affectedRadiusKm} kilometers</p>
              </div>
            )}
          </div>

          {event.safetyAdvice && event.safetyAdvice.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                <span>Emergency Safety Protocols</span>
              </h4>
              <div className="space-y-2">
                {event.safetyAdvice.map((advice, idx) => (
                  <div key={idx} className="flex items-start space-x-2 bg-slate-900/40 p-2.5 rounded-xl border border-slate-800/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-200 leading-snug">{advice}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-800 bg-[#151c2e] flex items-center space-x-3">
          <button
            onClick={handleShare}
            className="flex-1 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 text-xs font-bold rounded-xl flex items-center justify-center space-x-2 transition-all border border-slate-700"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Alert</span>
          </button>

          {event.url && (
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 px-4 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-2 transition-all shadow-lg shadow-rose-500/20"
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
