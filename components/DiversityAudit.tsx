
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";

interface DiversityAuditProps {
  onClose: () => void;
}

export const DiversityAudit: React.FC<DiversityAuditProps> = ({ onClose }) => {
  const [transcript, setTranscript] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const runAudit = async () => {
    if (!transcript.trim()) return;
    setIsAuditing(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze the following meeting transcript or series of statements for cognitive diversity and echo-chamber effects.
        TEXT: "${transcript}"`,
        config: {
          systemInstruction: `You are a Cognitive Anthropologist at the Vaguely Specific Bureau. 
          Analyze the text for:
          1. Homogeneity: Are all viewpoints identical?
          2. Suppression: Are dissenting voices ignored or marginalized?
          3. Bias Leaks: What institutional biases are present?
          Return JSON with:
          - "homogeneityIndex" (0-100)
          - "suppressedViewpoints" (array of strings)
          - "dominantNarrative" (string)
          - "auditSummary" (string)`,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              homogeneityIndex: { type: Type.NUMBER },
              suppressedViewpoints: { type: Type.ARRAY, items: { type: Type.STRING } },
              dominantNarrative: { type: Type.STRING },
              auditSummary: { type: Type.STRING }
            },
            required: ["homogeneityIndex", "suppressedViewpoints", "dominantNarrative", "auditSummary"]
          }
        },
      });

      setResult(JSON.parse(response.text));
    } catch (err) {
      console.error(err);
    } finally {
      setIsAuditing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
      <div className="bg-[#050505] border border-accent-green/30 w-full max-w-4xl h-[80vh] overflow-hidden rounded-xl flex flex-col shadow-[0_0_80px_rgba(0,227,150,0.1)]">
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <i className="ri-user-community-line text-accent-green text-xl"></i>
            <div>
              <h2 className="text-lg font-black text-white tracking-widest">COGNITIVE DIVERSITY AUDIT™</h2>
              <p className="text-[8px] text-gray-500 uppercase font-mono">Heuristic Mapping: Active // Echo-Chamber Detection</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {!result ? (
            <div className="space-y-6">
              <div className="p-4 bg-accent-green/5 border border-accent-green/20 rounded text-[10px] text-accent-green/80 font-mono uppercase">
                "FEED DATA: Input meeting minutes, panel transcripts, or public statements for groupthink verification."
              </div>
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Paste transcript here..."
                className="w-full h-64 bg-black border border-white/5 rounded p-6 text-gray-400 focus:border-accent-green/40 outline-none transition-all font-mono text-sm"
              />
              <button
                onClick={runAudit}
                disabled={isAuditing || !transcript.trim()}
                className="w-full py-4 bg-accent-green text-black font-black uppercase text-xs tracking-[0.3em] hover:bg-accent-green/90 transition-all rounded"
              >
                {isAuditing ? 'MAPPING NEURAL CONVERGENCE...' : 'INITIATE AUDIT'}
              </button>
            </div>
          ) : (
            <div className="space-y-10 animate-in zoom-in fade-in duration-500">
              <div className="flex flex-col md:flex-row gap-8 items-center bg-white/5 p-8 rounded-lg border border-white/5">
                <div className="relative w-32 h-32 flex items-center justify-center">
                   <svg className="w-full h-full -rotate-90">
                     <circle cx="50%" cy="50%" r="45%" stroke="#111" strokeWidth="8" fill="none" />
                     <circle cx="50%" cy="50%" r="45%" stroke="#00E396" strokeWidth="8" fill="none" strokeDasharray="283" strokeDashoffset={283 - (283 * (result.homogeneityIndex/100))} />
                   </svg>
                   <div className="absolute text-center">
                     <div className="text-3xl font-black text-white leading-none">{result.homogeneityIndex}%</div>
                     <div className="text-[8px] text-gray-500 uppercase font-bold mt-1">Echo-Chamber</div>
                   </div>
                </div>
                <div className="flex-1 space-y-2">
                   <h4 className="text-xs font-black text-accent-green uppercase tracking-[0.2em]">Dominant Narrative</h4>
                   <p className="text-xl text-white font-serif italic">"{result.dominantNarrative}"</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h5 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Suppressed Perspectives</h5>
                  <ul className="space-y-2">
                    {result.suppressedViewpoints.map((v: string, i: number) => (
                      <li key={i} className="flex gap-3 text-sm text-gray-400">
                        <span className="text-accent-red font-bold">×</span>
                        {v}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <h5 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Bureau Summary</h5>
                  <p className="text-sm text-gray-400 leading-relaxed font-serif bg-black p-4 border border-white/5 rounded italic">
                    {result.auditSummary}
                  </p>
                </div>
              </div>

              <button onClick={() => setResult(null)} className="w-full py-2 text-[10px] text-gray-600 font-bold uppercase tracking-widest hover:text-white transition-colors">
                New Audit Session
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
