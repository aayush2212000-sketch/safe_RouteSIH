import React from 'react';
import {
  Route,
  AlertCircle,
  ShieldCheck,
  Truck,
  MapPin
} from 'lucide-react';

interface KPISectionProps {
  isDisaster: boolean;
  protocolExecuted: boolean;
}

export const KPISection: React.FC<KPISectionProps> = ({
  isDisaster,
  protocolExecuted
}) => {

  const kpis = [
    {
      label: 'Active Routes',
      value: protocolExecuted ? 155 : isDisaster ? 155 : 156,
      icon: Route,
      color: 'text-blue-400'
    },

    {
      label: 'At Risk',
      value: protocolExecuted ? 14 : isDisaster ? 18 : 17,
      icon: AlertCircle,
      color: isDisaster
        ? 'text-red-500'
        : 'text-orange-500'
    },

    {
      label: 'Critical Alerts',
      value: protocolExecuted ? 5 : isDisaster ? 5 : 4,
      icon: ShieldCheck,
      color: 'text-red-400'
    },

    {
      label: 'Safe Routes',
      value: protocolExecuted ? 140 : isDisaster ? 138 : 139,
      icon: ShieldCheck,
      color: 'text-emerald-500'
    },

    {
      label: 'Vehicles in Transit',
      value: 384,
      icon: Truck,
      color: 'text-zinc-400'
    },

    {
      label: 'Districts Isolated',
      value: protocolExecuted ? 1 : isDisaster ? 1 : 0,
      icon: MapPin,
      color: isDisaster
        ? 'text-red-500'
        : 'text-zinc-500'
    }
  ];

  return (
    <div className="grid grid-cols-6 gap-4">

      {kpis.map((kpi) => {

        const Icon = kpi.icon;

        return (
          <div
            key={kpi.label}
            className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl"
          >

            <div className="flex items-center justify-between mb-2">

              <Icon
                size={16}
                className="text-zinc-500"
              />

              <span className="text-[10px] font-black text-zinc-600 uppercase tracking-tighter">
                Live
              </span>

            </div>

            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              {kpi.label}
            </p>

            <p className={`text-2xl font-black ${kpi.color}`}>
              {kpi.value}
            </p>

          </div>
        );
      })}

    </div>
  );
};