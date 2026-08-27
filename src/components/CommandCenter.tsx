import React, { useState } from 'react';

import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { KPISection } from './KPISection';
import { MainMap } from './MainMap';
import { AIPredictionPanel } from './AIPredictionPanel';
import { AIActionRecommendation } from './AIActionRecommendation';
import { DemoControls } from './DemoControls';
import { LiveLogistics } from './LiveLogistics';
import RiskPrediction from "./RiskPrediction";
import CitizenReport from "./CitizenReport";
import IncidentFeed from "./IncidentFeed";
import ReportsPage from "./ReportsPage";
import RoutePlanner from "./RoutePlanner";

export const CommandCenter: React.FC = () => {

  // Disaster mode
  const [isDisasterMode, setIsDisasterMode] = useState(false);
  const [activePage, setActivePage] = useState('Command Center');
  const [reports, setReports] = useState<any[]>([]);
  const handleReportSubmit = (report: any) => {
  setReports((prev) => [report, ...prev]);
           };

           const handleStatusChange = (id: number, status: string) => {
  setReports((prev) =>
    prev.map((report) =>
      report.id === id
        ? { ...report, status }
        : report
    )
  );
};

  // Selected road
  const [selectedRoad, setSelectedRoad] = useState<any>(null);
  const [selectedRoute, setSelectedRoute] = useState<any>(null);
  const [protocolActive, setProtocolActive] = useState(false);


  // Execute AI Protocol
  const executeAIProtocol = () => {
  setProtocolActive(true);

  alert(
    "🚨 AI PROTOCOL EXECUTED\n\n" +
    "✓ NH-6 marked as BLOCKED\n" +
    "✓ Vehicles rerouted to NH-44\n" +
    "✓ Medicine V-101 prioritized\n" +
    "✓ Disaster response teams deployed to Jowai"
  );
};

  return (
     
    <div className="flex h-screen w-screen bg-[#09090b] text-zinc-100 overflow-hidden font-sans">
        
      {/* LEFT SIDEBAR */}

      <Sidebar
   activePage={activePage}
   onPageChange={setActivePage}
    />

    {/* Status banner */}
    {protocolActive && (
  <div className="absolute top-16 left-1/2 -translate-x-1/2 z-[1000] 
                  bg-red-600 text-white px-6 py-3 rounded-lg 
                  shadow-lg font-bold text-xs uppercase tracking-wider">
    🚨 Emergency AI Protocol Active
  </div>
)}

      {/* MAIN AREA */}

      <main className="flex-1 flex flex-col relative overflow-hidden">
  

        {/* TOP NAV */}

        <TopNav
          isDisaster={isDisasterMode}
        />


        {/* CONTENT */}
         {activePage === 'Reports' ? (
  <ReportsPage
    reports={reports}
    onReportSubmit={handleReportSubmit}
    onStatusChange={handleStatusChange}
  />
      ) : (
        <div className="p-4 grid grid-cols-12 gap-4 h-full overflow-y-auto">


          {/* ========================= */}
          {/* MAP COLUMN */}
          {/* ========================= */}

          <div className="col-span-9 flex flex-col gap-4">

            {/* KPI */}

            <KPISection
              isDisaster={isDisasterMode}
            />


            {/* MAP */}

            <div className="h-[520px] flex-shrink-0 bg-zinc-900/50 border border-zinc-800 rounded-xl relative overflow-hidden">

              <MainMap
                isDisaster={isDisasterMode}
                protocolActive={protocolActive}
                onRoadClick={setSelectedRoad}
                reports={reports}
                selectedRoute={selectedRoute}
                       />


              {/* DISASTER MODE BUTTON */}

              <DemoControls
                active={isDisasterMode}
                onToggle={() =>
                  setIsDisasterMode(!isDisasterMode)
                }
              />

            </div>
            <RoutePlanner
             onRouteFound={setSelectedRoute}
                />
          </div>


          {/* ========================= */}
          {/* RIGHT SIDEBAR */}
          {/* ========================= */}

           <div className="col-span-3 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">

                 

                <IncidentFeed
                 reports={reports}
                 onStatusChange={handleStatusChange}
                 />

                 <LiveLogistics protocolActive={protocolActive} />

                <RiskPrediction />

                
            {/* AI ACTIONS */}

            <AIActionRecommendation
              isDisaster={isDisasterMode}
              onExecute={executeAIProtocol}
            />


            {/* AI PREDICTIONS */}

            <AIPredictionPanel
              isDisaster={isDisasterMode}
            />


            {/* SELECTED ROAD */}

            {selectedRoad && (

              <div className="bg-zinc-900 border-l-4 border-orange-500 p-5 rounded-xl">

                <div className="flex justify-between items-start mb-4">

                  <h3 className="font-black text-lg text-white leading-tight">

                    {selectedRoad.name}

                  </h3>

                  <span className="text-[10px] font-mono text-zinc-500 uppercase">

                    {selectedRoad.id}

                  </span>

                </div>


                <div className="space-y-4 text-sm">


                  {/* RISK */}

                  <div className="flex justify-between border-b border-zinc-800 pb-2">

                    <span className="text-zinc-500 font-bold uppercase text-[10px]">

                      Risk Profile

                    </span>


                    <span
                      className={`font-black uppercase text-xs ${
                        selectedRoad.riskLevel === 'Critical'
                          ? 'text-red-500'
                          : 'text-orange-400'
                      }`}
                    >

                      {selectedRoad.riskLevel}

                    </span>

                  </div>


                  {/* SCORE */}

                  <div className="grid grid-cols-2 gap-4">

                    <div>

                      <p className="text-[9px] font-bold text-zinc-500 uppercase">

                        Access Score

                      </p>

                      <p className="text-lg font-black text-zinc-200">

                        {selectedRoad.accessibilityScore}%

                      </p>

                    </div>


                    <div>

                      <p className="text-[9px] font-bold text-zinc-500 uppercase">

                        Traffic Flow

                      </p>

                      <p className="text-lg font-black text-zinc-200">

                        {selectedRoad.traffic}

                      </p>

                    </div>

                  </div>


                  {/* AI REPORT */}

                  <div>

                    <p className="text-[9px] font-bold text-zinc-500 uppercase mb-1">

                      AI Intelligence Report

                    </p>

                    <p className="text-xs text-zinc-400 italic bg-zinc-950 p-2 rounded">

                      "{selectedRoad.lastReport}"

                    </p>

                  </div>

                </div>


                {/* CLOSE */}

                <button
                  onClick={() => setSelectedRoad(null)}
                  className="mt-6 w-full bg-zinc-800 hover:bg-zinc-700 py-3 rounded-lg text-xs font-bold uppercase transition-all"
                >

                  Close Detailed Intel

                </button>

              </div>

            )}

          </div>

        </div>
      )}
      </main>

    </div>

  );
};