import React from 'react';
import {
  Truck,
  ArrowRight,
  CircleCheck,
  CircleStop,
  AlertTriangle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LiveLogisticsProps {
  protocolActive: boolean;
  vehicles?: any[];
}

export const LiveLogistics: React.FC<LiveLogisticsProps> = ({
  protocolActive,
  vehicles = [],
}) => {
  const navigate = useNavigate();

  const fallbackVehicles = [
    { id: 'V-101', status: 'MOVING' },
    { id: 'V-102', status: 'MOVING' },
    { id: 'V-103', status: 'STOPPED' },
    { id: 'V-104', status: 'ALERT' },
    { id: 'V-105', status: 'MOVING' },
  ];

  const fleet =
    vehicles.length > 0 ? vehicles : fallbackVehicles;

  const moving = fleet.filter((v: any) => {
    const status = String(v.status || '').toUpperCase();

    return (
      status.includes('MOVING') ||
      status.includes('TRANSIT') ||
      status.includes('ACTIVE') ||
      status.includes('REROUTED')
    );
  }).length;

  const stopped = fleet.filter((v: any) => {
    const status = String(v.status || '').toUpperCase();

    return (
      status.includes('STOP') ||
      status.includes('BLOCK')
    );
  }).length;

  const alerts = fleet.filter((v: any) => {
    const status = String(v.status || '').toUpperCase();

    return (
      status.includes('ALERT') ||
      status.includes('CRITICAL') ||
      status.includes('RISK')
    );
  }).length;

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl">

      {/* HEADER */}
      <div className="flex items-center gap-2 mb-5">

        <Truck
          size={17}
          className="text-blue-400"
        />

        <h2 className="text-xs font-black uppercase tracking-widest text-zinc-200">
          Live Fleet Monitor
        </h2>

        <span className="ml-auto flex items-center gap-1 text-[9px] font-black text-emerald-400 uppercase">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          Live
        </span>

      </div>

      {/* TOTAL FLEET */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 mb-4">

        <div className="flex items-center justify-between">

          <div>
            <p className="text-[9px] text-zinc-600 uppercase font-bold">
              Total Fleet
            </p>

            <p className="text-3xl font-black text-white mt-1">
              {fleet.length}
            </p>

            <p className="text-[9px] text-zinc-600 mt-1">
              Vehicles under live monitoring
            </p>
          </div>

          <Truck
            size={32}
            className="text-blue-400"
          />

        </div>

      </div>

      {/* STATUS SUMMARY */}
      <div className="grid grid-cols-3 gap-2">

        <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3">

          <CircleCheck
            size={15}
            className="text-emerald-400 mb-2"
          />

          <p className="text-lg font-black text-emerald-400">
            {moving}
          </p>

          <p className="text-[8px] text-zinc-600 uppercase font-bold">
            Moving
          </p>

        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3">

          <CircleStop
            size={15}
            className="text-red-400 mb-2"
          />

          <p className="text-lg font-black text-red-400">
            {stopped}
          </p>

          <p className="text-[8px] text-zinc-600 uppercase font-bold">
            Stopped
          </p>

        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3">

          <AlertTriangle
            size={15}
            className="text-amber-400 mb-2"
          />

          <p className="text-lg font-black text-amber-400">
            {alerts}
          </p>

          <p className="text-[8px] text-zinc-600 uppercase font-bold">
            Alerts
          </p>

        </div>

      </div>

      {/* VIEW FLEET BUTTON */}
      <button
        onClick={() => navigate('/fleet-vehicles')}
        className="w-full mt-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider text-zinc-400 hover:text-white hover:border-emerald-400 transition"
      >
        View Full Fleet

        <ArrowRight size={14} />

      </button>

      {/* FOOTER */}
      <div className="mt-4 pt-3 border-t border-zinc-800">

        <div className="flex items-center justify-between">

          <span className="text-[9px] text-zinc-600 uppercase font-bold">
            Fleet Connectivity
          </span>

          <span className="text-[9px] text-emerald-400 font-bold">
            ONLINE
          </span>

        </div>

      </div>

    </div>
  );
};