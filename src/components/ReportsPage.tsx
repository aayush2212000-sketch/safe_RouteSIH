import React from "react";
import CitizenReport from "./CitizenReport";
import IncidentFeed from "./IncidentFeed";

interface ReportsPageProps {
  reports: any[];
  onReportSubmit: (report: any) => void;
  onStatusChange: (id: number, status: string) => void;
}

const ReportsPage: React.FC<ReportsPageProps> = ({
  reports,
  onReportSubmit,
  onStatusChange,
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#09090b]">

      {/* HEADER */}
      <div className="mb-6">
        <p className="text-xs uppercase tracking-widest text-orange-500 font-bold">
          Field Intelligence
        </p>

        <h1 className="text-3xl font-black text-white mt-1">
          Incident Center
        </h1>

        <p className="text-sm text-zinc-500 mt-2">
          Monitor and manage citizen-reported road incidents across the
          North Eastern Region.
        </p>
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-2 gap-6">

        {/* REPORT FORM */}
        <CitizenReport
          onReportSubmit={onReportSubmit}
        />

        {/* LIVE FEED */}
        <IncidentFeed
          reports={reports}
          onStatusChange={onStatusChange}
        />

      </div>

    </div>
  );
};

export default ReportsPage;