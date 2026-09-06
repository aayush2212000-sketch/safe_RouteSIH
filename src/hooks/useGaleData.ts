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
      const [fetchedAlerts, fetchedVehicles, fetchedPredictions] = await Promise.all([
        apiService.getAlerts(),
        apiService.getVehicles(),
        apiService.getPredictions()
      ]);

      setAlerts(fetchedAlerts);
      setVehicles(fetchedVehicles);
      setPredictions(fetchedPredictions);
    } catch (err) {
      console.error("Error fetching GALE data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Set up realtime subscriptions for live_alerts
    const alertSubscription = supabase
      .channel('public:live_alerts')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'live_alerts' }, payload => {
        console.log('Realtime Alert update!', payload);
        // Refresh everything (or we could optimistically update)
        fetchData(); 
      })
      .subscribe();

    return () => {
      supabase.removeChannel(alertSubscription);
    };
  }, []);

  return { alerts, vehicles, predictions, loading, refetch: fetchData };
};
