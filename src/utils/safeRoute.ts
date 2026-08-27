import { roadData } from "../data/mockData";
import { predictedRisks } from "../data/riskData";

export const calculateRoutes = (
  source: string,
  destination: string
) => {
  const routes = roadData
    .filter((road) => road.status !== "Blocked")
    .map((road) => {
      const prediction = predictedRisks.find(
        (item) => item.road === road.id
      );

      const riskScore = prediction
        ? prediction.prediction.score
        : 20;

      const accessibilityPenalty =
        100 - road.accessibilityScore;

      const trafficPenalty =
        road.traffic === "Heavy"
          ? 25
          : road.traffic === "Moderate"
          ? 15
          : 5;

      const totalRisk =
        riskScore * 0.5 +
        accessibilityPenalty * 0.3 +
        trafficPenalty * 0.2;

      return {
        source,
        destination,

        roadId: road.id,
        routeName: road.name,

        coordinates: road.coordinates,

        riskScore: Math.round(totalRisk),

        safetyScore: Math.max(
          0,
          Math.round(100 - totalRisk)
        ),

        traffic: road.traffic,

        accessibility: road.accessibilityScore,

        distance:
          road.id === "NH-44"
            ? "102 km"
            : road.id === "NH-37"
            ? "145 km"
            : "118 km",

        time:
          road.id === "NH-44"
            ? "3h 25m"
            : road.id === "NH-37"
            ? "4h 10m"
            : "3h 45m",

        riskLevel:
          riskScore >= 75
            ? "CRITICAL"
            : riskScore >= 50
            ? "HIGH"
            : riskScore >= 30
            ? "MEDIUM"
            : "LOW",
      };
    });

  // SAFEST
  const safest = [...routes].sort(
    (a, b) => b.safetyScore - a.safetyScore
  )[0];

  // FASTEST
  const fastest = [...routes].sort(
    (a, b) =>
      parseTime(a.time) - parseTime(b.time)
  )[0];

  // BALANCED
  const balanced = [...routes].sort(
    (a, b) =>
      b.safetyScore +
      b.accessibility -
      parseTime(b.time) -
      (a.safetyScore +
        a.accessibility -
        parseTime(a.time))
  )[0];

  return {
    safest,
    fastest,
    balanced,
  };
};

const parseTime = (time: string) => {
  const match = time.match(/(\d+)h\s*(\d+)m/);

  if (!match) return 999;

  return (
    Number(match[1]) * 60 +
    Number(match[2])
  );
};