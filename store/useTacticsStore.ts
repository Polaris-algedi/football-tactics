import { create } from "zustand";

// 1. Restored Core Interfaces
export type Position =
  | "GK"
  | "CB"
  | "LB"
  | "RB"
  | "CDM"
  | "CM"
  | "CAM"
  | "LW"
  | "RW"
  | "ST"
  | "LWB"
  | "RWB";

// Re-defining the DB player here to ensure 'is_starter' and 'Position' are included
export interface Player {
  id: string;
  name: string;
  position: Position; // Re-applied strict typing here
  category: "goalkeepers" | "defenders" | "midfielders" | "forwards";
  jersey_number: number;
  image_url: string | null;
  headshot_url: string | null;
  is_starter: boolean; // Added the boolean field
  rating?: number;
  default_x?: number;
  default_y?: number;
}

export interface PitchPlayer extends Player {
  x: number; // Percentage 0-100 (Left to Right)
  y: number; // Percentage 0-100 (Top to Bottom)
}

export type PositionCoordinate = { x: number; y: number };

export interface FormationPreset {
  name: string;
  positions: PositionCoordinate[];
}

interface TacticsState {
  activeFormation: string;
  squad: PitchPlayer[]; // The starting 11
  bench: Player[]; // Available substitutes
  selectedBenchPlayerId: string | null;

  // Actions
  initializeMatch: (roster: Player[], preset: FormationPreset) => void;
  movePlayer: (id: string, x: number, y: number) => void;
  swapPlayer: (pitchPlayerId: string, benchPlayerId: string) => void;
  changeFormation: (formationName: string, preset: FormationPreset) => void;
  setSelectedBenchPlayer: (id: string | null) => void;
}

export const useTacticsStore = create<TacticsState>((set) => ({
  activeFormation: "4-3-3",
  squad: [],
  bench: [],
  selectedBenchPlayerId: null,

  // Action: Filter roster by is_starter
  initializeMatch: (roster, preset) => {
    // 1. Filter the raw data based on the database boolean
    const startingEleven = roster.filter((player) => player.is_starter);
    const substitutes = roster.filter((player) => !player.is_starter);

    // 2. Map coordinates ONLY to the starting 11
    const pitchSquad: PitchPlayer[] = startingEleven.map((player, index) => {
      // Safely apply preset coordinates, falling back to center pitch if preset is missing
      const pos = preset.positions[index] || { x: 50, y: 50 };
      return { ...player, x: pos.x, y: pos.y };
    });

    set({
      squad: pitchSquad,
      bench: substitutes,
    });
  },

  // Action: Update a player's exact X/Y coordinates
  movePlayer: (id, x, y) =>
    set((state) => ({
      squad: state.squad.map((player) =>
        player.id === id ? { ...player, x, y } : player,
      ),
    })),

  // Action: Swap a player from the pitch with one from the bench
  swapPlayer: (pitchPlayerId, benchPlayerId) =>
    set((state) => {
      const pitchPlayerIndex = state.squad.findIndex(
        (p) => p.id === pitchPlayerId,
      );
      const benchPlayerIndex = state.bench.findIndex(
        (p) => p.id === benchPlayerId,
      );

      if (pitchPlayerIndex === -1 || benchPlayerIndex === -1) return state;

      const newSquad = [...state.squad];
      const newBench = [...state.bench];

      const playerLeavingPitch = newSquad[pitchPlayerIndex];
      const playerEnteringPitch = newBench[benchPlayerIndex];

      // Perform swap, keeping pitch coordinates intact for the new player
      newSquad[pitchPlayerIndex] = {
        ...playerEnteringPitch,
        x: playerLeavingPitch.x,
        y: playerLeavingPitch.y,
        is_starter: true, // They are now a starter
      };

      // Strip coordinates when sending the old player to the bench
      const { x, y, ...benchData } = playerLeavingPitch;
      newBench[benchPlayerIndex] = {
        ...benchData,
        is_starter: false, // They are now on the bench
      };

      return { squad: newSquad, bench: newBench };
    }),

  // Action: Realign all players based on a new tactical shape
  changeFormation: (formationName, preset) =>
    set((state) => {
      const newSquad = state.squad.map((player, index) => {
        const newPos = preset.positions[index];
        return newPos ? { ...player, x: newPos.x, y: newPos.y } : player;
      });

      return { activeFormation: formationName, squad: newSquad };
    }),

  setSelectedBenchPlayer: (id) => set({ selectedBenchPlayerId: id }),
}));
