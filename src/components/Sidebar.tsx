import React from 'react';
import {
  LayoutDashboard,
  Map as MapIcon,
  Route,
  Bell,
  Truck,
  Brain,
  BarChart3,
  Settings,
  ShieldAlert,
} from 'lucide-react';

interface SidebarProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  onPageChange,
}) => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Command Center' },
    { icon: Route, label: 'Live Routes' },
    { icon: MapIcon, label: 'Risk Map' },
    { icon: Bell, label: 'Reports' },
    { icon: Truck, label: 'Logistics' },
    { icon: Brain, label: 'AI Intelligence' },
    { icon: BarChart3, label: 'Analytics' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="w-64 h-full bg-zinc-950 border-r border-zinc-800 flex flex-col p-4">

      {/* LOGO */}
      <div className="flex items-center gap-3 px-2 mb-8">
        <div className="bg-orange-600 p-2 rounded-lg">
          <ShieldAlert size={20} className="text-white" />
        </div>

        <span className="font-black text-xl tracking-tighter text-white">
          NER-SafeRoute
        </span>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 space-y-1">

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.label;

          return (
            <button
              key={item.label}
              onClick={() => onPageChange(item.label)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors text-left ${
                isActive
                  ? 'bg-zinc-900 text-orange-500'
                  : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              <Icon size={18} />

              <span className="text-sm font-medium">
                {item.label}
              </span>
            </button>
          );
        })}

      </nav>

      {/* OPERATIONAL AREA */}
      <div className="mt-auto p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl">
        <p className="text-[10px] uppercase font-bold text-zinc-500 mb-1">
          Operational Area
        </p>

        <p className="text-xs text-zinc-300 font-semibold">
          North Eastern Region (NER)
        </p>
      </div>

    </aside>
  );
};