import { predictedRisks } from "../data/riskData";

export default function RiskPrediction() {
  return (
    <div className="p-4 bg-slate-900 rounded-xl border border-slate-700">
      <h2 className="text-xl font-bold text-white mb-4">
        AI Road Risk Prediction
      </h2>

      <div className="space-y-3">
        {predictedRisks.map((road) => {
          const { score, level } = road.prediction;

          let riskColor = "text-green-400";

          if (level === "MEDIUM") {
            riskColor = "text-yellow-400";
          }

          if (level === "HIGH") {
            riskColor = "text-orange-400";
          }

          if (level === "CRITICAL") {
            riskColor = "text-red-500";
          }

          return (
            <div
              key={road.id}
              className="p-3 rounded-lg bg-slate-800 border border-slate-700"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-white">
                    {road.road}
                  </p>

                  <p className="text-sm text-slate-400">
                    {road.location}
                  </p>
                </div>

                <div className="text-right">
                  <p className={`font-bold ${riskColor}`}>
                    {level}
                  </p>

                  <p className="text-sm text-slate-300">
                    Risk Score: {score}/100
                  </p>
                </div>
              </div>

              <div className="mt-3">
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      level === "CRITICAL"
                        ? "bg-red-500"
                        : level === "HIGH"
                        ? "bg-orange-500"
                        : level === "MEDIUM"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}