import React from 'react';
import { Truck, MapPin, Package } from 'lucide-react';

interface LiveLogisticsProps {
  protocolActive: boolean;
}

export const LiveLogistics: React.FC<LiveLogisticsProps> = ({
  protocolActive
}) => {

  const vehicles = [
    {
      id: 'V-101',
      cargo: 'Vaccines',
      route: protocolActive
        ? 'Guwahati → NH-44 → Aizawl'
        : 'Guwahati → Aizawl',
      status: protocolActive ? 'REROUTED' : 'MOVING',
      statusColor: protocolActive
        ? 'text-blue-400'
        : 'text-emerald-400',
      icon: Truck
    },
    {
      id: 'V-102',
      cargo: 'Food Grains',
      route: 'Siliguri → Gangtok',
      status: 'MOVING',
      statusColor: 'text-emerald-400',
      icon: Package
    },
    {
      id: 'V-103',
      cargo: 'Oxygen Tankers',
      route: 'Silchar → Imphal',
      status: 'STOPPED',
      statusColor: 'text-red-400',
      icon: Truck
    }
  ];

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl">

      <div className="flex items-center gap-2 mb-5">
        <Truck size={17} className="text-blue-400" />

        <h2 className="text-xs font-black uppercase tracking-widest text-zinc-200">
          Live Logistics
        </h2>

        <span className="ml-auto text-[9px] font-black text-emerald-400 uppercase">
          ● Live
        </span>
      </div>

      <div className="space-y-3">

        {vehicles.map((vehicle) => {
          const Icon = vehicle.icon;

          return (
            <div
              key={vehicle.id}
              className="bg-zinc-950 border border-zinc-800 rounded-lg p-3"
            >

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-2">
                  <Icon size={15} className="text-zinc-500" />

                  <span className="text-sm font-black text-white">
                    {vehicle.id}
                  </span>
                </div>

                <span
                  className={`text-[9px] font-black ${vehicle.statusColor}`}
                >
                  {vehicle.status}
                </span>

              </div>

              <div className="mt-2 flex items-center gap-2">
                <Package size={11} className="text-zinc-600" />

                <span className="text-[10px] text-zinc-400">
                  {vehicle.cargo}
                </span>
              </div>

              <div className="mt-2 flex items-center gap-2">
                <MapPin size={11} className="text-zinc-600" />

                <span className="text-[10px] text-zinc-500">
                  {vehicle.route}
                </span>
              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
};