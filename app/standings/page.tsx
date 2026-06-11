"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Trophy, Globe, Map } from "lucide-react";

// --- MOCK DATA ---
// A hypothetical successful run for the Atlas Lions!
const TOURNAMENTS = {
  AFCON: {
    name: "Africa Cup of Nations",
    group: {
      name: "Group F",
      teams: [
        {
          name: "Morocco",
          p: 3,
          w: 2,
          d: 1,
          l: 0,
          gd: 4,
          pts: 7,
          isMorocco: true,
        },
        {
          name: "DR Congo",
          p: 3,
          w: 0,
          d: 3,
          l: 0,
          gd: 0,
          pts: 3,
          isMorocco: false,
        },
        {
          name: "Zambia",
          p: 3,
          w: 0,
          d: 2,
          l: 1,
          gd: -1,
          pts: 2,
          isMorocco: false,
        },
        {
          name: "Tanzania",
          p: 3,
          w: 0,
          d: 2,
          l: 1,
          gd: -3,
          pts: 2,
          isMorocco: false,
        },
      ],
    },
    knockouts: [
      {
        stage: "Round of 16",
        match: { t1: "Morocco", s1: 2, t2: "South Africa", s2: 0 },
      },
      {
        stage: "Quarter-Finals",
        match: { t1: "Morocco", s1: 1, t2: "Cape Verde", s2: 0 },
      },
      {
        stage: "Semi-Finals",
        match: { t1: "Morocco", s1: 2, t2: "Nigeria", s2: 1 },
      },
      {
        stage: "Final",
        match: { t1: "Morocco", s1: 1, t2: "Senegal", s2: 0, isFinal: true },
      },
    ],
  },
  WC: {
    name: "FIFA World Cup 2026",
    group: {
      name: "Group E",
      teams: [
        {
          name: "Morocco",
          p: 3,
          w: 3,
          d: 0,
          l: 0,
          gd: 5,
          pts: 9,
          isMorocco: true,
        },
        {
          name: "USA",
          p: 3,
          w: 1,
          d: 1,
          l: 1,
          gd: 1,
          pts: 4,
          isMorocco: false,
        },
        {
          name: "Serbia",
          p: 3,
          w: 1,
          d: 0,
          l: 2,
          gd: -2,
          pts: 3,
          isMorocco: false,
        },
        {
          name: "New Zealand",
          p: 3,
          w: 0,
          d: 1,
          l: 2,
          gd: -4,
          pts: 1,
          isMorocco: false,
        },
      ],
    },
    knockouts: [
      {
        stage: "Round of 32",
        match: { t1: "Morocco", s1: 3, t2: "Chile", s2: 1 },
      }, // The new R32!
      {
        stage: "Round of 16",
        match: { t1: "Morocco", s1: 2, t2: "Germany", s2: 1 },
      },
      {
        stage: "Quarter-Finals",
        match: { t1: "Morocco", s1: 1, t2: "Portugal", s2: 0 },
      },
      {
        stage: "Semi-Finals",
        match: { t1: "Morocco", s1: 2, t2: "France", s2: 1 },
      },
      {
        stage: "Final",
        match: { t1: "Morocco", s1: 1, t2: "Brazil", s2: 0, isFinal: true },
      },
    ],
  },
};

