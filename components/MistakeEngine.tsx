
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

interface MistakeEngineProps {
  onClose: () => void;
}

export const MistakeEngine: React.FC<MistakeEngineProps> = ({ onClose }) => {
  const [claim, setClaim] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const executeInterrogation = async () => {
    if (!claim.trim()) return;
    setIsAnalyzing(true);
    setError(null);

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Interrogate this claim or "fact-check" for logical inconsistencies, selective data use, and missing context. 
        Use your search capabilities to find the most recent conflicting data or nuances.
        CLAIM: "${claim}"`,
        config: {
          tools: [{ googleSearch: {} }],
          systemInstruction: `You are a Lead Forensic Data Analyst at the Vaguely Specific Bureau. 
          Your mission is to "check the fact-checkers." 
          Analyze input for:
          1. Logical Fallacies (e.g. Cherry-picking, Strawman).
          2. Data Staleness (using search for up-to-date reality).
          3. Institutional Bias (who funded the claim?).
          Respond in a structured markdown format with Bureau headers.`,
        },
      });

      const text = response.text;
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      setResult({ text, chunks });
    } catch (err) {
      console.error(err);
      setError("Operation failed. The target has implemented countermeasures.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl">
      <div className="bg-[#050505] border border-accent-red/30 w-full max-w-5xl h-[85vh] overflow-hidden rounded-lg flex flex-col shadow-[0_0_100px_rgba(255,69,96,0.15)]">
        <div className="p-6 border-b border-accent-red/20 flex justify-between items-center bg-accent-red/5">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 bg-accent-red animate-pulse rounded-full"></div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tighter italic">MISTAKE ENGINE™</h2>
              <p className="text-[9px] text-accent-red/70 uppercase tracking-widest font-mono">Real-time Fact-Checker Interrogation // Grounding: Active</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <i className="ri-close-fill text-2xl"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {!result ? (
            <div className="max-w-2xl mx-auto space-y-8 py-12">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-bold text-gray-300">Target Identification</h3>
                <p className="text-xs text-gray-600 uppercase tracking-widest">Input a claim, article, or fact-check verdict for forensic audit.</p>
              </div>
              <textarea
                value={claim}
                onChange={(e) => setClaim(e.target.value)}
                placeholder="Example: 'Fact Check: It is false that XYZ policy led to 10% inflation because...'"
                className="w-full h-40 bg-black border border-white/10 rounded p-6 text-gray-300 focus:border-accent-red/50 outline-none transition-all font-mono text-sm leading-relaxed"
              />
              <button
                onClick={executeInterrogation}
                disabled={isAnalyzing || !claim.trim()}
                className={`w-full py-4 rounded font-black text-sm uppercase tracking-widest transition-all border ${
                  isAnalyzing 
                    ? 'bg-gray-900 border-gray-800 text-gray-600 cursor-not-allowed' 
                    : 'bg-accent-red/10 border-accent-red/40 text-accent-red hover:bg-accent-red hover:text-white'
                }`}
              >
                {isAnalyzing ? 'RUNNING SEARCH HEURISTICS...' : 'EXECUTE INTERROGATION'}
              </button>
              {error && <p className="text-accent-red text-center text-xs font-mono">{error}</p>}
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-700">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3 prose prose-invert prose-sm max-w-none">
                  <div className="bg-black/50 p-8 rounded-lg border border-white/5 font-serif text-gray-300 leading-relaxed whitespace-pre-wrap">
                    <div className="flex items-center gap-2 text-accent-red mb-6 border-b border-accent-red/20 pb-4">
                      <i className="ri-file-search-line"></i>
                      <span className="font-mono text-[10px] uppercase font-bold tracking-widest">Bureau Finding #09-A</span>
                    </div>
                    {result.text}
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest border-l-2 border-accent-red pl-3">Source Grounding</h4>
                  <div className="space-y-3">
                    {result.chunks?.map((chunk: any, i: number) => (
                      chunk.web && (
                        <a 
                          key={i} 
                          href={chunk.web.uri} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block p-4 bg-white/5 rounded border border-white/5 hover:border-accent-red/30 transition-all group"
                        >
                          <p className="text-[10px] font-bold text-gray-200 line-clamp-2 group-hover:text-accent-red transition-colors">{chunk.web.title}</p>
                          <p className="text-[8px] text-gray-600 mt-2 truncate font-mono">{chunk.web.uri}</p>
                        </a>
                      )
                    ))}
                    {!result.chunks?.length && (
                      <p className="text-[10px] italic text-gray-600">No external grounding required for this logic-only deconstruction.</p>
                    )}
                  </div>
                  <button 
                    onClick={() => setResult(null)}
                    className="w-full py-2 border border-white/10 text-[10px] text-gray-500 font-bold uppercase tracking-widest hover:bg-white/5 rounded"
                  >
                    Reset Target
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
