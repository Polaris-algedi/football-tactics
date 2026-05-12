"use client";

import { useEffect, useState } from "react";
import { motion, PanInfo } from "framer-motion";
import { useTacticsStore, PitchPlayer } from "@/store/tactics";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FlashFreeIcons } from "@hugeicons/core-free-icons";

interface PlayerMarkerProps {
  player: PitchPlayer; // x and y should now be stored as percentages (0-100)
  constraintsRef: React.RefObject<HTMLDivElement | null>;
}

export default function PlayerMarker({
  player,
  constraintsRef,
}: PlayerMarkerProps) {
  const movePlayer = useTacticsStore((state) => state.movePlayer);

  // State to keep track of the pitch container's dynamic dimensions
  const [pitchSize, setPitchSize] = useState({ width: 0, height: 0 });
  const MARKER_RADIUS = 20;

  const constraints = {
    left: MARKER_RADIUS,
    top: MARKER_RADIUS,
    right: pitchSize.width - MARKER_RADIUS,
    bottom: pitchSize.height - MARKER_RADIUS,
  };

  // 1. Measure the pitch size dynamically so players reposition on window resize
  useEffect(() => {
    if (!constraintsRef.current) return;

    const observer = new ResizeObserver((entries) => {
      setPitchSize({
        width: entries[0].contentRect.width,
        height: entries[0].contentRect.height,
      });
    });

    observer.observe(constraintsRef.current);
    return () => observer.disconnect();
  }, [constraintsRef]);

  // Fix: Clamp position on resize to prevent players from going out of bounds if the pitch gets smaller
  useEffect(() => {
    if (pitchSize.width === 0) return;
    const minX = (MARKER_RADIUS / pitchSize.width) * 100;
    const maxX = ((pitchSize.width - MARKER_RADIUS) / pitchSize.width) * 100;
    const minY = (MARKER_RADIUS / pitchSize.height) * 100;
    const maxY = ((pitchSize.height - MARKER_RADIUS) / pitchSize.height) * 100;

    const clampedX = Math.max(minX, Math.min(maxX, player.x));
    const clampedY = Math.max(minY, Math.min(maxY, player.y));

    const epsilon = 0.001;
    if (
      Math.abs(clampedX - player.x) > epsilon ||
      Math.abs(clampedY - player.y) > epsilon
    ) {
      movePlayer(player.id, clampedX, clampedY);
    }
  }, [pitchSize.width, pitchSize.height]);

  // 2. Convert the stored percentages back into absolute pixels for Framer Motion
  const pixelX = (player.x / 100) * pitchSize.width;
  const pixelY = (player.y / 100) * pitchSize.height;

  // 3. Handle dropping the player to save the new percentage position
  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (!constraintsRef.current || pitchSize.width === 0) return;

    const newPixelX = pixelX + info.offset.x;
    const newPixelY = pixelY + info.offset.y;

    const newX = (newPixelX / pitchSize.width) * 100;
    const newY = (newPixelY / pitchSize.height) * 100;

    movePlayer(
      player.id,
      Math.max(0, Math.min(100, newX)),
      Math.max(0, Math.min(100, newY)),
    );
  };

  // Prevent rendering until we have the pitch dimensions to avoid a 0,0 visual flash
  if (pitchSize.width === 0) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.div
          key={`${player.id}-${Math.round(pitchSize.width)}-${Math.round(pitchSize.height)}`} // ← Reset drag state on resize
          drag
          dragMomentum={false}
          dragConstraints={constraints}
          onDragEnd={handleDragEnd}
          style={{
            x: pixelX,
            y: pixelY,
          }}
          whileDrag={{
            scale: 1.15,
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            transition: { duration: 0.1 },
          }}
          // Added -ml-5 and -mt-5 to perfectly center the 40px (h-10 w-10) marker on the coordinate
          className="absolute top-0 left-0 -ml-5 -mt-5 cursor-grab active:cursor-grabbing rounded-full"
        >
          <div className="z-20 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[#C1272D] shadow-xl active:z-50">
            <span className="text-sm font-bold text-white select-none">
              {player.number}
            </span>
          </div>
        </motion.div>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        className="bg-slate-900 text-white border-none shadow-xl"
      >
        <p className="font-bold">{player.name}</p>
      </TooltipContent>
    </Tooltip>
  );
}
