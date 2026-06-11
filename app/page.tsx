import { supabase } from "@/lib/supabase";
import Link from "next/link";
import ClientPitchDashboard from "@/components/client-pitch-dashboard";
import { formatPlayers } from "@/lib/formatPlayers"; // 👈 Import utility

export default async function Home() {
  const { data: rawPlayers } = await supabase.from("players").select("*");

  // 👇 Transform the raw data before passing it to the client
  const players = rawPlayers ? formatPlayers(rawPlayers) : [];

  return (
    <main className="min-h-screen bg-slate-900 flex flex-col items-center p-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Atlas Lions Tactics
        </h1>
        <p className="text-slate-400 mt-2">Interactive Match Predictor</p>
        <div className="flex gap-4 justify-center mt-4">
          <Link
            href="/players"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-md font-semibold transition-colors border border-slate-700"
          >
            View Player Gallery
          </Link>
          <Link
            href="/standings"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-md font-semibold transition-colors border border-slate-700"
          >
            Standings
          </Link>
        </div>
      </header>

      {/* Pass the fully loaded data into your interactive client UI */}
      <ClientPitchDashboard initialPlayers={players} />
    </main>
  );
}
