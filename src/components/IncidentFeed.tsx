import React from "react";

interface IncidentFeedProps {
  reports: any[];
  onStatusChange: (id: number, status: string) => void;
}

const IncidentFeed: React.FC<IncidentFeedProps> = ({ 
  reports,
   onStatusChange,
}) => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-black text-white uppercase">
          🔴 Live Incident Feed
        </h2>

        <span className="text-[10px] text-zinc-500">
          {reports.length} REPORTS
        </span>
      </div>

      {reports.length === 0 ? (
        <div className="text-center py-6 text-zinc-500 text-xs">
          No citizen reports received
        </div>
      ) : (
        <div className="space-y-3">

          {reports.map((report) => (

            <div
              key={report.id}
              className="bg-zinc-950 border border-zinc-800 rounded-lg p-3"
            >

              <div className="flex justify-between">

                <div>
                  <p className="text-sm font-bold text-white">
                    {report.type}
                  </p>

                  <p className="text-[11px] text-zinc-500">
                    📍 {report.location}
                  </p>
                </div>

                <span
                  className={`text-[9px] font-black uppercase ${
                    report.severity === "Critical"
                      ? "text-red-500"
                      : report.severity === "High"
                      ? "text-orange-400"
                      : report.severity === "Medium"
                      ? "text-yellow-400"
                      : "text-green-400"
                  }`}
                >
                  {report.severity}
                </span>

              </div>

              <p className="text-xs text-zinc-400 mt-2">
                {report.description}
              </p>

              <div className="flex justify-between mt-3 pt-2 border-t border-zinc-800">

                <span className="text-[9px] text-yellow-500">
                  ⚠ {report.status}
                </span>

                {report.status === "Pending Verification" && (
  <div className="flex gap-2 mt-3">

    <button
      onClick={() =>
        onStatusChange(report.id, "Verified")
      }
      className="px-2 py-1 rounded bg-green-600 hover:bg-green-500 text-white text-[9px] font-bold"
    >
      ✓ VERIFY
    </button>

    <button
      onClick={() =>
        onStatusChange(report.id, "Rejected")
      }
      className="px-2 py-1 rounded bg-red-600 hover:bg-red-500 text-white text-[9px] font-bold"
    >
      ✕ REJECT
    </button>

  </div>
)}

                <span className="text-[9px] text-zinc-600">
                  {report.time}
                </span>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
};

export default IncidentFeed;