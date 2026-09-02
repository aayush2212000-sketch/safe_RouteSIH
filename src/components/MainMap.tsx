import React from "react";
import L from "leaflet";

import { incidentData } from "../data/incidentData";

import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  CircleMarker,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import { roadData, vehicleData } from "../data/mockData";
import { predictedRisks } from "../data/riskData";
import { getRiskExplanation } from "../utils/riskPrediction";

interface MainMapProps {
  isDisaster: boolean;
  protocolActive: boolean;
  onRoadClick: (road: any) => void;
  reports: any[];
  selectedRoute?: any;
  selectedFacility?: any;
}

/* =========================================================
   MAP FOCUS
   ========================================================= */

const MapFocus: React.FC<{ facility?: any }> = ({ facility }) => {
  const map = useMap();

  React.useEffect(() => {
    const target = facility?.position ?? facility?.location;

    if (target) {
      map.flyTo(target as [number, number], 14, {
        duration: 1.5,
      });
    }
  }, [facility, map]);

  return null;
};

/* =========================================================
   MAIN MAP
   ========================================================= */

export const MainMap: React.FC<MainMapProps> = ({
  isDisaster,
  protocolActive,
  onRoadClick,
  reports,
  selectedRoute,
  selectedFacility,
}) => {
  /* =======================================================
     ROAD COLOR
     ======================================================= */

  const getRoadColor = (road: any) => {
    const predictedRoad = predictedRisks.find(
      (item) => item.road === road.id
    );

    if (!predictedRoad) {
      return "#22c55e";
    }

    const level = predictedRoad.prediction.level;

    if (level === "CRITICAL") {
      return "#ef4444";
    }

    if (level === "HIGH") {
      return "#f97316";
    }

    if (level === "MEDIUM") {
      return "#f59e0b";
    }

    return "#22c55e";
  };

  /* =======================================================
     EMERGENCY FACILITIES
     ======================================================= */

  const emergencyFacilities = [
    {
      id: "F-01",
      name: "Jowai Civil Hospital",
      type: "Hospital",
      position: [25.45, 92.20] as [number, number],
    },
    {
      id: "F-02",
      name: "Jowai Fuel Station",
      type: "Fuel Station",
      position: [25.48, 92.18] as [number, number],
    },
    {
      id: "F-03",
      name: "Jowai Police Station",
      type: "Police Station",
      position: [25.44, 92.19] as [number, number],
    },
    {
      id: "F-04",
      name: "Emergency Relief Shelter",
      type: "Shelter",
      position: [25.50, 92.23] as [number, number],
    },
  ];

  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <MapContainer
      center={[25.45, 92.20]}
      zoom={10}
      style={{
        height: "100%",
        width: "100%",
        minHeight: "500px",
      }}
    >
      {/* ===================================================
          MAP FOCUS
         =================================================== */}

      <MapFocus facility={selectedFacility} />

      {/* ===================================================
          MAP LEGEND
         =================================================== */}

      <div
        className="
          absolute
          bottom-5
          right-5
          z-[1000]
          bg-zinc-950/90
          backdrop-blur-md
          border
          border-zinc-700/70
          rounded-xl
          px-4
          py-3
          shadow-xl
          text-white
        "
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

      {/* ===================================================
          MAP BACKGROUND
         =================================================== */}

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {/* ===================================================
          NER HIGHWAYS
         =================================================== */}

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

            {predictedRisks
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

                    Risk Score: {item.prediction.score}/100

                    <br />

                    Predicted Level: {item.prediction.level}

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

                    {item.prediction.level === "CRITICAL"
                      ? "⚠️ Avoid route and activate emergency rerouting"
                      : item.prediction.level === "HIGH"
                      ? "⚠️ Monitor route and prepare alternate path"
                      : item.prediction.level === "MEDIUM"
                      ? "🟡 Continue monitoring conditions"
                      : "✅ Route operating normally"}
                  </React.Fragment>
                );
              })}
          </Popup>
        </Polyline>
      ))}

      {/* ===================================================
          SMART ROUTE
         =================================================== */}

      {selectedRoute && (
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

      {/* ===================================================
          INCIDENTS
         =================================================== */}

      {incidentData.map((incident) => {
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
            key={incident.id}
            center={incident.coordinates}
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

      {/* ===================================================
          AI REROUTE
         =================================================== */}

      {protocolActive && (
        <Polyline
          positions={[
            [26.1, 91.8],
            [25.8, 91.8],
            [25.57, 91.88],
            [24.30, 91.83],
          ]}
          pathOptions={{
            color: "#38bdf8",
            weight: 5,
            opacity: 0.9,
            dashArray: "10, 10",
          }}
        />
      )}

      {/* ===================================================
          EMERGENCY FACILITIES
         =================================================== */}

      {emergencyFacilities.map((facility) => {
        const type = facility.type.toLowerCase();

        let bgColor = "#2563eb";

        if (type.includes("hospital")) {
          bgColor = "#dc2626";
        } else if (type.includes("fuel")) {
          bgColor = "#f59e0b";
        } else if (type.includes("police")) {
          bgColor = "#2563eb";
        } else if (type.includes("shelter")) {
          bgColor = "#16a34a";
        }

        const customIcon = L.divIcon({
          className: "",
          html: `
            <div style="
              width: 42px;
              height: 42px;
              background: ${bgColor};
              border: 3px solid white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 4px 12px rgba(0,0,0,0.45);
              font-size: 20px;
            ">
              ${
                type.includes("hospital")
                  ? "✚"
                  : type.includes("fuel")
                  ? "⛽"
                  : type.includes("police")
                  ? "🛡"
                  : "⌂"
              }
            </div>
          `,
          iconSize: [42, 42],
          iconAnchor: [21, 21],
          popupAnchor: [0, -21],
        });

        return (
          <Marker
            key={facility.id}
            position={facility.position}
            icon={customIcon}
          >
            <Popup>
              <div style={{ minWidth: "190px" }}>
                <strong style={{ fontSize: "15px" }}>
                  🚨 {facility.name}
                </strong>

                <br />
                <br />

                <strong>Type:</strong> {facility.type}

                <br />

                <strong>ID:</strong> {facility.id}

                <br />
                <br />

                <span
                  style={{
                    color: "#16a34a",
                    fontWeight: "bold",
                  }}
                >
                  ● AVAILABLE
                </span>

                <br />

                Jowai Emergency Zone
              </div>
            </Popup>
          </Marker>
        );
      })}

      {/* ===================================================
          VEHICLES
         =================================================== */}

      {vehicleData.map((vehicle) => {
        const vehiclePosition =
          isDisaster && vehicle.id === "V-101"
            ? ([25.57, 91.88] as [number, number])
            : (vehicle.location as [number, number]);

        return (
          <Marker
            key={vehicle.id}
            position={
              protocolActive && vehicle.id === "V-101"
                ? ([25.57, 91.88] as [number, number])
                : vehiclePosition
            }
          >
            <Popup>
              <strong>🚚 {vehicle.id}</strong>

              <br />

              Cargo: {vehicle.cargo}

              <br />

              Status:{" "}
              {protocolActive && vehicle.id === "V-101"
                ? "🔄 REROUTED"
                : vehicle.status}

              <br />

              {protocolActive && vehicle.id === "V-101" && (
                <>
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

      {/* ===================================================
          CITIZEN INCIDENT REPORTS
         =================================================== */}

      {reports.map((report) => {
        if (!report.coordinates) {
          return null;
        }

        return (
          <Marker
            key={`incident-${report.id}`}
            position={[
              report.coordinates.lat,
              report.coordinates.lng,
            ]}
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