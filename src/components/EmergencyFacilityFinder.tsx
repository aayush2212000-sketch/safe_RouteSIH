

import React from "react";
import {
  Hospital,
  Fuel,
  Shield,
  Home,
  MapPin,
  Navigation,
} from "lucide-react";

interface EmergencyFacilityFinderProps {
  onFacilitySelect?: (facility: any) => void;
}

const facilities = [
  {
    id: "F-01",
    name: "Jowai Civil Hospital",
    type: "Hospital",
    distance: "2.4 km",
    location: [25.45, 92.20],
    icon: Hospital,
    status: "OPEN",
  },
  {
    id: "F-02",
    name: "Jowai Fuel Station",
    type: "Fuel Station",
    distance: "3.1 km",
    location: [25.48, 92.18],
    icon: Fuel,
    status: "AVAILABLE",
  },
  {
    id: "F-03",
    name: "Jowai Police Station",
    type: "Police Station",
    distance: "4.2 km",
    location: [25.44, 92.19],
    icon: Shield,
    status: "ACTIVE",
  },
  {
    id: "F-04",
    name: "Emergency Relief Shelter",
    type: "Shelter",
    distance: "5.6 km",
    location: [25.50, 92.23],
    icon: Home,
    status: "AVAILABLE",
  },
];

const getTypeStyle = (type: string) => {
  switch (type) {
    case "Hospital":
      return "text-red-400 bg-red-500/10 border-red-500/20";

    case "Fuel Station":
      return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";

    case "Police Station":
      return "text-blue-400 bg-blue-500/10 border-blue-500/20";

    default:
      return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
  }
};

export default function EmergencyFacilityFinder({
  onFacilitySelect,
}: EmergencyFacilityFinderProps) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Navigation size={17} className="text-blue-400" />

        <h2 className="text-xs font-black uppercase tracking-widest text-zinc-200">
          Emergency Facilities
        </h2>

        <span className="ml-auto text-[9px] font-black text-emerald-400 uppercase">
          Nearby
        </span>
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800">
        <MapPin size={13} className="text-red-400" />

        <div>
          <p className="text-[9px] text-zinc-600 uppercase font-bold">
            Emergency Zone
          </p>

          <p className="text-[11px] text-white font-bold">
            Jowai — NH-6 Corridor
          </p>
        </div>
      </div>

      {/* Facilities */}
      <div className="space-y-2">
        {facilities.map((facility) => {
          const Icon = facility.icon;

          return (
            <button
              key={facility.id}
              onClick={() => onFacilitySelect?.(facility)}
              className="w-full text-left p-3 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center">
                  <Icon size={15} className="text-zinc-400" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate">
                    {facility.name}
                  </p>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] text-zinc-500">
                      {facility.distance}
                    </span>

                    <span className="text-zinc-700">•</span>

                    <span className="text-[9px] text-zinc-500">
                      {facility.type}
                    </span>
                  </div>
                </div>

                <span
                  className={`text-[8px] font-black px-2 py-1 rounded border ${getTypeStyle(
                    facility.type
                  )}`}
                >
                  {facility.status}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-[9px] text-zinc-600">
        Select a facility to locate it on the emergency map.
      </p>
    </div>
  );
}