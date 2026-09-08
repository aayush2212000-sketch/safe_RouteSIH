import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  Truck,
  Search,
  MapPin,
  Package,
  Wifi,
  AlertTriangle,
  CircleCheck,
  CircleStop,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGaleData } from '../hooks/useGaleData';

type FilterType = 'ALL' | 'MOVING' | 'STOPPED' | 'ALERT';

export const FleetVehiclesPage: React.FC = () => {
  const navigate = useNavigate();

  const { vehicles, loading } = useGaleData();

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterType>('ALL');

  // Demo fallback data
  const fallbackVehicles = [
    {
      id: 'V-101',
      cargo: 'Vaccines',
      route: 'Guwahati → Aizawl',
      status: 'MOVING',
      location: 'Guwahati',
    },
    {
      id: 'V-102',
      cargo: 'Food Grains',
      route: 'Siliguri → Gangtok',
      status: 'MOVING',
      location: 'Siliguri',
    },
    {
      id: 'V-103',
      cargo: 'Oxygen Tankers',
      route: 'Silchar → Imphal',
      status: 'STOPPED',
      location: 'Silchar',
    },
    {
      id: 'V-104',
      cargo: 'Medical Supplies',
      route: 'Shillong → Jowai',
      status: 'ALERT',
      location: 'Shillong',
    },
    {
      id: 'V-105',
      cargo: 'Emergency Food',
      route: 'Imphal → Aizawl',
      status: 'MOVING',
      location: 'Imphal',
    },
  ];

  const displayVehicles =
    vehicles && vehicles.length > 0
      ? vehicles
      : fallbackVehicles;

  const filteredVehicles = useMemo(() => {
    return displayVehicles.filter((vehicle: any) => {
      const status = String(vehicle.status || 'UNKNOWN').toUpperCase();

      const matchesSearch =
        String(vehicle.id || '')
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        String(vehicle.cargo || '')
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        String(vehicle.route || '')
          .toLowerCase()
          .includes(search.toLowerCase());

      let matchesFilter = true;

      if (filter === 'MOVING') {
        matchesFilter =
          status.includes('MOVING') ||
          status.includes('TRANSIT') ||
          status.includes('ACTIVE') ||
          status.includes('REROUTED');
      }

      if (filter === 'STOPPED') {
        matchesFilter =
          status.includes('STOP') ||
          status.includes('BLOCK');
      }

      if (filter === 'ALERT') {
        matchesFilter =
          status.includes('ALERT') ||
          status.includes('CRITICAL') ||
          status.includes('RISK');
      }

      return matchesSearch && matchesFilter;
    });
  }, [displayVehicles, search, filter]);

  const movingCount = displayVehicles.filter((v: any) => {
    const status = String(v.status || '').toUpperCase();

    return (
      status.includes('MOVING') ||
      status.includes('TRANSIT') ||
      status.includes('ACTIVE') ||
      status.includes('REROUTED')
    );
  }).length;

  const stoppedCount = displayVehicles.filter((v: any) => {
    const status = String(v.status || '').toUpperCase();

    return (
      status.includes('STOP') ||
      status.includes('BLOCK')
    );
  }).length;

  const alertCount = displayVehicles.filter((v: any) => {
    const status = String(v.status || '').toUpperCase();

    return (
      status.includes('ALERT') ||
      status.includes('CRITICAL') ||
      status.includes('RISK')
    );
  }).length;

  const getStatusColor = (status: string) => {
    if (
      status.includes('MOVING') ||
      status.includes('TRANSIT') ||
      status.includes('ACTIVE') ||
      status.includes('REROUTED')
    ) {
      return 'text-emerald-400';
    }

    if (
      status.includes('STOP') ||
      status.includes('BLOCK')
    ) {
      return 'text-red-400';
    }

    return 'text-amber-400';
  };

  const getStatusIcon = (status: string) => {
    if (
      status.includes('MOVING') ||
      status.includes('TRANSIT') ||
      status.includes('ACTIVE') ||
      status.includes('REROUTED')
    ) {
      return <CircleCheck size={16} />;
    }

    if (
      status.includes('STOP') ||
      status.includes('BLOCK')
    ) {
      return <CircleStop size={16} />;
    }

    return <AlertTriangle size={16} />;
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">

        <div className="flex items-center gap-4">

          <button
            onClick={() => navigate('/admin-dashboard')}
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition"
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <div className="flex items-center gap-3">

              <Truck
                size={24}
                className="text-blue-400"
              />

              <h1 className="text-2xl font-black tracking-tight">
                Fleet Vehicles
              </h1>

            </div>

            <p className="text-xs text-zinc-500 mt-1">
              Complete live logistics fleet monitoring
            </p>
          </div>

        </div>

        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          LIVE TRACKING
        </div>

      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

        {/* TOTAL */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <div className="flex justify-between items-center">

            <span className="text-xs text-zinc-500 uppercase font-bold">
              Total Vehicles
            </span>

            <Truck
              size={18}
              className="text-blue-400"
            />

          </div>

          <div className="text-3xl font-black mt-3">
            {displayVehicles.length}
          </div>
        </div>

        {/* MOVING */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">

          <div className="flex justify-between items-center">

            <span className="text-xs text-zinc-500 uppercase font-bold">
              Moving
            </span>

            <CircleCheck
              size={18}
              className="text-emerald-400"
            />

          </div>

          <div className="text-3xl font-black text-emerald-400 mt-3">
            {movingCount}
          </div>

        </div>

        {/* STOPPED */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">

          <div className="flex justify-between items-center">

            <span className="text-xs text-zinc-500 uppercase font-bold">
              Stopped
            </span>

            <CircleStop
              size={18}
              className="text-red-400"
            />

          </div>

          <div className="text-3xl font-black text-red-400 mt-3">
            {stoppedCount}
          </div>

        </div>

        {/* ALERT */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">

          <div className="flex justify-between items-center">

            <span className="text-xs text-zinc-500 uppercase font-bold">
              Alerts
            </span>

            <AlertTriangle
              size={18}
              className="text-amber-400"
            />

          </div>

          <div className="text-3xl font-black text-amber-400 mt-3">
            {alertCount}
          </div>

        </div>

      </div>

      {/* SEARCH + FILTER */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-6">

        <div className="flex flex-col md:flex-row gap-4">

          {/* SEARCH */}
          <div className="relative flex-1">

            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search vehicle, cargo or route..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-sm outline-none focus:border-zinc-600"
            />

          </div>

          {/* FILTERS */}
          <div className="flex gap-2 flex-wrap">

            {(['ALL', 'MOVING', 'STOPPED', 'ALERT'] as FilterType[]).map(
              (item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`px-4 py-2 rounded-lg text-xs font-black transition ${
                    filter === item
                      ? 'bg-emerald-400 text-black'
                      : 'bg-zinc-950 text-zinc-500 border border-zinc-800 hover:text-white'
                  }`}
                >
                  {item}
                </button>
              )
            )}

          </div>

        </div>

      </div>

      {/* VEHICLE LIST */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">

        <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">

          <div>
            <h2 className="text-sm font-black uppercase tracking-widest">
              Vehicle Fleet
            </h2>

            <p className="text-[10px] text-zinc-600 mt-1">
              {filteredVehicles.length} vehicles displayed
            </p>
          </div>

          <Wifi
            size={17}
            className="text-emerald-400"
          />

        </div>

        {loading ? (

          <div className="p-10 text-center text-zinc-500 text-sm">
            Loading fleet data...
          </div>

        ) : filteredVehicles.length === 0 ? (

          <div className="p-10 text-center text-zinc-500 text-sm">
            No vehicles match your search.
          </div>

        ) : (

          <div className="divide-y divide-zinc-800">

            {filteredVehicles.map((vehicle: any, index: number) => {

              const status =
                String(
                  vehicle.status || 'UNKNOWN'
                ).toUpperCase();

              return (

                <div
                  key={vehicle.id || index}
                  className="p-5 hover:bg-zinc-950 transition"
                >

                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-center">

                    {/* VEHICLE */}
                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center">

                        <Truck
                          size={19}
                          className="text-blue-400"
                        />

                      </div>

                      <div>

                        <div className="font-black text-sm">
                          {vehicle.id || 'Unknown'}
                        </div>

                        <div className="text-[10px] text-zinc-600 uppercase">
                          Fleet Vehicle
                        </div>

                      </div>

                    </div>

                    {/* CARGO */}
                    <div>

                      <div className="text-[9px] text-zinc-600 uppercase font-bold mb-1">
                        Cargo
                      </div>

                      <div className="flex items-center gap-2 text-xs text-zinc-300">

                        <Package size={13} />

                        {vehicle.cargo || 'Not specified'}

                      </div>

                    </div>

                    {/* LOCATION */}
                    <div>

                      <div className="text-[9px] text-zinc-600 uppercase font-bold mb-1">
                        Current Location
                      </div>

                      <div className="flex items-center gap-2 text-xs text-zinc-300">

                        <MapPin size={13} />

                        {vehicle.location ||
                          vehicle.current_location ||
                          'Location unavailable'}

                      </div>

                    </div>

                    {/* ROUTE */}
                    <div>

                      <div className="text-[9px] text-zinc-600 uppercase font-bold mb-1">
                        Route
                      </div>

                      <div className="text-xs text-zinc-400">
                        {vehicle.route ||
                          'Route tracking active'}
                      </div>

                    </div>

                    {/* STATUS */}
                    <div className="lg:text-right">

                      <div className="text-[9px] text-zinc-600 uppercase font-bold mb-1">
                        Status
                      </div>

                      <div
                        className={`inline-flex items-center gap-2 text-xs font-black ${getStatusColor(
                          status
                        )}`}
                      >

                        {getStatusIcon(status)}

                        {status}

                      </div>

                    </div>

                  </div>

                  {/* CONNECTION */}
                  <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center gap-2">

                    <Wifi
                      size={12}
                      className="text-emerald-400"
                    />

                    <span className="text-[9px] text-emerald-400 font-black">
                      ONLINE
                    </span>

                    <span className="text-[9px] text-zinc-600">
                      • Live tracking enabled
                    </span>

                  </div>

                </div>

              );
            })}

          </div>

        )}

      </div>

    </div>
  );
};

export default FleetVehiclesPage;