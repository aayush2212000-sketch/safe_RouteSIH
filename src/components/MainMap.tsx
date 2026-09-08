import React from "react";
import * as L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  CircleMarker,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import { roadData } from "../data/mockData";
import { getRiskExplanation } from "../utils/riskPrediction";

interface MainMapProps {
  isDisaster: boolean;
  protocolActive: boolean;
  onRoadClick: (road: any) => void;
  reports?: any[];
  selectedRoute?: any;
  aiPredictions?: any[];
  vehicles?: any[];
}

/* --------------------------------
   Convert different coordinate
   formats into Leaflet format
--------------------------------- */
const getCoordinates = (coordinates: any): [number, number] | null => {
  if (!coordinates) return null;

  // Already [lat, lng]
  if (
    Array.isArray(coordinates) &&
    coordinates.length >= 2 &&
    typeof coordinates[0] === "number"
  ) {
    return [coordinates[0], coordinates[1]];
  }

  // { lat, lng }
  if (
    typeof coordinates === "object" &&
    typeof coordinates.lat === "number" &&
    typeof coordinates.lng === "number"
  ) {
    return [coordinates.lat, coordinates.lng];
  }

  // GeoJSON { coordinates: [lng, lat] }
  if (
    typeof coordinates === "object" &&
    Array.isArray(coordinates.coordinates) &&
    coordinates.coordinates.length >= 2
  ) {
    return [
      Number(coordinates.coordinates[1]),
      Number(coordinates.coordinates[0]),
    ];
  }

  // EWKT:
  // SRID=4326;POINT(lng lat)
  if (typeof coordinates === "string") {
    const pointMatch = coordinates.match(
      /POINT\s*\(\s*([-0-9.]+)\s+([-0-9.]+)\s*\)/i
    );

    if (pointMatch) {
      const lng = Number(pointMatch[1]);
      const lat = Number(pointMatch[2]);

      if (!isNaN(lat) && !isNaN(lng)) {
        return [lat, lng];
      }
    }

    // Try JSON
    try {
      const parsed = JSON.parse(coordinates);
      return getCoordinates(parsed);
    } catch {
      return null;
    }
  }

  return null;
};

