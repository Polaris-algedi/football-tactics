"use client";

import { useTacticsStore } from "@/store/tactics";
import { BIG_FIVE_FORMATIONS } from "@/lib/formations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FormationSwitcher() {
  const { activeFormation, changeFormation } = useTacticsStore();

  const handleValueChange = (formationKey: string) => {
    const preset = BIG_FIVE_FORMATIONS[formationKey];
    if (preset) {
      changeFormation(formationKey, preset);
    }
  };

  return (
    <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-lg shadow-md border border-slate-800 w-full max-w-2xl mx-auto mb-6">
      <div className="flex-1">
        <h2 className="text-white font-bold text-lg">Tactical Shape</h2>
        <p className="text-slate-400 text-sm">Select a starting formation</p>
      </div>

      <Select value={activeFormation} onValueChange={handleValueChange}>
        <SelectTrigger className="w-50 bg-slate-950 text-white border-slate-700">
          <SelectValue placeholder="Select formation" />
        </SelectTrigger>
        <SelectContent className="bg-slate-900 text-white border-slate-800">
          {Object.entries(BIG_FIVE_FORMATIONS).map(([key, preset]) => (
            <SelectItem
              key={key}
              value={key}
              className="focus:bg-slate-800 focus:text-white cursor-pointer"
            >
              {preset.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
