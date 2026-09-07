import React, { useMemo, useState } from "react";
import {
  Truck,
  Search,
  Wifi,
  WifiOff,
  Signal,
  ArrowLeft,
  Package,
  MapPin,
  Filter,
} from "lucide-react";

interface FleetVehiclesPageProps {
  onBack?: () => void;
}

const vehicles = [
  {
    id: "V-101",
    cargo: "Vaccines",
    route: "Guwahati → Aizawl",
    status: "MOVING",
    priority: "CRITICAL",
    connection: "ONLINE",
    location: "Guwahati",
    lastUpdate: "1 min ago",
  },
  {
    id: "V-102",
    cargo: "Food Grains",
    route: "Siliguri → Gangtok",
    status: "MOVING",
    priority: "HIGH",
    connection: "WEAK SIGNAL",
    location: "Siliguri",
    lastUpdate: "6 min ago",
  },
  {
    id: "V-103",
    cargo: "Oxygen Tankers",
    route: "Silchar → Imphal",
    status: "STOPPED",
    priority: "CRITICAL",
    connection: "OFFLINE",
    location: "Silchar",
    lastUpdate: "18 min ago",
  },
  {
    id: "V-104",
    cargo: "Medical Supplies",
    route: "Shillong → Jowai",
    status: "MOVING",
    priority: "HIGH",
    connection: "ONLINE",
    location: "Shillong",
    lastUpdate: "2 min ago",
  },
  {
    id: "V-105",
    cargo: "Emergency Food",
    route: "Guwahati → Imphal",
    status: "IDLE",
    priority: "NORMAL",
    connection: "ONLINE",
    location: "Guwahati",
    lastUpdate: "4 min ago",
  },
  {
    id: "V-106",
    cargo: "Fuel",
    route: "Dimapur → Kohima",
    status: "MOVING",
    priority: "HIGH",
    connection: "ONLINE",
    location: "Dimapur",
    lastUpdate: "3 min ago",
  },
  {
    id: "V-107",
    cargo: "Rice",
    route: "Agartala → Aizawl",
    status: "MOVING",
    priority: "NORMAL",
    connection: "ONLINE",
    location: "Agartala",
    lastUpdate: "5 min ago",
  },
  {
    id: "V-108",
    cargo: "Medical Equipment",
    route: "Imphal → Kohima",
    status: "STOPPED",
    priority: "CRITICAL",
    connection: "WEAK SIGNAL",
    location: "Imphal",
    lastUpdate: "12 min ago",
  },
];

