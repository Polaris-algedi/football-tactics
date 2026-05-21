import { create } from "zustand";

// 1. Core Interfaces
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

export interface Player {
  id: string;
  name: string;
  number: number;
  position: Position;
  rating: number; // For that expert-level detail
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
  squad: PitchPlayer[]; // The 11 players on the pitch
  bench: Player[]; // Available substitutes
  selectedBenchPlayerId: string | null;

  // Actions
  movePlayer: (id: string, x: number, y: number) => void;
  swapPlayer: (pitchPlayerId: string, benchPlayerId: string) => void;
  changeFormation: (formationName: string, preset: FormationPreset) => void;
  setSelectedBenchPlayer: (id: string | null) => void;
}

// Initial Mock Data (We will expand this later)
const initialSquad: PitchPlayer[] = [
  {
    id: "p1",
    name: "Bounou",
    number: 1,
    position: "GK",
    rating: 85,
    x: 50,
    y: 92,
  },
  {
    id: "p2",
    name: "Hakimi",
    number: 2,
    position: "RB",
    rating: 88,
    x: 85,
    y: 75,
  },
  {
    id: "p3",
    name: "Aguerd",
    number: 6,
    position: "CB",
    rating: 82,
    x: 30,
    y: 80,
  },
  {
    id: "p4",
    name: "Saiss",
    number: 8,
    position: "CB",
    rating: 81,
    x: 70,
    y: 80,
  },
  {
    id: "p5",
    name: "Mazraoui",
    number: 3,
    position: "LB",
    rating: 83,
    x: 15,
    y: 75,
  },
  {
    id: "p6",
    name: "Amrabat",
    number: 4,
    position: "CDM",
    rating: 84,
    x: 50,
    y: 65,
  },
  {
    id: "p7",
    name: "Ounahi",
    number: 8,
    position: "CM",
    rating: 80,
    x: 35,
    y: 50,
  },
  {
    id: "p8",
    name: "Diaz",
    number: 10,
    position: "CAM",
    rating: 86,
    x: 65,
    y: 50,
  },
  {
    id: "p9",
    name: "Ziyech",
    number: 7,
    position: "RW",
    rating: 83,
    x: 85,
    y: 25,
  },
  {
    id: "p10",
    name: "En-Nesyri",
    number: 19,
    position: "ST",
    rating: 81,
    x: 50,
    y: 15,
  },
  {
    id: "p11",
    name: "Adli",
    number: 21,
    position: "LW",
    rating: 79,
    x: 15,
    y: 25,
  },
];

const initialBench: Player[] = [
  { id: "b1", name: "El Kaabi", number: 9, position: "ST", rating: 78 },
  { id: "b2", name: "Richardson", number: 24, position: "CM", rating: 76 },
];

export const useTacticsStore = create<TacticsState>((set) => ({
  activeFormation: "4-3-3",
  squad: initialSquad,
  bench: initialBench,
  selectedBenchPlayerId: null,

  // Action: Update a player's exact X/Y coordinates (fired when dragging ends)
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

      // Extract the players
      const playerLeavingPitch = newSquad[pitchPlayerIndex];
      const playerEnteringPitch = newBench[benchPlayerIndex];

      // Perform the swap while preserving the X/Y coordinates of the position
      newSquad[pitchPlayerIndex] = {
        ...playerEnteringPitch,
        x: playerLeavingPitch.x,
        y: playerLeavingPitch.y,
      };

      // Strip coordinates when sending to bench
      const { x, y, ...benchData } = playerLeavingPitch;
      newBench[benchPlayerIndex] = benchData;

      return { squad: newSquad, bench: newBench };
    }),

  // Action: Realign all players based on a new tactical shape
  changeFormation: (formationName, preset) =>
    set((state) => {
      // Map the current squad to the new preset coordinates
      const newSquad = state.squad.map((player, index) => {
        const newPos = preset.positions[index];
        return newPos ? { ...player, x: newPos.x, y: newPos.y } : player;
      });

      return { activeFormation: formationName, squad: newSquad };
    }),

  setSelectedBenchPlayer: (id) => set({ selectedBenchPlayerId: id }),
}));
