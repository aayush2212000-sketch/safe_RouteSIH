export type RiskLevel = 'Low' | 'Moderate' | 'High' | 'Critical';
export type Status = 'Safe' | 'Warning' | 'Blocked' | 'Investigating';

export interface RoadSegment {
  id: string;
  name: string;
  status: Status;
  riskLevel: RiskLevel;
  accessibilityScore: number;
  landslideProb: number;
  floodProb: number;
  traffic: string;
  lastReport: string;
  coordinates: [number, number][];
}

export interface KPI {
  label: string;
  value: string | number;
  trend: number;
  status: 'stable' | 'warning' | 'critical';
}