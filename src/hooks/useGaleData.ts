import { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import { supabase } from '../services/supabaseClient';

export const useGaleData = () => {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [predictions, setPredictions] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Load database data first.
      // These should work even if Gemini fails.
      const [fetchedAlerts, fetchedVehicles] = await Promise.all([
        apiService.getAlerts(),
        apiService.getVehicles(),
      ]);

      console.log('ALERTS:', fetchedAlerts);
      console.log('VEHICLES:', fetchedVehicles);

      setAlerts(fetchedAlerts || []);
      setVehicles(fetchedVehicles || []);

      // Gemini predictions are optional.
      // A Gemini error should NOT prevent the map/database data from loading.
      try {
        const fetchedPredictions = await apiService.getPredictions();

        console.log('AI PREDICTIONS:', fetchedPredictions);

        setPredictions(fetchedPredictions);
      } catch (error) {
        console.error('Gemini prediction failed:', error);
        setPredictions(null);
      }

    } catch (err) {
      console.error('Error fetching GALE data:', err);

      // Keep the UI usable even if one database request fails.
      setAlerts([]);
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Realtime updates for live alerts
    const alertSubscription = supabase
      .channel('public:live_alerts')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'live_alerts',
        },
        (payload) => {
          console.log('Realtime Alert update!', payload);

          // Refresh database data
          fetchData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(alertSubscription);
    };
  }, []);

  return {
    alerts,
    vehicles,
    predictions,
    loading,
    refetch: fetchData,
  };
};