const API_URL = "http://localhost:8080";

export const apiService = {

  // Real data from Spring Boot + MySQL
  getRoads: async () => {
    const response = await fetch(`${API_URL}/api/roads`);

    if (!response.ok) {
      throw new Error("Failed to fetch roads from backend");
    }

    return response.json();
  },

  // Keep these as mock data for now
  getVehicles: async () => {
    return [
      {
        id: "M-204",
        cargo: "Medicines",
        origin: "Guwahati",
        dest: "Aizawl",
        eta: "3h 42m",
        risk: "HIGH"
      },
      {
        id: "F-102",
        cargo: "Food Grains",
        origin: "Siliguri",
        dest: "Gangtok",
        eta: "1h 15m",
        risk: "LOW"
      }
    ];
  },

  getDistricts: async () => {
    return [
      {
        id: "1",
        name: "Aizawl",
        connectivity: 61,
        isolationRisk: 78,
        status: "ORANGE",
        pop: "84k"
      },
      {
        id: "2",
        name: "Tawang",
        connectivity: 42,
        isolationRisk: 91,
        status: "RED",
        pop: "49k"
      },
      {
        id: "3",
        name: "East Khasi Hills",
        connectivity: 88,
        isolationRisk: 12,
        status: "GREEN",
        pop: "825k"
      }
    ];
  },

  getPredictions: async () => {
    return {
      nextHour: {
        highRisk: 17,
        moderate: 31,
        low: 284
      },

      alerts: [
        {
          id: 1,
          corridor: "Aizawl Corridor",
          prob: 87,
          risk: "Critical"
        },
        {
          id: 2,
          corridor: "Imphal-Ukhrul",
          prob: 72,
          risk: "High"
        }
      ]
    };
  }

};