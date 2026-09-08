import React from "react";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  MapPin,
  ShieldAlert,
  TrendingUp,
} from "lucide-react";

import { roadData } from "../data/mockData";
import { incidentData } from "../data/incidentData";

const AnalyticsPage: React.FC = () => {
  // -----------------------------
  // ROAD ANALYTICS
  // -----------------------------

  const safeRoads = roadData.filter(
    (road) => road.riskLevel === "Low"
  ).length;

  const moderateRoads = roadData.filter(
    (road) => road.riskLevel === "Moderate"
  ).length;

  const highRoads = roadData.filter(
    (road) => road.riskLevel === "High"
  ).length;

  const criticalRoads = roadData.filter(
    (road) => road.riskLevel === "Critical"
  ).length;

  const blockedRoads = roadData.filter(
    (road) => road.status === "Blocked"
  ).length;

  const totalRoads = roadData.length;

  // -----------------------------
  // INCIDENT ANALYTICS
  // -----------------------------

  const incidentTypes = [
    "Landslide",
    "Flood",
    "Road Blockage",
    "Accident",
    "Heavy Traffic",
    "Road Damage",
  ];

  const incidentCounts = incidentTypes.map((type) => ({
    type,
    count: incidentData.filter((incident) => incident.type === type).length,
  }));

  const maxIncidentCount = Math.max(
    ...incidentCounts.map((item) => item.count),
    1
  );

  // -----------------------------
  // TOP RISK ZONES
  // -----------------------------

  const riskWeight: Record<string, number> = {
    Critical: 4,
    High: 3,
    Moderate: 2,
    Low: 1,
  };

  const topRiskZones = [...roadData]
    .sort(
      (a, b) =>
        (riskWeight[b.riskLevel] || 0) -
        (riskWeight[a.riskLevel] || 0)
    )
    .slice(0, 5);

  // -----------------------------
  // PAST BEHAVIOUR
  // -----------------------------
  //
  // This is intentionally based on the
  // current risk profile for now.
  // Later we can replace this with
  // historical database snapshots.
  //

  const pastBehaviour = [
    { day: "MON", value: 42 },
    { day: "TUE", value: 45 },
    { day: "WED", value: 43 },
    { day: "THU", value: 49 },
    { day: "FRI", value: 52 },
    { day: "SAT", value: 55 },
    { day: "SUN", value: 58 },
  ];

  const currentRiskScore = Math.round(
    roadData.reduce((sum, road) => {
      const weight = riskWeight[road.riskLevel] || 1;
      return sum + weight * 25;
    }, 0) / Math.max(totalRoads, 1)
  );

  const riskTrend =
    pastBehaviour[pastBehaviour.length - 1].value -
    pastBehaviour[0].value;

  // -----------------------------
  // INSIGHT
  // -----------------------------

  let insight = "Network conditions are currently stable.";

  if (criticalRoads > 0 && blockedRoads > 0) {
    insight =
      `${criticalRoads} critical road segment${criticalRoads > 1 ? "s are" : " is"} currently identified, with ${blockedRoads} blocked route${blockedRoads > 1 ? "s" : ""}.`;
  } else if (highRoads > moderateRoads) {
    insight =
      "High-risk road segments currently outnumber moderate-risk segments. Route planning should prioritize safer corridors.";
  } else if (riskTrend > 0) {
    insight =
      "Network risk has been trending upward. Landslide and flood-prone corridors require closer monitoring.";
  }

  return (
    <div className="flex-1 overflow-y-auto bg-[#09090b] p-5 custom-scrollbar">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3">
            <BarChart3 size={22} className="text-orange-500" />

            <h1 className="text-2xl font-black text-white tracking-tight">
              GALE Analytics
            </h1>
          </div>

          <p className="text-xs text-zinc-500 mt-1">
            Network behaviour and operational risk intelligence
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg">
          <Activity size={14} className="text-orange-500" />

          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
            Live Network
          </span>

          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
        </div>
      </div>

      {/* NETWORK HEALTH */}
      <div className="grid grid-cols-5 gap-3 mb-5">

        <HealthCard
          label="Safe"
          value={safeRoads}
          total={totalRoads}
          icon={<CheckCircle2 size={17} />}
          iconClass="text-green-500"
        />

        <HealthCard
          label="Moderate"
          value={moderateRoads}
          total={totalRoads}
          icon={<Activity size={17} />}
          iconClass="text-yellow-500"
        />

        <HealthCard
          label="High Risk"
          value={highRoads}
          total={totalRoads}
          icon={<AlertTriangle size={17} />}
          iconClass="text-orange-500"
        />

        <HealthCard
          label="Critical"
          value={criticalRoads}
          total={totalRoads}
          icon={<CircleAlert size={17} />}
          iconClass="text-red-500"
        />

        <HealthCard
          label="Blocked"
          value={blockedRoads}
          total={totalRoads}
          icon={<ShieldAlert size={17} />}
          iconClass="text-red-400"
        />

      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-12 gap-5">

        {/* PAST BEHAVIOUR */}
        <section className="col-span-8 bg-zinc-900/60 border border-zinc-800 rounded-xl p-5">

          <div className="flex items-start justify-between mb-6">

            <div>
              <div className="flex items-center gap-2">
                <TrendingUp
                  size={17}
                  className="text-orange-500"
                />

                <h2 className="text-sm font-black text-white uppercase tracking-wide">
                  Network Risk History
                </h2>
              </div>

              <p className="text-[11px] text-zinc-500 mt-1">
                Past behaviour — last 7 days
              </p>
            </div>

            <div className="text-right">
              <p className="text-2xl font-black text-white">
                {currentRiskScore}
              </p>

              <p className="text-[9px] text-zinc-500 uppercase font-bold">
                Current Index
              </p>
            </div>

          </div>

          {/* GRAPH */}
          <div className="relative h-56">

            {/* GRID */}
            <div className="absolute inset-0 flex flex-col justify-between">

              {[100, 75, 50, 25, 0].map((value) => (
                <div
                  key={value}
                  className="flex items-center gap-3"
                >
                  <span className="w-7 text-[9px] text-zinc-600 text-right">
                    {value}
                  </span>

                  <div className="flex-1 border-t border-zinc-800/70" />
                </div>
              ))}

            </div>

            {/* BARS */}
            <div className="absolute left-11 right-0 bottom-0 top-0 flex items-end justify-between gap-4 px-3">

              {pastBehaviour.map((item) => {

                const height = `${item.value}%`;

                return (
                  <div
                    key={item.day}
                    className="h-full flex-1 flex flex-col justify-end items-center"
                  >

                    <div className="mb-2 text-[9px] font-bold text-zinc-500">
                      {item.value}
                    </div>

                    <div
                      className="w-full max-w-10 bg-orange-500/80 rounded-t-md transition-all hover:bg-orange-400"
                      style={{ height }}
                    />

                    <span className="mt-2 text-[9px] font-bold text-zinc-600">
                      {item.day}
                    </span>

                  </div>
                );
              })}

            </div>

          </div>

          <div className="mt-5 flex items-center justify-between border-t border-zinc-800 pt-4">

            <div className="flex items-center gap-2">
              <TrendingUp
                size={14}
                className="text-orange-500"
              />

              <span className="text-[10px] font-bold text-zinc-400">
                {riskTrend > 0
                  ? `Risk increased ${riskTrend}% over the period`
                  : "Risk remained stable"}
              </span>
            </div>

            <span className="text-[9px] text-zinc-600 uppercase">
              Risk Index
            </span>

          </div>

        </section>

        {/* INCIDENT OVERVIEW */}
        <section className="col-span-4 bg-zinc-900/60 border border-zinc-800 rounded-xl p-5">

          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle
              size={17}
              className="text-orange-500"
            />

            <h2 className="text-sm font-black text-white uppercase">
              Incident Overview
            </h2>
          </div>

          <p className="text-[11px] text-zinc-500 mb-6">
            Current incident distribution
          </p>

          <div className="space-y-5">

            {incidentCounts.map((item) => {

              const percentage = Math.round(
                (item.count / maxIncidentCount) * 100
              );

              return (
                <div key={item.type}>

                  <div className="flex justify-between mb-2">

                    <span className="text-xs text-zinc-300">
                      {item.type}
                    </span>

                    <span className="text-xs font-black text-white">
                      {item.count}
                    </span>

                  </div>

                  <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">

                    <div
                      className="h-full bg-orange-500 rounded-full"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />

                  </div>

                </div>
              );
            })}

          </div>

        </section>

        {/* TOP RISK ZONES */}
        <section className="col-span-7 bg-zinc-900/60 border border-zinc-800 rounded-xl p-5">

          <div className="flex items-center justify-between mb-5">

            <div>
              <div className="flex items-center gap-2">

                <MapPin
                  size={17}
                  className="text-orange-500"
                />

                <h2 className="text-sm font-black text-white uppercase">
                  Top Risk Zones
                </h2>

              </div>

              <p className="text-[11px] text-zinc-500 mt-1">
                Highest priority road segments
              </p>
            </div>

            <ChevronDown
              size={15}
              className="text-zinc-600"
            />

          </div>

          <div className="space-y-2">

            {topRiskZones.map((road, index) => {

              const riskClass =
                road.riskLevel === "Critical"
                  ? "text-red-500 bg-red-500/10 border-red-500/20"
                  : road.riskLevel === "High"
                  ? "text-orange-500 bg-orange-500/10 border-orange-500/20"
                  : "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";

              return (
                <div
                  key={road.id}
                  className="flex items-center gap-4 p-3 bg-zinc-950/60 border border-zinc-800 rounded-lg"
                >

                  <div className="w-6 h-6 flex items-center justify-center rounded bg-zinc-900 text-[10px] font-black text-zinc-500">
                    0{index + 1}
                  </div>

                  <div className="flex-1 min-w-0">

                    <p className="text-xs font-bold text-white truncate">
                      {road.name}
                    </p>

                    <p className="text-[9px] text-zinc-600 mt-1">
                      Access score: {road.accessibilityScore}%
                    </p>

                  </div>

                  <div className="text-right">

                    <span
                      className={`inline-flex px-2 py-1 rounded border text-[9px] font-black uppercase ${riskClass}`}
                    >
                      {road.riskLevel}
                    </span>

                    <p className="text-[9px] text-zinc-600 mt-1">
                      Landslide {road.landslideProb}%
                    </p>

                  </div>

                </div>
              );
            })}

          </div>

        </section>

        {/* GALE INSIGHT */}
        <section className="col-span-5 bg-gradient-to-br from-orange-500/10 to-zinc-900 border border-orange-500/20 rounded-xl p-5">

          <div className="flex items-center gap-2 mb-5">

            <div className="p-2 bg-orange-500/10 border border-orange-500/20 rounded-lg">
              <BarChart3
                size={17}
                className="text-orange-500"
              />
            </div>

            <div>
              <h2 className="text-sm font-black text-white uppercase">
                GALE Insight
              </h2>

              <p className="text-[9px] text-zinc-500 uppercase">
                Operational intelligence
              </p>
            </div>

          </div>

          <p className="text-sm leading-6 text-zinc-300">
            {insight}
          </p>

          <div className="mt-6 pt-4 border-t border-zinc-800">

            <div className="flex justify-between">

              <span className="text-[9px] text-zinc-600 uppercase font-bold">
                Critical Segments
              </span>

              <span className="text-xs font-black text-red-500">
                {criticalRoads}
              </span>

            </div>

            <div className="flex justify-between mt-3">

              <span className="text-[9px] text-zinc-600 uppercase font-bold">
                Active Incidents
              </span>

              <span className="text-xs font-black text-orange-500">
                {incidentData.length}
              </span>

            </div>

          </div>

        </section>

      </div>
    </div>
  );
};

interface HealthCardProps {
  label: string;
  value: number;
  total: number;
  icon: React.ReactNode;
  iconClass: string;
}

const HealthCard: React.FC<HealthCardProps> = ({
  label,
  value,
  total,
  icon,
  iconClass,
}) => {
  const percentage = total
    ? Math.round((value / total) * 100)
    : 0;

  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4">

      <div className="flex items-center justify-between">

        <div className={iconClass}>
          {icon}
        </div>

        <span className="text-[9px] text-zinc-600 font-bold">
          {percentage}%
        </span>

      </div>

      <p className="text-2xl font-black text-white mt-3">
        {value}
      </p>

      <p className="text-[9px] text-zinc-500 uppercase font-bold tracking-wider mt-1">
        {label}
      </p>

    </div>
  );
};

export default AnalyticsPage;