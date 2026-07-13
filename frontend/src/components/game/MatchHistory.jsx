import React from "react";
import { motion } from "framer-motion";
import { History as HistoryIcon } from "lucide-react";

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function timeAgo(iso) {
  const s = Math.max(1, Math.floor((Date.now() - new Date(iso).getTime()) / 1000));
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

export function MatchHistory({ history }) {
  const items = (history || []).slice(0, 8);
  return (
    <div
      className="glass rounded-2xl p-4 sm:p-5"
      data-testid="match-history"
    >
      <div className="flex items-center gap-2 mb-3">
        <HistoryIcon size={14} className="text-white/60" />
        <span className="font-body text-xs uppercase tracking-[0.25em] text-white/60">
          Recent Matches
        </span>
      </div>
      {items.length === 0 ? (
        <p className="font-body text-sm text-white/40 py-4 text-center">
          No matches yet — play your first round.
        </p>
      ) : (
        <ul className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {items.map((h, i) => {
            const isDraw = h.result === "draw";
            const color = isDraw
              ? "var(--neon-purple)"
              : h.winner === "X"
                ? "var(--neon-x)"
                : "var(--neon-o)";
            const label = isDraw
              ? "Draw"
              : `${h.winnerName || `Player ${h.winner}`} won`;
            return (
              <motion.li
                key={h.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center justify-between gap-3 rounded-xl px-3 py-2 bg-white/[0.03] border border-white/[0.06]"
                data-testid={`history-item-${i}`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: color, boxShadow: `0 0 8px ${color}` }}
                  />
                  <div className="min-w-0">
                    <p
                      className="font-body text-sm truncate"
                      style={{ color }}
                    >
                      {label}
                    </p>
                    <p className="font-body text-[10px] uppercase tracking-widest text-white/40">
                      {h.mode === "ai" ? `AI · ${h.difficulty}` : "Local"} ·{" "}
                      {formatTime(h.elapsed || 0)}
                    </p>
                  </div>
                </div>
                <span className="font-body text-[10px] text-white/40 shrink-0">
                  {timeAgo(h.date)}
                </span>
              </motion.li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
