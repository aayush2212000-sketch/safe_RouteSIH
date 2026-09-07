import React from "react";
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  MapPin,
  Clock,
} from "lucide-react";

interface IncidentFeedProps {
  reports: any[];
  onStatusChange: (id: number, status: string) => void;
}

const IncidentFeed: React.FC<IncidentFeedProps> = ({
  reports,
  onStatusChange,
}) => {
  const getSeverityStyle = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case "critical":
        return {
          text: "text-red-400",
          bg: "bg-red-500/10",
          border: "border-red-500/30",
        };

      case "high":
        return {
          text: "text-orange-400",
          bg: "bg-orange-500/10",
          border: "border-orange-500/30",
        };

      case "medium":
        return {
          text: "text-yellow-400",
          bg: "bg-yellow-500/10",
          border: "border-yellow-500/30",
        };

      default:
        return {
          text: "text-green-400",
          bg: "bg-green-500/10",
          border: "border-green-500/30",
        };
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case "verified":
        return "text-green-400";

      case "rejected":
        return "text-red-400";

      default:
        return "text-yellow-400";
    }
  };

  return (
    <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="relative">
            <AlertTriangle size={15} className="text-red-400" />

            <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
          </div>

          <h2 className="text-xs font-black text-white uppercase tracking-wider">
            Live Incident Feed
          </h2>
        </div>

        <span className="px-2 py-1 rounded-md bg-zinc-800 text-[9px] font-bold text-zinc-400">
          {reports.length} REPORTS
        </span>
      </div>

      {/* Reports */}
      <div className="p-3">
        {reports.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle2
              size={22}
              className="mx-auto mb-2 text-green-500"
            />

            <p className="text-xs text-zinc-500">
              No citizen reports received
            </p>

            <p className="text-[9px] text-zinc-700 mt-1">
              System monitoring active
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {reports.map((report) => {
              const severity = getSeverityStyle(report.severity);

              return (
                <div
                  key={report.id}
                  className={`rounded-lg border ${severity.border} ${severity.bg} p-3 transition-all hover:bg-zinc-800/70`}
                >
                  {/* Top section */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-bold text-white truncate">
                          {report.type || "Unknown Incident"}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 mt-1">
                        <MapPin
                          size={10}
                          className="text-zinc-600 flex-shrink-0"
                        />

                        <p className="text-[10px] text-zinc-500 truncate">
                          {report.location || "Location unavailable"}
                        </p>
                      </div>
                    </div>

                    {/* Severity */}
                    <span
                      className={`flex-shrink-0 px-1.5 py-0.5 rounded text-[8px] font-black uppercase ${severity.text} ${severity.bg}`}
                    >
                      {report.severity || "Unknown"}
                    </span>
                  </div>

                  {/* Description */}
                  {report.description && (
                    <p className="text-[10px] leading-relaxed text-zinc-400 mt-2">
                      {report.description}
                    </p>
                  )}

                  {/* Bottom */}
                  <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-zinc-800/80">
                    <div className="flex items-center gap-1">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          report.status === "Verified"
                            ? "bg-green-500"
                            : report.status === "Rejected"
                            ? "bg-red-500"
                            : "bg-yellow-500 animate-pulse"
                        }`}
                      />

                      <span
                        className={`text-[9px] font-bold uppercase ${getStatusStyle(
                          report.status
                        )}`}
                      >
                        {report.status || "Pending"}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[9px] text-zinc-600">
                      <Clock size={9} />

                      <span>{report.time || "Recent"}</span>
                    </div>
                  </div>

                  {/* Verification buttons */}
                  {report.status === "Pending Verification" && (
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <button
                        onClick={() =>
                          onStatusChange(report.id, "Verified")
                        }
                        className="flex items-center justify-center gap-1 px-2 py-1.5 rounded-md bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20 transition-colors text-[9px] font-black"
                      >
                        <CheckCircle2 size={11} />
                        VERIFY
                      </button>

                      <button
                        onClick={() =>
                          onStatusChange(report.id, "Rejected")
                        }
                        className="flex items-center justify-center gap-1 px-2 py-1.5 rounded-md bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-colors text-[9px] font-black"
                      >
                        <XCircle size={11} />
                        REJECT
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default IncidentFeed;