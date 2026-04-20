
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { ReportData } from '../types';

interface ForensicLabProps {
  onClose: () => void;
  onAnalysisComplete: (report: ReportData) => void;
}

const AGENT_TASKS = [
  { agent: "14", task: "Executive synthesis initiated...", status: "CHAIR", snapshot: "Synthesizing all intelligence nodes." },
  { agent: "01", task: "Methodology audit in progress...", status: "CRITICAL", snapshot: "Scrutinizing research design and data transparency." },
  { agent: "06", task: "Decoding linguistic obfuscation...", status: "ACTIVE", snapshot: "Detected 42 instances of synergistic paradigm drift." },
  { agent: "09", task: "Technical feasibility stress-test...", status: "SIMULATING", snapshot: "Estimated infrastructure lag exceeds report claims." },
  { agent: "12", task: "Innovation assessment cycle...", status: "INTERROGATING", snapshot: "Clause 3.1 identified as common sense repackaged." },
  { agent: "04", task: "Extracting recurring archetypes...", status: "DETECTED", snapshot: "Identified 'Future-as-Present' narrative framing." },
  { agent: "10", task: "Economic reality check...", status: "EXPOSING", snapshot: "True ROI calculations with hidden costs exposed." },
  { agent: "05", task: "Historical accuracy monitor...", status: "LOGGING", snapshot: "Matched pattern to 2012 Big Data hype cycle." },
];

