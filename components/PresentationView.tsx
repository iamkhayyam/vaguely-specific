
import React from 'react';
import { ReportData } from '../types';

interface PresentationViewProps {
  report: ReportData;
  onClose: () => void;
}

export const PresentationView: React.FC<PresentationViewProps> = ({ report, onClose }) => {
  return (
    <div className="fixed inset-0 z-[200] bg-black overflow-x-hidden overflow-y-auto flex flex-col selection:bg-accent-yellow selection:text-black">
      {/* Control Bar */}
      <div className="w-full h-20 md:h-24 bg-black/90 border-b border-white/10 flex justify-between items-center px-8 md:px-16 sticky top-0 z-[210] backdrop-blur-3xl">
        <div className="flex flex-col">
          <div className="text-primary font-black italic text-xl md:text-2xl tracking-tighter uppercase">BUREAU PRESENTATION MODE</div>
          <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest font-bold">Protocol: EXECUTIVE_DECONSTRUCTION_v3</div>
        </div>
        <div className="flex items-center gap-8">
          <div className="hidden lg:flex px-4 py-1.5 bg-accent-yellow/10 text-accent-yellow rounded-lg text-[10px] font-black uppercase tracking-[0.3em] border border-accent-yellow/30 shadow-[0_0_20px_rgba(255,159,0,0.1)]">Tier-3 Executive Access</div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors flex items-center gap-4 text-xs md:text-sm font-black uppercase tracking-[0.5em] group">
            Exit Deck <i className="ri-close-fill text-3xl group-hover:rotate-90 transition-transform"></i>
          </button>
        </div>
      </div>

      <div className="w-full flex-1 flex flex-col items-center py-12 md:py-32 space-y-24 md:space-y-64">
        {/* Slide 1: Cover - Massive Impact */}
        <div className="w-[92%] md:w-[94%] aspect-[9/16] md:aspect-video bg-white text-dark shadow-[0_80px_150px_rgba(0,0,0,0.8)] relative overflow-hidden shrink-0 group">
          <div className="h-full flex flex-col justify-center px-10 md:px-[12%] bg-gradient-to-br from-[#00A0DF] to-[#460073] text-white relative">
             <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '60px 60px' }}></div>
             <div className="relative z-10 space-y-12 md:space-y-24">
                <div className="text-sm md:text-3xl font-black tracking-[0.8em] uppercase opacity-60">The Oversight Committee</div>
                <div>
                  <h1 className="text-6xl md:text-[12rem] font-light tracking-tighter mb-4 md:mb-12 leading-[0.85] animate-in slide-in-from-left duration-1000">VS CLARITY REPORT™</h1>
                  <p className="text-2xl md:text-7xl font-light opacity-90 italic font-serif leading-tight">"{report.title}"</p>
                </div>
                
                <div className="flex flex-col md:flex-row justify-between md:items-end border-t border-white/20 pt-12 md:pt-24 gap-12">
                  <div className="space-y-4">
                    <div className="text-[10px] md:text-base uppercase tracking-[0.5em] opacity-50 font-black">VS CLARITY INDEX™</div>
                    <div className="text-6xl md:text-[10rem] font-bold leading-none tracking-tighter">{report.score}<span className="text-2xl md:text-6xl opacity-30">/100</span></div>
                  </div>
                  <div className="md:text-right space-y-4">
                    <div className="text-[10px] md:text-base uppercase tracking-[0.5em] opacity-50 font-black">Subject Document</div>
                    <div className="text-2xl md:text-5xl font-medium tracking-tight italic font-serif">{report.subtitle}</div>
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* Slide 2: Executive Summary */}
        <div className="w-[92%] md:w-[94%] aspect-[9/16] md:aspect-video bg-[#f8f8f8] text-dark shadow-[0_80px_150px_rgba(0,0,0,0.8)] relative flex flex-col md:flex-row shrink-0 overflow-hidden">
          <div className="w-full md:w-[45%] h-1/2 md:h-full bg-white p-12 md:p-32 flex flex-col justify-center border-b md:border-b-0 md:border-r border-gray-100 relative">
            <div className="absolute top-0 left-0 w-full h-4 bg-[#00A0DF]"></div>
            <h2 className="text-4xl md:text-8xl font-light text-[#460073] mb-12 md:mb-24 leading-none">Executive Summary</h2>
            <div className="flex items-center gap-8 md:gap-16 mb-12 md:mb-24">
              <div className="w-24 h-24 md:w-56 md:h-56 rounded-full border-[10px] md:border-[18px] border-[#FF9F00] flex items-center justify-center shadow-2xl bg-white">
                <span className="text-4xl md:text-9xl font-black">{report.score}</span>
              </div>
              <div className="text-xs md:text-xl font-black uppercase tracking-[0.4em] opacity-50 leading-tight">Clarity Index<br/>Scorecard</div>
            </div>
            <p className="text-xl md:text-[3.2rem] italic font-serif leading-[1.2] text-gray-800 tracking-tight">"{report.assessment}"</p>
          </div>
          <div className="flex-1 p-12 md:p-32 space-y-12 md:space-y-24 bg-[#f8f8f8]">
            <h3 className="text-[10px] md:text-xl font-black text-[#00A0DF] uppercase tracking-[0.6em] border-b-2 border-gray-200 pb-8">Critical Forensic Intercepts</h3>
            <div className="space-y-12 md:space-y-24">
              {report.claims.slice(0, 3).map((claim, idx) => (
                <div key={idx} className="flex gap-8 md:gap-16 items-start">
                  <div className="w-12 h-12 md:w-24 md:h-24 rounded-2xl bg-[#00A0DF] text-white flex items-center justify-center font-black shrink-0 text-xl md:text-4xl shadow-xl">{idx + 1}</div>
                  <div className="space-y-4 md:space-y-8">
                    <h4 className="text-2xl md:text-5xl font-bold text-[#460073] leading-tight tracking-tight">{claim.translation}</h4>
                    <p className="text-lg md:text-3xl text-gray-500 leading-relaxed font-serif italic">"{claim.claim}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Slide 3: Guidance & Directives */}
        <div className="w-[92%] md:w-[94%] aspect-[9/16] md:aspect-video bg-[#460073] text-white shadow-[0_80px_150px_rgba(0,0,0,0.8)] relative flex flex-col-reverse md:flex-row shrink-0 overflow-hidden">
           <div className="flex-1 p-12 md:p-32 space-y-16 md:space-y-32 bg-white text-dark">
              <h2 className="text-4xl md:text-8xl font-light text-[#460073] leading-none">Tactical Directives</h2>
              <div className="grid grid-cols-1 gap-12 md:gap-24">
                {report.guidance.scorecard.slice(0, 3).map((g, i) => (
                  <div key={i} className="flex gap-8 md:gap-16 items-start">
                    <div className="w-10 h-10 md:w-20 md:h-20 bg-dark text-white flex items-center justify-center shrink-0 font-black text-lg md:text-4xl rounded-full">0{i+1}</div>
                    <div className="space-y-4 md:space-y-8">
                      <h4 className="text-2xl md:text-5xl font-black tracking-tight uppercase leading-none">{g.title}</h4>
                      <p className="text-lg md:text-3xl text-gray-500 leading-relaxed font-serif italic">{g.description}</p>
                    </div>
                  </div>
                ))}
              </div>
           </div>
           <div className="w-full md:w-[40%] h-1/2 md:h-full bg-gradient-to-br from-[#460073] to-[#2a0045] p-12 md:p-32 flex flex-col justify-end relative">
              <div className="absolute top-0 right-0 p-16 opacity-5">
                <i className="ri-shield-user-line text-[20rem] md:text-[40rem] -rotate-12"></i>
              </div>
              <div className="relative z-10 space-y-12 md:space-y-24">
                <div className="space-y-6">
                  <div className="text-[10px] md:text-xl font-black uppercase tracking-[0.5em] text-[#00A0DF]">Oversight Brief</div>
                  <p className="text-2xl md:text-[3.8rem] font-light leading-[1.1] tracking-tight italic font-serif">
                    "Extract utility, ignore urgency, prioritize empirical validation."
                  </p>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="w-3 h-3 md:w-6 md:h-6 bg-accent-green rounded-full animate-pulse"></div>
                  <span className="text-xs md:text-2xl font-mono uppercase tracking-[0.3em] font-bold">Bureau Clearance Level 4</span>
                </div>
              </div>
           </div>
        </div>

        {/* Branding Footer */}
        <div className="w-full py-32 md:py-64 flex flex-col items-center justify-center space-y-12">
          <div className="text-3xl md:text-7xl font-black italic tracking-tighter uppercase text-white/10 select-none">VAGUELY SPECIFIC</div>
          <div className="text-[9px] md:text-xl font-mono text-gray-700 uppercase tracking-[0.8em] font-bold">
            © 2025 BUREAU OF INVESTIGATIONS // INTERNAL_PRESENTATION_USE_ONLY
          </div>
          <div className="w-px h-32 md:h-64 bg-gradient-to-b from-primary/50 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};
