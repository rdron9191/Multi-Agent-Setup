import React from 'react';
import { Map, List, BarChart3, ShieldAlert } from 'lucide-react';

export type ActiveTab = 'map' | 'feed' | 'analytics' | 'alerts';

interface BottomTabNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  criticalCount: number;
}

export const BottomTabNav: React.FC<BottomTabNavProps> = ({
  activeTab,
  onTabChange,
  criticalCount,
}) => {
  const tabs: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'map', label: 'Live Map', icon: <Map className="w-5 h-5" /> },
    { id: 'feed', label: 'Incidents', icon: <List className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'alerts', label: 'Safety', icon: <ShieldAlert className="w-5 h-5" />, badge: criticalCount },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0b0f19]/95 backdrop-blur-lg border-t border-slate-800/80 px-2 py-1.5 pb-safe">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {tabs.map((t) => {
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onTabChange(t.id)}
              className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all duration-200 ${
                isActive
                  ? 'text-rose-400 font-bold scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                {t.icon}
                {t.badge && t.badge > 0 ? (
                  <span className="absolute -top-1.5 -right-2 px-1.5 py-0.2 bg-rose-500 text-white font-extrabold text-[9px] rounded-full animate-pulse border border-slate-900">
                    {t.badge}
                  </span>
                ) : null}
              </div>
              <span className="text-[10px] mt-1 font-medium tracking-tight">{t.label}</span>
              {isActive && (
                <span className="absolute -bottom-1 w-5 h-0.5 bg-rose-500 rounded-full shadow-sm shadow-rose-500" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
