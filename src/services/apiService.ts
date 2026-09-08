import { supabase } from './supabaseClient';

export const apiService = {

  // =========================================================
  // FETCH LIVE ALERTS FROM SUPABASE
  // =========================================================
  getAlerts: async () => {
    console.log("GET ALERTS: starting...");

    const { data, error } = await supabase
      .from('live_alerts')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error("GET ALERTS ERROR:", error);
      return [];
    }

    console.log("GET ALERTS RAW DATA:", data);

    return (data || []).map((alert: any) => {
      let coordinates = null;

      try {
        if (typeof alert.coordinates === 'string') {
          const parsed = JSON.parse(alert.coordinates);

          if (parsed?.coordinates) {
            coordinates = {
              lat: parsed.coordinates[1],
              lng: parsed.coordinates[0],
            };
          }
        } else if (alert.coordinates?.coordinates) {
          coordinates = {
            lat: alert.coordinates.coordinates[1],
            lng: alert.coordinates.coordinates[0],
          };
        }
      } catch (error) {
        console.error(
          "COORDINATE PARSE ERROR:",
          error,
          alert.coordinates
        );
      }

      return {
        ...alert,
        coordinates,
      };
    });
  },


  // =========================================================
  // SUBMIT CITIZEN ALERT
  // =========================================================
  submitAlert: async (report: any) => {

    if (!report.coordinates) {
      throw new Error("Coordinates required");
    }

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
          coordinates:
            `SRID=4326;POINT(${report.coordinates.lng} ${report.coordinates.lat})`
        }
      ])
      .select();

    if (error) {
      console.error(
        "ERROR SUBMITTING ALERT:",
        error
      );

      throw error;
    }

    return data;
  },


  // =========================================================
  // UPDATE ALERT STATUS
  // =========================================================
  updateAlertStatus: async (
    id: number,
    status: string
  ) => {

    const { data, error } = await supabase
      .from('live_alerts')
      .update({ status })
      .eq('id', id)
      .select();

    if (error) {
      console.error(
        "ERROR UPDATING ALERT:",
        error
      );

      throw error;
    }

    return data;
  },


  // =========================================================
  // FETCH VEHICLES / LOGISTICS
  // =========================================================
  getVehicles: async () => {

    console.log("GET VEHICLES: starting...");

    const { data, error } = await supabase
      .from('tracking_routes')
      .select('*');

    if (error) {
      console.error(
        "GET VEHICLES ERROR:",
        error
      );

      return [];
    }

    console.log(
      "GET VEHICLES RAW DATA:",
      data
    );

    return data || [];
  },


  // =========================================================
  // GEMINI TEMPORARILY DISABLED
  // =========================================================
  // We are disabling Gemini temporarily because the API
  // is returning HTTP 429 (rate limit / quota).
  //
  // This DOES NOT affect Supabase/database data.
  // =========================================================
  getPredictions: async () => {

    console.log(
      "GEMINI DISABLED FOR TESTING"
    );

    return {
      nextHour: {
        highRisk: 17,
        moderate: 31,
        low: 284
      },

      alerts: [],

      aiRoutes: []
    };
  }

};