import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2, VolumeX, Trash2 } from "lucide-react";
import { useAppSettings } from "../../context/AppSettingsContext";

export function SettingsPanel({ open, onClose }) {
  const { settings, updateSetting, resetAll } = useAppSettings();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          data-testid="settings-panel"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 10, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="glass-strong relative rounded-3xl p-8 max-w-md w-full"
            style={{
              boxShadow:
                "0 0 60px rgba(139,92,246,0.35), inset 0 0 20px rgba(139,92,246,0.1)",
              borderColor: "var(--neon-purple)",
            }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
              data-testid="settings-close"
              aria-label="Close settings"
            >
              <X size={20} />
            </button>

            <h2 className="font-display font-bold text-2xl neon-purple mb-1">
              Settings
            </h2>
            <p className="font-body text-sm text-white/50 mb-6">
              Customize your experience
            </p>

            {/* Sound */}
            <div className="mb-5">
              <label className="font-body text-xs uppercase tracking-widest text-white/50 block mb-2">
                Sound
              </label>
              <div className="flex gap-2">
                <button
                  className={`pill-btn flex-1 ${settings.soundEnabled ? "primary" : "ghost"}`}
                  onClick={() => updateSetting({ soundEnabled: true })}
                  data-testid="sound-on-btn"
                >
                  <Volume2 size={16} />
                  On
                </button>
                <button
                  className={`pill-btn flex-1 ${!settings.soundEnabled ? "primary" : "ghost"}`}
                  onClick={() => updateSetting({ soundEnabled: false })}
                  data-testid="sound-off-btn"
                >
                  <VolumeX size={16} />
                  Off
                </button>
              </div>
              {settings.soundEnabled && (
                <div className="mt-3">
                  <label className="font-body text-xs text-white/50 flex justify-between">
                    <span>Volume</span>
                    <span>{Math.round(settings.volume * 100)}%</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={settings.volume}
                    onChange={(e) =>
                      updateSetting({ volume: parseFloat(e.target.value) })
                    }
                    className="w-full mt-2 accent-purple-500"
                    data-testid="volume-slider"
                  />
                </div>
              )}
            </div>

            {/* Theme (locked to dark — premium neon aesthetic) */}
            <div className="mb-5">
              <label className="font-body text-xs uppercase tracking-widest text-white/50 block mb-2">
                Theme
              </label>
              <div
                className="glass rounded-full px-4 py-2.5 flex items-center gap-2"
                style={{
                  borderColor: "var(--neon-purple)",
                  boxShadow: "0 0 18px rgba(139,92,246,0.25)",
                }}
                data-testid="theme-locked-dark"
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: "var(--neon-purple)",
                    boxShadow: "0 0 8px var(--neon-purple)",
                  }}
                />
                <span className="font-body text-sm neon-purple">
                  Dark · Neon
                </span>
                <span className="ml-auto font-body text-[10px] uppercase tracking-widest text-white/40">
                  Curated
                </span>
              </div>
              <p className="font-body text-[11px] text-white/40 mt-2">
                Neon.Tac is designed for the dark — the neon glow is the point.
              </p>
            </div>

            {/* Player names */}
            <div className="mb-6">
              <label className="font-body text-xs uppercase tracking-widest text-white/50 block mb-2">
                Player Names (Local)
              </label>
              <div className="flex gap-2">
                <input
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm font-body focus:outline-none focus:border-[color:var(--neon-x)] transition-colors"
                  value={settings.playerNames.X}
                  onChange={(e) =>
                    updateSetting({
                      playerNames: {
                        ...settings.playerNames,
                        X: e.target.value.slice(0, 18),
                      },
                    })
                  }
                  placeholder="Player X"
                  data-testid="name-x-input"
                />
                <input
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm font-body focus:outline-none focus:border-[color:var(--neon-o)] transition-colors"
                  value={settings.playerNames.O}
                  onChange={(e) =>
                    updateSetting({
                      playerNames: {
                        ...settings.playerNames,
                        O: e.target.value.slice(0, 18),
                      },
                    })
                  }
                  placeholder="Player O"
                  data-testid="name-o-input"
                />
              </div>
            </div>

            {/* Reset */}
            <button
              onClick={() => {
                if (window.confirm("Reset all stats, history and leaderboard?")) {
                  resetAll();
                }
              }}
              className="pill-btn ghost w-full"
              style={{ borderColor: "rgba(244,63,94,0.5)", color: "#fca5a5" }}
              data-testid="reset-stats-btn"
            >
              <Trash2 size={16} />
              Reset all statistics
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
