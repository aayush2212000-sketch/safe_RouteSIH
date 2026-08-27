

import React, { useEffect, useState } from 'react';
import { Brain, TrendingUp } from 'lucide-react';
import { apiService } from '../services/apiService';

export const AIPredictionPanel: React.FC<{ isDisaster: boolean }> = ({
  isDisaster
}) => {

  console.log("🔥 AI PREDICTION PANEL IS RUNNING");

  const [predictions, setPredictions] = useState<any>(null);

  useEffect(() => {
  apiService.getPredictions()
    .then((data) => {
      console.log("PREDICTIONS:", data);
      setPredictions(data);
    })
    .catch((error) => {
      console.error("PREDICTION ERROR:", error);
    });
}, []);

  return (
    <div className="bg-zinc-900 border border-blue-500 p-5 rounded-xl">

      <div className="flex items-center gap-2 mb-6 text-blue-400">
        <Brain size={18} />

        <h2 className="text-xs font-black uppercase tracking-widest">
          AI Disruption Forecast
        </h2>
      </div>

      {!predictions ? (

        <p className="text-yellow-400 text-sm">
          Loading AI predictions...
        </p>

      ) : (

        <>
          {/* RISK COUNTERS */}

          <div className="grid grid-cols-3 gap-2 mb-6">

            <div className="text-center p-3 bg-zinc-950 border border-zinc-800 rounded-lg">
              <p className="text-[9px] font-bold text-zinc-500 uppercase">
                High Risk
              </p>

              <p className="text-2xl font-black text-red-500">
                {isDisaster
                  ? 58
                  : predictions.nextHour.highRisk}
              </p>
            </div>


            <div className="text-center p-3 bg-zinc-950 border border-zinc-800 rounded-lg">

              <p className="text-[9px] font-bold text-zinc-500 uppercase">
                Moderate
              </p>

              <p className="text-2xl font-black text-orange-500">
                {isDisaster
                  ? 94
                  : predictions.nextHour.moderate}
              </p>

            </div>


            <div className="text-center p-3 bg-zinc-950 border border-zinc-800 rounded-lg">

              <p className="text-[9px] font-bold text-zinc-500 uppercase">
                Stable
              </p>

              <p className="text-2xl font-black text-emerald-500">
                {isDisaster
                  ? 12
                  : predictions.nextHour.low}
              </p>

            </div>

          </div>


          {/* CORRIDOR PREDICTIONS */}

          <div className="space-y-5">

            {predictions.alerts.map((alert: any) => (

              <div key={alert.id}>

                <div className="flex justify-between mb-2">

                  <span className="text-sm text-zinc-200 font-bold">
                    {alert.corridor}
                  </span>

                  <span className="text-sm text-orange-400 font-bold">
                    {isDisaster ? 98 : alert.prob}%
                  </span>

                </div>


                <div className="w-full bg-zinc-800 h-2 rounded-full">

                  <div
                    className={`h-2 rounded-full ${
                      isDisaster
                        ? 'bg-red-500'
                        : 'bg-orange-500'
                    }`}
                    style={{
                      width: `${
                        isDisaster
                          ? 98
                          : alert.prob
                      }%`
                    }}
                  />

                </div>

              </div>

            ))}

          </div>


          {/* CONFIDENCE */}

          <div className="mt-6 flex items-center gap-2 text-zinc-400">

            <TrendingUp size={16} />

            <span className="text-xs font-bold uppercase">
              Confidence:
              {' '}
              {isDisaster ? '99.2%' : '91.4%'}
            </span>

          </div>

        </>

      )}

    </div>
  );
};