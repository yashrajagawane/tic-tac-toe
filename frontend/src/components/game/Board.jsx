import React from "react";
import { motion } from "framer-motion";
import { Mark } from "./Mark";

export function Board({ board, winLine, onCellClick, disabled, current }) {
  const winSet = new Set(winLine || []);
  const glowClass =
    current === "X"
      ? "hover:border-[color:var(--neon-x)]"
      : "hover:border-[color:var(--neon-o)]";

  return (
    <motion.div
      className="glass-strong p-4 sm:p-6 rounded-3xl relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      data-testid="game-board"
    >
      <div
        className="grid grid-cols-3 gap-3 sm:gap-4"
        style={{ width: "min(78vw, 440px)", height: "min(78vw, 440px)" }}
      >
        {board.map((value, i) => {
          const isWin = winSet.has(i);
          const isFilled = value !== null;
          const cellDisabled = disabled || isFilled;
          return (
            <motion.button
              key={i}
              data-testid={`cell-${i}`}
              className={`cell ${isFilled ? "cell-filled" : ""} ${
                cellDisabled ? "cell-disabled" : ""
              } ${isWin ? "cell-win" : ""} ${!isFilled && !disabled ? glowClass : ""}`}
              onClick={() => !cellDisabled && onCellClick(i)}
              disabled={cellDisabled}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.04 * i, duration: 0.35 }}
              aria-label={`Cell ${i + 1}${value ? `, ${value}` : ", empty"}`}
            >
              <Mark value={value} size={72} />
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
