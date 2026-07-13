import React, { useMemo } from "react";
import { Crown } from "lucide-react";

export function Leaderboard({ history }) {
  const entries = useMemo(() => {
    const map = new Map();
    for (const h of history || []) {
      if (h.result !== "won") continue;
      const key = h.winnerName || `Player ${h.winner}`;
      const prev = map.get(key) || { name: key, wins: 0, symbol: h.winner };
      prev.wins += 1;
      map.set(key, prev);
    }
    return Array.from(map.values())
      .sort((a, b) => b.wins - a.wins)
      .slice(0, 5);
  }, [history]);

  return (
    <div
      className="glass rounded-2xl p-4 sm:p-5"
      data-testid="leaderboard"
    >
      <div className="flex items-center gap-2 mb-3">
        <Crown size={14} className="text-white/60" />
        <span className="font-body text-xs uppercase tracking-[0.25em] text-white/60">
          Leaderboard
        </span>
      </div>
      {entries.length === 0 ? (
        <p className="font-body text-sm text-white/40 py-4 text-center">
          Win a match to appear here.
        </p>
      ) : (
        <ol className="space-y-2">
          {entries.map((e, i) => {
            const color = e.symbol === "X" ? "var(--neon-x)" : "var(--neon-o)";
            const rankColor =
              i === 0 ? "#fbbf24" : i === 1 ? "#e5e7eb" : i === 2 ? "#f59e0b" : "rgba(255,255,255,0.4)";
            return (
              <li
                key={e.name}
                className="flex items-center justify-between gap-3 rounded-xl px-3 py-2 bg-white/[0.03] border border-white/[0.06]"
                data-testid={`leaderboard-row-${i}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className="font-display font-bold text-sm w-5 text-center"
                    style={{ color: rankColor }}
                  >
                    {i + 1}
                  </span>
                  <span className="font-body text-sm truncate" style={{ color }}>
                    {e.name}
                  </span>
                </div>
                <span className="font-display font-bold text-sm" style={{ color }}>
                  {e.wins}
                </span>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
