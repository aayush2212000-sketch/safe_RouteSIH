import React from 'react';
import { Zap, CornerRightUp } from 'lucide-react';

interface AIActionRecommendationProps {
  isDisaster: boolean;
  onExecute: () => void;
}

export const AIActionRecommendation: React.FC<AIActionRecommendationProps> = ({
  isDisaster,
  onExecute
}) => {

  const recommendations = isDisaster
    ? [
        "Reroute all vehicles from NH-6 immediately",
        "Prioritize Medicine V-101 via NH-44 alternative",
        "Deploy disaster response teams to Jowai",
        "Monitor Sonapur Tunnel for total isolation"
      ]
    : [
        "NH-37: Watch Kaziranga water levels",
        "Optimize delivery sequence for Aizawl",
        "Maintain standard medical supply chain"
      ];

  return (
    <div className="bg-orange-600/10 border border-orange-500/30 p-5 rounded-xl">

      <div className="flex items-center gap-2 mb-4 text-orange-500 font-black text-xs uppercase tracking-widest">
        <Zap size={16} fill="currentColor" />
        AI Action Recommendations
      </div>

      <div className="space-y-3">

        {recommendations.map((rec, i) => (
          <div key={i} className="flex gap-3 items-start">

            <CornerRightUp
              size={14}
              className="mt-0.5 text-zinc-600 shrink-0"
            />

            <p className="text-xs font-semibold text-zinc-200 leading-tight">
              {rec}
            </p>

          </div>
        ))}

      </div>

      <button
        onClick={onExecute}
        className="w-full mt-6 bg-orange-600 hover:bg-orange-500 text-white font-bold text-[10px] uppercase py-3 rounded transition-all shadow-lg shadow-orange-900/20"
      >
        Execute AI Protocol
      </button>

    </div>
  );
};