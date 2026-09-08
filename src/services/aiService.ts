import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const aiService = {
  getAIRouteRisk: async (locationName: string, currentRainfall: number) => {
    if (!genAI) {
      console.warn('Gemini API key is missing. Using fallback logic.');
      return getFallbackRoutes();
    }

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });
      
      const prompt = `
        You are the AI routing core for G.A.L.E. (Disaster Management System).
        Analyze this location: ${locationName} with current rainfall of ${currentRainfall}mm.
        Provide an analysis of 3 critical logistics routes out of this zone.
        
        You MUST respond ONLY with a valid JSON array. Do not include markdown blocks, just the raw JSON.
        Expected Format:
        [
          {"routeName": "Route A (Highway 37)", "riskScore": 85, "status": "High Risk - Landslide Prone", "alternateSuggested": true},
          {"routeName": "Route B (State Road 4)", "riskScore": 20, "status": "Clear and Safe", "alternateSuggested": false},
          {"routeName": "Route C (River Waterway)", "riskScore": 50, "status": "Moderate Risk - Heavy Currents", "alternateSuggested": true}
        ]
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      let rawText = response.text();
      
      // Clean up the response just in case the model returns markdown code blocks
      rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      
      return JSON.parse(rawText);
    } catch (error) {
      console.error("AI Fetch Failed, falling back to mock data", error);
      return getFallbackRoutes();
    }
  }
};

function getFallbackRoutes() {
  return [
    { routeName: "Route A", riskScore: 50, status: "Using Mock Data", alternateSuggested: false },
    { routeName: "Route B", riskScore: 10, status: "Using Mock Data", alternateSuggested: false },
  ];
}
