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
  protocolExecuted?: boolean;
}

export const KPISection: React.FC<KPISectionProps> = ({
  isDisaster,
  protocolExecuted = false
}) => {

  const kpis = [
    {
      label: 'Active Routes',
      value: protocolExecuted ? 155 : isDisaster ? 155 : 156,
      icon: Route,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20'
    },

    {
      label: 'At Risk',
      value: protocolExecuted ? 14 : isDisaster ? 18 : 17,
      icon: AlertCircle,
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/20'
    },

    {
      label: 'Critical Alerts',
      value: protocolExecuted ? 5 : isDisaster ? 5 : 4,
      icon: ShieldCheck,
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'border-red-500/20'
    },

    {
      label: 'Safe Routes',
      value: protocolExecuted ? 140 : isDisaster ? 138 : 139,
      icon: ShieldCheck,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20'
    },

    {
      label: 'Vehicles in Transit',
      value: 384,
      icon: Truck,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20'
    },

    {
      label: 'Districts Isolated',
      value: protocolExecuted ? 1 : isDisaster ? 1 : 0,
      icon: MapPin,
      color: isDisaster ? 'text-red-400' : 'text-zinc-400',
      bg: isDisaster ? 'bg-red-500/10' : 'bg-zinc-800/60',
      border: isDisaster ? 'border-red-500/20' : 'border-zinc-800'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">

      {kpis.map((kpi) => {

        const Icon = kpi.icon;

        return (
          <div
            key={kpi.label}
            className={`
              group relative
              bg-zinc-900/80
              border ${kpi.border}
              rounded-xl
              p-4
              overflow-hidden
              transition-all duration-200
              hover:bg-zinc-900
              hover:-translate-y-0.5
            `}
          >

            {/* subtle glow */}
            <div
              className={`
                absolute -right-5 -top-5
                w-16 h-16
                rounded-full
                ${kpi.bg}
                blur-xl
                opacity-40
                group-hover:opacity-70
                transition-opacity
              `}
            />

            {/* TOP ROW */}
            <div className="relative flex items-center justify-between mb-4">

              <div
                className={`
                  w-8 h-8
                  rounded-lg
                  ${kpi.bg}
                  border ${kpi.border}
                  flex items-center justify-center
                `}
              >
                <Icon
                  size={15}
                  className={kpi.color}
                />
              </div>

              <div className="flex items-center gap-1.5">

                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />

                <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-wider">
                  Live
                </span>

              </div>

            </div>


            {/* LABEL */}
            <p className="relative text-[9px] font-bold text-zinc-500 uppercase tracking-widest leading-tight">
              {kpi.label}
            </p>


            {/* VALUE */}
            <div className="relative flex items-end gap-2 mt-1">

              <p
                className={`text-2xl font-black tracking-tight ${kpi.color}`}
              >
                {kpi.value}
              </p>

              {kpi.label === 'Active Routes' && (
                <span className="text-[9px] text-zinc-600 mb-1">
                  NETWORK
                </span>
              )}

            </div>

          </div>
        );

      })}

    </div>
  );
};