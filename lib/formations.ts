import type { FormationPreset } from "@/store/useTacticsStore";

export const BIG_FIVE_FORMATIONS: Record<string, FormationPreset> = {
  "4-3-3": {
    name: "4-3-3 (Attacking)",
    positions: [
      { x: 50, y: 92 }, // GK
      { x: 85, y: 75 }, // RB
      { x: 65, y: 78 }, // RCB
      { x: 35, y: 78 }, // LCB
      { x: 15, y: 75 }, // LB
      { x: 50, y: 60 }, // CDM
      { x: 70, y: 48 }, // RCM
      { x: 30, y: 48 }, // LCM
      { x: 82, y: 25 }, // RW
      { x: 50, y: 15 }, // ST
      { x: 18, y: 25 }, // LW
    ],
  },
  "4-2-3-1": {
    name: "4-2-3-1 (Balanced)",
    positions: [
      { x: 50, y: 92 }, // GK
      { x: 85, y: 75 }, // RB
      { x: 65, y: 78 }, // RCB
      { x: 35, y: 78 }, // LCB
      { x: 15, y: 75 }, // LB
      { x: 65, y: 60 }, // RDM
      { x: 35, y: 60 }, // LDM
      { x: 80, y: 35 }, // RAM
      { x: 50, y: 35 }, // CAM
      { x: 20, y: 35 }, // LAM
      { x: 50, y: 15 }, // ST
    ],
  },
  "4-4-2": {
    name: "4-4-2 (Classic)",
    positions: [
      { x: 50, y: 92 }, // GK
      { x: 85, y: 78 }, // RB
      { x: 65, y: 78 }, // RCB
      { x: 35, y: 78 }, // LCB
      { x: 15, y: 78 }, // LB
      { x: 85, y: 45 }, // RM
      { x: 65, y: 50 }, // RCM
      { x: 35, y: 50 }, // LCM
      { x: 15, y: 45 }, // LM
      { x: 60, y: 18 }, // RS
      { x: 40, y: 18 }, // LS
    ],
  },
  "3-5-2": {
    name: "3-5-2 (Wingback Domination)",
    positions: [
      { x: 50, y: 92 }, // GK
      { x: 75, y: 75 }, // RCB
      { x: 50, y: 78 }, // CB
      { x: 25, y: 75 }, // LCB
      { x: 85, y: 50 }, // RWB
      { x: 50, y: 55 }, // CDM
      { x: 15, y: 50 }, // LWB
      { x: 65, y: 40 }, // RCM
      { x: 35, y: 40 }, // LCM
      { x: 60, y: 15 }, // RS
      { x: 40, y: 15 }, // LS
    ],
  },
  "5-4-1": {
    name: "5-4-1 (Low Block)",
    positions: [
      { x: 50, y: 92 }, // GK
      { x: 90, y: 70 }, // RWB
      { x: 72, y: 78 }, // RCB
      { x: 50, y: 80 }, // CB
      { x: 28, y: 78 }, // LCB
      { x: 10, y: 70 }, // LWB
      { x: 80, y: 48 }, // RM
      { x: 62, y: 52 }, // RCM
      { x: 38, y: 52 }, // LCM
      { x: 20, y: 48 }, // LM
      { x: 50, y: 18 }, // ST
    ],
  },
};
