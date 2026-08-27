import type { RoadSegment } from "../types";

/* =========================================================
   NER ROAD NETWORK
   ========================================================= */

export const roadData: RoadSegment[] = [

  {
    id: "NH-27-01",
    name: "NH-27 — Guwahati–Bongaigaon",
    status: "Safe",
    riskLevel: "Low",
    accessibilityScore: 91,
    landslideProb: 8,
    floodProb: 18,
    traffic: "Moderate",
    lastReport: "Normal traffic flow",
    coordinates: [
      [26.1445, 91.7362],
      [26.05, 91.48],
      [26.02, 91.20]
    ]
  },

  {
    id: "NH-27-02",
    name: "NH-27 — Bongaigaon–Siliguri Corridor",
    status: "Warning",
    riskLevel: "Moderate",
    accessibilityScore: 76,
    landslideProb: 12,
    floodProb: 48,
    traffic: "Heavy",
    lastReport: "Heavy rainfall and slow traffic reported",
    coordinates: [
      [26.02, 91.20],
      [26.35, 90.55],
      [26.72, 89.95]
    ]
  },

  {
    id: "NH-17-01",
    name: "NH-17 — Guwahati–Goalpara",
    status: "Safe",
    riskLevel: "Low",
    accessibilityScore: 89,
    landslideProb: 6,
    floodProb: 25,
    traffic: "Moderate",
    lastReport: "Road operating normally",
    coordinates: [
      [26.1445, 91.7362],
      [26.10, 91.55],
      [25.98, 90.95]
    ]
  },

  {
    id: "NH-17-02",
    name: "NH-17 — Goalpara–Dhupdhara",
    status: "Warning",
    riskLevel: "Moderate",
    accessibilityScore: 72,
    landslideProb: 10,
    floodProb: 58,
    traffic: "Heavy",
    lastReport: "Waterlogging reported in low-lying sections",
    coordinates: [
      [25.98, 90.95],
      [26.00, 90.65],
      [25.90, 90.35]
    ]
  },

  {
    id: "NH-37-01",
    name: "NH-37 — Guwahati–Nagaon",
    status: "Warning",
    riskLevel: "Moderate",
    accessibilityScore: 78,
    landslideProb: 18,
    floodProb: 45,
    traffic: "Heavy",
    lastReport: "Water logging reported near Nagaon",
    coordinates: [
      [26.14, 91.73],
      [26.00, 92.20],
      [26.35, 92.68]
    ]
  },

  {
    id: "NH-37-02",
    name: "NH-37 — Nagaon–Jorhat",
    status: "Safe",
    riskLevel: "Low",
    accessibilityScore: 86,
    landslideProb: 14,
    floodProb: 32,
    traffic: "Moderate",
    lastReport: "Traffic moving normally",
    coordinates: [
      [26.35, 92.68],
      [26.65, 93.30],
      [26.75, 94.20]
    ]
  },

  {
    id: "NH-37-03",
    name: "NH-37 — Jorhat–Dibrugarh",
    status: "Warning",
    riskLevel: "Moderate",
    accessibilityScore: 74,
    landslideProb: 11,
    floodProb: 51,
    traffic: "Heavy",
    lastReport: "Flood-prone sections under monitoring",
    coordinates: [
      [26.75, 94.20],
      [27.00, 94.60],
      [27.48, 94.91]
    ]
  },

  {
    id: "NH-15-01",
    name: "NH-15 — Dibrugarh–Tinsukia",
    status: "Safe",
    riskLevel: "Low",
    accessibilityScore: 88,
    landslideProb: 9,
    floodProb: 38,
    traffic: "Moderate",
    lastReport: "Normal operations",
    coordinates: [
      [27.48, 94.91],
      [27.50, 95.00],
      [27.55, 95.36]
    ]
  },

  {
    id: "NH-15-02",
    name: "NH-15 — Tinsukia–Doomdooma",
    status: "Warning",
    riskLevel: "Moderate",
    accessibilityScore: 70,
    landslideProb: 15,
    floodProb: 55,
    traffic: "Heavy",
    lastReport: "Rainfall causing reduced visibility",
    coordinates: [
      [27.55, 95.36],
      [27.45, 95.65],
      [27.30, 95.75]
    ]
  },

  {
    id: "NH-6-01",
    name: "NH-6 — Jowai–Khliehriat",
    status: "Warning",
    riskLevel: "High",
    accessibilityScore: 61,
    landslideProb: 67,
    floodProb: 25,
    traffic: "Heavy",
    lastReport: "Slope instability detected",
    coordinates: [
      [25.45, 92.20],
      [25.30, 92.32],
      [25.15, 92.40]
    ]
  },

  {
    id: "NH-6-02",
    name: "NH-6 — Khliehriat–Sonapur",
    status: "Blocked",
    riskLevel: "Critical",
    accessibilityScore: 15,
    landslideProb: 88,
    floodProb: 20,
    traffic: "Stationary",
    lastReport: "Major landslide reported near Sonapur Tunnel",
    coordinates: [
      [25.15, 92.40],
      [25.00, 92.55],
      [24.82, 92.80]
    ]
  },

  {
    id: "NH-6-03",
    name: "NH-6 — Sonapur–Silchar",
    status: "Warning",
    riskLevel: "High",
    accessibilityScore: 55,
    landslideProb: 72,
    floodProb: 28,
    traffic: "Heavy",
    lastReport: "Multiple vulnerable hill sections",
    coordinates: [
      [24.82, 92.80],
      [24.65, 92.90],
      [24.83, 92.78]
    ]
  },

  {
    id: "NH-44-01",
    name: "NH-44 — Shillong–Dawki",
    status: "Safe",
    riskLevel: "Low",
    accessibilityScore: 90,
    landslideProb: 15,
    floodProb: 12,
    traffic: "Light",
    lastReport: "Clear route",
    coordinates: [
      [25.57, 91.88],
      [25.30, 91.75],
      [25.18, 91.63]
    ]
  },

  {
    id: "NH-44-02",
    name: "NH-44 — Shillong–Agartala",
    status: "Safe",
    riskLevel: "Low",
    accessibilityScore: 92,
    landslideProb: 12,
    floodProb: 5,
    traffic: "Light",
    lastReport: "Clear skies and no obstructions",
    coordinates: [
      [25.57, 91.88],
      [24.30, 91.83],
      [23.83, 91.28]
    ]
  },

  {
    id: "NH-208-01",
    name: "NH-208 — Tripura Corridor",
    status: "Warning",
    riskLevel: "Moderate",
    accessibilityScore: 73,
    landslideProb: 20,
    floodProb: 42,
    traffic: "Moderate",
    lastReport: "Rainfall affecting road conditions",
    coordinates: [
      [24.00, 91.50],
      [23.85, 91.60],
      [23.75, 91.70]
    ]
  },

  {
    id: "NH-306-01",
    name: "NH-306 — Silchar–Aizawl",
    status: "Warning",
    riskLevel: "High",
    accessibilityScore: 58,
    landslideProb: 76,
    floodProb: 22,
    traffic: "Heavy",
    lastReport: "Landslide-prone hill corridor",
    coordinates: [
      [24.82, 92.80],
      [24.55, 92.75],
      [23.73, 92.72]
    ]
  },

  {
    id: "NH-2-01",
    name: "NH-2 — Imphal–Kohima",
    status: "Warning",
    riskLevel: "High",
    accessibilityScore: 60,
    landslideProb: 69,
    floodProb: 18,
    traffic: "Moderate",
    lastReport: "Rockfall risk reported",
    coordinates: [
      [24.82, 93.94],
      [25.15, 94.10],
      [25.67, 94.10]
    ]
  },

  {
    id: "NH-2-02",
    name: "NH-2 — Kohima–Dimapur",
    status: "Safe",
    riskLevel: "Low",
    accessibilityScore: 83,
    landslideProb: 32,
    floodProb: 15,
    traffic: "Moderate",
    lastReport: "Normal traffic",
    coordinates: [
      [25.67, 94.10],
      [25.90, 93.72],
      [25.90, 93.73]
    ]
  },

  {
    id: "NH-29-01",
    name: "NH-29 — Dimapur–Kohima",
    status: "Warning",
    riskLevel: "Moderate",
    accessibilityScore: 75,
    landslideProb: 42,
    floodProb: 14,
    traffic: "Heavy",
    lastReport: "Traffic congestion near Kohima",
    coordinates: [
      [25.90, 93.73],
      [25.72, 94.05],
      [25.67, 94.10]
    ]
  },

  {
    id: "NH-15-03",
    name: "NH-15 — Itanagar Corridor",
    status: "Warning",
    riskLevel: "High",
    accessibilityScore: 63,
    landslideProb: 71,
    floodProb: 30,
    traffic: "Moderate",
    lastReport: "Hill road vulnerability increasing",
    coordinates: [
      [27.08, 93.60],
      [27.20, 93.70],
      [27.40, 93.80]
    ]
  },

  {
    id: "NH-13-01",
    name: "NH-13 — Tawang Corridor",
    status: "Blocked",
    riskLevel: "Critical",
    accessibilityScore: 35,
    landslideProb: 84,
    floodProb: 10,
    traffic: "Light",
    lastReport: "Extreme terrain and landslide probability",
    coordinates: [
      [27.58, 91.86],
      [27.55, 92.00],
      [27.60, 92.20]
    ]
  },

  {
    id: "NH-10-01",
    name: "NH-10 — Gangtok–Siliguri",
    status: "Warning",
    riskLevel: "High",
    accessibilityScore: 59,
    landslideProb: 73,
    floodProb: 20,
    traffic: "Heavy",
    lastReport: "Slope failure risk under observation",
    coordinates: [
      [27.33, 88.61],
      [27.20, 88.55],
      [26.90, 88.45]
    ]
  },

  {
    id: "NH-717A-01",
    name: "NH-717A — Sikkim Corridor",
    status: "Safe",
    riskLevel: "Low",
    accessibilityScore: 82,
    landslideProb: 35,
    floodProb: 18,
    traffic: "Light",
    lastReport: "Route operational",
    coordinates: [
      [27.25, 88.62],
      [27.45, 88.70],
      [27.55, 88.75]
    ]
  },

  {
    id: "NH-102-01",
    name: "NH-102 — Imphal–Moreh",
    status: "Safe",
    riskLevel: "Low",
    accessibilityScore: 81,
    landslideProb: 25,
    floodProb: 22,
    traffic: "Moderate",
    lastReport: "Border corridor operational",
    coordinates: [
      [24.82, 93.94],
      [24.65, 94.05],
      [24.25, 94.30]
    ]
  },

  {
    id: "NH-315-01",
    name: "NH-315 — Tinsukia–Khonsa",
    status: "Warning",
    riskLevel: "High",
    accessibilityScore: 57,
    landslideProb: 78,
    floodProb: 25,
    traffic: "Light",
    lastReport: "Remote hill sections under monitoring",
    coordinates: [
      [27.55, 95.36],
      [27.30, 95.70],
      [27.00, 95.90]
    ]
  },

  {
    id: "NH-515-01",
    name: "NH-515 — Assam–Arunachal Corridor",
    status: "Safe",
    riskLevel: "Low",
    accessibilityScore: 84,
    landslideProb: 30,
    floodProb: 27,
    traffic: "Moderate",
    lastReport: "Normal operations",
    coordinates: [
      [27.30, 95.00],
      [27.40, 95.20],
      [27.50, 95.40]
    ]
  }

];


