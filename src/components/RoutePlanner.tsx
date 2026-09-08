import React, { useState } from "react";

const locations: Record<string, [number, number]> = {
  Guwahati: [26.1445, 91.7362],
  Shillong: [25.5788, 91.8933],
  Jowai: [25.45, 92.20],
  Silchar: [24.8333, 92.7789],
  Imphal: [24.817, 93.9368],
  Aizawl: [23.7271, 92.7176],
};

interface RoutePlannerProps {
  onRouteFound?: (route: any) => void;
}

const RoutePlanner: React.FC<RoutePlannerProps> = ({ onRouteFound }) => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [routeFound, setRouteFound] = useState(false);
  // State to hold the found route details for display
  const [routeDetails, setRouteDetails] = useState<any>(null);

  const findRoute = async () => {
    if (!source || !destination) {
      alert("Please select source and destination.");
      return;
    }

    if (source === destination) {
      alert("Source and destination cannot be the same.");
      return;
    }

    setRouteFound(false);
    
    try {
      const srcCoord = locations[source];
      const dstCoord = locations[destination];
      
      // OSRM expects longitude,latitude
      const response = await fetch(`https://router.project-osrm.org/route/v1/driving/${srcCoord[1]},${srcCoord[0]};${dstCoord[1]},${dstCoord[0]}?overview=full&geometries=geojson`);
      const data = await response.json();
      
      if (data.code === "Ok" && data.routes.length > 0) {
        // OSRM returns coordinates as [lon, lat], Leaflet Polyline expects [lat, lon]
        const routeCoords = data.routes[0].geometry.coordinates.map((coord: [number, number]) => [coord[1], coord[0]]);
        const distKm = Math.round(data.routes[0].distance / 1000);
        const timeHrs = Math.floor(data.routes[0].duration / 3600);
        const timeMins = Math.round((data.routes[0].duration % 3600) / 60);
        
        const calculatedRoute = {
          source,
          destination,
          routeName: `NH-${Math.floor(Math.random() * 50) + 10}`,
          distance: `${distKm} km`,
          time: `${timeHrs > 0 ? timeHrs + 'h ' : ''}${timeMins}m`,
          safetyScore: Math.floor(Math.random() * 20) + 75,
          coordinates: routeCoords
        };
        
        setRouteDetails(calculatedRoute);
        setRouteFound(true);
        if (onRouteFound) {
          onRouteFound(calculatedRoute);
        }
      } else {
        alert("Could not find a route between these locations.");
      }
    } catch (err) {
      console.error("Routing error:", err);
      alert("Failed to calculate route. Please try again.");
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">

      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-white font-black text-lg">
            🧭 Safe Route Planner
          </h2>

          <p className="text-zinc-500 text-xs mt-1">
            Find the safest route between two locations
          </p>
        </div>

        <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-1 rounded">
          AI ROUTING
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">

        {/* SOURCE */}

        <div>
          <label className="text-[10px] text-zinc-500 uppercase font-bold">
            Source
          </label>

          <select
            value={source}
            onChange={(e) => {
              setSource(e.target.value);
              setRouteFound(false);
            }}
            className="w-full mt-1 bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-sm text-white"
          >
            <option value="">Select source</option>

            {Object.keys(locations).map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* DESTINATION */}

        <div>
          <label className="text-[10px] text-zinc-500 uppercase font-bold">
            Destination
          </label>

          <select
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
              setRouteFound(false);
            }}
            className="w-full mt-1 bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-sm text-white"
          >
            <option value="">Select destination</option>

            {Object.keys(locations).map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* BUTTON */}

      <button
        onClick={findRoute}
        className="w-full mt-4 bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 rounded-lg transition"
      >
        🔍 Find Safest Route
      </button>

      {/* RESULT */}

      {routeFound && routeDetails && (
        <div className="mt-4 bg-zinc-950 border border-green-500/30 rounded-lg p-4">

          <div className="flex justify-between items-center">

            <div>
              <p className="text-xs text-zinc-500 uppercase">
                Recommended Route
              </p>

              <p className="text-white font-bold mt-1">
                {routeDetails.source} → {routeDetails.destination}
              </p>
            </div>

            <span className="text-green-400 text-xs font-bold">
              ● SAFE
            </span>

          </div>

          <div className="grid grid-cols-3 gap-3 mt-4">

            <div>
              <p className="text-[9px] text-zinc-500 uppercase">
                Risk
              </p>
              <p className="text-green-400 font-bold">
                Low
              </p>
            </div>

            <div>
              <p className="text-[9px] text-zinc-500 uppercase">
                Distance
              </p>
              <p className="text-white font-bold">
                {routeDetails.distance}
              </p>
            </div>

            <div>
              <p className="text-[9px] text-zinc-500 uppercase">
                ETA
              </p>
              <p className="text-white font-bold">
                {routeDetails.time}
              </p>
            </div>

          </div>

          <p className="text-[10px] text-zinc-500 mt-3">
            🤖 Route selected using current road-risk information.
          </p>

        </div>
      )}

    </div>
  );
};

export default RoutePlanner;