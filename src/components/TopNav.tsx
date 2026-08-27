import React from 'react';
import { Search, Bell, User, Wifi, AlertTriangle } from 'lucide-react';

export const TopNav: React.FC<{ isDisaster: boolean }> = ({ isDisaster }) => {
  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-800">
          <Wifi size={14} className={isDisaster ? "text-red-500 animate-pulse" : "text-emerald-500"} />
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
            {isDisaster ? "DISASTER SIMULATION ACTIVE" : "LIVE SYSTEM MONITORING"}
          </span>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
          <input 
            type="text" 
            placeholder="Search assets..." 
            className="bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-4 py-1.5 text-xs w-64 focus:outline-none focus:border-zinc-700"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        {isDisaster && (
          <div className="flex items-center gap-2 text-red-500 bg-red-500/10 px-3 py-1 rounded border border-red-500/20">
            <AlertTriangle size={14} />
            <span className="text-[10px] font-bold uppercase">Emergency Protocol V2</span>
          </div>
        )}
        <Bell size={18} className="text-zinc-400" />
        <div className="flex items-center gap-3 border-l border-zinc-800 pl-6">
          <div className="text-right">
            <p className="text-xs font-bold">Admin Panel</p>
            <p className="text-[10px] text-zinc-500 font-bold uppercase">NER-Control</p>
          </div>
          <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center">
            <User size={18} className="text-zinc-500" />
          </div>
        </div>
      </div>
    </header>
  );
};