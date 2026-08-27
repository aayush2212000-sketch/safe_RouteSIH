import React from 'react';
import { ShieldCheck, Zap } from 'lucide-react';

export const LoginPage = ({ onLogin }: { onLogin: () => void }) => {
  return (
    <div className="h-screen w-screen bg-slate-950 flex items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-900/10 blur-[120px] rounded-full" />

      <div className="w-full max-w-md bg-zinc-900/80 border border-zinc-800 p-8 rounded-2xl backdrop-blur-xl z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-orange-500 p-3 rounded-xl mb-4 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
            <ShieldCheck size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">NER LOGISTICS</h1>
          <p className="text-zinc-500 text-sm">Intelligence & Disaster Risk Command</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-zinc-400 uppercase ml-1">Email Address</label>
            <input className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white focus:outline-none focus:border-orange-500 transition-all mt-1" type="email" placeholder="admin@ner-logistics.gov.in" />
          </div>
          <div>
            <label className="text-xs font-semibold text-zinc-400 uppercase ml-1">Password</label>
            <input className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white focus:outline-none focus:border-orange-500 transition-all mt-1" type="password" placeholder="••••••••" />
          </div>
          
          <button onClick={onLogin} className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 rounded-lg mt-4 transition-all transform active:scale-95 shadow-lg">
            LOGIN TO SYSTEM
          </button>
          
          <button onClick={onLogin} className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold py-3 rounded-lg border border-zinc-700 flex items-center justify-center gap-2 transition-all">
            <Zap size={18} className="text-yellow-500" />
            JUDGE DEMO MODE
          </button>
        </div>
        
        <p className="text-center text-zinc-600 text-[10px] mt-8 uppercase tracking-widest">Authorized Access Only | GOVT OF INDIA</p>
      </div>
    </div>
  );
};