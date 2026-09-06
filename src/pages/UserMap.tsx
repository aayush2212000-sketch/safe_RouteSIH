import React, { useState } from 'react';
import { TopNav } from '../components/TopNav';
import { MainMap } from '../components/MainMap';
import RoutePlanner from '../components/RoutePlanner';
import CitizenReport from '../components/CitizenReport';
import { roadData } from '../data/mockData';
import { useGaleData } from '../hooks/useGaleData';

export const UserMap: React.FC = () => {
  const { alerts, loading } = useGaleData();
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedRoute, setSelectedRoute] = useState<any>(null);


  const handleRoadSearch = (road: any) => {
    setSearchQuery(road.name);
  };

  const searchResults = searchQuery.trim()
    ? roadData.filter((road) =>
        road.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        road.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="flex flex-col h-screen w-screen bg-[#09090b] text-zinc-100 overflow-hidden font-sans">
      {/* TOP NAV */}
      <TopNav
        isDisaster={false} // User doesn't control disaster mode
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* SEARCH RESULTS (same as CommandCenter) */}
      {searchQuery.trim() && searchResults.length > 0 && (
        <div className="absolute top-[68px] left-[300px] z-[2000] w-56 bg-zinc-950 border border-zinc-800 rounded-lg shadow-2xl overflow-hidden">
          {searchResults.map((road) => (
            <button
              key={road.id}
              onClick={() => handleRoadSearch(road)}
              className="w-full text-left px-4 py-3 hover:bg-zinc-800 transition-colors border-b border-zinc-800 last:border-b-0"
            >
              <p className="text-xs font-bold text-white">{road.name}</p>
              <p className="text-[9px] text-zinc-500 mt-1 uppercase">{road.id}</p>
            </button>
          ))}
        </div>
      )}

      {searchQuery.trim() && searchResults.length === 0 && (
        <div className="absolute top-[68px] left-[300px] z-[2000] w-56 bg-zinc-950 border border-zinc-800 rounded-lg shadow-2xl px-4 py-3">
          <p className="text-xs text-zinc-500">No roads found</p>
        </div>
      )}

      <main className="flex-1 p-4 grid grid-cols-12 gap-4 overflow-hidden relative">
        {/* MAP COLUMN */}
        <div className="col-span-12 lg:col-span-8 xl:col-span-9 flex flex-col gap-4">
          <div className="h-[65vh] lg:h-full flex-shrink-0 bg-zinc-900/50 border border-zinc-800 rounded-xl relative overflow-hidden">
            {loading ? (
               <div className="flex h-full w-full items-center justify-center text-zinc-500">Loading Map Data...</div>
            ) : (
              <MainMap
                isDisaster={false}
                protocolActive={false}
                onRoadClick={() => {}}
                reports={alerts}
                selectedRoute={selectedRoute}
              />
            )}
          </div>
        </div>

        {/* SIDEBAR TOOLS */}
        <div className="col-span-12 lg:col-span-4 xl:col-span-3 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar pb-10 lg:pb-0 h-[35vh] lg:h-full">
          <RoutePlanner onRouteFound={setSelectedRoute} />
          <CitizenReport />
        </div>
      </main>
    </div>
  );
};
