"use client";

import { useEffect } from "react";
import PitchBase from "@/components/pitch-base";
import FormationSwitcher from "@/components/formation-switcher";
import SquadSidebar from "@/components/squad-sidebar";
import { useTacticsStore } from "@/store/useTacticsStore";
import type { Player } from "@/store/useTacticsStore";
import { BIG_FIVE_FORMATIONS } from "@/lib/formations";

export default function ClientPitchDashboard({
  initialPlayers,
}: {
  initialPlayers: Player[];
}) {
  const initializeMatch = useTacticsStore((state) => state.initializeMatch);
  const squad = useTacticsStore((state) => state.squad);

  useEffect(() => {
    if (initialPlayers.length > 0 && squad.length === 0) {
      initializeMatch(initialPlayers, BIG_FIVE_FORMATIONS["4-3-3"]);
    }
  }, [initialPlayers, squad.length, initializeMatch]);

  return (
    <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 items-start justify-center">
      <div className="flex-1 w-full max-w-2xl flex flex-col gap-4">
        <FormationSwitcher />
        <PitchBase />
      </div>
      <SquadSidebar />
    </div>
  );
}
