
import React, { useEffect, useState } from 'react';

interface ReportHeaderProps {
  title: string;
  subtitle: string;
  score: number;
  maxScore: number;
  assessment: string;
}

export const ReportHeader: React.FC<ReportHeaderProps> = ({ title, subtitle, score, maxScore, assessment }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 500);
    return () => clearTimeout(timer);
  }, [score]);

  return (
    <div className="mb-8 md:mb-16 relative">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 md:gap-8">
        <div className="flex-1 space-y-6 md:space-y-4 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-4">
             <div className="classified-stamp text-[8px] md:text-[10px]">CLASSIFIED</div>
             <div className="flex flex-col text-left">
               <span className="text-[8px] md:text-[10px] font-mono text-gray-600 uppercase tracking-[0.2em]">FILE: {subtitle.replace(/\s/g, '_').toUpperCase()}</span>
               <span className="text-[7px] md:text-[8px] font-mono text-primary/50 uppercase tracking-widest mt-0.5">AUTH_SIG: B.V.S.O.C.</span>
             </div>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-white leading-tight lg:leading-[0.9] tracking-tighter">
            Analytical Deconstruction: <br className="hidden md:block" /> {title}
          </h1>
          <h2 className="text-[10px] md:text-base font-bold text-primary/70 uppercase tracking-[0.15em] font-mono flex items-center justify-center lg:justify-start gap-3">
             <i className="ri-database-2-line"></i>
             Report Hash: {subtitle.split(':')[1]?.trim() || "0x55_ALPHA_OVERSIGHT"}
          </h2>
        </div>
        
        <div className="flex items-center justify-center shrink-0">
          <div className="relative w-40 h-40 md:w-56 md:h-56 flex items-center justify-center group">
            {/* Background Circle Decoration */}
            <div className="absolute inset-0 rounded-full border border-white/5 scale-110"></div>
            <div className="absolute inset-0 rounded-full border border-primary/5 scale-125 group-hover:scale-130 transition-transform duration-1000"></div>

            <svg className="w-full h-full transform -rotate-90">
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6200EA" />
                  <stop offset="100%" stopColor="#BB86FC" />
                </linearGradient>
              </defs>
              <circle cx="50%" cy="50%" r="42%" stroke="#111" strokeWidth="12" fill="none" />
              <circle 
                cx="50%" cy="50%" r="42%" 
                stroke="url(#scoreGradient)" strokeWidth="12" fill="none" 
                strokeDasharray={264} 
                strokeDashoffset={264 - (264 * (animatedScore/maxScore))}
                strokeLinecap="round"
                className="transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1)"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-4xl md:text-7xl font-black text-white leading-none tracking-tighter">{animatedScore}</span>
              <span className="text-[9px] md:text-[12px] text-gray-500 font-black tracking-[0.4em] uppercase mt-1 md:mt-2">Index</span>
            </div>
            
            <div className="absolute inset-0 pointer-events-none">
               {[...Array(12)].map((_, i) => (
                 <div key={i} className="absolute top-1/2 left-1/2 w-full h-px bg-white/5" style={{ transform: `translate(-50%, -50%) rotate(${i * 30}deg)` }}></div>
               ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 md:mt-12 group">
        <div className="relative bg-[#080808] border border-white/5 rounded-2xl p-6 md:p-10 overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-1.5 md:w-2 h-full bg-primary shadow-[0_0_25px_rgba(98,0,234,0.5)]"></div>
          <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8 relative z-10">
            <div className="space-y-3 md:space-y-4">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <div className="bg-primary/20 text-primary px-3 py-1 rounded text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] border border-primary/30 w-fit">
                  Bureau Assessment Summary
                </div>
                <div className="text-[7px] md:text-[8px] font-mono text-gray-700 uppercase tracking-widest">
                  CONFIDENCE_INTERVAL: 98.4%
                </div>
              </div>
              <p className="text-xl md:text-4xl text-gray-100 font-serif leading-snug md:leading-tight italic tracking-tight">
                "{assessment}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
