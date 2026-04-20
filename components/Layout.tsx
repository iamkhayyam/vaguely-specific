
import React from 'react';
import { ViewType, ReportData } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  onLogoClick?: () => void;
  reports?: ReportData[];
}

export const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange, onLogoClick, reports = [] }) => {
  const paperMessages = reports.map(r => `FILE: ${r.title.toUpperCase()} [INDEX: ${r.score}]`);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary selection:text-white bg-black pb-20">
      {/* integrated Command Header Unit */}
      <div className="sticky top-0 z-[60] w-full">
        <header className="w-full bg-black/95 border-b border-white/10 backdrop-blur-2xl">
          <div className="container mx-auto px-4 md:px-6 py-4 md:py-5 flex justify-between items-center">
            <div 
              className="flex flex-col items-baseline group cursor-pointer" 
              onClick={onLogoClick}
            >
              <div className="text-xl md:text-3xl font-black text-white tracking-tighter group-hover:text-primary transition-all duration-500 uppercase italic">VAGUELY SPECIFIC</div>
              <div className="text-[9px] md:text-[11px] font-black text-primary/80 tracking-[0.4em] md:tracking-[0.6em] uppercase leading-none mt-1 font-mono">Bureau of Investigations</div>
            </div>
            
            <nav className="hidden lg:flex items-center space-x-12 text-[12px] font-black uppercase tracking-[0.4em] text-gray-500 font-mono">
              {[
                { id: ViewType.CASE_FILES, label: 'Case Files' },
                { id: ViewType.INTELLIGENCE, label: 'Intelligence' }
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`hover:text-white transition-all relative py-2 ${
                    activeView === item.id 
                      ? 'text-white after:content-[""] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-primary' 
                      : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            
            <div className="flex items-center gap-3 md:gap-6">
              <div className="hidden sm:flex items-center gap-2 md:gap-3.5 px-3 md:px-5 py-1.5 md:py-2 bg-white/[0.04] border border-white/5 rounded-full shadow-inner">
                 <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-accent-green rounded-full animate-pulse shadow-[0_0_10px_#00E396]"></div>
                 <span className="text-[8px] md:text-[10px] font-mono text-gray-500 font-bold uppercase tracking-widest">SESSION_v4.5</span>
              </div>
              <button className="bg-primary hover:bg-primary/90 text-white px-4 md:px-7 py-2 md:py-2.5 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.3em] rounded-xl md:rounded-2xl transition-all shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95">
                Portal
              </button>
            </div>
          </div>
          
          {/* THE PAPER Ticker */}
          <div className="w-full bg-primary/5 border-t border-white/5 py-1.5 overflow-hidden">
             <div className="container mx-auto px-4 md:px-6 flex items-center gap-4 md:gap-6">
                <span className="text-[8px] md:text-[9px] font-black text-primary uppercase tracking-[0.2em] md:tracking-[0.3em] whitespace-nowrap shrink-0 border-r border-primary/20 pr-4 md:pr-6">THE PAPER</span>
                <div className="overflow-hidden relative flex-1">
                   <div className="flex animate-ticker whitespace-nowrap gap-12 md:gap-16">
                      {paperMessages.concat(paperMessages).map((msg, i) => (
                        <span key={i} className="text-[8px] md:text-[9px] font-mono text-gray-600 uppercase tracking-widest font-bold">
                          {msg}
                        </span>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </header>
      </div>

      <main className="flex-1 container mx-auto px-4 md:px-6 py-8 md:py-24 relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.01] pointer-events-none overflow-hidden select-none">
           <div className="text-[15rem] md:text-[25rem] font-black text-white absolute -top-20 md:-top-40 -left-40 md:-left-60 rotate-12">BUREAU</div>
        </div>
        <div className="relative z-10">
          {children}
        </div>
      </main>

      <footer className="bg-black border-t border-white/5 py-16 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(98,0,234,0.08),_transparent_40%)]"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-24 mb-16 md:mb-24">
            <div className="md:col-span-2 space-y-6 md:space-y-10 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-black flex items-center justify-center md:justify-start gap-3 md:gap-5 italic uppercase tracking-tighter cursor-pointer hover:text-primary transition-colors" onClick={onLogoClick}>
                <i className="ri-eye-line text-primary text-3xl md:text-4xl"></i>
                VAGUELY SPECIFIC
              </h3>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-xl font-serif italic opacity-80 mx-auto md:mx-0">
                A decentralized collective of analysts deconstructing the epistemological foundations of corporate forecasting.
              </p>
            </div>
          </div>
          <div className="pt-8 md:pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[8px] md:text-[10px] font-mono text-gray-800 uppercase tracking-[0.2em] md:tracking-[0.4em] font-bold text-center">
            <p>© 2025 VAGUELY SPECIFIC BUREAU OF INVESTIGATIONS // SECURE_UPLINK_ESTABLISHED</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