export const ForensicLab: React.FC<ForensicLabProps> = ({ onClose, onAnalysisComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [instructions, setInstructions] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [status, setStatus] = useState('Idle');
  const [error, setError] = useState<string | null>(null);
  const [currentAgentIndex, setCurrentAgentIndex] = useState(0);
  const [activityLog, setActivityLog] = useState<{agent: string, task: string, status: string, snapshot: string}[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let interval: any;
    if (isAnalyzing) {
      interval = setInterval(() => {
        setCurrentAgentIndex(prev => (prev + 1) % AGENT_TASKS.length);
        setActivityLog(prev => {
          const next = [AGENT_TASKS[currentAgentIndex], ...prev].slice(0, 8);
          return next;
        });
      }, 1400);
    } else {
      setActivityLog([]);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing, currentAgentIndex]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const executeForensicAudit = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setError(null);
    setStatus('Establishing Secure Uplink...');

    try {
      const base64Data = await fileToBase64(file);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      setStatus('Interrogating Target Heuristics...');
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: {
          parts: [
            { text: `Analyze this report following the Oversight Committee framework.
            User Instructions: ${instructions || "Perform standard full-spectrum deconstruction."}` },
            { inlineData: { data: base64Data, mimeType: file.type } }
          ]
        },
        config: {
          systemInstruction: `You are The Oversight Committee. MISSION: Deconstruct reports using the VS Clarity Index™. REQUIRED JSON OUTPUT format remains strict as previously established.`,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              subtitle: { type: Type.STRING },
              score: { type: Type.NUMBER },
              assessment: { type: Type.STRING },
              scorecard: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    label: { type: Type.STRING },
                    score: { type: Type.NUMBER },
                    total: { type: Type.NUMBER },
                    colorClass: { type: Type.STRING }
                  },
                  required: ["label", "score", "total", "colorClass"]
                }
              },
              rhetoric: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    label: { type: Type.STRING },
                    percentage: { type: Type.NUMBER },
                    colorClass: { type: Type.STRING }
                  },
                  required: ["label", "percentage", "colorClass"]
                }
              },
              claims: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    claim: { type: Type.STRING },
                    translation: { type: Type.STRING },
                    assessment: { type: Type.STRING }
                  },
                  required: ["claim", "translation", "assessment"]
                }
              },
              patterns: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    pattern: { type: Type.STRING },
                    example: { type: Type.STRING },
                    precedent: { type: Type.STRING },
                    analysis: { type: Type.STRING }
                  },
                  required: ["pattern", "example", "precedent", "analysis"]
                }
              },
              guidance: {
                type: Type.OBJECT,
                properties: {
                  scorecard: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, description: { type: Type.STRING } } } },
                  rhetoric: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, description: { type: Type.STRING } } } },
                  claims: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, description: { type: Type.STRING } } } },
                  patterns: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, description: { type: Type.STRING } } } },
                  agents: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, description: { type: Type.STRING } } } }
                }
              },
              frictions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    agents: { type: Type.ARRAY, items: { type: Type.STRING } },
                    title: { type: Type.STRING },
                    finding: { type: Type.STRING }
                  },
                  required: ["agents", "title", "finding"]
                }
              }
            },
            required: ["title", "subtitle", "score", "assessment", "scorecard", "rhetoric", "claims", "patterns", "guidance", "frictions"]
          }
        }
      });

      const report = JSON.parse(response.text);
      report.id = `forensic_${Date.now()}`;
      onAnalysisComplete(report);
      onClose();
    } catch (err: any) {
      setError(`Forensic failure: ${err.message || 'Secure firewall deployment detected.'}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4 bg-black/95 backdrop-blur-2xl overflow-hidden">
      <div className="bg-[#050505] border border-white/10 w-full max-w-7xl h-full md:h-[92vh] rounded-none md:rounded-[3rem] overflow-hidden flex flex-col shadow-[0_0_150px_rgba(98,0,234,0.15)] animate-in zoom-in duration-300">
        <div className="p-6 md:p-8 border-b border-white/10 flex justify-between items-center bg-white/[0.01]">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <i className="ri-microscope-line text-2xl md:text-4xl"></i>
            </div>
            <div>
              <h2 className="text-xl md:text-3xl font-black text-white tracking-widest uppercase italic leading-none">Intelligence Terminal</h2>
              <p className="text-[10px] text-gray-600 font-mono tracking-[0.4em] uppercase mt-1 font-bold">Status: Operational // Protocol: 14-AGENT-SYNTHESIS</p>
            </div>
          </div>
          {!isAnalyzing && (
            <button onClick={onClose} className="text-gray-500 hover:text-white p-2">
              <i className="ri-close-fill text-3xl md:text-4xl"></i>
            </button>
          )}
        </div>

        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          <div className="flex-1 p-6 md:p-12 border-r border-white/5 space-y-8 overflow-y-auto custom-scrollbar relative bg-[#070707]">
            {isAnalyzing && <div className="scan-line"></div>}
            
            {!isAnalyzing ? (
              <div className="space-y-10 animate-in fade-in duration-500">
                {/* ACTIONS MOVED TO TOP */}
                <div className="bg-[#0c0c0c] border border-white/5 p-8 rounded-3xl shadow-inner space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.5em] mb-4 block font-mono">Select Intelligence Source (PDF)</label>
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-2xl p-8 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${file ? 'border-accent-green/50 bg-accent-green/5' : 'border-white/10 hover:border-primary/50 bg-black/40'}`}
                      >
                        <i className={`ri-${file ? 'checkbox-circle' : 'upload-cloud'}-line text-3xl ${file ? 'text-accent-green' : 'text-gray-700'}`}></i>
                        <span className={`text-xs font-mono font-bold uppercase tracking-widest ${file ? 'text-white' : 'text-gray-600'}`}>
                          {file ? file.name : 'Drop or Select File'}
                        </span>
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="application/pdf" className="hidden" />
                      </div>
                    </div>
                    <div className="md:w-1/3 flex flex-col">
                       <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.5em] mb-4 block font-mono">Priority Action</label>
                       <button
                        onClick={executeForensicAudit}
                        disabled={!file}
                        className={`flex-1 py-6 md:py-0 rounded-2xl font-black text-sm uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-4 shadow-2xl ${file ? 'bg-primary text-white shadow-primary/30' : 'bg-gray-900 text-gray-700 cursor-not-allowed border border-white/5'}`}
                      >
                        <i className="ri-flashlight-line text-xl"></i>
                        Establish Flow
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.5em] ml-2 font-mono">Heuristic Directives (Optional)</label>
                  <textarea 
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="E.g. Focus specifically on linguistic obfuscation and definition drift in Section 3..."
                    className="w-full h-32 md:h-40 bg-black border border-white/10 rounded-2xl px-8 py-6 text-sm md:text-base text-gray-300 focus:border-primary focus:outline-none transition-all font-mono resize-none shadow-inner"
                  />
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-12 animate-in fade-in duration-1000">
                <div className="relative">
                  <div className="w-40 h-40 md:w-56 md:h-56 border-[6px] border-primary/5 border-t-primary rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/20 rounded-full animate-ping"></div>
                  </div>
                </div>
                <div className="space-y-6">
                  <h3 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter uppercase animate-pulse">{status}</h3>
                  <p className="text-[10px] md:text-[12px] text-gray-600 font-mono tracking-[0.4em] uppercase max-w-sm mx-auto font-bold px-4">
                    Logical reconciliation in progress. Identifying cognitive blind spots.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="w-full lg:w-[26rem] bg-black/40 p-8 md:p-10 flex flex-col space-y-10 border-t lg:border-t-0 lg:border-l border-white/5">
            <div className="flex justify-between items-center">
              <h4 className="text-[11px] font-black text-gray-500 uppercase tracking-[0.5em] flex items-center gap-4">
                <span className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse"></span>
                Agent Signal
              </h4>
              <span className="text-[9px] font-mono text-gray-700 font-bold uppercase">TRACE_v4.5</span>
            </div>
            
            <div className="flex-1 space-y-6 overflow-hidden relative">
              {activityLog.length === 0 && !isAnalyzing && (
                <div className="h-full flex flex-col items-center justify-center text-[11px] text-gray-800 font-mono uppercase text-center italic tracking-widest gap-4 opacity-50">
                  <i className="ri-radar-line text-4xl"></i>
                  Awaiting Uplink...
                </div>
              )}
              {activityLog.map((log, i) => (
                <div key={`${log.agent}-${i}`} className="bg-white/[0.02] border-l-2 border-primary/40 pl-6 py-4 space-y-3 animate-in slide-in-from-right duration-500 rounded-r-2xl">
                  <div className="flex justify-between items-center text-[10px] font-mono uppercase font-bold">
                    <span className="text-primary">AGENT_{log.agent}</span>
                    <span className="text-gray-700">{log.status}</span>
                  </div>
                  <p className="text-xs text-gray-300 font-black leading-tight uppercase tracking-tight">{log.task}</p>
                  <p className="text-[10px] text-gray-600 font-mono leading-relaxed italic">{log.snapshot}</p>
                </div>
              ))}
              {isAnalyzing && (
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none"></div>
              )}
            </div>
            
            {isAnalyzing && (
              <div className="pt-8 border-t border-white/5">
                <div className="flex justify-between text-[10px] font-mono text-gray-600 uppercase mb-3 tracking-[0.3em] font-black">
                  <span>Deconstruction Progress</span>
                  <span className="text-primary">{Math.min(99, Math.floor(activityLog.length * 12.5))}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-1000" 
                    style={{ width: `${Math.min(99, activityLog.length * 12.5)}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 bg-black border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-gray-800 tracking-[0.4em] uppercase px-10">
          <span>{Math.random().toString(16).slice(2, 10).toUpperCase()}</span>
          <span className="flex items-center gap-2">
             <i className="ri-wifi-line text-accent-green"></i>
             Signal: 98.4%
          </span>
        </div>
      </div>
    </div>
  );
};