/* =========================================================
   VEHICLE / LOGISTICS DATA
   ========================================================= */

export const vehicleData = [

  {
    id: "V-101",
    type: "Medicine",
    cargo: "Vaccines",
    location: [26.10, 91.80],
    status: "Moving"
  },

  {
    id: "V-102",
    type: "Food",
    cargo: "Grains",
    location: [25.20, 92.50],
    status: "Delayed"
  },

  {
    id: "V-103",
    type: "Emergency",
    cargo: "Oxygen Tankers",
    location: [24.50, 92.70],
    status: "Stopped"
  },

  {
    id: "V-104",
    type: "Medicine",
    cargo: "Insulin",
    location: [26.30, 91.60],
    status: "Moving"
  },

  {
    id: "V-105",
    type: "Food",
    cargo: "Rice",
    location: [26.60, 93.20],
    status: "Moving"
  },

  {
    id: "V-106",
    type: "Emergency",
    cargo: "Medical Equipment",
    location: [25.60, 94.10],
    status: "Delayed"
  },

  {
    id: "V-107",
    type: "Construction",
    cargo: "Bridge Materials",
    location: [27.40, 94.80],
    status: "Moving"
  },

  {
    id: "V-108",
    type: "Medicine",
    cargo: "Antibiotics",
    location: [24.80, 93.90],
    status: "Moving"
  },

  {
    id: "V-109",
    type: "Food",
    cargo: "Emergency Rations",
    location: [23.80, 91.30],
    status: "Delayed"
  },

  {
    id: "V-110",
    type: "Emergency",
    cargo: "Oxygen Cylinders",
    location: [27.30, 88.60],
    status: "Moving"
  },

  {
    id: "V-111",
    type: "Medicine",
    cargo: "Vaccines",
    location: [26.80, 94.20],
    status: "Moving"
  },

  {
    id: "V-112",
    type: "Food",
    cargo: "Rice Bags",
    location: [25.90, 93.70],
    status: "Moving"
  },

  {
    id: "V-113",
    type: "Emergency",
    cargo: "First Aid Kits",
    location: [27.10, 93.60],
    status: "Stopped"
  },

  {
    id: "V-114",
    type: "Medicine",
    cargo: "Insulin",
    location: [24.70, 92.80],
    status: "Moving"
  },

  {
    id: "V-115",
    type: "Food",
    cargo: "Baby Food",
    location: [26.00, 91.20],
    status: "Moving"
  },

  {
    id: "V-116",
    type: "Emergency",
    cargo: "Rescue Equipment",
    location: [25.70, 94.00],
    status: "Delayed"
  },

  {
    id: "V-117",
    type: "Construction",
    cargo: "Road Repair Material",
    location: [25.40, 92.30],
    status: "Moving"
  },

  {
    id: "V-118",
    type: "Medicine",
    cargo: "Emergency Medicines",
    location: [24.90, 93.90],
    status: "Moving"
  },

  {
    id: "V-119",
    type: "Food",
    cargo: "Drinking Water",
    location: [27.50, 95.35],
    status: "Delayed"
  },

  {
    id: "V-120",
    type: "Emergency",
    cargo: "Disaster Relief Kit",
    location: [27.60, 91.90],
    status: "Moving"
  }

];


