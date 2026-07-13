import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export function TurnIndicator({ current, isAITurn, status, winner, names }) {
  let label;
  let color;

  if (status === "won") {
    label = `${names?.[winner] || `Player ${winner}`} wins!`;
    color = winner === "X" ? "var(--neon-x)" : "var(--neon-o)";
  } else if (status === "draw") {
    label = "It's a draw";
    color = "var(--neon-purple)";
  } else {
    const name = names?.[current] || `Player ${current}`;
    label = isAITurn ? "AI is thinking…" : `${name}'s turn`;
    color = current === "X" ? "var(--neon-x)" : "var(--neon-o)";
  }

  return (
    <div
      className="flex justify-center"
      data-testid="turn-indicator"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={label}
          initial={{ opacity: 0, y: -8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={{ duration: 0.28 }}
          className="glass rounded-full px-6 py-2.5 flex items-center gap-3"
          style={{
            borderColor: color,
            boxShadow: `0 0 26px ${color}55, inset 0 0 12px ${color}22`,
          }}
        >
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{
              background: color,
              boxShadow: `0 0 10px ${color}`,
            }}
          />
          <span
            className="font-body text-sm sm:text-base font-medium"
            style={{ color }}
          >
            {label}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
