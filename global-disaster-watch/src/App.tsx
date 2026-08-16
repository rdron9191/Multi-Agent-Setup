import React, { useState, useEffect, useMemo } from 'react';
import { fetchAllDisasters } from './services/disasterService';
import { DisasterEvent, DisasterCategory, DisasterSeverity } from './types/disaster';
import { MobileHeader } from './components/MobileHeader';
import { DisasterMap } from './components/DisasterMap';
import { DisasterFeed } from './components/DisasterFeed';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { BottomTabNav, ActiveTab } from './components/BottomTabNav';
import { EventDetailModal } from './components/EventDetailModal';
import { AegisAIChatbot } from './components/AegisAIChatbot';
import { ShieldAlert, BookOpen, PhoneCall } from 'lucide-react';

export function App() {
  const [events, setEvents] = useState<DisasterEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<DisasterCategory | 'all'>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<DisasterSeverity | 'all'>('all');
  const [activeTab, setActiveTab] = useState<ActiveTab>('map');
  const [selectedEvent, setSelectedEvent] = useState<DisasterEvent | null>(null);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  const loadData = async () => {
    setRefreshing(true);
    try {
      const data = await fetchAllDisasters();
      setEvents(data);
    } catch (err) {
      console.error('Failed to load disaster data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 60000);
    return () => clearInterval(interval);
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      const matchesSearch =
        ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.locationName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || ev.category === selectedCategory;
      const matchesSeverity = selectedSeverity === 'all' || ev.severity === selectedSeverity;
      return matchesSearch && matchesCategory && matchesSeverity;
    });
  }, [events, searchQuery, selectedCategory, selectedSeverity]);

  const criticalCount = useMemo(() => {
    return events.filter((e) => e.severity === 'critical').length;
  }, [events]);

  const handleSelectEvent = (ev: DisasterEvent) => {
    setSelectedEvent(ev);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#0b0f19] text-slate-100 overflow-hidden font-sans">
      <MobileHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        selectedSeverity={selectedSeverity}
        onSeveritySelect={setSelectedSeverity}
        totalActiveCount={events.length}
        criticalCount={criticalCount}
        isRefreshing={refreshing}
        onRefresh={loadData}
      />

      <main className="flex-1 relative overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full space-y-3">
            <div className="w-10 h-10 border-4 border-rose-500/20 border-t-rose-500 rounded-full animate-spin" />
            <p className="text-xs font-medium text-slate-400">Connecting to USGS & NASA Live Telemetry...</p>
          </div>
        ) : (
          <>
            {activeTab === 'map' && (
              <DisasterMap
                events={filteredEvents}
                selectedEvent={selectedEvent}
                onSelectEvent={handleSelectEvent}
              />
            )}

            {activeTab === 'feed' && (
              <DisasterFeed
                events={filteredEvents}
                onSelectEvent={handleSelectEvent}
              />
            )}

            {activeTab === 'analytics' && (
              <AnalyticsDashboard events={events} />
            )}

            {activeTab === 'alerts' && (
              <div className="p-4 space-y-4 pb-24 overflow-y-auto h-full">
                <div className="flex items-center space-x-2.5 bg-rose-500/10 border border-rose-500/30 p-4 rounded-2xl">
                  <ShieldAlert className="w-6 h-6 text-rose-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-bold text-rose-300">Official Preparedness Guidelines</h3>
                    <p className="text-xs text-rose-200/80">Stay informed and ready during emergency situations.</p>
                  </div>
                </div>

                <div className="bg-[#151c2e] border border-slate-800 rounded-2xl p-4 space-y-3">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                    <BookOpen className="w-4 h-4 text-amber-400" />
                    <span>General Emergency Action Steps</span>
                  </h4>
                  <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside leading-relaxed">
                    <li>Maintain an emergency supply kit with water, food, flashlight, and first aid.</li>
                    <li>Know your local evacuation routes and emergency shelter locations.</li>
                    <li>Keep battery-powered NOAA or local weather radios ready.</li>
                    <li>Follow all instructions issued by emergency services and local authorities.</li>
                  </ul>
                </div>

                <div className="bg-[#151c2e] border border-slate-800 rounded-2xl p-4 space-y-3">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                    <PhoneCall className="w-4 h-4 text-emerald-400" />
                    <span>Global Emergency Contacts</span>
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between p-2 bg-slate-900/60 rounded-xl border border-slate-800">
                      <span className="text-slate-300 font-medium">United States (FEMA / 911)</span>
                      <span className="font-bold text-emerald-400">Dial 911</span>
                    </div>
                    <div className="flex justify-between p-2 bg-slate-900/60 rounded-xl border border-slate-800">
                      <span className="text-slate-300 font-medium">European Union Emergency</span>
                      <span className="font-bold text-emerald-400">Dial 112</span>
                    </div>
                    <div className="flex justify-between p-2 bg-slate-900/60 rounded-xl border border-slate-800">
                      <span className="text-slate-300 font-medium">Japan Disaster Helpline</span>
                      <span className="font-bold text-emerald-400">Dial 119</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <EventDetailModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onAskCopilot={() => setIsChatOpen(true)}
      />

      <AegisAIChatbot
        events={events}
        criticalCount={criticalCount}
        isOpen={isChatOpen}
        setIsOpen={setIsChatOpen}
      />

      <BottomTabNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        criticalCount={criticalCount}
      />
    </div>
  );
}

export default App;
