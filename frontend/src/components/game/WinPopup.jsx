import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Trophy, RotateCcw, Home } from "lucide-react";

function fireConfetti(color) {
  const defaults = {
    origin: { y: 0.6 },
    zIndex: 100,
    colors: [color || "#8b5cf6", "#f472b6", "#22d3ee", "#ffffff"],
  };
  confetti({ ...defaults, particleCount: 90, spread: 70, startVelocity: 45 });
  window.setTimeout(
    () =>
      confetti({
        ...defaults,
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.65 },
      }),
    180,
  );
  window.setTimeout(
    () =>
      confetti({
        ...defaults,
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.65 },
      }),
    260,
  );
}

export function WinPopup({ open, result, winner, names, onPlayAgain, onHome }) {
  useEffect(() => {
    if (!open) return;
    if (result === "won") {
      const color = winner === "X" ? "#f472b6" : "#22d3ee";
      fireConfetti(color);
    }
  }, [open, result, winner]);

  const isDraw = result === "draw";
  const color = isDraw
    ? "var(--neon-purple)"
    : winner === "X"
      ? "var(--neon-x)"
      : "var(--neon-o)";
  const title = isDraw
    ? "It's a Draw"
    : `${names?.[winner] || `Player ${winner}`} Wins`;
  const subtitle = isDraw
    ? "Well played — nobody claims this round."
    : "A masterful play. Care for another?";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          data-testid="win-popup"
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
          <motion.div
            initial={{ scale: 0.85, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="glass-strong relative rounded-3xl p-8 sm:p-10 max-w-md w-full"
            style={{
              boxShadow: `0 0 60px ${color}66, inset 0 0 24px ${color}22`,
              borderColor: color,
            }}
          >
            <div
              className="mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: `${color}22`,
                border: `1px solid ${color}`,
                boxShadow: `0 0 24px ${color}66`,
              }}
            >
              <Trophy
                size={30}
                style={{ color, filter: `drop-shadow(0 0 8px ${color})` }}
              />
            </div>
            <h2
              className="font-display font-black text-3xl sm:text-4xl text-center tracking-tight"
              style={{
                color,
                textShadow: `0 0 22px ${color}88`,
              }}
              data-testid="win-title"
            >
              {title}
            </h2>
            <p className="font-body text-white/60 text-center mt-3">
              {subtitle}
            </p>

            <div className="flex justify-center gap-3 mt-8">
              <button
                className="pill-btn primary"
                onClick={onPlayAgain}
                data-testid="play-again-btn"
              >
                <RotateCcw size={16} />
                Play Again
              </button>
              <button
                className="pill-btn ghost"
                onClick={onHome}
                data-testid="popup-home-btn"
              >
                <Home size={16} />
                Home
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
