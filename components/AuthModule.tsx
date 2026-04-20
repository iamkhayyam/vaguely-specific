
import React, { useState } from 'react';

interface AuthModuleProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModule: React.FC<AuthModuleProps> = ({ onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth
    setTimeout(() => {
      setIsLoading(false);
      onSuccess();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
      <div className="bg-[#080808] border border-white/10 w-full max-w-md rounded-2xl overflow-hidden flex flex-col shadow-2xl">
        <div className="p-8 border-b border-white/5 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-black uppercase tracking-widest italic">{isLogin ? 'Agent Access' : 'Recruitment'}</h2>
            <p className="text-[9px] text-gray-600 font-mono uppercase mt-1">Encrypted Auth Protocol 8-A</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Channel Identifier</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="agent@vaguelyspecific.com"
                className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:border-primary focus:outline-none transition-all font-mono"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Security Cipher</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:border-primary focus:outline-none transition-all font-mono"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-5 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-[0.3em] text-xs rounded-xl transition-all flex items-center justify-center gap-3"
          >
            {isLoading ? <i className="ri-loader-4-line animate-spin text-xl"></i> : (isLogin ? 'Establish Connection' : 'Register Signature')}
          </button>

          <div className="text-center">
            <button 
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-[10px] font-black text-gray-600 hover:text-primary uppercase tracking-widest transition-colors"
            >
              {isLogin ? 'No Credentials? Request Recruitment' : 'Already Recruited? Enter Portal'}
            </button>
          </div>
        </form>

        <div className="p-4 bg-black border-t border-white/5 flex justify-center">
           <p className="text-[8px] text-gray-800 font-mono tracking-widest uppercase">Biometric Verification: Passive</p>
        </div>
      </div>
    </div>
  );
};
