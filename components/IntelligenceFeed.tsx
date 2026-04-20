
import React, { useState, useEffect } from 'react';
import { ReportData } from '../types';

interface IntelligenceFeedProps {
  reports: ReportData[];
}

const STATIC_SIGNALS = [
  "SURVEILLANCE: Major banking AI policy intercept confirmed.",
  "INTEL: Board members reported 'vaguely optimistic' despite metric absence.",
  "ALERT: New ESG report detected with 88% obfuscation index.",
  "BUREAU SIGNAL: Systematic definition drift identified in 2025 forecasting dossiers.",
  "NODE STATUS: VSB_GLOBAL_NETWORK_SYNCED",
  "SIGNAL: Forensic confidence levels exceeding 99% for active interrogation pools.",
  "TRACE: Unfalsifiable claim detected in Tier-1 management consultant press release.",
  "NETWORK: Collective memory nodes at 94% capacity.",
  "EVENT: Narrative architecture breach in Q1 strategy slide-deck detected."
];

export const IntelligenceFeed: React.FC<IntelligenceFeedProps> = ({ reports }) => {
  const [signals, setSignals] = useState<string[]>(STATIC_SIGNALS);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate a new intercept arriving
      const newSignal = `INTERCEPT_${Math.floor(Math.random() * 9000) + 1000}: ${
        reports.length > 0 && Math.random() > 0.5 
          ? `Registry update for ${reports[Math.floor(Math.random() * reports.length)].title}` 
          : STATIC_SIGNALS[Math.floor(Math.random() * STATIC_SIGNALS.length)]
      }`;
      
      setSignals(prev => [newSignal, ...prev.slice(0, 15)]);
    }, 8000);

    return () => clearInterval(interval);
  }, [reports]);

  return (
    <div className="w-full bg-[#050505] border-b border-white/10 overflow-hidden py-2.5 hidden md:block relative z-[70]">
      <div className="container mx-auto px-6 overflow-hidden">
        <div className="flex animate-ticker">
          <div className="flex gap-20 items-center">
            {signals.concat(signals).map((msg, i) => (
              <span key={i} className="text-[9px] font-mono text-primary/60 uppercase tracking-[0.2em] whitespace-nowrap flex items-center gap-3 font-bold">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_8px_#6200EA]"></span>
                {msg}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