export default function StandingsPage() {
  const [activeTab, setActiveTab] = useState<"AFCON" | "WC">("WC");
  const data = TOURNAMENTS[activeTab];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <header>
          <Link
            href="/"
            className="text-slate-400 hover:text-white flex items-center gap-2 mb-6 transition-colors w-fit"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Tactics
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black text-white tracking-tight uppercase">
                Tournament <span className="text-[#C1272D]">Journey</span>
              </h1>
              <p className="text-slate-400 mt-2">
                Track the Atlas Lions' path to glory
              </p>
            </div>

            {/* Custom Tab Switcher */}
            <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800 shadow-inner w-full md:w-auto">
              <button
                onClick={() => setActiveTab("WC")}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-md text-sm font-bold transition-all ${
                  activeTab === "WC"
                    ? "bg-[#C1272D] text-white shadow-md"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Globe className="w-4 h-4" /> World Cup
              </button>
              <button
                onClick={() => setActiveTab("AFCON")}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-md text-sm font-bold transition-all ${
                  activeTab === "AFCON"
                    ? "bg-[#006233] text-white shadow-md"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Map className="w-4 h-4" /> AFCON
              </button>
            </div>
          </div>
        </header>

        {/* Group Stage Section */}
        <section className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="bg-slate-950/50 p-4 border-b border-slate-800 flex items-center gap-3">
            <div className="w-2 h-6 bg-[#C6A15B] rounded-sm block"></div>
            <h2 className="text-xl font-black text-white uppercase">
              {data.group.name} Standings
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-900/80 text-slate-400 uppercase font-bold text-xs">
                <tr>
                  <th className="px-6 py-4">Pos</th>
                  <th className="px-6 py-4 w-full">Team</th>
                  <th className="px-4 py-4 text-center">MP</th>
                  <th className="px-4 py-4 text-center">W</th>
                  <th className="px-4 py-4 text-center">D</th>
                  <th className="px-4 py-4 text-center">L</th>
                  <th className="px-4 py-4 text-center">GD</th>
                  <th className="px-6 py-4 text-center text-white">Pts</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {data.group.teams.map((team, index) => (
                  <tr
                    key={team.name}
                    className={`transition-colors ${
                      team.isMorocco
                        ? "bg-[#006233]/10 hover:bg-[#006233]/20"
                        : "hover:bg-slate-800/50"
                    }`}
                  >
                    <td className="px-6 py-4 font-bold">
                      <span
                        className={`flex items-center justify-center w-6 h-6 rounded-full ${index < 2 ? "bg-[#C1272D]/20 text-[#C1272D]" : "text-slate-500"}`}
                      >
                        {index + 1}
                      </span>
                    </td>
                    <td
                      className={`px-6 py-4 font-bold ${team.isMorocco ? "text-white text-base" : "text-slate-300"}`}
                    >
                      {team.name} {team.isMorocco && "🇲🇦"}
                    </td>
                    <td className="px-4 py-4 text-center text-slate-400">
                      {team.p}
                    </td>
                    <td className="px-4 py-4 text-center text-slate-400">
                      {team.w}
                    </td>
                    <td className="px-4 py-4 text-center text-slate-400">
                      {team.d}
                    </td>
                    <td className="px-4 py-4 text-center text-slate-400">
                      {team.l}
                    </td>
                    <td className="px-4 py-4 text-center font-medium">
                      {team.gd > 0 ? `+${team.gd}` : team.gd}
                    </td>
                    <td className="px-6 py-4 text-center font-black text-lg text-white">
                      {team.pts}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Knockout Stage Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-8 bg-[#C1272D] rounded-sm block"></div>
            <h2 className="text-3xl font-black text-white uppercase">
              Knockout Stage
            </h2>
          </div>

          {/* 
            Responsive Layout Magic: 
            Mobile (flex-col): Vertical stacking of rounds.
            Desktop (xl:flex-row): Horizontal left-to-right bracket flow.
          */}
          <div className="flex flex-col xl:flex-row gap-6 overflow-x-auto pb-8 snap-x">
            {data.knockouts.map((round) => (
              <div
                key={round.stage}
                className="flex-1 min-w-[300px] bg-slate-900 rounded-xl border border-slate-800 p-5 shadow-lg snap-center flex flex-col justify-center relative"
              >
                {/* Stage Header */}
                <h3
                  className={`text-sm font-black uppercase tracking-widest text-center mb-6 ${
                    round.match.isFinal ? "text-[#C6A15B]" : "text-slate-400"
                  }`}
                >
                  {round.stage}
                </h3>

                {/* Match Card */}
                <div
                  className={`rounded-lg border overflow-hidden ${
                    round.match.isFinal
                      ? "border-[#C6A15B]/50 shadow-[0_0_15px_rgba(198,161,91,0.2)]"
                      : "border-slate-800"
                  }`}
                >
                  {/* Team 1 (Morocco) */}
                  <div className="flex items-center justify-between p-4 bg-slate-950/50">
                    <span className="font-bold text-white flex items-center gap-2">
                      🇲🇦 {round.match.t1}
                    </span>
                    <span className="font-black text-xl text-white">
                      {round.match.s1}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="h-[1px] bg-slate-800 w-full relative">
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 text-[10px] font-bold text-slate-500 px-2 uppercase rounded-full">
                      VS
                    </span>
                  </div>

                  {/* Team 2 */}
                  <div className="flex items-center justify-between p-4 bg-slate-900">
                    <span className="font-semibold text-slate-400">
                      {round.match.t2}
                    </span>
                    <span className="font-bold text-lg text-slate-500">
                      {round.match.s2}
                    </span>
                  </div>
                </div>

                {/* Desktop connection lines (Decorative) */}
                <div className="hidden xl:block absolute top-1/2 -right-3 w-6 h-[2px] bg-slate-800 z-0"></div>

                {/* Winner Celebration for Final */}
                {round.match.isFinal && (
                  <div className="mt-4 flex flex-col items-center justify-center animate-pulse">
                    <Trophy className="text-[#C6A15B] w-8 h-8 mb-2" />
                    <span className="text-[#C6A15B] font-black uppercase tracking-widest text-xs">
                      Champions
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
