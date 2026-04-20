
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { ReportHeader } from './components/ReportHeader';
import { ChartPanel } from './components/ChartPanel';
import { DeconstructionTool } from './components/DeconstructionTool';
import { MistakeEngine } from './components/MistakeEngine';
import { DiversityAudit } from './components/DiversityAudit';
import { ForensicLab } from './components/ForensicLab';
import { LandingPage } from './components/LandingPage';
import { AuthModule } from './components/AuthModule';
import { IntelligenceFeed } from './components/IntelligenceFeed';
import { PresentationView } from './components/PresentationView';
import { StickyStatsFooter } from './components/StickyStatsFooter';
import { TabType, ViewType, ReportData } from './types';
import { REPORTS } from './constants';

const App: React.FC = () => {
  // Navigation & View States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>(TabType.SCORECARD);
  const [activeView, setActiveView] = useState<ViewType>(ViewType.DASHBOARD);
  
  // Data States
  const [sessionReports, setSessionReports] = useState<Record<string, ReportData>>(() => {
    const saved = localStorage.getItem('vs_bureau_registry');
    if (saved) {
      try {
        return { ...REPORTS, ...JSON.parse(saved) };
      } catch (e) {
        return REPORTS;
      }
    }
    return REPORTS;
  });

  const reportsList = Object.values(sessionReports) as ReportData[];
  const [currentReportId, setCurrentReportId] = useState<string>('deloitte');
  
  // Modal/Tool States
  const [showDeconstructor, setShowDeconstructor] = useState(false);
  const [showMistakeEngine, setShowMistakeEngine] = useState(false);
  const [showDiversityAudit, setShowDiversityAudit] = useState(false);
  const [showForensicLab, setShowForensicLab] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showXAIPurchase, setShowXAIPurchase] = useState(false);
  const [presentationReport, setPresentationReport] = useState<ReportData | null>(null);
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [liveLogs, setLiveLogs] = useState<{timestamp: string, message: string, type: string}[]>([]);

  useEffect(() => {
    const userReports = Object.keys(sessionReports)
      .filter(key => !Object.keys(REPORTS).includes(key))
      .reduce((obj, key) => {
        obj[key] = sessionReports[key];
        return obj;
      }, {} as Record<string, ReportData>);
    
    localStorage.setItem('vs_bureau_registry', JSON.stringify(userReports));
  }, [sessionReports]);

  useEffect(() => {
    setIsLoaded(true);
    setLiveLogs([
      { timestamp: new Date().toLocaleTimeString(), message: "BUREAU UPLINK SECURE", type: "system" },
      { timestamp: new Date().toLocaleTimeString(), message: "SURVEILLANCE MODE ACTIVE", type: "system" }
    ]);

    const logInterval = setInterval(() => {
      const types = ["intercept", "registry", "alert", "forensic"];
      const messages = [
        "Unfalsifiable claim detected in corporate briefing.",
        "Obfuscation index spike in Tier-1 consultany dossier.",
        "Registry sync complete for case file #902.",
        "Narrative shift identified in future-state roadmap.",
        "Methodological deficit flagged in statistical sampling.",
        "Linguistic audit revealed 12 buzzword recursions."
      ];
      
      setLiveLogs(prev => [
        { 
          timestamp: new Date().toLocaleTimeString(), 
          message: messages[Math.floor(Math.random() * messages.length)], 
          type: types[Math.floor(Math.random() * types.length)] 
        }, 
        ...prev.slice(0, 15)
      ]);
    }, 5000);

    return () => clearInterval(logInterval);
  }, []);

  const currentReport = sessionReports[currentReportId] || REPORTS.deloitte;

  const handleResetToLanding = () => {
    setIsAuthenticated(false);
    setActiveView(ViewType.DASHBOARD);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setShowAuth(false);
  };

  const selectReport = (id: string) => {
    setCurrentReportId(id);
    setActiveView(ViewType.DASHBOARD);
    setActiveTab(TabType.SCORECARD);
    setIsAuthenticated(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnalysisComplete = (newReport: ReportData) => {
    setSessionReports(prev => ({
      ...prev,
      [newReport.id]: newReport
    }));
    setIsAuthenticated(true);
    selectReport(newReport.id);
  };

  const handleStartAnalysis = () => {
    setShowForensicLab(true);
  };

  const renderDashboard = () => (
    <div className={`transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <ReportHeader 
        title={currentReport.title}
        subtitle={currentReport.subtitle}
        score={currentReport.score}
        maxScore={100}
        assessment={currentReport.assessment}
      />

      <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-wrap gap-1 bg-black/40 p-1.5 rounded-xl border border-white/5 w-full md:w-fit backdrop-blur-sm">
          {Object.values(TabType).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 md:flex-none px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-lg transition-all ${activeTab === tab ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <button 
          onClick={() => setShowDeconstructor(true)}
          className="w-full md:w-auto px-6 py-3 bg-white/5 border border-white/10 hover:border-primary/50 text-primary text-[10px] font-black uppercase tracking-[0.3em] rounded-lg transition-all flex items-center justify-center gap-3 group"
        >
          <i className="ri-shield-keyhole-line group-hover:animate-pulse text-lg"></i>
          Rhetorical Deconstructor
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-8 space-y-8">
          {activeTab === TabType.SCORECARD && (
            <div className="animate-in fade-in slide-in-from-left duration-500">
              <ChartPanel title="VS Clarity Index™ Dimension Analysis" items={currentReport.scorecard} isScore={true} />
              <div className="bg-[#080808] border border-white/5 rounded-2xl p-8 relative overflow-hidden group">
                <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  Methodological Interrogation
                </h4>
                <p className="text-gray-400 text-base leading-relaxed font-serif">
                  Our interrogation reveals critical deficits in methodological transparency for {currentReport.title}. The data provided relies on selective sampling and definitional shifts that mask actual enterprise utility.
                </p>
              </div>
            </div>
          )}

          {activeTab === TabType.RHETORIC && (
            <div className="animate-in fade-in slide-in-from-left duration-500">
              <ChartPanel title="Narrative Architecture Analysis" items={currentReport.rhetoric} />
            </div>
          )}

          {activeTab === TabType.CLAIMS && (
            <div className="animate-in fade-in slide-in-from-bottom duration-500 bg-[#080808] border border-white/5 rounded-2xl overflow-hidden shadow-2xl overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-black/50 border-b border-white/10">
                    <th className="p-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Intercepted Claim</th>
                    <th className="p-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Bureau Translation</th>
                    <th className="p-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Forensic Assessment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono text-xs">
                  {currentReport.claims.map((row, i) => (
                    <tr key={i} className="hover:bg-primary/[0.02] transition-colors group">
                      <td className="p-6 text-gray-400 italic font-serif text-sm leading-relaxed max-w-xs">{row.claim}</td>
                      <td className="p-6 text-primary font-bold">{row.translation}</td>
                      <td className="p-6 text-gray-500">{row.assessment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === TabType.AGENTS && (
            <div className="animate-in fade-in zoom-in duration-500 space-y-12">
              <div className="bg-[#050505] border border-primary/20 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary animate-shimmer" style={{ backgroundSize: '200% 100%' }}></div>
                <h3 className="text-lg font-black text-white mb-8 flex items-center gap-4">
                  <i className="ri-brain-line text-primary"></i>
                  Mistake Engine™: Calibrated Friction Log
                </h3>
                <div className="space-y-6">
                  {currentReport.frictions.map((f, i) => (
                    <div key={i} className="bg-white/[0.02] border border-white/5 p-6 rounded-xl space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {f.agents.map(a => (
                          <span key={a} className="px-3 py-1 bg-primary/20 text-primary text-[10px] font-black rounded font-mono uppercase">Agent_{a}</span>
                        ))}
                      </div>
                      <h4 className="text-sm font-black text-white uppercase tracking-widest">{f.title}</h4>
                      <p className="text-gray-400 text-sm italic font-serif leading-relaxed">"{f.finding}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-10">
          <div className="bg-gradient-to-br from-[#111] to-black border border-white/10 rounded-2xl p-8 relative overflow-hidden group shadow-2xl">
            <h3 className="text-sm font-black text-white mb-8 flex items-center gap-3 uppercase tracking-[0.3em]">
              <i className="ri-flashlight-line text-primary"></i>
              Bureau Directives
            </h3>
            <div className="space-y-10 relative z-10">
              {currentReport.guidance[activeTab]?.map((step, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-[10px] font-black text-primary font-mono">0{i + 1}</div>
                  <div className="space-y-1.5">
                    <h4 className="text-[11px] font-black text-white uppercase tracking-widest leading-tight">{step.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed font-medium">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <button 
              onClick={() => setPresentationReport(currentReport)}
              className="w-full py-8 bg-accent-yellow/10 border border-accent-yellow/30 rounded-3xl flex flex-col items-center gap-3 hover:bg-accent-yellow/20 transition-all group"
            >
              <span className="text-[9px] font-black text-accent-yellow uppercase tracking-[0.5em]">PREMIUM EXECUTIVE DECK</span>
              <span className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-3">
                <i className="ri-vidicon-line text-2xl text-accent-yellow group-hover:scale-110 transition-transform"></i>
                Open 16:9 Presentation
              </span>
              <span className="text-[8px] font-mono text-gray-600 uppercase tracking-widest">Clearance: Tier-3 Required</span>
            </button>
            
            {/* NEW CTA: Agent Interpretability Add-on */}
            <div className="relative group/xai">
              <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover/xai:opacity-100 transition-opacity"></div>
              <button 
                onClick={() => setShowXAIPurchase(true)}
                className="relative w-full py-10 bg-black/40 border border-primary/40 rounded-3xl flex flex-col items-center gap-4 hover:border-primary transition-all overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-[0.05]">
                  <i className="ri-node-tree text-6xl"></i>
                </div>
                <div className="px-4 py-1 bg-primary text-white text-[8px] font-black rounded uppercase tracking-[0.4em] mb-1">Bureau Add-On Available</div>
                <span className="text-base font-black text-white uppercase tracking-tighter flex items-center gap-3 italic">
                  <i className="ri-mind-map text-primary text-2xl group-hover/xai:animate-pulse"></i>
                  AGENT EXPLAINABILITY MATRIX
                </span>
                <p className="text-[10px] text-gray-500 font-serif italic max-w-[80%] text-center leading-relaxed">
                  "Expose the raw decision-branching and weight distribution of the 14 Oversight Agents."
                </p>
                <div className="flex items-center gap-4 mt-2">
                   <div className="text-[9px] font-black text-primary uppercase tracking-widest border border-primary/20 px-3 py-1 rounded">Clearance: Level 5</div>
                   <div className="text-[10px] font-mono font-bold text-accent-green animate-pulse">0.084 BTC // $SECURE</div>
                </div>
              </button>
            </div>

            <p className="text-[8px] text-gray-700 font-mono text-center uppercase tracking-widest pt-4 opacity-50">
              VAGUELY SPECIFIC // NEURAL_EXPLAINABILITY_MODULE_v4
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIntelligence = () => (
    <div className="animate-in fade-in slide-in-from-bottom duration-700 space-y-16">
      <div className="text-center space-y-4">
        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter italic uppercase">Global Obfuscation Trends</h2>
        <p className="text-gray-500 font-mono text-[10px] tracking-[0.5em] uppercase">Intelligence Node: VSB-SURVEILLANCE-NET // STATUS: STREAMING</p>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {[
          { label: 'Avg Obfuscation Index', value: '72%', trend: '+4.1%', color: 'text-accent-red' },
          { label: 'Unfalsifiable Claims', value: '14,281', trend: '+12%', color: 'text-accent-yellow' },
          { label: 'Consultant Density', value: '84/pg', trend: '-2%', color: 'text-accent-green' },
          { label: 'Hype Convergence', value: 'Critical', trend: 'High', color: 'text-primary' }
        ].map((stat, i) => (
          <div key={i} className="bg-[#050505] border border-white/10 p-8 rounded-2xl text-center space-y-3 relative overflow-hidden group hover:border-primary/50 transition-all">
            <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{stat.label}</span>
            <div className={`text-3xl md:text-5xl font-black ${stat.color}`}>{stat.value}</div>
            <div className="text-[8px] font-mono text-gray-700 font-bold uppercase tracking-widest">{stat.trend} SIGNAL</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 bg-[#080808] border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl h-[400px] md:h-[600px]">
          <div className="p-8 border-b border-white/10 flex justify-between items-center bg-white/[0.01]">
             <h3 className="text-sm font-black text-white uppercase tracking-[0.3em] flex items-center gap-4">
               <span className="w-2 h-2 bg-accent-green rounded-full animate-pulse"></span>
               Live Intercept Log
             </h3>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-4 font-mono text-[10px] md:text-xs">
             {liveLogs.map((log, i) => (
               <div key={i} className="flex gap-4 md:gap-6 animate-in slide-in-from-left duration-500 hover:bg-white/[0.02] p-2 rounded transition-colors group">
                  <span className="text-gray-700 shrink-0 font-bold">[{log.timestamp}]</span>
                  <span className={`shrink-0 font-black px-2 py-0.5 rounded text-[10px] uppercase border ${log.type === 'system' ? 'text-primary border-primary/20 bg-primary/5' : 'text-accent-yellow border-accent-yellow/20 bg-accent-yellow/5'}`}>
                    {log.type}
                  </span>
                  <p className="text-gray-400 group-hover:text-white transition-colors">{log.message}</p>
               </div>
             ))}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
           <div className="bg-primary/5 border border-primary/20 p-10 rounded-[2.5rem] relative overflow-hidden group">
              <h3 className="text-xs font-black text-primary uppercase tracking-[0.4em] mb-6">Threat Mitigation</h3>
              <p className="text-sm text-gray-400 leading-relaxed font-serif italic mb-8">"TRACKING REBRANDING OF LEGACY FRAMEWORKS WITHIN BIG TECH. FLAG FOR COMMITTEE REVIEW."</p>
              <div className="grid grid-cols-1 gap-3">
                <button 
                  onClick={() => setShowMistakeEngine(true)}
                  className="w-full py-4 bg-accent-red/10 border border-accent-red/30 text-accent-red text-[10px] font-black uppercase tracking-[0.3em] rounded-xl hover:bg-accent-red hover:text-white transition-all"
                >
                  Launch Mistake Engine
                </button>
                <button 
                  onClick={() => setShowDiversityAudit(true)}
                  className="w-full py-4 bg-accent-green/10 border border-accent-green/30 text-accent-green text-[10px] font-black uppercase tracking-[0.3em] rounded-xl hover:bg-accent-green hover:text-white transition-all"
                >
                  Diversity Audit Node
                </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  const renderCaseFiles = () => (
    <div className="animate-in fade-in slide-in-from-bottom duration-700">
      <div className="mb-16">
        <h2 className="text-[12px] font-black text-primary uppercase tracking-[0.6em] mb-4">Bureau Archive</h2>
        <h3 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none text-white">Registry Logs.</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {reportsList.map((report) => (
          <div key={report.id} onClick={() => selectReport(report.id)} className="group relative bg-[#050505] border border-white/10 p-12 rounded-[3.5rem] hover:border-primary/50 transition-all cursor-pointer flex flex-col h-full shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 duration-500 overflow-hidden">
            <div className="flex justify-between items-start mb-10">
              <div className="classified-stamp text-[10px] scale-90 origin-left border-2">DECONSTRUCTED</div>
              <span className="text-6xl font-black text-white/5 group-hover:text-primary/20 transition-all font-mono">{report.score}</span>
            </div>
            <h4 className="text-3xl font-black leading-tight uppercase group-hover:text-white text-gray-400 transition-colors mb-6 tracking-tighter">{report.title}</h4>
            <p className="text-[15px] text-gray-600 font-serif italic leading-relaxed line-clamp-3 mb-12">"{report.assessment}"</p>
            <div className="mt-auto flex justify-between items-center text-[10px] font-black text-primary uppercase tracking-[0.4em] opacity-0 group-hover:opacity-100 transition-all">
              <span>Open Intelligence File</span>
              <i className="ri-arrow-right-line text-2xl"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <IntelligenceFeed reports={reportsList} />
      {!isAuthenticated && activeView === ViewType.DASHBOARD ? (
        <LandingPage onStartAnalysis={handleStartAnalysis} onLogin={() => setShowAuth(true)} onViewReport={selectReport} onOpenPresentation={setPresentationReport} onLogoClick={handleResetToLanding} reports={reportsList} />
      ) : (
        <Layout activeView={activeView} onViewChange={setActiveView} reports={reportsList} onLogoClick={handleResetToLanding}>
          {activeView === ViewType.DASHBOARD && renderDashboard()}
          {activeView === ViewType.INTELLIGENCE && renderIntelligence()}
          {activeView === ViewType.CASE_FILES && renderCaseFiles()}
        </Layout>
      )}
      <StickyStatsFooter reports={reportsList} />
      {showDeconstructor && <DeconstructionTool onClose={() => setShowDeconstructor(false)} />}
      {showMistakeEngine && <MistakeEngine onClose={() => setShowMistakeEngine(false)} />}
      {showDiversityAudit && <DiversityAudit onClose={() => setShowDiversityAudit(false)} />}
      {showForensicLab && <ForensicLab onClose={() => setShowForensicLab(false)} onAnalysisComplete={handleAnalysisComplete} />}
      {showAuth && <AuthModule onClose={() => setShowAuth(false)} onSuccess={handleAuthSuccess} />}
      {presentationReport && <PresentationView report={presentationReport} onClose={() => setPresentationReport(null)} />}
      
      {/* XAI Purchase Modal Simulation */}
      {showXAIPurchase && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl animate-in fade-in duration-300">
           <div className="bg-[#080808] border border-primary/30 w-full max-w-xl rounded-3xl overflow-hidden flex flex-col shadow-[0_0_100px_rgba(98,0,234,0.1)]">
              <div className="p-8 border-b border-white/10 flex justify-between items-center">
                 <div>
                    <h2 className="text-xl font-black italic uppercase text-white tracking-tighter">Explainability Matrix Uplink</h2>
                    <p className="text-[9px] text-primary uppercase tracking-widest font-mono mt-1">Direct Neural Access // Protocol: XAI_0x7</p>
                 </div>
                 <button onClick={() => setShowXAIPurchase(false)} className="text-gray-500 hover:text-white transition-colors">
                    <i className="ri-close-fill text-3xl"></i>
                 </button>
              </div>
              <div className="p-10 space-y-8 text-center">
                 <div className="w-24 h-24 bg-primary/10 border border-primary/20 rounded-full mx-auto flex items-center justify-center text-primary animate-pulse">
                    <i className="ri-mind-map text-5xl"></i>
                 </div>
                 <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white tracking-tight leading-tight uppercase">Elevate your clearance.</h3>
                    <p className="text-gray-400 text-sm font-serif italic leading-relaxed">
                      "Standard deconstruction shows the 'what'. The Interpretability Matrix shows the 'why'. Gain access to the underlying logic gates and decision weights for all 14 Bureau agents."
                    </p>
                 </div>
                 <div className="bg-black/50 border border-white/10 p-6 rounded-2xl space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-500">
                       <span>Neural Node Access</span>
                       <span className="text-accent-green">Stable</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-primary w-2/3"></div>
                    </div>
                    <button className="w-full py-5 bg-primary text-white font-black uppercase tracking-[0.4em] text-[11px] rounded-xl hover:scale-105 transition-all shadow-2xl shadow-primary/30">
                       Unlock Explainability Deck
                    </button>
                 </div>
              </div>
              <div className="p-4 bg-black border-t border-white/5 flex justify-center text-[8px] font-mono text-gray-700 uppercase tracking-widest">
                Requires Corporate Clearance Tier-5 // Decentralized Verification Active
              </div>
           </div>
        </div>
      )}
    </>
  );
};

export default App;
