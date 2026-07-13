import React from "react";
import { motion } from "framer-motion";

function Stat({ label, value, color, testId }) {
  return (
    <div
      className="flex flex-col items-center gap-1 flex-1"
      data-testid={testId}
    >
      <motion.span
        key={value}
        initial={{ scale: 0.8, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        className="font-display font-bold text-2xl sm:text-3xl"
        style={{
          color,
          textShadow: `0 0 12px ${color}88`,
        }}
      >
        {value}
      </motion.span>
      <span className="font-body text-[10px] sm:text-xs uppercase tracking-widest text-white/50">
        {label}
      </span>
    </div>
  );
}

export function Scoreboard({ mode, stats, names }) {
  const isAI = mode === "ai";
  const leftLabel = isAI ? "You" : names?.X || "Player X";
  const rightLabel = isAI ? "AI" : names?.O || "Player O";
  const leftVal = isAI ? stats.aiWins : stats.localX;
  const rightVal = isAI ? stats.aiLosses : stats.localO;
  const drawVal = isAI ? stats.aiDraws : stats.localDraws;

  return (
    <div
      className="glass rounded-2xl p-4 sm:p-5"
      data-testid="scoreboard"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="font-body text-xs uppercase tracking-[0.25em] text-white/60">
          Scoreboard
        </span>
        <span className="font-body text-[10px] uppercase tracking-widest text-white/40">
          {isAI ? "vs AI" : "Local"}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Stat
          label={leftLabel}
          value={leftVal}
          color="var(--neon-x)"
          testId="score-x"
        />
        <div className="w-px h-10 bg-white/10" />
        <Stat
          label="Draws"
          value={drawVal}
          color="var(--neon-purple)"
          testId="score-draws"
        />
        <div className="w-px h-10 bg-white/10" />
        <Stat
          label={rightLabel}
          value={rightVal}
          color="var(--neon-o)"
          testId="score-o"
        />
      </div>
    </div>
  );
}
