import React from 'react';
import { Activity, ShieldCheck } from 'lucide-react';

interface DemoControlsProps {
  active: boolean;
  onToggle: () => void;
}

export const DemoControls: React.FC<DemoControlsProps> = ({ active, onToggle }) => {
  return (
    <div className="absolute bottom-6 left-6 z-[1000]">
      <button 
        onClick={onToggle}
        className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold shadow-2xl transition-all duration-500 ${
          active 
          ? 'bg-red-600 text-white animate-pulse' 
          : 'bg-zinc-900 text-emerald-500 border border-emerald-500/50 hover:bg-zinc-800'
        }`}
      >
        <div className={`p-2 rounded-lg ${active ? 'bg-red-700' : 'bg-emerald-500/10'}`}>
          {active ? <Activity size={24} /> : <ShieldCheck size={24} />}
        </div>
        <div className="text-left">
          <p className="text-[10px] uppercase font-black tracking-widest opacity-70 leading-none mb-1">SIH Simulation</p>
          <p className="text-sm font-black uppercase tracking-tight">
            {active ? 'RUNNING DISASTER PROTOCOL' : 'NORMAL OPERATIONS MODE'}
          </p>
        </div>
      </button>
    </div>
  );
};