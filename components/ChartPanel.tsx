
import React, { useEffect, useState } from 'react';

// Use a generic ChartItem interface that works for both scores and percentages
interface ChartItem {
  label: string;
  colorClass: string;
  score?: number;
  total?: number;
  percentage?: number;
  weight?: string;
}

interface ChartPanelProps {
  title: string;
  items: ChartItem[];
  isScore?: boolean;
}

export const ChartPanel: React.FC<ChartPanelProps> = ({ title, items, isScore }) => {
  const [animatedWidths, setAnimatedWidths] = useState<number[]>([]);

  useEffect(() => {
    // Reset widths immediately when items or isScore changes
    setAnimatedWidths(items.map(() => 0));
    
    // Use a small timeout to trigger the entrance animation
    const timer = setTimeout(() => {
      const targetWidths = items.map((item) => {
        let progress = 0;
        const val = Number(item.score) || 0;
        
        if (isScore) {
          const total = Number(item.total) || 15;
          progress = (val / total) * 100;
        } else if (typeof item.percentage === 'number') {
          progress = item.percentage;
        } else {
          progress = (val / 15) * 100;
        }
        return Math.max(0, Math.min(100, progress));
      });
      setAnimatedWidths(targetWidths);
    }, 50);

    return () => clearTimeout(timer);
  }, [items, isScore]);

  return (
    <div className="bg-[#050505] border border-white/10 rounded-2xl p-8 mb-10 relative overflow-hidden shadow-2xl">
      <div className="absolute inset-0 flex justify-between px-8 pointer-events-none opacity-[0.03]">
        <div className="h-full w-px bg-white"></div>
        <div className="h-full w-px bg-white"></div>
        <div className="h-full w-px bg-white"></div>
        <div className="h-full w-px bg-white"></div>
        <div className="h-full w-px bg-white"></div>
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-baseline mb-8">
          <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] flex items-center gap-3">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            {title}
          </h3>
          <span className="text-[8px] font-mono text-gray-700 uppercase tracking-widest">Bureau Metering // Protocol: VS-CLARITY-V4</span>
        </div>

        <div className="space-y-8">
          {items.map((item, idx) => (
            <div key={idx} className="group relative">
              <div className="flex justify-between items-end mb-2">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-gray-400 group-hover:text-white transition-colors block uppercase tracking-wider">
                    {item.label}
                  </span>
                  {item.weight && (
                    <span className="text-[7px] font-mono text-gray-600 uppercase block tracking-widest leading-none">
                      {item.weight}
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono font-black text-gray-300 group-hover:text-primary transition-colors">
                    {isScore ? `${item.score || 0} / ${item.total || 15}` : `${item.percentage || 0}%`}
                  </span>
                </div>
              </div>
              
              <div className="relative h-3 bg-white/5 rounded-full overflow-hidden border border-white/5 backdrop-blur-sm">
                <div 
                  className={`h-full ${item.colorClass} transition-all duration-[1500ms] cubic-bezier(0.16, 1, 0.3, 1) relative`}
                  style={{ width: `${animatedWidths[idx] || 0}%` }}
                >
                  <div className="absolute top-0 right-0 h-full w-1 bg-white opacity-40 shadow-[0_0_10px_#fff]"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }}></div>
                </div>
              </div>

              <div className="absolute -bottom-4 left-0 text-[7px] font-mono text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-tighter">
                CALIBRATED_OFFSET: {(animatedWidths[idx] || 0).toFixed(2)}% // TRACE_0x{idx}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-12 flex justify-between items-center pt-6 border-t border-white/5">
        <div className="flex gap-6 text-[8px] font-mono text-gray-600 uppercase tracking-widest">
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-accent-red rounded-sm"></div>
             <span>Deficit</span>
           </div>
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-accent-yellow rounded-sm"></div>
             <span>Ambiguity</span>
           </div>
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-accent-green rounded-sm"></div>
             <span>Clarity</span>
           </div>
        </div>
        <div className="text-[8px] font-mono text-gray-800 italic">
          Data normalized against Bureau Historical Baseline (1998-2025)
        </div>
      </div>
    </div>
  );
};
