
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";

interface DeconstructionToolProps {
  onClose: () => void;
}

export const DeconstructionTool: React.FC<DeconstructionToolProps> = ({ onClose }) => {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeText = async () => {
    if (!inputText.trim()) return;

    setIsAnalyzing(true);
    setError(null);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze the following corporate report snippet for the Vaguely Specific Bureau. 
        Focus on identifying consultant-speak, unfalsifiable claims, and artificial urgency.
        Text: "${inputText}"`,
        config: {
          systemInstruction: `You are the Lead Analyst at the Vaguely Specific Bureau's Oversight Committee. 
          Your job is to deconstruct corporate reports with biting wit and empirical precision. 
          Provide a JSON response with:
          1. "score": a number from 0-100 (where 100 is perfectly clear and 0 is complete obfuscation).
          2. "translationMatrix": an array of objects with { "original": string, "translation": string, "critique": string }.
          3. "rhetoricalTechniques": an array of strings identifying techniques used (e.g. 'False Urgency', 'Infinite Horizon', 'The Consultant's Pivot').
          4. "executiveSummary": a one-sentence cutting critique.`,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              executiveSummary: { type: Type.STRING },
              rhetoricalTechniques: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING } 
              },
              translationMatrix: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    original: { type: Type.STRING },
                    translation: { type: Type.STRING },
                    critique: { type: Type.STRING }
                  },
                  required: ["original", "translation", "critique"]
                }
              }
            },
            required: ["score", "executiveSummary", "rhetoricalTechniques", "translationMatrix"]
          }
        },
      });

      const jsonStr = response.text;
      if (jsonStr) {
        setResult(JSON.parse(jsonStr));
      }
    } catch (err) {
      console.error(err);
      setError("Analysis failed. The Bureau's connection was interrupted.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
      <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)] border-primary/20">
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/50 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 pointer-events-none">
             <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
          </div>
          <div className="relative z-10">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <i className="ri-shield-keyhole-line text-primary"></i>
              Rhetorical Deconstructor™
            </h2>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono mt-1">Status: Operational // Build 4092</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-2 relative z-10">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar relative">
          {isAnalyzing && <div className="scan-line"></div>}
          
          {!result ? (
            <div className="space-y-6">
              <div className="bg-primary/5 p-4 rounded-lg border border-primary/20 italic text-primary/70 text-xs font-mono">
                "INPUT REQUIRED: Feed the engine any fragment of strategic ambition for forensic demystification."
              </div>
              <div className="relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste corporate text here (e.g., 'Leveraging synergies for exponential growth')..."
                  className="w-full h-56 bg-black border border-white/10 rounded-xl p-6 text-gray-300 focus:border-primary/50 outline-none transition-colors resize-none font-mono text-sm leading-relaxed"
                />
                <div className="absolute bottom-4 right-4 text-[10px] text-gray-600 font-mono">
                  CHARS: {inputText.length}
                </div>
              </div>
              <button
                onClick={analyzeText}
                disabled={isAnalyzing || !inputText.trim()}
                className={`w-full py-5 rounded-xl font-bold flex items-center justify-center gap-3 transition-all tracking-widest uppercase text-sm ${
                  isAnalyzing 
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                    : 'bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/20'
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <i className="ri-focus-3-line animate-spin text-xl"></i>
                    INTERROGATING TEXTUAL FOUNDATIONS...
                  </>
                ) : (
                  <>
                    <i className="ri-flashlight-line text-xl"></i>
                    Execute Forensic Scan
                  </>
                )}
              </button>
              {error && <p className="text-accent-red text-center text-xs font-mono animate-pulse">{error}</p>}
            </div>
          ) : (
            <div className="space-y-10 animate-in fade-in zoom-in duration-700">
              <div className="flex flex-col md:flex-row gap-8 items-center bg-black/40 p-8 rounded-2xl border border-white/5 relative">
                <div className="absolute top-4 right-6 pointer-events-none">
                  <div className="classified-stamp text-xs scale-75 opacity-40">DECONSTRUCTED</div>
                </div>
                
                <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="50%" cy="50%" r="45%" stroke="#111" strokeWidth="6" fill="none" />
                    <circle 
                      cx="50%" cy="50%" r="45%" 
                      stroke="#6200EA" strokeWidth="6" fill="none" 
                      strokeDasharray="283" 
                      strokeDashoffset={283 - (283 * (result.score/100))}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-3xl font-black text-white">{result.score}</span>
                    <span className="text-[8px] text-gray-600 uppercase font-bold tracking-tighter">Clarity Index</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] mb-2 font-mono">Bureau Intelligence Brief</h4>
                  <p className="text-xl text-white font-medium italic font-serif leading-snug">"{result.executiveSummary}"</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                  Translation Matrix
                </h4>
                <div className="space-y-4">
                  {result.translationMatrix.map((item: any, i: number) => (
                    <div key={i} className="bg-black/20 border border-white/5 rounded-xl p-5 hover:border-primary/20 transition-all group">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest flex items-center gap-2">
                            <i className="ri-corner-down-right-line text-gray-700"></i>
                            Intercepted Claim
                          </span>
                          <p className="text-sm text-gray-400 italic leading-relaxed font-mono">"{item.original}"</p>
                        </div>
                        <div className="md:border-l border-white/10 md:pl-6 space-y-2">
                          <span className="text-[9px] font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                            <i className="ri-check-double-line"></i>
                            Bureau Translation
                          </span>
                          <p className="text-sm text-white font-medium leading-relaxed">{item.translation}</p>
                          <div className="pt-2">
                            <span className="px-2 py-0.5 bg-accent-red/10 text-accent-red text-[9px] font-bold uppercase rounded border border-accent-red/20">
                              Critique: {item.critique}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                  Rhetorical Signatures Detected
                </h4>
                <div className="flex flex-wrap gap-3">
                  {result.rhetoricalTechniques.map((tech: string, i: number) => (
                    <span key={i} className="px-4 py-1.5 bg-primary/5 border border-primary/20 text-primary text-[10px] rounded-md font-mono font-bold uppercase tracking-wider">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <button 
                  onClick={() => setResult(null)}
                  className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-400 hover:text-white transition-all rounded-full font-bold uppercase tracking-widest"
                >
                  New Analysis Session
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 bg-black/80 border-t border-white/5 flex justify-between items-center px-8">
           <div className="text-[8px] text-gray-700 font-mono tracking-widest uppercase">Encryption: AES-256 // End-to-End Analysis</div>
           <div className="text-[8px] text-gray-700 font-mono tracking-widest uppercase flex items-center gap-2">
             <i className="ri-shield-check-line text-accent-green"></i>
             Verified by Oversight Committee
           </div>
        </div>
      </div>
    </div>
  );
};