/* =========================================================
   DISTRICT DATA
   ========================================================= */

export const districtData = [

  { name: "Guwahati", risk: "Moderate", connectivity: 92, isolationRisk: 12 },
  { name: "Shillong", risk: "Low", connectivity: 88, isolationRisk: 18 },
  { name: "Aizawl", risk: "High", connectivity: 61, isolationRisk: 78 },
  { name: "Imphal", risk: "Moderate", connectivity: 72, isolationRisk: 45 },
  { name: "Kohima", risk: "High", connectivity: 55, isolationRisk: 70 },
  { name: "Dimapur", risk: "Low", connectivity: 86, isolationRisk: 20 },
  { name: "Itanagar", risk: "High", connectivity: 63, isolationRisk: 58 },
  { name: "Tawang", risk: "Critical", connectivity: 42, isolationRisk: 91 },
  { name: "Gangtok", risk: "Moderate", connectivity: 68, isolationRisk: 55 },
  { name: "Agartala", risk: "Low", connectivity: 90, isolationRisk: 10 },
  { name: "Silchar", risk: "High", connectivity: 58, isolationRisk: 72 },
  { name: "Dibrugarh", risk: "Moderate", connectivity: 80, isolationRisk: 30 },
  { name: "Jorhat", risk: "Low", connectivity: 84, isolationRisk: 22 },
  { name: "Nagaon", risk: "Moderate", connectivity: 77, isolationRisk: 28 },
  { name: "Tinsukia", risk: "High", connectivity: 69, isolationRisk: 45 },
  { name: "Tezpur", risk: "Moderate", connectivity: 79, isolationRisk: 35 },
  { name: "Goalpara", risk: "High", connectivity: 64, isolationRisk: 61 },
  { name: "Bongaigaon", risk: "Moderate", connectivity: 75, isolationRisk: 32 },
  { name: "Mokokchung", risk: "Moderate", connectivity: 62, isolationRisk: 56 },
  { name: "Mon", risk: "High", connectivity: 48, isolationRisk: 79 },
  { name: "Lunglei", risk: "High", connectivity: 52, isolationRisk: 75 },
  { name: "Champhai", risk: "Moderate", connectivity: 65, isolationRisk: 60 },
  { name: "Churachandpur", risk: "High", connectivity: 58, isolationRisk: 67 },
  { name: "Ukhrul", risk: "High", connectivity: 45, isolationRisk: 83 },
  { name: "West Siang", risk: "High", connectivity: 51, isolationRisk: 76 },
  { name: "Bomdila", risk: "Critical", connectivity: 39, isolationRisk: 88 },
  { name: "Namchi", risk: "Moderate", connectivity: 70, isolationRisk: 45 },
  { name: "Mamit", risk: "High", connectivity: 54, isolationRisk: 73 },
  { name: "Khliehriat", risk: "High", connectivity: 59, isolationRisk: 65 },
  { name: "Dawki", risk: "Low", connectivity: 82, isolationRisk: 30 },
  { name: "Karimganj", risk: "Moderate", connectivity: 74, isolationRisk: 38 }
];