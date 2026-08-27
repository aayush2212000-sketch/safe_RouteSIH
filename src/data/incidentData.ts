export interface Incident {
  id: number;
  type: string;
  location: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  description: string;
  status: "Verified" | "Pending Verification" | "Resolved";
  time: string;
  coordinates: [number, number];
}

export const incidentData: Incident[] = [
  {
    id: 1,
    type: "Landslide",
    location: "NH-6, Sonapur",
    severity: "Critical",
    description: "Major landslide blocking one side of the highway.",
    status: "Verified",
    time: "10 min ago",
    coordinates: [24.82, 92.80]
  },
  {
    id: 2,
    type: "Flood",
    location: "NH-37, Nagaon",
    severity: "High",
    description: "Waterlogging reported after heavy rainfall.",
    status: "Verified",
    time: "18 min ago",
    coordinates: [26.35, 92.68]
  },
  {
    id: 3,
    type: "Road Blockage",
    location: "NH-6, Khliehriat",
    severity: "High",
    description: "Fallen rocks blocking part of the road.",
    status: "Verified",
    time: "25 min ago",
    coordinates: [25.15, 92.40]
  },
  {
    id: 4,
    type: "Accident",
    location: "NH-27, Guwahati",
    severity: "Medium",
    description: "Minor collision causing traffic slowdown.",
    status: "Pending Verification",
    time: "32 min ago",
    coordinates: [26.14, 91.73]
  },
  {
    id: 5,
    type: "Heavy Traffic",
    location: "NH-37, Jorhat",
    severity: "Medium",
    description: "Traffic congestion reported near Jorhat.",
    status: "Verified",
    time: "41 min ago",
    coordinates: [26.75, 94.20]
  },
  {
    id: 6,
    type: "Landslide",
    location: "NH-10, Gangtok",
    severity: "High",
    description: "Slope movement detected near hill section.",
    status: "Verified",
    time: "48 min ago",
    coordinates: [27.33, 88.61]
  },
  {
    id: 7,
    type: "Road Damage",
    location: "NH-29, Kohima",
    severity: "Medium",
    description: "Road surface damaged due to continuous rainfall.",
    status: "Pending Verification",
    time: "55 min ago",
    coordinates: [25.67, 94.10]
  },
  {
    id: 8,
    type: "Flood",
    location: "NH-17, Goalpara",
    severity: "High",
    description: "Floodwater approaching the highway.",
    status: "Verified",
    time: "1 hr ago",
    coordinates: [25.98, 90.95]
  },
  {
    id: 9,
    type: "Landslide",
    location: "NH-13, Tawang",
    severity: "Critical",
    description: "Large slope instability detected.",
    status: "Verified",
    time: "1 hr ago",
    coordinates: [27.58, 91.86]
  },
  {
    id: 10,
    type: "Road Blockage",
    location: "NH-306, Aizawl",
    severity: "High",
    description: "Debris partially blocking the route.",
    status: "Pending Verification",
    time: "1 hr ago",
    coordinates: [23.73, 92.72]
  },
  {
    id: 11,
    type: "Heavy Traffic",
    location: "NH-2, Imphal",
    severity: "Medium",
    description: "Slow-moving traffic reported.",
    status: "Verified",
    time: "1 hr ago",
    coordinates: [24.82, 93.94]
  },
  {
    id: 12,
    type: "Flood",
    location: "NH-37, Dibrugarh",
    severity: "High",
    description: "Water level increasing near vulnerable road section.",
    status: "Verified",
    time: "2 hrs ago",
    coordinates: [27.48, 94.91]
  },
  {
    id: 13,
    type: "Landslide",
    location: "NH-15, Tinsukia",
    severity: "High",
    description: "Small landslide reported beside the highway.",
    status: "Pending Verification",
    time: "2 hrs ago",
    coordinates: [27.55, 95.36]
  },
  {
    id: 14,
    type: "Accident",
    location: "NH-44, Shillong",
    severity: "Medium",
    description: "Vehicle accident causing temporary slowdown.",
    status: "Resolved",
    time: "2 hrs ago",
    coordinates: [25.57, 91.88]
  },
  {
    id: 15,
    type: "Road Damage",
    location: "NH-15, Itanagar",
    severity: "High",
    description: "Road surface deterioration reported.",
    status: "Verified",
    time: "3 hrs ago",
    coordinates: [27.08, 93.60]
  },
  {
    id: 16,
    type: "Flood",
    location: "NH-208, Tripura",
    severity: "Medium",
    description: "Waterlogging affecting roadside access.",
    status: "Verified",
    time: "3 hrs ago",
    coordinates: [24.00, 91.50]
  },
  {
    id: 17,
    type: "Landslide",
    location: "NH-2, Manipur",
    severity: "High",
    description: "Rockfall reported along hill corridor.",
    status: "Pending Verification",
    time: "4 hrs ago",
    coordinates: [25.15, 94.10]
  },
  {
    id: 18,
    type: "Heavy Traffic",
    location: "NH-27, Bongaigaon",
    severity: "Medium",
    description: "High traffic volume causing delays.",
    status: "Verified",
    time: "4 hrs ago",
    coordinates: [26.02, 91.20]
  },
  {
    id: 19,
    type: "Road Blockage",
    location: "NH-315, Khonsa",
    severity: "High",
    description: "Fallen tree blocking one lane.",
    status: "Pending Verification",
    time: "5 hrs ago",
    coordinates: [27.00, 95.90]
  },
  {
    id: 20,
    type: "Landslide",
    location: "NH-717A, Sikkim",
    severity: "Medium",
    description: "Minor slope movement observed.",
    status: "Verified",
    time: "5 hrs ago",
    coordinates: [27.55, 88.75]
  }
];