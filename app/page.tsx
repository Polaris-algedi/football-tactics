import PitchBase from "@/components/pitch-base";
import FormationSwitcher from "@/components/formation-switcher";
import SquadSidebar from "@/components/squad-sidebar";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Atlas Lions Tactics
        </h1>
        <p className="text-slate-400 mt-2">Interactive Match Predictor</p>
      </header>

      {/* <div className="w-full max-w-4xl flex flex-col items-center">       
        <FormationSwitcher />
        <PitchBase />
      </div> */}
      {/* 
        This is the main layout grid. 
        Mobile: Column (Pitch on top, Sidebar below)
        Desktop: Row (Pitch on left, Sidebar on right) 
      */}
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 items-start justify-center">
        {/* Left Side: Pitch & Controls */}
        <div className="flex-1 w-full max-w-2xl flex flex-col gap-4">
          <FormationSwitcher />
          <PitchBase />
        </div>

        {/* Right Side: Bench / Roster */}
        <SquadSidebar />
      </div>
    </main>
  );
}
