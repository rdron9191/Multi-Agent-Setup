import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { DisasterEvent } from '../types/disaster';
import { ExternalLink } from 'lucide-react';

interface DisasterMapProps {
  events: DisasterEvent[];
  selectedEvent: DisasterEvent | null;
  onSelectEvent: (event: DisasterEvent) => void;
}

const MapRecenter: React.FC<{ lat: number; lng: number }> = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.flyTo([lat, lng], 7, { duration: 1.2 });
    }
  }, [lat, lng, map]);
  return null;
};

function createCustomIcon(category: string, severity: string) {
  let color = '#3b82f6';
  let pulseClass = '';

  if (severity === 'critical') {
    color = '#f43f5e';
    pulseClass = 'disaster-marker-critical';
  } else if (severity === 'high') {
    color = '#f59e0b';
    pulseClass = 'disaster-marker-high';
  } else if (severity === 'moderate') {
    color = '#10b981';
  }

  let symbol = '⚠️';
  if (category === 'earthquake') symbol = '🌋';
  if (category === 'wildfire') symbol = '🔥';
  if (category === 'storm') symbol = '🌀';
  if (category === 'heatwave') symbol = '☀️';

  const html = `
    <div class="relative flex items-center justify-center w-8 h-8 rounded-full border-2 border-white/90 shadow-xl ${pulseClass}" style="background-color: ${color}">
      <span class="text-xs leading-none select-none">${symbol}</span>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-disaster-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
}

export const DisasterMap: React.FC<DisasterMapProps> = ({
  events,
  selectedEvent,
  onSelectEvent,
}) => {
  const defaultCenter: [number, number] = [20, 0];
  const defaultZoom = 2;

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        zoomControl={false}
        className="w-full h-full z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          maxZoom={19}
        />

        {selectedEvent && (
          <MapRecenter lat={selectedEvent.latitude} lng={selectedEvent.longitude} />
        )}

        {events.map((ev) => {
          const isSelected = selectedEvent?.id === ev.id;
          const radiusMeters = (ev.affectedRadiusKm || 50) * 1000;

          return (
            <React.Fragment key={ev.id}>
              {(ev.severity === 'critical' || ev.severity === 'high' || isSelected) && (
                <Circle
                  center={[ev.latitude, ev.longitude]}
                  radius={radiusMeters}
                  pathOptions={{
                    color: ev.severity === 'critical' ? '#f43f5e' : '#f59e0b',
                    fillColor: ev.severity === 'critical' ? '#f43f5e' : '#f59e0b',
                    fillOpacity: isSelected ? 0.25 : 0.1,
                    weight: isSelected ? 2 : 1,
                  }}
                />
              )}

              <Marker
                position={[ev.latitude, ev.longitude]}
                icon={createCustomIcon(ev.category, ev.severity)}
                eventHandlers={{
                  click: () => onSelectEvent(ev),
                }}
              >
                <Popup className="custom-popup">
                  <div className="p-1 min-w-[200px]">
                    <div className="flex items-center space-x-2 mb-1.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        ev.severity === 'critical' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                        ev.severity === 'high' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                        'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      }`}>
                        {ev.severity}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {new Date(ev.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-100 mb-1 leading-snug">
                      {ev.title}
                    </h4>
                    
                    <p className="text-[11px] text-slate-300 mb-2 leading-tight">
                      📍 {ev.locationName}
                    </p>

                    <button
                      onClick={() => onSelectEvent(ev)}
                      className="w-full py-1.5 px-3 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white text-xs font-semibold rounded-lg flex items-center justify-center space-x-1 transition-all"
                    >
                      <span>View Emergency Details</span>
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </button>
                  </div>
                </Popup>
              </Marker>
            </React.Fragment>
          );
        })}
      </MapContainer>

      <div className="absolute top-3 right-3 z-20 flex flex-col space-y-2">
        <div className="bg-[#151c2e]/95 border border-slate-800 backdrop-blur-md rounded-xl p-2.5 shadow-xl text-right">
          <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Live Active Map</p>
          <p className="text-sm font-extrabold text-slate-100 font-heading">
            {events.length} <span className="text-xs font-medium text-slate-400">Incidents</span>
          </p>
        </div>
      </div>
    </div>
  );
};
