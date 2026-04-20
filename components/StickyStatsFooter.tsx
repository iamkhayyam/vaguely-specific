
import React, { useState, useEffect } from 'react';
import { ReportData } from '../types';

interface StickyStatsFooterProps {
  reports: ReportData[];
}

export const StickyStatsFooter: React.FC<StickyStatsFooterProps> = ({ reports }) => {
  const totalClaims = reports.reduce((acc, r) => acc + r.claims.length, 0);
  const avgScore = reports.reduce((acc, r) => acc + r.score, 0) / (reports.length || 1);
  const totalEntities = reports.length;

  const [jitter, setJitter] = useState(0);
  const [weeklyDelta, setWeeklyDelta] = useState(0);

  useEffect(() => {
    // Simulated weekly shift for the Bureau's obfuscation tracking
    setWeeklyDelta(Math.random() * 4.5 - 1.5); // Random shift between -1.5 and +3.0

    const interval = setInterval(() => {
      setJitter(Math.floor(Math.random() * 5));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const obfuscationValue = (100 - avgScore + (jitter/10));
  const isTrendUp = weeklyDelta >= 0;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[100] bg-black/90 backdrop-blur-3xl border-t border-white/10 py-3 md:py-4 px-4 md:px-6 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      <div className="container mx-auto flex items-center justify-between gap-4">
        {/* Stats Row - Scrollable on very small screens */}
        <div className="flex-1 flex items-center gap-4 md:gap-10 overflow-x-auto no-scrollbar md:overflow-visible pr-4 md:pr-0">
          <div className="space-y-0.5 md:space-y-1 shrink-0">
            <span className="text-[7px] md:text-[8px] font-black text-gray-600 uppercase tracking-widest block">Claims</span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs md:text-sm font-black text-primary font-mono">{18420 + totalClaims + jitter}</span>
              <i className="ri-arrow-up-s-fill text-accent-green text-[10px] md:text-xs"></i>
            </div>
          </div>
          <div className="w-px h-6 md:h-8 bg-white/5 shrink-0"></div>
          
          <div className="space-y-0.5 md:space-y-1 shrink-0">
            <span className="text-[7px] md:text-[8px] font-black text-gray-600 uppercase tracking-widest block">Avg Obfuscation</span>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="flex items-center gap-1.5">
                <span className="text-xs md:text-sm font-black text-accent-red font-mono">{obfuscationValue.toFixed(1)}%</span>
                <i className={`ri-arrow-${isTrendUp ? 'up' : 'down'}-s-fill ${isTrendUp ? 'text-accent-red' : 'text-accent-green'} text-[10px] md:text-xs`}></i>
              </div>
              {/* Weekly Trend Badge */}
              <div className={`px-1.5 py-0.5 rounded-sm border ${isTrendUp ? 'border-accent-red/20 bg-accent-red/5 text-accent-red' : 'border-accent-green/20 bg-accent-green/5 text-accent-green'} text-[7px] md:text-[8px] font-mono font-bold uppercase tracking-tighter`}>
                {isTrendUp ? '+' : ''}{weeklyDelta.toFixed(2)} [W]
              </div>
            </div>
          </div>

          <div className="hidden sm:block w-px h-8 bg-white/5 shrink-0"></div>
          <div className="hidden sm:block space-y-1 shrink-0">
            <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest block">Entities</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-white font-mono">{241 + totalEntities}</span>
              <span className="text-[9px] text-gray-700 font-bold uppercase">Live</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4 shrink-0">
           <div className="hidden md:flex px-3 py-1 bg-accent-green/10 border border-accent-green/20 rounded text-[9px] font-black text-accent-green uppercase tracking-widest items-center gap-2">
              <span className="w-1.5 h-1.5 bg-accent-green rounded-full animate-pulse"></span>
              Normal
           </div>
           <div className="text-[7px] md:text-[9px] font-mono text-gray-600 uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold">
              NODE: {Math.random().toString(16).slice(2, 6).toUpperCase()}
           </div>
        </div>
      </div>
    </div>
  );
};
