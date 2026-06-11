import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { formatPlayers } from "@/lib/formatPlayers"; // 👈 Import utility

export default async function PlayersGalleryPage() {
  // 1. Fetch data directly on the server
  const { data: rawPlayers } = await supabase.from("players").select("*");
  const players = rawPlayers ? formatPlayers(rawPlayers) : [];

  const squadCategories = [
    { id: "goalkeepers", title: "Goalkeepers" },
    { id: "defenders", title: "Defenders" },
    { id: "midfielders", title: "Midfielders" },
    { id: "forwards", title: "Forwards" },
  ].map((cat) => ({
    ...cat,
    players: players
      .filter((player) => player.category === cat.id)
      .map((player) => ({
        id: player.id,
        name: player.name,
        pos: player.position,
        num: player.jersey_number,
        img:
          player.image_url ||
          `https://placehold.co/600x800/0f172a/ffffff?text=${encodeURIComponent(player.name)}`,
      })),
  }));

  return (
    <main className="min-h-screen bg-slate-950 relative">
      {/* Header Section (Non-sticky) */}
      <div className="p-4 md:p-8 pb-4 max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <Link
              href="/"
              className="text-slate-400 hover:text-white flex items-center gap-2 mb-4 transition-colors w-fit"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Tactics
            </Link>
            <h1 className="text-4xl font-black text-white tracking-tight uppercase">
              Squad <span className="text-[#C1272D]">Gallery</span>
            </h1>
            <p className="text-slate-400 mt-2">
              Official portraits of the Atlas Lions
            </p>
          </div>
        </header>
      </div>

      {/* Sticky Navigation Bar */}
      <div className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 shadow-xl w-full">
        <nav className="max-w-6xl mx-auto px-4 md:px-8 py-4">
          <ul className="flex items-center md:justify-center gap-2 md:gap-4 overflow-x-auto no-scrollbar whitespace-nowrap pb-2 md:pb-0">
            {squadCategories.map((cat) => (
              <li key={`nav-${cat.id}`}>
                <a
                  href={`#${cat.id}`}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-600 rounded-full text-sm font-semibold text-slate-300 hover:text-white transition-all block"
                >
                  {cat.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content Areas */}
      <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-16">
        {squadCategories.map((category) => {
          // Hide sections that have no players (e.g., if Supabase hasn't loaded forwards yet)
          if (category.players.length === 0) return null;

          return (
            <section
              key={category.id}
              id={category.id}
              className="scroll-mt-32"
            >
              {/* Section Header */}
              <div className="mb-6 border-b border-slate-800 pb-2">
                <h2 className="text-3xl font-black text-white flex items-center gap-3">
                  <span className="w-2 h-8 bg-[#C1272D] rounded-sm block"></span>
                  {category.title}
                </h2>
              </div>

              {/* Responsive Grid Layout */}
              <div className="grid grid-cols-1 min-[601px]:grid-cols-2 min-[841px]:grid-cols-3 gap-6">
                {category.players.map((player) => (
                  <div
                    key={player.id}
                    className="group relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#C1272D]/10"
                  >
                    {/* Image Container */}
                    <div className="aspect-3/4 w-full relative bg-slate-800 overflow-hidden">
                      <img
                        src={player.img}
                        alt={player.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-80" />
                    </div>

                    {/* Player Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                      <div>
                        <p className="text-[#C6A15B] font-bold text-sm tracking-widest uppercase mb-1">
                          {player.pos}
                        </p>
                        <h2 className="text-2xl font-black text-white leading-tight">
                          {player.name}
                        </h2>
                      </div>
                      <div className="text-3xl font-black text-white/20">
                        {player.num}
                      </div>
                    </div>

                    {/* Decorative Line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-[#C1272D] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `,
        }}
      />
    </main>
  );
}
