export type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

interface RiskInput {
  rainfall: number;
  floodRisk: number;
  landslideRisk: number;
  roadCondition: number;
  traffic: number;
}

export function calculateRisk(input: RiskInput) {
  const score =
    input.rainfall * 0.25 +
    input.floodRisk * 0.20 +
    input.landslideRisk * 0.25 +
    input.roadCondition * 0.15 +
    input.traffic * 0.15;

  let level: RiskLevel;

  if (score < 25) {
    level = "LOW";
  } else if (score < 50) {
    level = "MEDIUM";
  } else if (score < 75) {
    level = "HIGH";
  } else {
    level = "CRITICAL";
  }

  return {
    score: Math.round(score),
    level,
  };
}

export function getRiskExplanation(input: {
  rainfall: number;
  floodRisk: number;
  landslideRisk: number;
  roadCondition: number;
  traffic: number;
}) {
  const reasons: string[] = [];

  if (input.rainfall >= 70) {
    reasons.push("🌧 Heavy rainfall detected");
  } else if (input.rainfall >= 40) {
    reasons.push("🌧 Moderate rainfall detected");
  }

  if (input.floodRisk >= 70) {
    reasons.push("🌊 High flood risk");
  } else if (input.floodRisk >= 40) {
    reasons.push("🌊 Moderate flood risk");
  }

  if (input.landslideRisk >= 70) {
    reasons.push("🪨 High landslide probability");
  } else if (input.landslideRisk >= 40) {
    reasons.push("🪨 Moderate landslide probability");
  }

  if (input.roadCondition >= 70) {
    reasons.push("🚧 Poor road condition");
  } else if (input.roadCondition >= 40) {
    reasons.push("🚧 Road condition requires monitoring");
  }

  if (input.traffic >= 70) {
    reasons.push("🚚 Heavy traffic detected");
  }

  if (reasons.length === 0) {
    reasons.push("✅ No major risk factors detected");
  }

  return reasons;
}