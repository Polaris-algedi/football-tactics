"use client";

import { useTacticsStore } from "@/store/tactics";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeftRight } from "lucide-react";

export default function SquadSidebar() {
  const bench = useTacticsStore((state) => state.bench);
  const selectedId = useTacticsStore((state) => state.selectedBenchPlayerId);
  const setSelected = useTacticsStore((state) => state.setSelectedBenchPlayer);

  return (
    <aside className="w-full lg:w-80 bg-slate-900 border border-slate-800 rounded-lg flex flex-col h-[600px] lg:h-[calc(100vh-200px)] max-h-[850px] shadow-xl">
      {/* Sidebar Header */}
      <div className="p-5 border-b border-slate-800 bg-slate-950 rounded-t-lg">
        <h3 className="text-white font-bold flex items-center gap-2 text-lg">
          <ArrowLeftRight className="w-5 h-5 text-[#C1272D]" />
          Substitutes
        </h3>
        <p className="text-sm text-slate-400 mt-1">
          {selectedId
            ? "Now click a player on the pitch to swap!"
            : "Click a bench player to substitute."}
        </p>
      </div>

      {/* Scrollable Bench List */}
      <ScrollArea className="flex-1 p-3">
        <div className="space-y-2">
          {bench.map((player) => {
            const isSelected = selectedId === player.id;

            return (
              <button
                key={player.id}
                onClick={() => setSelected(isSelected ? null : player.id)}
                className={`w-full flex items-center justify-between p-3 rounded-md transition-all border outline-none
                  ${
                    isSelected
                      ? "bg-[#006233]/20 border-[#006233] ring-1 ring-[#006233]"
                      : "bg-slate-800/50 border-transparent hover:bg-slate-800 focus:ring-2 focus:ring-slate-600"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${isSelected ? "bg-[#006233]" : "bg-slate-700"}`}
                  >
                    {player.number}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-white leading-tight">
                      {player.name}
                    </p>
                    <p className="text-xs text-[#C6A15B] font-semibold">
                      {player.position}
                    </p>
                  </div>
                </div>
                <div className="text-xs font-bold text-slate-300 bg-slate-950 px-2 py-1 rounded shadow-inner">
                  {player.rating}
                </div>
              </button>
            );
          })}
        </div>
      </ScrollArea>
    </aside>
  );
}