/* --------------------------------
   Fallback vehicle locations

   Your tracking_routes table currently
   has id, cargo and status but no
   coordinates.
--------------------------------- */
const vehicleLocations: Record<string, [number, number]> = {
  "V-101": [26.1445, 91.7362],
  "V-102": [25.5788, 91.8933],
  "V-103": [24.817, 92.797],
  "V-104": [24.817, 93.9368],
  "V-105": [23.7271, 92.7176],
};
const vehicleIcon = L.divIcon({
  className: "",
  html: `
    <div style="
      width: 38px;
      height: 38px;
      background: #22c55e;
      border: 3px solid white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      box-shadow: 0 0 15px rgba(34,197,94,0.9);
    ">
      🚚
    </div>
  `,
  iconSize: [38, 38],
  iconAnchor: [19, 19],
});
export const MainMap: React.FC<MainMapProps> = ({
  isDisaster,
  protocolActive,
  onRoadClick,
  reports = [],
  selectedRoute,
  aiPredictions = [],
  vehicles = [],
}) => {
  /* --------------------------------
     ROAD COLOR
  --------------------------------- */
  const getRoadColor = (road: any) => {
    const predictedRoad = aiPredictions.find(
      (item) => item.road === road.id
    );

    if (!predictedRoad) {
      return "#22c55e";
    }

    const level = predictedRoad.prediction?.level;

    if (level === "CRITICAL") return "#ef4444";
    if (level === "HIGH") return "#f97316";
    if (level === "MEDIUM") return "#f59e0b";

    return "#22c55e";
  };

  return (
    <MapContainer
      center={[25.8, 93.5]}
      zoom={7}
      style={{
        height: "100%",
        width: "100%",
        minHeight: "500px",
      }}
    >
      {/* =========================
          MAP LEGEND
      ========================= */}

      <div
        className="absolute bottom-5 right-5 z-[1000]
                   bg-zinc-950/90 backdrop-blur-md
                   border border-zinc-700/70
                   rounded-xl px-4 py-3
                   shadow-xl text-white"
      >
        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3">
          Road Risk
        </p>

        <div className="space-y-2 text-[10px] font-bold">
          <div className="flex items-center gap-2">
            <span className="w-3 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-zinc-300">Low</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3 h-1.5 rounded-full bg-amber-500" />
            <span className="text-zinc-300">Medium</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3 h-1.5 rounded-full bg-orange-500" />
            <span className="text-zinc-300">High</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3 h-1.5 rounded-full bg-red-500" />
            <span className="text-zinc-300">Critical</span>
          </div>
        </div>
      </div>

      {/* =========================
          MAP
      ========================= */}

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {/* =========================
          NER HIGHWAYS
      ========================= */}

      {roadData.map((road) => (
        <Polyline
          key={road.id}
          positions={road.coordinates as [number, number][]}
          pathOptions={{
            color:
              protocolActive && road.id === "NH-6"
                ? "#ef4444"
                : isDisaster
                ? "#ef4444"
                : getRoadColor(road),
            weight: 8,
            opacity: 1,
          }}
          eventHandlers={{
            click: () => onRoadClick(road),
          }}
        >
          <Popup>
            <strong>{road.name}</strong>

            <br />

            Status: {road.status}

            <br />

            Existing Risk: {road.riskLevel}

            <br />

            Accessibility: {road.accessibilityScore}%

            <br />
            <br />

            {aiPredictions
              .filter((item) => item.road === road.id)
              .map((item) => {
                const reasons = getRiskExplanation({
                  rainfall: item.rainfall,
                  floodRisk: item.floodRisk,
                  landslideRisk: item.landslideRisk,
                  roadCondition: item.roadCondition,
                  traffic: item.traffic,
                });

                return (
                  <React.Fragment key={item.id}>
                    🤖 <strong>AI RISK ANALYSIS</strong>

                    <br />

                    Risk Score: {item.prediction?.score}/100

                    <br />

                    Predicted Level: {item.prediction?.level}

                    <br />
                    <br />

                    <strong>WHY?</strong>

                    {reasons.map((reason, index) => (
                      <React.Fragment key={index}>
                        <br />
                        {reason}
                      </React.Fragment>
                    ))}

                    <br />
                    <br />

                    <strong>RECOMMENDED ACTION</strong>

                    <br />

                    {item.prediction?.level === "CRITICAL"
                      ? "⚠️ Avoid route and activate emergency rerouting"
                      : item.prediction?.level === "HIGH"
                      ? "⚠️ Monitor route and prepare alternate path"
                      : item.prediction?.level === "MEDIUM"
                      ? "🟡 Continue monitoring conditions"
                      : "✅ Route operating normally"}
                  </React.Fragment>
                );
              })}
          </Popup>
        </Polyline>
      ))}

      {/* =========================
          SMART ROUTE
      ========================= */}

      {selectedRoute && selectedRoute.coordinates && (
        <Polyline
          positions={selectedRoute.coordinates as [number, number][]}
          pathOptions={{
            color: "#38bdf8",
            weight: 6,
            opacity: 1,
            dashArray: "12, 8",
          }}
        >
          <Popup>
            <strong>🧭 AI RECOMMENDED ROUTE</strong>

            <br />
            <br />

            From: {selectedRoute.source}

            <br />

            To: {selectedRoute.destination}

            <br />
            <br />

            🛣️ {selectedRoute.routeName}

            <br />

            📏 {selectedRoute.distance}

            <br />

            ⏱️ {selectedRoute.time}

            <br />

            🟢 Safety Score: {selectedRoute.safetyScore}/100
          </Popup>
        </Polyline>
      )}

      {/* =========================
          DATABASE INCIDENTS
      ========================= */}

      {reports.map((incident) => {
        const coordinates = getCoordinates(incident.coordinates);

        if (!coordinates) return null;

        const incidentColor =
          incident.severity === "Critical"
            ? "#ef4444"
            : incident.severity === "High"
            ? "#f97316"
            : incident.severity === "Medium"
            ? "#f59e0b"
            : "#22c55e";

        return (
          <CircleMarker
            key={`incident-circle-${incident.id}`}
            center={coordinates}
            radius={9}
            pathOptions={{
              color: incidentColor,
              fillColor: incidentColor,
              fillOpacity: 0.85,
              weight: 2,
            }}
          >
            <Popup>
              <strong>🚨 {incident.type}</strong>

              <br />

              Location: {incident.location}

              <br />

              Severity: {incident.severity}

              <br />

              Status: {incident.status}

              <br />
              <br />

              <strong>Description</strong>

              <br />

              {incident.description}

              <br />
              <br />

              Reported: {incident.time}
            </Popup>
          </CircleMarker>
        );
      })}

      {/* =========================
          AI REROUTE
      ========================= */}

      {protocolActive && (
        <Polyline
          positions={[
            [26.1, 91.8],
            [25.8, 91.8],
            [25.57, 91.88],
            [24.3, 91.83],
          ]}
          pathOptions={{
            color: "#38bdf8",
            weight: 5,
            opacity: 0.9,
            dashArray: "10, 10",
          }}
        />
      )}

     {/* =========================
    VEHICLES
========================= */}

{vehicles.map((vehicle, index) => {
  console.log("VEHICLE FROM DATABASE:", vehicle);

  const vehicleId = String(
    vehicle.id ??
      vehicle.vehicle_id ??
      vehicle.vehicleId ??
      `V-${101 + index}`
  );

  // Try every possible location field
  const vehiclePosition =
    getCoordinates(vehicle.location) ||
    getCoordinates(vehicle.coordinates) ||
    getCoordinates(vehicle.current_location) ||
    getCoordinates(vehicle.currentLocation) ||
    (vehicle.latitude != null && vehicle.longitude != null
      ? [Number(vehicle.latitude), Number(vehicle.longitude)] as [number, number]
      : null) ||
    vehicleLocations[vehicleId] ||
    vehicleLocations[`V-${101 + index}`];

  console.log("VEHICLE ID:", vehicleId);
  console.log("VEHICLE POSITION:", vehiclePosition);

  if (!vehiclePosition) {
    console.warn("NO POSITION FOR VEHICLE:", vehicle);
    return null;
  }

  const displayPosition =
    protocolActive && vehicleId === "V-101"
      ? ([25.57, 91.88] as [number, number])
      : vehiclePosition;

  return (
    <Marker
      key={`vehicle-${vehicleId}-${index}`}
      position={displayPosition}
      icon={vehicleIcon}
    >
      <Popup>
        <strong>🚚 {vehicleId}</strong>
        <br />
        Cargo: {vehicle.cargo ?? "N/A"}
        <br />
        Status:
        {" "}
        {protocolActive && vehicleId === "V-101"
          ? "🔄 REROUTED"
          : vehicle.status ?? "Unknown"}

        {protocolActive && vehicleId === "V-101" && (
          <>
            <br />
            <br />
            🤖 AI Route: NH-44
            <br />
            ⚡ Priority: HIGH
          </>
        )}
      </Popup>
    </Marker>
  );
})}

      {/* =========================
          CITIZEN INCIDENT MARKERS
      ========================= */}

      {reports.map((report) => {
        const coordinates = getCoordinates(report.coordinates);

        if (!coordinates) return null;

        return (
          <Marker
            key={`incident-${report.id}`}
            position={coordinates}
          >
            <Popup>
              <strong>🚨 CITIZEN INCIDENT</strong>

              <br />
              <br />

              <strong>Type:</strong> {report.type}

              <br />

              <strong>Severity:</strong> {report.severity}

              <br />

              <strong>Location:</strong> {report.location}

              <br />
              <br />

              <strong>Description:</strong>

              <br />

              {report.description}

              <br />
              <br />

              <span>⚠ {report.status}</span>

              {report.photo && (
                <>
                  <br />
                  <br />

                  <img
                    src={report.photo}
                    alt="Incident evidence"
                    style={{
                      width: "200px",
                      maxHeight: "150px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </>
              )}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};