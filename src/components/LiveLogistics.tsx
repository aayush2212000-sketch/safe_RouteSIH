import React from 'react';
import {
  Truck,
  MapPin,
  Package,
  Wifi,
  Signal,
  WifiOff
} from 'lucide-react';

interface LiveLogisticsProps {
  protocolActive: boolean;
  vehicles?: any[];
}

export const LiveLogistics: React.FC<LiveLogisticsProps> = ({
  protocolActive,
  vehicles = []
}) => {

  // Fallback data used only when the database has no vehicles
  const defaultVehicles = [
    {
      id: 'V-101',
      cargo: 'Vaccines',
      route: protocolActive
        ? 'Guwahati → NH-44 → Aizawl'
        : 'Guwahati → Aizawl',
      status: protocolActive ? 'REROUTED' : 'MOVING'
    },
    {
      id: 'V-102',
      cargo: 'Food Grains',
      route: 'Siliguri → Gangtok',
      status: 'MOVING'
    },
    {
      id: 'V-103',
      cargo: 'Oxygen Tankers',
      route: 'Silchar → Imphal',
      status: 'STOPPED'
    }
  ];

  const displayVehicles =
    vehicles && vehicles.length > 0
      ? vehicles
      : defaultVehicles;

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl">

      {/* HEADER */}
      <div className="flex items-center gap-2 mb-5">

        <Truck
          size={17}
          className="text-blue-400"
        />

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

        {displayVehicles.map((vehicle: any, index: number) => {

          const status =
            String(vehicle.status || 'UNKNOWN').toUpperCase();

          const isMoving =
            status.includes('MOVING') ||
            status.includes('TRANSIT') ||
            status.includes('ACTIVE') ||
            status.includes('REROUTED');

          const isStopped =
            status.includes('STOP') ||
            status.includes('BLOCK');

          const statusColor = isMoving
            ? 'text-emerald-400'
            : isStopped
              ? 'text-red-400'
              : 'text-amber-400';

          const VehicleIcon =
            index % 2 === 0 ? Truck : Package;

          return (

            <div
              key={vehicle.id || index}
              className="bg-zinc-950 border border-zinc-800 rounded-lg p-3"
            >

              {/* TOP ROW */}
              <div className="flex items-center justify-between">

                <div className="flex items-center gap-2">

                  <VehicleIcon
                    size={15}
                    className="text-zinc-500"
                  />

                  <span className="text-sm font-black text-white">
                    {vehicle.id || 'Unknown Vehicle'}
                  </span>

                </div>

                <span
                  className={`text-[9px] font-black ${statusColor}`}
                >
                  {status}
                </span>

              </div>


              {/* CARGO */}
              <div className="mt-2 flex items-center gap-2">

                <Package
                  size={11}
                  className="text-zinc-600"
                />

                <span className="text-[10px] text-zinc-400">
                  {vehicle.cargo || 'Cargo information unavailable'}
                </span>

              </div>


              {/* ROUTE */}
              <div className="mt-2 flex items-center gap-2">

                <MapPin
                  size={11}
                  className="text-zinc-600"
                />

                <span className="text-[10px] text-zinc-500">
                  {vehicle.route || 'Route tracking active'}
                </span>

              </div>


              {/* CONNECTIVITY */}
              <div className="mt-3 pt-2 border-t border-zinc-800 flex items-center justify-between">

                <div className="flex items-center gap-2">

                  <Wifi
                    size={12}
                    className="text-emerald-400"
                  />

                  <span className="text-[9px] font-black uppercase text-emerald-400">
                    ONLINE
                  </span>

                </div>

                <span className="text-[9px] text-zinc-600">
                  Live tracking
                </span>

              </div>

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
            {displayVehicles.length} Active
          </span>

        </div>

      </div>

    </div>
  );
};