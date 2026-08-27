import React, { useState } from "react";
import { calculateRoutes } from "../utils/safeRoute";
import { roadData } from "../data/mockData";
import { predictedRisks } from "../data/riskData";

interface RoutePlannerProps {
  onRouteFound?: (route: any) => void;
}

const RoutePlanner: React.FC<RoutePlannerProps> = ({
  onRouteFound,
}) => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [routes, setRoutes] = useState<any>(null);
  const [selectedType, setSelectedType] = useState("safest");
  const criticalRoads = roadData.filter((road) => {
  const prediction = predictedRisks.find(
    (item) => item.road === road.id
  );

  return (
    road.status === "Blocked" ||
    road.riskLevel === "Critical" ||
    (prediction &&
      prediction.prediction.score >= 75)
  );
});

  const findRoutes = () => {
    if (!source.trim() || !destination.trim()) {
      alert("Please enter both source and destination.");
      return;
    }

    const result = calculateRoutes(
      source,
      destination
    );

    setRoutes(result);

    // Show safest route initially
    setSelectedType("safest");

    if (onRouteFound) {
      onRouteFound(result.safest);
    }
  };

  const selectRoute = (type: string) => {
    setSelectedType(type);

    const selectedRoute = routes[type];

    if (onRouteFound) {
      onRouteFound(selectedRoute);
    }
  };

  const getRiskColor = (level: string) => {
    if (level === "LOW") return "text-green-400";
    if (level === "MEDIUM") return "text-yellow-400";
    if (level === "HIGH") return "text-orange-400";
    return "text-red-500";
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">

      {/* HEADER */}

      <div className="flex items-center gap-3 mb-5">

        <div className="bg-blue-600/20 p-2 rounded-lg">
          🧭
        </div>

        <div>

            {criticalRoads.length > 0 && (
  <div className="mb-5 p-4 rounded-xl bg-red-500/10 border border-red-500/30">

    <div className="flex items-center gap-2 mb-3">

      <span className="text-lg">🚨</span>

      <div>
        <p className="text-xs font-black text-red-400 uppercase">
          Live Route Safety Alert
        </p>

        <p className="text-[10px] text-zinc-400">
          AI detected dangerous road conditions
        </p>
      </div>

    </div>

    {criticalRoads.map((road) => {

      const prediction = predictedRisks.find(
        (item) => item.road === road.id
      );

      return (
        <div
          key={road.id}
          className="mb-3 last:mb-0 p-3 bg-zinc-950 rounded-lg border border-red-500/20"
        >

          <div className="flex justify-between">

            <p className="text-sm font-black text-white">
              {road.id}
            </p>

            <span className="text-[10px] font-black text-red-500">
              CRITICAL
            </span>

          </div>

          <p className="text-[10px] text-zinc-400 mt-1">
            {road.lastReport}
          </p>

          <div className="grid grid-cols-2 gap-2 mt-3">

            <div>
              <p className="text-[9px] text-zinc-500">
                🪨 LANDSLIDE
              </p>

              <p className="text-xs font-bold text-red-400">
                {road.landslideProb}%
              </p>
            </div>

            <div>
              <p className="text-[9px] text-zinc-500">
                🌊 FLOOD
              </p>

              <p className="text-xs font-bold text-yellow-400">
                {road.floodProb}%
              </p>
            </div>

          </div>

          {prediction && (
            <div className="mt-3 flex justify-between">

              <span className="text-[9px] text-zinc-500">
                AI RISK SCORE
              </span>

              <span className="text-xs font-black text-red-400">
                {prediction.prediction.score}/100
              </span>

            </div>
          )}

          <div className="mt-3 p-2 rounded bg-blue-500/10">
            <p className="text-[9px] text-blue-300 font-bold">
              🤖 AI ACTION
            </p>

            <p className="text-[9px] text-zinc-300 mt-1">
              Exclude this road from recommended routes.
            </p>
          </div>
          <div className="mt-3 p-2 rounded bg-blue-500/10">

  <p className="text-[9px] text-blue-300 font-bold">
    🤖 AI ACTION
  </p>

  <p className="text-[9px] text-zinc-300 mt-1">
    Exclude this road from recommended routes.
  </p>

  <button
    onClick={() => {
      if (routes?.safest) {
        setSelectedType("safest");

        if (onRouteFound) {
          onRouteFound(routes.safest);
        }
      } else {
        alert("Find a route first to activate AI rerouting.");
      }
    }}
    className="w-full mt-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase transition"
  >
    🛡️ Use Safest Route
  </button>

</div>
        </div>
      );
    })}

  </div>
)}

          <h2 className="text-lg font-black text-white">
            Smart Route Planner
          </h2>

          <p className="text-xs text-zinc-500">
            AI-powered route selection
          </p>
        </div>

      </div>

      {/* SOURCE */}

      <div className="mb-4">

        <label className="text-[10px] uppercase font-bold text-zinc-500">
          Source
        </label>

        <input
          value={source}
          onChange={(e) => setSource(e.target.value)}
          placeholder="Example: Guwahati"
          className="w-full mt-1 p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-sm outline-none focus:border-blue-500"
        />

      </div>

      {/* DESTINATION */}

      <div className="mb-5">

        <label className="text-[10px] uppercase font-bold text-zinc-500">
          Destination
        </label>

        <input
          value={destination}
          onChange={(e) =>
            setDestination(e.target.value)
          }
          placeholder="Example: Shillong"
          className="w-full mt-1 p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-sm outline-none focus:border-blue-500"
        />

      </div>

      {/* FIND BUTTON */}

      <button
        onClick={findRoutes}
        className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider transition"
      >
        🧭 Find Best Routes
      </button>

      {/* ROUTE OPTIONS */}

      {routes && (
        <div className="mt-5">
         
          {routes.safest.riskLevel === "HIGH" ||
 routes.safest.riskLevel === "CRITICAL" ? (
  <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30">

    <p className="text-xs font-black text-red-400">
      🚨 ROUTE SAFETY WARNING
    </p>

    <p className="text-[10px] text-red-300 mt-1">
      AI detected elevated disaster risk on available routes.
      Consider using the safest available corridor.
    </p>

  </div>
) : (
  <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20">

    <p className="text-xs font-black text-green-400">
      🟢 ROUTE CONDITIONS STABLE
    </p>

    <p className="text-[10px] text-green-300 mt-1">
      AI found a relatively safe corridor for your journey.
    </p>

  </div>
)}

          <p className="text-[10px] uppercase font-bold text-zinc-500 mb-3">
            AI Route Options
          </p>

          <div className="grid grid-cols-3 gap-2">

            {/* SAFEST */}

            <button
              onClick={() => selectRoute("safest")}
              className={`p-3 rounded-lg border text-left transition ${
                selectedType === "safest"
                  ? "border-green-500 bg-green-500/10"
                  : "border-zinc-800 bg-zinc-950"
              }`}
            >

              <div className="text-lg">
                🛡️
              </div>

              <p className="text-xs font-bold text-white">
                Safest
              </p>

              <p className="text-[10px] text-zinc-500 mt-1">
                {routes.safest.safetyScore}/100
              </p>

            </button>

            {/* FASTEST */}

            <button
              onClick={() => selectRoute("fastest")}
              className={`p-3 rounded-lg border text-left transition ${
                selectedType === "fastest"
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-zinc-800 bg-zinc-950"
              }`}
            >

              <div className="text-lg">
                ⚡
              </div>

              <p className="text-xs font-bold text-white">
                Fastest
              </p>

              <p className="text-[10px] text-zinc-500 mt-1">
                {routes.fastest.time}
              </p>

            </button>

            {/* BALANCED */}

            <button
              onClick={() => selectRoute("balanced")}
              className={`p-3 rounded-lg border text-left transition ${
                selectedType === "balanced"
                  ? "border-orange-500 bg-orange-500/10"
                  : "border-zinc-800 bg-zinc-950"
              }`}
            >

              <div className="text-lg">
                ⚖️
              </div>

              <p className="text-xs font-bold text-white">
                Balanced
              </p>

              <p className="text-[10px] text-zinc-500 mt-1">
                Smart
              </p>

            </button>

          </div>

          {/* SELECTED ROUTE */}

          {routes[selectedType] && (

            <div className="mt-4 p-4 bg-zinc-950 border border-zinc-800 rounded-lg">

              <div className="flex justify-between">

                <div>

                  <p className="text-[9px] uppercase text-zinc-500 font-bold">
                    Selected Route
                  </p>

                  <h3 className="text-sm text-white font-black mt-1">
                    {routes[selectedType].routeName}
                  </h3>

                </div>

                <span
                  className={`text-[10px] font-black ${getRiskColor(
                    routes[selectedType].riskLevel
                  )}`}
                >
                  {routes[selectedType].riskLevel}
                </span>

              </div>

              <div className="grid grid-cols-3 gap-3 mt-4">

                <div>
                  <p className="text-[9px] text-zinc-500">
                    DISTANCE
                  </p>

                  <p className="text-xs text-white font-bold">
                    {routes[selectedType].distance}
                  </p>
                </div>

                <div>
                  <p className="text-[9px] text-zinc-500">
                    ETA
                  </p>

                  <p className="text-xs text-white font-bold">
                    {routes[selectedType].time}
                  </p>
                </div>

                <div>
                  <p className="text-[9px] text-zinc-500">
                    SAFETY
                  </p>

                  <p className="text-xs text-green-400 font-bold">
                    {routes[selectedType].safetyScore}/100
                  </p>
                </div>

              </div>

              <div className="mt-4 text-[10px] text-blue-300 bg-blue-500/10 border border-blue-500/20 rounded p-3">

                🤖 AI selected this route using:

                <br />

                Risk • Traffic • Accessibility • Road status

              </div>

            </div>

          )}

        </div>
      )}

    </div>
  );
};

export default RoutePlanner;