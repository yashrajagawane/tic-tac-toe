import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Bot, Users, Sparkles, Settings as SettingsIcon } from "lucide-react";
import { SettingsPanel } from "../components/game/SettingsPanel";

const DIFFICULTIES = [
  { value: "easy", label: "Easy", desc: "AI plays random moves" },
  { value: "medium", label: "Medium", desc: "AI blocks and takes wins" },
  { value: "hard", label: "Hard", desc: "Minimax with mercy" },
  { value: "impossible", label: "Impossible", desc: "Perfect play — never loses" },
];

export default function Landing() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("ai");
  const [difficulty, setDifficulty] = useState("medium");
  const [humanSymbol, setHumanSymbol] = useState("X");
  const [settingsOpen, setSettingsOpen] = useState(false);

  const start = () => {
    const params = new URLSearchParams();
    params.set("mode", mode);
    if (mode === "ai") {
      params.set("difficulty", difficulty);
      params.set("symbol", humanSymbol);
    }
    navigate(`/play?${params.toString()}`);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="ambient-bg" />
      <div className="orb" style={{ width: 380, height: 380, background: "#8b5cf6", top: -80, left: -100 }} />
      <div
        className="orb"
        style={{
          width: 320,
          height: 320,
          background: "#22d3ee",
          bottom: -60,
          right: -80,
          animationDelay: "-4s",
        }}
      />
      <div
        className="orb"
        style={{
          width: 260,
          height: 260,
          background: "#f472b6",
          top: "40%",
          left: "60%",
          animationDelay: "-8s",
          opacity: 0.35,
        }}
      />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top nav */}
        <nav className="flex items-center justify-between px-6 sm:px-10 py-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, #8b5cf6, #f472b6)",
                boxShadow: "0 0 22px rgba(139,92,246,0.55)",
              }}
            >
              <Sparkles size={16} color="white" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">
              Neon<span className="neon-purple">.Tac</span>
            </span>
          </motion.div>
          <button
            className="pill-btn ghost"
            onClick={() => setSettingsOpen(true)}
            data-testid="landing-settings-btn"
            aria-label="Open settings"
          >
            <SettingsIcon size={16} />
          </button>
        </nav>

        {/* Hero */}
        <div className="flex-1 flex items-center justify-center px-6 py-8">
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 max-w-6xl w-full items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 mb-6">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: "var(--neon-purple)",
                    boxShadow: "0 0 8px var(--neon-purple)",
                  }}
                />
                <span className="font-body text-[11px] uppercase tracking-[0.28em] text-white/70">
                  Premium Web Arcade
                </span>
              </div>
              <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
                Tic Tac Toe,
                <br />
                <span className="neon-purple">reimagined</span>.
              </h1>
              <p className="font-body text-white/60 mt-6 text-lg max-w-md">
                A glass, glowing, gorgeously animated take on the classic. Face a
                cold-blooded Minimax AI, or duel a friend on the same screen.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <button
                  className="pill-btn primary text-base px-7 py-3"
                  onClick={start}
                  data-testid="hero-start-btn"
                >
                  Start Playing
                </button>
                <a
                  href="#modes"
                  className="pill-btn ghost text-base px-6 py-3"
                >
                  Explore modes
                </a>
              </motion.div>
            </motion.div>

            {/* Config card */}
            <motion.div
              id="modes"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="glass-strong rounded-3xl p-6 sm:p-8"
              style={{
                boxShadow:
                  "0 0 40px rgba(139,92,246,0.18), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              <span className="font-body text-[11px] uppercase tracking-[0.28em] text-white/50">
                Choose your mode
              </span>

              <div className="grid grid-cols-2 gap-3 mt-3">
                <button
                  onClick={() => setMode("ai")}
                  data-testid="mode-ai-btn"
                  className="text-left rounded-2xl p-4 transition-all border"
                  style={{
                    borderColor:
                      mode === "ai" ? "var(--neon-purple)" : "rgba(255,255,255,0.08)",
                    background:
                      mode === "ai"
                        ? "rgba(139,92,246,0.14)"
                        : "rgba(255,255,255,0.02)",
                    boxShadow:
                      mode === "ai" ? "0 0 22px rgba(139,92,246,0.35)" : "none",
                  }}
                >
                  <Bot
                    size={22}
                    style={{
                      color: mode === "ai" ? "var(--neon-purple)" : "rgba(255,255,255,0.6)",
                    }}
                  />
                  <p className="font-display font-bold text-base mt-2">vs AI</p>
                  <p className="font-body text-xs text-white/50 mt-1">
                    Solo challenge
                  </p>
                </button>
                <button
                  onClick={() => setMode("local")}
                  data-testid="mode-local-btn"
                  className="text-left rounded-2xl p-4 transition-all border"
                  style={{
                    borderColor:
                      mode === "local" ? "var(--neon-o)" : "rgba(255,255,255,0.08)",
                    background:
                      mode === "local"
                        ? "rgba(34,211,238,0.12)"
                        : "rgba(255,255,255,0.02)",
                    boxShadow:
                      mode === "local" ? "0 0 22px rgba(34,211,238,0.3)" : "none",
                  }}
                >
                  <Users
                    size={22}
                    style={{
                      color: mode === "local" ? "var(--neon-o)" : "rgba(255,255,255,0.6)",
                    }}
                  />
                  <p className="font-display font-bold text-base mt-2">Local</p>
                  <p className="font-body text-xs text-white/50 mt-1">
                    2 players, 1 device
                  </p>
                </button>
              </div>

              {mode === "ai" && (
                <>
                  <span className="font-body text-[11px] uppercase tracking-[0.28em] text-white/50 mt-6 block">
                    Difficulty
                  </span>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {DIFFICULTIES.map((d) => {
                      const active = difficulty === d.value;
                      return (
                        <button
                          key={d.value}
                          onClick={() => setDifficulty(d.value)}
                          data-testid={`difficulty-${d.value}`}
                          className="text-left rounded-xl p-3 border transition-all"
                          style={{
                            borderColor: active
                              ? "var(--neon-purple)"
                              : "rgba(255,255,255,0.08)",
                            background: active
                              ? "rgba(139,92,246,0.12)"
                              : "rgba(255,255,255,0.02)",
                          }}
                        >
                          <p
                            className="font-body font-medium text-sm"
                            style={{
                              color: active ? "var(--neon-purple)" : "white",
                            }}
                          >
                            {d.label}
                          </p>
                          <p className="font-body text-[11px] text-white/50 mt-0.5">
                            {d.desc}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  <span className="font-body text-[11px] uppercase tracking-[0.28em] text-white/50 mt-6 block">
                    Play as
                  </span>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => setHumanSymbol("X")}
                      data-testid="symbol-x-btn"
                      className="pill-btn flex-1"
                      style={{
                        borderColor:
                          humanSymbol === "X" ? "var(--neon-x)" : "rgba(255,255,255,0.12)",
                        color:
                          humanSymbol === "X" ? "var(--neon-x)" : "rgba(255,255,255,0.8)",
                        background:
                          humanSymbol === "X"
                            ? "rgba(244,114,182,0.14)"
                            : "rgba(255,255,255,0.03)",
                        boxShadow:
                          humanSymbol === "X"
                            ? "0 0 22px rgba(244,114,182,0.35)"
                            : "none",
                      }}
                    >
                      Play as X (first)
                    </button>
                    <button
                      onClick={() => setHumanSymbol("O")}
                      data-testid="symbol-o-btn"
                      className="pill-btn flex-1"
                      style={{
                        borderColor:
                          humanSymbol === "O" ? "var(--neon-o)" : "rgba(255,255,255,0.12)",
                        color:
                          humanSymbol === "O" ? "var(--neon-o)" : "rgba(255,255,255,0.8)",
                        background:
                          humanSymbol === "O"
                            ? "rgba(34,211,238,0.14)"
                            : "rgba(255,255,255,0.03)",
                        boxShadow:
                          humanSymbol === "O"
                            ? "0 0 22px rgba(34,211,238,0.3)"
                            : "none",
                      }}
                    >
                      Play as O
                    </button>
                  </div>
                </>
              )}

              <button
                onClick={start}
                data-testid="start-btn"
                className="pill-btn primary w-full mt-8 py-3 text-base"
              >
                Enter the arena
              </button>
            </motion.div>
          </div>
        </div>

        <footer className="px-6 sm:px-10 py-6 flex items-center justify-between text-white/40 font-body text-xs">
          <span>Neon.Tac · Built for play</span>
          <span>Local scoreboard · No sign-in</span>
        </footer>
      </div>

      <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}
