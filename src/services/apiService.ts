import { supabase } from './supabaseClient';
import { aiService } from './aiService';

export const apiService = {

  // Fetch Live Alerts (Incidents) from Supabase
  getAlerts: async () => {
    const { data, error } = await supabase
      .from('live_alerts')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error("Error fetching live alerts:", error.message);
      return [];
    }
    
    // Parse GeoJSON coordinates
    return data.map(alert => ({
      ...alert,
      coordinates: typeof alert.coordinates === 'string' 
        ? JSON.parse(alert.coordinates).coordinates // PostgREST sometimes returns stringified GeoJSON
        : alert.coordinates?.coordinates // If already parsed by Supabase JS [lng, lat]
          ? { lat: alert.coordinates.coordinates[1], lng: alert.coordinates.coordinates[0] }
          : null
    }));
  },

  submitAlert: async (report: any) => {
    if (!report.coordinates) throw new Error("Coordinates required");
    
    // Insert using GeoJSON point
    const { data, error } = await supabase
      .from('live_alerts')
      .insert([
        {
          type: report.type,
          location: report.location,
          severity: report.severity,
          description: report.description,
          status: 'Pending Verification',
          time: new Date().toLocaleTimeString(),
          coordinates: `SRID=4326;POINT(${report.coordinates.lng} ${report.coordinates.lat})` 
        }
      ])
      .select();

    if (error) {
      console.error("Error submitting alert:", error.message);
      throw error;
    }
    return data;
  },

  updateAlertStatus: async (id: number, status: string) => {
    const { data, error } = await supabase
      .from('live_alerts')
      .update({ status })
      .eq('id', id)
      .select();

    if (error) {
      console.error("Error updating alert:", error.message);
      throw error;
    }
    return data;
  },

  // Fetch vehicles/logistics from Supabase
  getVehicles: async () => {
    const { data, error } = await supabase
      .from('tracking_routes')
      .select('*');

    if (error) {
      console.error("Error fetching vehicles:", error.message);
      return [];
    }
    
    return data;
  },

  getPredictions: async () => {
    // Dynamically call Gemini API
    const aiRoutes = await aiService.getAIRouteRisk("Aizawl Corridor", 120);

    const alerts = aiRoutes.map((route: any, index: number) => ({
      id: index + 1,
      corridor: route.routeName,
      prob: route.riskScore,
      risk: route.status
    }));

    return {
      nextHour: {
        highRisk: 17,
        moderate: 31,
        low: 284
      },
      alerts,
      aiRoutes
    };
  }

};