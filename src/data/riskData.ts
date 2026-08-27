import { calculateRisk } from "../utils/riskPrediction";

export const roadRiskData = [
  {
    id: "NH-6-01",
    road: "NH-6",
    location: "Dima Hasao",
    rainfall: 90,
    floodRisk: 70,
    landslideRisk: 85,
    roadCondition: 65,
    traffic: 60,
  },
  {
    id: "NH-37-01",
    road: "NH-37",
    location: "Guwahati",
    rainfall: 55,
    floodRisk: 60,
    landslideRisk: 40,
    roadCondition: 35,
    traffic: 70,
  },
  {
    id: "NH-44-01",
    road: "NH-44",
    location: "Tripura",
    rainfall: 30,
    floodRisk: 25,
    landslideRisk: 20,
    roadCondition: 30,
    traffic: 40,
  },
];

export const predictedRisks = roadRiskData.map((road) => ({
  ...road,
  prediction: calculateRisk({
    rainfall: road.rainfall,
    floodRisk: road.floodRisk,
    landslideRisk: road.landslideRisk,
    roadCondition: road.roadCondition,
    traffic: road.traffic,
  }),
}));