const FleetVehiclesPage: React.FC<FleetVehiclesPageProps> = ({
  onBack,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const matchesSearch =
        vehicle.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.cargo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" || vehicle.status === statusFilter;

      const matchesPriority =
        priorityFilter === "ALL" ||
        vehicle.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [searchQuery, statusFilter, priorityFilter]);

  return (
    <div className="min-h-full bg-zinc-950 p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">

        <div className="flex items-center gap-4">

          <button
            type="button"
            onClick={onBack}
            className="w-9 h-9 rounded-lg border border-zinc-800 bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700"
          >
            <ArrowLeft size={17} />
          </button>

          <div>
            <div className="flex items-center gap-2">

              <Truck size={20} className="text-blue-400" />

              <h1 className="text-lg font-black text-white">
                Fleet Vehicles
              </h1>

            </div>

            <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-wider">
              Complete logistics fleet monitoring
            </p>
          </div>

        </div>

        {/* LIVE STATUS */}
        <div className="flex items-center gap-2 text-[9px] font-black text-emerald-400 uppercase">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          Live Fleet Data
        </div>

      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-4 gap-3 mb-6">

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <p className="text-[9px] text-zinc-500 uppercase font-bold">
            Total Vehicles
          </p>

          <p className="text-2xl font-black text-white mt-1">
            {vehicles.length}
          </p>
        </div>

        <div className="bg-zinc-900 border border-red-500/20 rounded-xl p-4">
          <p className="text-[9px] text-zinc-500 uppercase font-bold">
            Critical
          </p>

          <p className="text-2xl font-black text-red-400 mt-1">
            {vehicles.filter((v) => v.priority === "CRITICAL").length}
          </p>
        </div>

        <div className="bg-zinc-900 border border-emerald-500/20 rounded-xl p-4">
          <p className="text-[9px] text-zinc-500 uppercase font-bold">
            Moving
          </p>

          <p className="text-2xl font-black text-emerald-400 mt-1">
            {vehicles.filter((v) => v.status === "MOVING").length}
          </p>
        </div>

        <div className="bg-zinc-900 border border-red-500/20 rounded-xl p-4">
          <p className="text-[9px] text-zinc-500 uppercase font-bold">
            Offline
          </p>

          <p className="text-2xl font-black text-red-400 mt-1">
            {vehicles.filter((v) => v.connection === "OFFLINE").length}
          </p>
        </div>

      </div>

      {/* FILTER BAR */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-5">

        <div className="flex items-center gap-3">

          {/* SEARCH */}
          <div className="relative flex-1">

            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
            />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search vehicle, cargo, route or location..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2.5 pl-9 pr-3 text-xs text-white outline-none focus:border-blue-500/50"
            />

          </div>

          {/* STATUS */}
          <div className="flex items-center gap-2">

            <Filter size={14} className="text-zinc-600" />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2.5 text-xs text-zinc-300 outline-none"
            >
              <option value="ALL">All Status</option>
              <option value="MOVING">Moving</option>
              <option value="STOPPED">Stopped</option>
              <option value="IDLE">Idle</option>
            </select>

          </div>

          {/* PRIORITY */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2.5 text-xs text-zinc-300 outline-none"
          >
            <option value="ALL">All Priority</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="NORMAL">Normal</option>
          </select>

        </div>

      </div>

      {/* TABLE */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">

        <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">

          <div>
            <h2 className="text-xs font-black uppercase tracking-widest text-zinc-200">
              Vehicle Registry
            </h2>

            <p className="text-[9px] text-zinc-600 mt-1">
              Showing {filteredVehicles.length} vehicles
            </p>
          </div>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="border-b border-zinc-800 text-left">

                <th className="px-5 py-3 text-[9px] text-zinc-600 uppercase font-black">
                  Vehicle
                </th>

                <th className="px-5 py-3 text-[9px] text-zinc-600 uppercase font-black">
                  Cargo
                </th>

                <th className="px-5 py-3 text-[9px] text-zinc-600 uppercase font-black">
                  Route
                </th>

                <th className="px-5 py-3 text-[9px] text-zinc-600 uppercase font-black">
                  Status
                </th>

                <th className="px-5 py-3 text-[9px] text-zinc-600 uppercase font-black">
                  Priority
                </th>

                <th className="px-5 py-3 text-[9px] text-zinc-600 uppercase font-black">
                  Connection
                </th>

                <th className="px-5 py-3 text-[9px] text-zinc-600 uppercase font-black">
                  Updated
                </th>

              </tr>
            </thead>

            <tbody>

              {filteredVehicles.map((vehicle) => (

                <tr
                  key={vehicle.id}
                  className="border-b border-zinc-800/70 hover:bg-zinc-800/30 transition"
                >

                  {/* VEHICLE */}
                  <td className="px-5 py-4">

                    <div className="flex items-center gap-3">

                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <Truck size={14} className="text-blue-400" />
                      </div>

                      <div>
                        <p className="text-xs font-black text-white">
                          {vehicle.id}
                        </p>

                        <div className="flex items-center gap-1 mt-1">
                          <MapPin size={9} className="text-zinc-600" />

                          <span className="text-[9px] text-zinc-600">
                            {vehicle.location}
                          </span>
                        </div>
                      </div>

                    </div>

                  </td>

                  {/* CARGO */}
                  <td className="px-5 py-4">

                    <div className="flex items-center gap-2">

                      <Package
                        size={13}
                        className="text-zinc-600"
                      />

                      <span className="text-[10px] text-zinc-400">
                        {vehicle.cargo}
                      </span>

                    </div>

                  </td>

                  {/* ROUTE */}
                  <td className="px-5 py-4">

                    <span className="text-[10px] text-zinc-400">
                      {vehicle.route}
                    </span>

                  </td>

                  {/* STATUS */}
                  <td className="px-5 py-4">

                    <span
                      className={
                        vehicle.status === "MOVING"
                          ? "text-[9px] font-black text-emerald-400"
                          : vehicle.status === "STOPPED"
                          ? "text-[9px] font-black text-red-400"
                          : "text-[9px] font-black text-zinc-400"
                      }
                    >
                      {vehicle.status}
                    </span>

                  </td>

                  {/* PRIORITY */}
                  <td className="px-5 py-4">

                    <span
                      className={
                        vehicle.priority === "CRITICAL"
                          ? "px-2 py-1 rounded bg-red-500/10 text-[8px] font-black text-red-400"
                          : vehicle.priority === "HIGH"
                          ? "px-2 py-1 rounded bg-amber-500/10 text-[8px] font-black text-amber-400"
                          : "px-2 py-1 rounded bg-zinc-800 text-[8px] font-black text-zinc-400"
                      }
                    >
                      {vehicle.priority}
                    </span>

                  </td>

                  {/* CONNECTION */}
                  <td className="px-5 py-4">

                    <div className="flex items-center gap-2">

                      {vehicle.connection === "ONLINE" && (
                        <Wifi
                          size={12}
                          className="text-emerald-400"
                        />
                      )}

                      {vehicle.connection === "WEAK SIGNAL" && (
                        <Signal
                          size={12}
                          className="text-amber-400"
                        />
                      )}

                      {vehicle.connection === "OFFLINE" && (
                        <WifiOff
                          size={12}
                          className="text-red-400"
                        />
                      )}

                      <span className="text-[9px] text-zinc-500">
                        {vehicle.connection}
                      </span>

                    </div>

                  </td>

                  {/* UPDATED */}
                  <td className="px-5 py-4">

                    <span className="text-[9px] text-zinc-600">
                      {vehicle.lastUpdate}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* EMPTY STATE */}
        {filteredVehicles.length === 0 && (
          <div className="py-12 text-center">

            <Truck
              size={28}
              className="mx-auto text-zinc-700 mb-3"
            />

            <p className="text-xs text-zinc-500">
              No vehicles found
            </p>

          </div>
        )}

      </div>

    </div>
  );
};

export default FleetVehiclesPage;