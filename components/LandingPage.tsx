
import React, { useState, useEffect, useRef } from 'react';
import { ReportData } from '../types';

interface LandingPageProps {
  onStartAnalysis: () => void;
  onLogin: () => void;
  onViewReport: (id: string) => void;
  onOpenPresentation: (report: ReportData) => void;
  onLogoClick?: () => void;
  reports: ReportData[];
}

const ALL_AGENTS = [
  { id: '01', role: 'Chief Methodological Officer', desc: 'Scrutinizes research methodology for analytical integrity.' },
  { id: '02', role: 'Quantitative Rigor Specialist', desc: 'Deconstructs statistical anomalies and sampling bias.' },
  { id: '03', role: 'Historical Precedent Analyst', desc: 'Maps current claims against failed tech hype cycles.' },
  { id: '04', role: 'Pattern Recognition Director', desc: 'Identifies recurring tactics across multiple dossiers.' },
  { id: '05', role: 'Fact-Fidelity Warden', desc: 'Verifies empirical claims against live Bureau signal.' },
  { id: '06', role: 'Linguistic Analysis Chief', desc: 'Decodes terminology and tracks buzzword evolution.' },
  { id: '07', role: 'Cognitive Bias Detector', desc: 'Identifies institutional and echo-chamber heuristics.' },
  { id: '08', role: 'Obfuscation Auditor', desc: 'Measures the density of non-falsifiable strategic claims.' },
  { id: '09', role: 'Technical Feasibility Director', desc: 'Assesses hardware realities vs. software promises.' },
  { id: '10', role: 'Economic Validation Officer', desc: 'Evaluates financial projections and hidden costs.' },
  { id: '11', role: 'Future-State Skeptic', desc: 'Interrogates "Future-as-Present" narrative framing.' },
  { id: '12', role: 'Strategy Archeologist', desc: 'Unearths repackaged 1980s management frameworks.' },
  { id: '13', role: 'Vendor Independence Guard', desc: 'Flags solution-alignment in ostensibly "neutral" research.' },
  { id: '14', role: 'Committee Chair', desc: 'Synthesizes all intelligence & delivers final directives.' }
];

const PHONE_ALERTS = [
  "UPLINK_STABLE",
  "INTERCEPTING_SIGNAL...",
  "DECODING_DODGY_METRICS",
  "NARRATIVE_BREACH_DETECTED",
  "FORENSIC_SYNC_ACTIVE",
  "CONSULTANT_FLUFF_ISOLATED"
];

const OPERATIONS = [
  {
    icon: 'ri-file-search-line',
    title: 'Interrogate Dossiers',
    desc: 'Ingest corporate AI strategy PDFs and forecasting dossiers for automated forensic interrogation.',
    color: 'text-primary'
  },
  {
    icon: 'ri-translate-2',
    title: 'Translate Obfuscation',
    desc: 'Strip away "synergistic paradigm shifts" to expose the underlying hardware and software realities.',
    color: 'text-accent-yellow'
  },
  {
    icon: 'ri-pulse-line',
    title: 'Quantify Clarity',
    desc: 'Apply the VS Clarity Index™ to measure statistical validity, prediction falsifiability, and originality.',
    color: 'text-accent-red'
  },
  {
    icon: 'ri-shield-check-line',
    title: 'Bypass False Urgency',
    desc: 'Receive tactical directives to ignore consultant-induced artificial timelines and focus on utility.',
    color: 'text-accent-green'
  }
];

