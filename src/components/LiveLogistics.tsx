import React from 'react';
import {
  Truck,
  MapPin,
  Package,
  Wifi,
  WifiOff,
  Signal
} from 'lucide-react';

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

      connection: 'ONLINE',
      connectionColor: 'text-emerald-400',
      lastUpdate: '1 min ago',
      Icon: Truck
    },

    {
      id: 'V-102',
      cargo: 'Food Grains',
      route: 'Siliguri → Gangtok',

      status: 'MOVING',
      statusColor: 'text-emerald-400',

      connection: 'WEAK SIGNAL',
      connectionColor: 'text-amber-400',
      lastUpdate: '6 min ago',
      Icon: Package
    },

    {
      id: 'V-103',
      cargo: 'Oxygen Tankers',
      route: 'Silchar → Imphal',

      status: 'STOPPED',
      statusColor: 'text-red-400',

      connection: 'OFFLINE',
      connectionColor: 'text-red-400',
      lastUpdate: '18 min ago',
      Icon: Truck
    }
  ];

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl">

      {/* HEADER */}

      <div className="flex items-center gap-2 mb-5">

        <Truck size={17} className="text-blue-400" />

        <h2 className="text-xs font-black uppercase tracking-widest text-zinc-200">
          Live Logistics
        </h2>

        <span className="ml-auto flex items-center gap-1 text-[9px] font-black text-emerald-400 uppercase">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          Live
        </span>

      </div>


      {/* VEHICLES */}

      <div className="space-y-3">

        {vehicles.map((vehicle) => {

          const Icon = vehicle.Icon;

          return (

            <div
              key={vehicle.id}
              className="bg-zinc-950 border border-zinc-800 rounded-lg p-3"
            >

              {/* TOP ROW */}

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-2">

                  <Icon
                    size={15}
                    className="text-zinc-500"
                  />

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


              {/* CARGO */}

              <div className="mt-2 flex items-center gap-2">

                <Package
                  size={11}
                  className="text-zinc-600"
                />

                <span className="text-[10px] text-zinc-400">
                  {vehicle.cargo}
                </span>

              </div>


              {/* ROUTE */}

              <div className="mt-2 flex items-center gap-2">

                <MapPin
                  size={11}
                  className="text-zinc-600"
                />

                <span className="text-[10px] text-zinc-500">
                  {vehicle.route}
                </span>

              </div>


              {/* CONNECTIVITY */}

              <div className="mt-3 pt-2 border-t border-zinc-800 flex items-center justify-between">

                <div className="flex items-center gap-2">

                  {vehicle.connection === 'ONLINE' && (
                    <Wifi
                      size={12}
                      className="text-emerald-400"
                    />
                  )}

                  {vehicle.connection === 'WEAK SIGNAL' && (
                    <Signal
                      size={12}
                      className="text-amber-400"
                    />
                  )}

                  {vehicle.connection === 'OFFLINE' && (
                    <WifiOff
                      size={12}
                      className="text-red-400"
                    />
                  )}

                  <span
                    className={`text-[9px] font-black uppercase ${vehicle.connectionColor}`}
                  >
                    {vehicle.connection}
                  </span>

                </div>


                <span className="text-[9px] text-zinc-600">
                  Updated {vehicle.lastUpdate}
                </span>

              </div>


              {/* OFFLINE WARNING */}

              {vehicle.connection === 'OFFLINE' && (

                <div className="mt-2 px-2 py-1.5 rounded bg-red-500/5 border border-red-500/10">

                  <p className="text-[9px] text-red-400 font-bold">
                    ⚠ Location may be outdated
                  </p>

                </div>

              )}

            </div>

          );

        })}

      </div>


      {/* FOOTER */}

      <div className="mt-4 pt-3 border-t border-zinc-800">

        <div className="flex items-center justify-between">

          <span className="text-[9px] text-zinc-600 uppercase font-bold">
            Connectivity Monitor
          </span>

          <span className="text-[9px] text-zinc-500">
            1 Offline • 1 Weak
          </span>

        </div>

      </div>

    </div>
  );
};