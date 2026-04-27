import React from "react";

export default function PitchBase() {
  return (
    <section
      aria-label="Interactive Tactical Pitch"
      className="relative w-full max-w-2xl mx-auto aspect-2/3 overflow-hidden shadow-2xl rounded-sm"
    >
      {/* SVG Pitch Layer */}
      <svg
        viewBox="-2 -2 604 904"
        className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
        aria-hidden="true"
      >
        {/* Grass Pattern */}
        <defs>
          <pattern
            id="grass"
            width="60"
            height="200"
            patternUnits="userSpaceOnUse"
          >
            <rect width="60" height="200" fill="#006233" />
            <rect y="100" width="60" height="100" fill="#005229" />
          </pattern>
        </defs>
        <rect x="-2" y="-2" width="604" height="904" fill="url(#grass)" />

        {/* Pitch Markings */}
        <g stroke="white" strokeWidth="4" fill="none">
          <rect x="0" y="0" width="600" height="900" />

          {/* Halfway Line */}
          <line x1="0" y1="450" x2="600" y2="450" />

          {/* Center Circle & Spot */}
          <circle cx="300" cy="450" r="90" />
          <circle cx="300" cy="450" r="4" fill="white" stroke="none" />

          {/* Top Penalty Area */}
          <rect x="120" y="0" width="360" height="144" />
          <rect x="225" y="0" width="150" height="54" />
          <circle cx="300" cy="108" r="3" fill="white" stroke="none" />
          <path d="M 240 144 A 30 30 0 0 0 360 144" />

          {/* Bottom Penalty Area */}
          <rect x="120" y="756" width="360" height="144" />
          <rect x="225" y="846" width="150" height="54" />
          <circle cx="300" cy="792" r="3" fill="white" stroke="none" />
          <path d="M 240 756 A 30 30 0 0 1 360 756" />
        </g>
      </svg>

      {/* Interactive Player Layer */}
      <div
        className="absolute inset-0 z-10"
        aria-live="polite"
        role="region"
        aria-label="Player Positions"
      >
        {/* Framer Motion / dnd-kit / custom draggable players mount here */}
      </div>
    </section>
  );
}