export const LandingPage: React.FC<LandingPageProps> = ({ onStartAnalysis, onLogin, onViewReport, onOpenPresentation, onLogoClick, reports }) => {
  const [previewReport, setPreviewReport] = useState<ReportData | null>(null);
  const [randomAgents, setRandomAgents] = useState<typeof ALL_AGENTS>([]);
  const [displayCount, setDisplayCount] = useState(3);
  const [activeAlert, setActiveAlert] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [pingPulse, setPingPulse] = useState(false);
  const [phoneTilt, setPhoneTilt] = useState({ x: 0, y: 0 });
  const phoneRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 768 && width < 1024) {
        setDisplayCount(4);
      } else {
        setDisplayCount(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    rotateCommittee();

    const alertTimer = setInterval(() => {
      setActiveAlert(prev => (prev + 1) % PHONE_ALERTS.length);
    }, 3500);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(alertTimer);
    };
  }, []);

  const rotateCommittee = () => {
    const shuffled = [...ALL_AGENTS].sort(() => 0.5 - Math.random());
    setRandomAgents(shuffled.slice(0, 6));
  };

  const scrollToMission = () => {
    missionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAccessDossier = (id: string) => {
    setPreviewReport(null);
    onViewReport(id);
  };

  const triggerPing = () => {
    setIsScanning(true);
    setPingPulse(true);
    setTimeout(() => {
      setIsScanning(false);
      setPingPulse(false);
    }, 2000);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!phoneRef.current) return;
    const rect = phoneRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setPhoneTilt({ x: x * 10, y: y * 10 });
  };

  const visibleReports = reports.slice(0, displayCount);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-white overflow-x-hidden pb-48">
      {/* Hero Section - Tactical Aesthetic */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-32 overflow-hidden">
        {/* Background Dot Grid */}
        <div className="absolute inset-0 opacity-[0.07]" style={{ 
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', 
          backgroundSize: '32px 32px' 
        }}></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            
            {/* Left Content: The Title Matrix */}
            <div className="lg:col-span-7 space-y-16">
              <div className="flex flex-wrap items-center gap-6">
                <div className="px-3 py-1 bg-accent-red/10 border border-accent-red/40 rounded text-[10px] font-black text-accent-red uppercase tracking-[0.2em] animate-pulse">
                  LIVE INTERCEPT
                </div>
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.4em] font-bold">
                  NODE: B.V.S.O.C. // UPLINK_STABLE
                </div>
              </div>

              <div className="space-y-0">
                <h1 className="text-7xl md:text-[11rem] lg:text-[14rem] font-black italic tracking-tighter uppercase leading-[0.75] select-none">
                  THE <br />
                  OVERSIGHT <br />
                  <span className="text-primary">COMMITTEE.</span>
                </h1>
              </div>

              <div className="max-w-xl border-l-2 border-primary/40 pl-8 space-y-8">
                <p className="text-xl md:text-3xl font-serif italic text-gray-400 leading-tight">
                  "Because what's obvious shouldn't cost a six-figure consulting fee." Forensic deconstruction for the enterprise skeptic.
                </p>
                <div className="flex flex-wrap gap-6 pt-4">
                  <button 
                    onClick={onStartAnalysis}
                    className="px-10 py-5 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-[0.4em] text-[11px] rounded transition-all hover:scale-105 active:scale-95 flex items-center gap-4 shadow-2xl shadow-primary/20"
                  >
                    <i className="ri-flashlight-line text-lg"></i>
                    Initiate Flow
                  </button>
                  <button onClick={scrollToMission} className="px-10 py-5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-black uppercase tracking-[0.3em] text-[11px] rounded transition-all">
                    Directive Scope
                  </button>
                </div>
              </div>
            </div>

            {/* Right Content: Registry Mockup - INTERACTIVE PHONE */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div 
                ref={phoneRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setPhoneTilt({ x: 0, y: 0 })}
                onClick={triggerPing}
                style={{ 
                  transform: `perspective(1000px) rotateY(${phoneTilt.x}deg) rotateX(${-phoneTilt.y}deg)`,
                  transition: 'transform 0.1s ease-out'
                }}
                className={`relative w-full max-w-[420px] aspect-[9/18.5] bg-[#050505] rounded-[3.5rem] border-[12px] border-[#111] shadow-[0_50px_100px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col group cursor-pointer select-none ${pingPulse ? 'ring-4 ring-primary/40 scale-[1.01]' : ''} transition-all duration-300`}
              >
                {/* Camera Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#111] rounded-b-2xl z-20"></div>
                
                {/* Glitch Overlay on Interaction */}
                {pingPulse && (
                   <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-40 pointer-events-none animate-pulse"></div>
                )}

                {/* Inner Screen Content */}
                <div className="flex-1 p-10 flex flex-col justify-between relative overflow-hidden">
                  <div className="space-y-12 relative z-10">
                    <div className="flex justify-between items-start">
                      <div className={`w-16 h-16 bg-primary/20 border border-primary/30 rounded-2xl flex items-center justify-center text-primary transition-transform ${pingPulse ? 'scale-110' : ''}`}>
                        <i className={`ri-folder-shield-2-line text-3xl ${isScanning ? 'animate-bounce' : ''}`}></i>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none">Status_Log</div>
                        <div className="text-xs font-mono font-black text-primary uppercase tracking-widest mt-1 min-w-[120px]">
                           {PHONE_ALERTS[activeAlert]}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-5xl md:text-6xl font-black italic uppercase leading-none tracking-tighter group-hover:text-primary transition-colors">
                        REGISTRY <br />
                        <span className="text-white">ACCESS.</span>
                      </h3>
                      <p className="text-lg text-gray-500 font-serif italic leading-relaxed opacity-80">
                        Tap screen to ping the secure Bureau Registry and initiate a forensic audit cycle.
                      </p>
                    </div>
                  </div>

                  {/* Fingerprint Sensor / Portal Entry */}
                  <div className="relative z-10 flex flex-col items-center gap-4 py-8">
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        onLogin();
                      }}
                      className="group/fp relative w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/10 flex items-center justify-center hover:border-primary/50 transition-all hover:scale-110 active:scale-95 bg-black/40 shadow-[0_0_20px_rgba(0,0,0,1)]"
                    >
                      <div className="absolute inset-0 rounded-full bg-primary/5 group-hover/fp:bg-primary/10 transition-colors animate-pulse"></div>
                      <i className="ri-fingerprint-line text-4xl md:text-5xl text-gray-600 group-hover/fp:text-primary transition-colors"></i>
                      
                      {/* Biometric Scan Rings */}
                      <div className="absolute inset-0 rounded-full border border-primary/20 scale-110 opacity-0 group-hover/fp:opacity-100 group-hover/fp:animate-ping duration-1000"></div>
                      <div className="absolute -bottom-6 whitespace-nowrap text-[8px] font-mono text-gray-700 uppercase tracking-[0.2em] opacity-0 group-hover/fp:opacity-100 transition-opacity">
                        Agent_Auth_Required
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 relative z-10">
                    <div className="bg-[#0c0c0c] border border-white/5 p-5 rounded-2xl hover:border-primary/40 transition-colors">
                      <div className="text-[9px] font-black text-primary uppercase tracking-widest mb-1">Live Intercepts</div>
                      <div className="text-2xl font-mono text-white">
                        {18422 + (pingPulse ? Math.floor(Math.random() * 5) : 0)}
                      </div>
                    </div>
                    <div className="bg-[#0c0c0c] border border-white/5 p-5 rounded-2xl hover:border-accent-green/40 transition-colors">
                      <div className="text-[9px] font-black text-accent-green uppercase tracking-widest mb-1">Node Uplink</div>
                      <div className="text-xl font-mono text-white">{isScanning ? 'RESCAN' : 'STABLE'}</div>
                    </div>
                  </div>

                  {/* Visual Scan Layer */}
                  {isScanning && (
                    <div className="absolute inset-0 pointer-events-none z-0">
                       <div className="absolute top-0 left-0 w-full h-1 bg-primary/50 shadow-[0_0_20px_#6200EA] animate-[scan_2s_ease-in-out_infinite]"></div>
                       <div className="absolute inset-0 bg-primary/5 backdrop-invert-[0.05]"></div>
                    </div>
                  )}
                </div>

                {/* Home Indicator */}
                <div className="h-1.5 w-32 bg-white/10 rounded-full mx-auto mb-3"></div>
                
                {/* Subtle Scan Line Effect */}
                <div className="scan-line !opacity-10"></div>
              </div>
              
              {/* Interaction Hint */}
              <div className="absolute -bottom-8 text-[9px] font-mono font-bold text-gray-700 uppercase tracking-widest animate-pulse lg:block hidden">
                // TAP_TO_PING_REGISTRY //
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* WHAT WE DO: Operational Scope Section */}
      <section ref={missionRef} className="py-24 md:py-48 bg-white/[0.02] relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-24">
            <div className="text-center space-y-6">
              <h2 className="text-[10px] md:text-[12px] font-black text-primary uppercase tracking-[0.8em]">Directive 01</h2>
              <h3 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">Operational Scope.</h3>
              <p className="text-xl md:text-3xl text-gray-500 font-serif italic max-w-2xl mx-auto leading-tight">
                "The Bureau does not forecast the future. We audit the narratives of those who claim they can."
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
              {OPERATIONS.map((op, i) => (
                <div key={i} className="group space-y-6 animate-in fade-in slide-in-from-bottom duration-700" style={{ animationDelay: `${i * 150}ms` }}>
                  <div className={`w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center ${op.color} group-hover:scale-110 group-hover:bg-white/[0.05] transition-all duration-500 shadow-lg`}>
                    <i className={`${op.icon} text-3xl`}></i>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-2xl font-black uppercase tracking-tight text-white group-hover:text-primary transition-colors">{op.title}</h4>
                    <p className="text-gray-500 font-serif text-lg italic leading-relaxed">
                      {op.desc}
                    </p>
                  </div>
                  <div className="pt-2 flex items-center gap-4">
                    <span className="text-[8px] font-mono text-gray-700 uppercase tracking-widest font-bold">Operation_Phase_0{i+1}</span>
                    <div className="flex-1 h-px bg-white/5"></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-black border border-white/5 p-12 rounded-[3rem] text-center space-y-8 shadow-2xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <div className="relative z-10 space-y-6">
                 <p className="text-2xl md:text-4xl text-gray-400 font-serif italic leading-snug max-w-2xl mx-auto">
                   "We deconstruct the marketing frameworks of 2025 to reveal the management theories of 1982."
                 </p>
                 <button 
                  onClick={onStartAnalysis}
                  className="px-12 py-6 bg-white text-black font-black uppercase text-xs tracking-[0.4em] rounded-full hover:bg-primary hover:text-white transition-all hover:scale-105 active:scale-95"
                 >
                   Establish Secure Flow
                 </button>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rotating Committee Section */}
      <section className="py-16 md:py-32 bg-white/[0.005] border-y border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-10 lg:gap-12 mb-16 md:mb-24 text-center lg:text-left">
            <div className="space-y-4">
              <h2 className="text-[10px] md:text-[12px] font-black text-primary uppercase tracking-[0.8em]">Committee Rotation</h2>
              <h3 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">Active Personnel.</h3>
            </div>
            <div className="flex flex-col items-center lg:items-end gap-6">
               <p className="max-w-xs text-gray-600 font-mono text-[10px] md:text-xs uppercase tracking-widest font-bold leading-relaxed">
                 Agents currently assigned to active forensic interrogation queues. Updated every session.
               </p>
               <button 
                onClick={rotateCommittee}
                className="px-6 md:px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] transition-all flex items-center gap-3"
               >
                 <i className="ri-refresh-line"></i> Refresh Assignment
               </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {randomAgents.map((agent, i) => (
              <div 
                key={agent.id + i} 
                className="bg-black/40 border border-white/5 p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] space-y-4 md:space-y-6 hover:border-primary/40 transition-all group relative overflow-hidden animate-in fade-in slide-in-from-bottom duration-700"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="absolute -top-10 -right-10 text-[8rem] md:text-[10rem] font-black text-white/[0.02] pointer-events-none group-hover:text-primary/[0.03] transition-colors">{agent.id}</div>
                <div className="flex justify-between items-center relative z-10">
                   <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-mono font-black text-sm md:text-base">{agent.id}</div>
                   <div className="px-3 py-1 bg-white/5 rounded-full text-[8px] font-black text-gray-600 uppercase tracking-widest">Active_Node</div>
                </div>
                <h4 className="text-lg md:text-xl font-black text-white uppercase tracking-tight group-hover:text-primary transition-colors relative z-10">{agent.role}</h4>
                <p className="text-xs md:text-sm text-gray-500 font-serif italic leading-relaxed relative z-10">{agent.desc}</p>
                <div className="pt-4 border-t border-white/5 flex items-center gap-3 relative z-10">
                   <div className="w-1.5 h-1.5 bg-accent-green rounded-full animate-pulse"></div>
                   <span className="text-[8px] font-mono text-gray-700 uppercase tracking-widest font-bold">Signal established</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registry Logs */}
      <section className="py-24 md:py-48">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-10 md:gap-12 mb-16 md:mb-24 text-center md:text-left">
            <div className="space-y-4">
              <h2 className="text-[10px] md:text-[12px] font-black text-primary uppercase tracking-[0.8em]">Bureau Registry</h2>
              <h3 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">Recent Dossiers.</h3>
            </div>
            <p className="max-w-sm text-gray-600 font-mono text-[10px] md:text-xs uppercase tracking-widest font-bold">
              Access previously deconstructed dossiers for collective intelligence comparisons.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {visibleReports.map((report) => (
              <div 
                key={report.id}
                onClick={() => setPreviewReport(report)}
                className="group relative bg-[#050505] border border-white/10 p-8 md:p-14 rounded-[2.5rem] md:rounded-[3.5rem] hover:border-primary/50 transition-all cursor-pointer flex flex-col h-full shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 duration-500"
              >
                <div className="flex justify-between items-start mb-8 md:mb-12">
                  <div className="space-y-2">
                    <div className="classified-stamp text-[8px] md:text-[9px] scale-90 origin-left border-2">DECONSTRUCTED</div>
                    <div className="flex gap-1">
                      {report.frictions.slice(0, 3).flatMap(f => f.agents).slice(0, 3).map((a, i) => (
                        <span key={i} className="text-[7px] md:text-[8px] font-mono font-bold px-1 bg-primary/20 text-primary border border-primary/20 rounded">A_{a}</span>
                      ))}
                    </div>
                  </div>
                  <span className="text-4xl md:text-6xl font-black text-white/5 group-hover:text-primary/20 transition-all font-mono leading-none">{report.score}</span>
                </div>
                <h4 className="text-2xl md:text-4xl font-black leading-tight uppercase group-hover:text-white text-gray-400 transition-colors mb-4 md:mb-6 tracking-tighter">{report.title}</h4>
                <p className="text-base md:text-lg text-gray-600 font-serif italic leading-relaxed line-clamp-3 mb-8 md:mb-12">"{report.assessment}"</p>
                <div className="mt-auto flex justify-between items-center text-[9px] md:text-[10px] font-black text-primary uppercase tracking-[0.4em] opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                  <span>Open Intelligence File</span>
                  <i className="ri-arrow-right-line text-xl md:text-2xl"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Snapshot Preview Modal */}
      {previewReport && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-3xl animate-in fade-in duration-300">
           <div className="bg-[#080808] border border-white/10 w-full max-w-5xl h-full md:max-h-[90vh] rounded-[2rem] md:rounded-[3.5rem] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in duration-500">
              <div className="p-6 md:p-12 border-b border-white/10 flex justify-between items-center">
                <div className="space-y-1">
                  <h4 className="text-[9px] md:text-[10px] font-black text-primary uppercase tracking-[0.5em]">Forensic Dossier Snapshot</h4>
                  <h2 className="text-xl md:text-4xl font-black italic uppercase tracking-tighter text-white">{previewReport.title}</h2>
                </div>
                <button onClick={() => setPreviewReport(null)} className="text-gray-500 hover:text-white transition-colors p-3 md:p-4 bg-white/5 rounded-full">
                   <i className="ri-close-fill text-2xl md:text-3xl"></i>
                </button>
              </div>
              
              <div className="p-6 md:p-16 flex-1 overflow-y-auto custom-scrollbar space-y-12 md:space-y-16">
                 {/* Main Overview: Score + Summary */}
                 <div className="flex flex-col lg:flex-row gap-10 md:gap-16 items-center">
                    <div className="relative w-40 h-40 md:w-56 md:h-56 flex items-center justify-center shrink-0">
                       <svg className="w-full h-full -rotate-90">
                          <circle cx="50%" cy="50%" r="44%" stroke="#111" strokeWidth="10" fill="none" />
                          <circle 
                            cx="50%" cy="50%" r="44%" 
                            stroke="#6200EA" strokeWidth="10" fill="none" 
                            strokeDasharray="276" 
                            strokeDashoffset={276 - (276 * (previewReport.score/100))} 
                            strokeLinecap="round"
                            className="transition-all duration-1000 ease-out"
                          />
                       </svg>
                       <div className="absolute text-center">
                          <span className="text-5xl md:text-8xl font-black text-white leading-none tracking-tighter">{previewReport.score}</span>
                          <span className="text-[9px] md:text-[10px] font-black text-gray-500 block uppercase tracking-widest mt-1 md:mt-2">Index</span>
                       </div>
                    </div>
                    <div className="space-y-4 md:space-y-6 text-center lg:text-left">
                       <div className="flex gap-3 md:gap-4 items-center justify-center lg:justify-start">
                          <span className="px-3 py-1 bg-primary/20 text-primary text-[9px] md:text-[10px] font-black rounded uppercase tracking-widest border border-primary/20">Executive Brief</span>
                          <span className="text-[9px] md:text-[10px] font-mono text-gray-700 uppercase font-bold tracking-widest">Confidence: 98.4%</span>
                       </div>
                       <p className="text-xl md:text-4xl text-gray-300 font-serif italic leading-[1.2] tracking-tight">"{previewReport.assessment}"</p>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
                    {/* Dimension Breakdown Preview */}
                    <div className="space-y-6 md:space-y-8">
                       <h5 className="text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] md:tracking-[0.6em] flex items-center gap-4">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                          Dimension Matrix Teaser
                       </h5>
                       <div className="space-y-4 md:space-y-6">
                          {previewReport.scorecard.slice(0, 4).map((dim, i) => (
                             <div key={i} className="space-y-1.5 md:space-y-2">
                                <div className="flex justify-between text-[9px] md:text-[10px] font-bold uppercase tracking-widest">
                                   <span className="text-gray-400">{dim.label}</span>
                                   <span className="text-white font-mono">{dim.score}/{dim.total}</span>
                                </div>
                                <div className="h-1 md:h-1.5 bg-white/5 rounded-full overflow-hidden">
                                   <div 
                                      className={`h-full ${dim.colorClass} opacity-80`} 
                                      style={{ width: `${(dim.score/dim.total) * 100}%` }}
                                   ></div>
                                </div>
                             </div>
                          ))}
                       </div>
                    </div>

                    {/* Agent Signals Preview */}
                    <div className="space-y-6 md:space-y-8">
                       <h5 className="text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] md:tracking-[0.6em] flex items-center gap-4">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                          Agent Synthesis Signals
                       </h5>
                       <div className="grid grid-cols-1 gap-4">
                          {previewReport.frictions.slice(0, 1).map((f, i) => (
                             <div key={i} className="bg-white/[0.02] border border-white/10 p-6 md:p-8 rounded-2xl space-y-4">
                                <div className="flex gap-2">
                                   {f.agents.map(a => (
                                      <span key={a} className="text-[7px] md:text-[8px] font-mono font-bold px-2 py-0.5 bg-primary/20 text-primary rounded border border-primary/20">AGENT_{a}</span>
                                   ))}
                                </div>
                                <h6 className="text-xs md:text-sm font-black text-white uppercase tracking-widest leading-snug">{f.title}</h6>
                                <p className="text-xs md:text-sm text-gray-500 italic font-serif leading-relaxed line-clamp-2">"{f.finding}"</p>
                             </div>
                          ))}
                          <div className="text-center pt-2">
                             <p className="text-[8px] md:text-[9px] font-mono text-gray-700 uppercase tracking-widest">+ {previewReport.claims.length} More Intercepts Logged</p>
                          </div>
                       </div>
                    </div>
                 </div>
                 
                 <div className="bg-primary/5 border border-primary/20 p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 relative overflow-hidden group text-center md:text-left">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform hidden md:block">
                       <i className="ri-vidicon-line text-8xl"></i>
                    </div>
                    <div className="space-y-4 relative z-10">
                       <h5 className="text-[10px] md:text-[11px] font-black text-primary uppercase tracking-[0.4em] md:tracking-[0.5em]">Executive Access Ready</h5>
                       <p className="text-gray-400 text-sm md:text-lg font-serif italic leading-relaxed">
                          "Full 16:9 deconstruction matrix, claim translation logs, and premium executive deck available within the Bureau uplink."
                       </p>
                    </div>
                    <div className="shrink-0 relative z-10 w-full md:w-auto">
                       <button onClick={() => handleAccessDossier(previewReport.id)} className="w-full md:w-auto px-10 md:px-12 py-5 md:py-6 bg-primary text-white font-black uppercase text-[10px] md:text-xs tracking-[0.4em] rounded-2xl shadow-2xl shadow-primary/30 hover:scale-105 transition-all">
                          Establish Full Access
                       </button>
                    </div>
                 </div>
              </div>

              <div className="p-6 md:p-10 bg-black border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                 <div className="text-[8px] md:text-[9px] font-mono text-gray-700 uppercase tracking-widest font-bold">Trace_ID: {previewReport.id.toUpperCase()} // Registry_v4.5</div>
                 <button onClick={() => setPreviewReport(null)} className="text-[8px] md:text-[9px] font-black text-gray-500 hover:text-white uppercase tracking-widest transition-colors">Close Preview</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
