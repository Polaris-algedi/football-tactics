import PitchBase from "@/components/pitch-base";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Atlas Lions Tactics
        </h1>
        <p className="text-slate-400 mt-2">Interactive Match Predictor</p>
      </header>

      <div className="w-full max-w-4xl flex justify-center">
        <PitchBase />
      </div>
    </main>
  );
}
