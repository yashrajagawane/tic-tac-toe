import React from "react";
import { Timer, Hash } from "lucide-react";

function fmt(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function GameInfoBar({ moveCount, elapsed, modeLabel }) {
  return (
    <div
      className="glass rounded-full px-5 py-2 flex items-center gap-5 justify-center"
      data-testid="game-info-bar"
    >
      <div className="flex items-center gap-1.5 text-white/60">
        <Timer size={14} />
        <span
          className="font-body text-sm text-white"
          data-testid="timer-value"
        >
          {fmt(elapsed)}
        </span>
      </div>
      <div className="w-px h-4 bg-white/15" />
      <div className="flex items-center gap-1.5 text-white/60">
        <Hash size={14} />
        <span
          className="font-body text-sm text-white"
          data-testid="move-counter"
        >
          {moveCount} moves
        </span>
      </div>
      <div className="w-px h-4 bg-white/15" />
      <span className="font-body text-[11px] uppercase tracking-widest text-white/50">
        {modeLabel}
      </span>
    </div>
  );
}
