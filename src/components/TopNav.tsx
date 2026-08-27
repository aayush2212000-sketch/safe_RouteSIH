import React from 'react';
import {
  Search,
  Bell,
  User,
  Wifi,
  AlertTriangle,
  Brain,
  Activity
} from 'lucide-react';

interface TopNavProps {
  isDisaster: boolean;
}

export const TopNav: React.FC<TopNavProps> = ({ isDisaster }) => {
  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between px-6">

      {/* LEFT */}
      <div className="flex items-center gap-4">

        {/* SYSTEM STATUS */}
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${
            isDisaster
              ? 'bg-red-500/10 border-red-500/30'
              : 'bg-emerald-500/10 border-emerald-500/20'
          }`}
        >

          <Wifi
            size={14}
            className={
              isDisaster
                ? 'text-red-500 animate-pulse'
                : 'text-emerald-500'
            }
          />

          <span
            className={`text-[10px] font-black uppercase tracking-widest ${
              isDisaster
                ? 'text-red-400'
                : 'text-emerald-400'
            }`}
          >
            {isDisaster
              ? 'Emergency Mode'
              : 'Live Monitoring'}
          </span>

        </div>


        {/* AI STATUS */}
        <div className="hidden md:flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full">

          <Brain
            size={14}
            className="text-violet-400"
          />

          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            AI Risk Engine
          </span>

          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />

        </div>


        {/* SEARCH */}
        <div className="relative">

          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            size={14}
          />

          <input
            type="text"
            placeholder="Search roads, vehicles..."
            className="bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-4 py-1.5 text-xs w-64
                       focus:outline-none focus:border-zinc-600
                       placeholder:text-zinc-600"
          />

        </div>

      </div>


      {/* RIGHT */}
      <div className="flex items-center gap-5">

        {/* NETWORK */}
        <div className="hidden lg:flex items-center gap-2 text-zinc-500">

          <Activity size={14} />

          <span className="text-[9px] font-bold uppercase tracking-wider">
            Network
          </span>

          <span className="text-[10px] font-black text-emerald-400">
            ONLINE
          </span>

        </div>


        {/* EMERGENCY */}
        {isDisaster && (

          <div className="flex items-center gap-2 text-red-400 bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20">

            <AlertTriangle
              size={14}
              className="animate-pulse"
            />

            <span className="text-[9px] font-black uppercase tracking-wider">
              Emergency Protocol
            </span>

          </div>

        )}


        {/* NOTIFICATION */}
        <div className="relative">

          <Bell
            size={18}
            className="text-zinc-400"
          />

          <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full" />

        </div>


        {/* ADMIN */}
        <div className="flex items-center gap-3 border-l border-zinc-800 pl-5">

          <div className="text-right">

            <p className="text-xs font-bold">
              Admin Panel
            </p>

            <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">
              NER-Control
            </p>

          </div>

          <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center">

            <User
              size={17}
              className="text-zinc-400"
            />

          </div>

        </div>

      </div>

    </header>
  );
};