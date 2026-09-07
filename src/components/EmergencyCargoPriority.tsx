import React from "react";
import {
  Package,
  AlertTriangle,
  Syringe,
  Droplets,
  Wrench,
  ArrowUpRight,
} from "lucide-react";

interface EmergencyCargoPriorityProps {
  protocolActive: boolean;
}

export default function EmergencyCargoPriority({
  protocolActive,
}: EmergencyCargoPriorityProps) {
  const cargo = [
    {
      id: "V-101",
      cargo: "Vaccines",
      type: "MEDICINE",
      priority: "CRITICAL",
      action: "Reroute immediately",
      icon: Syringe,
    },
    {
      id: "V-103",
      cargo: "Oxygen Tankers",
      type: "EMERGENCY",
      priority: "CRITICAL",
      action: "Priority passage",
      icon: Droplets,
    },
    {
      id: "V-108",
      cargo: "Antibiotics",
      type: "MEDICINE",
      priority: "HIGH",
      action: "Monitor route",
      icon: Package,
    },
    {
      id: "V-117",
      cargo: "Road Repair Material",
      type: "CONSTRUCTION",
      priority: "NORMAL",
      action: "Hold if required",
      icon: Wrench,
    },
  ];

  const priorityStyle = (priority: string) => {
    if (priority === "CRITICAL") {
      return "text-red-400 bg-red-500/10 border-red-500/20";
    }

    if (priority === "HIGH") {
      return "text-orange-400 bg-orange-500/10 border-orange-500/20";
    }

    return "text-zinc-400 bg-zinc-800 border-zinc-700";
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle
          size={17}
          className={protocolActive ? "text-red-400" : "text-orange-400"}
        />

        <h2 className="text-xs font-black uppercase tracking-widest text-zinc-200">
          Emergency Cargo Priority
        </h2>

        {protocolActive && (
          <span className="ml-auto text-[9px] font-black uppercase text-red-400 animate-pulse">
            Active
          </span>
        )}
      </div>

      {/* Info */}
      <div className="mb-4 p-3 rounded-lg bg-zinc-950 border border-zinc-800">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-zinc-500 uppercase font-bold">
              Priority System
            </p>

            <p className="text-sm font-bold text-white mt-1">
              {protocolActive
                ? "Emergency cargo prioritized"
                : "Cargo priority monitoring"}
            </p>
          </div>

          <Package size={20} className="text-zinc-600" />
        </div>
      </div>

      {/* Cargo list */}
      <div className="space-y-2">
        {cargo.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="p-3 rounded-lg bg-zinc-950 border border-zinc-800"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center">
                  <Icon size={15} className="text-zinc-500" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-white">
                      {item.id}
                    </span>

                    <span className="text-[9px] text-zinc-600">
                      {item.type}
                    </span>
                  </div>

                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    {item.cargo}
                  </p>
                </div>

                <span
                  className={`text-[8px] font-black px-2 py-1 rounded border ${priorityStyle(
                    item.priority
                  )}`}
                >
                  {item.priority}
                </span>
              </div>

              {protocolActive && (
                <div className="mt-2 pt-2 border-t border-zinc-800 flex items-center justify-between">
                  <span className="text-[9px] text-zinc-500">
                    {item.action}
                  </span>

                  {item.priority === "CRITICAL" && (
                    <ArrowUpRight size={12} className="text-red-400" />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Emergency message */}
      {protocolActive && (
        <div className="mt-3 flex items-center gap-2 text-[9px] font-bold text-red-400 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          Critical cargo receives highest routing priority
        </div>
      )}
    </div>
  );
}