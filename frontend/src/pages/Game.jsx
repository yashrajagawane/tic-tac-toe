import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Board } from "../components/game/Board";
import { TurnIndicator } from "../components/game/TurnIndicator";
import { Scoreboard } from "../components/game/Scoreboard";
import { Controls } from "../components/game/Controls";
import { WinPopup } from "../components/game/WinPopup";
import { MatchHistory } from "../components/game/MatchHistory";
import { Leaderboard } from "../components/game/Leaderboard";
import { SettingsPanel } from "../components/game/SettingsPanel";
import { GameInfoBar } from "../components/game/GameInfoBar";
import { useGameState } from "../hooks/useGameState";
import { useAppSettings } from "../context/AppSettingsContext";
import { useSound } from "../hooks/useSound";

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function Game() {
  const navigate = useNavigate();
  const [sp] = useSearchParams();
  const mode = sp.get("mode") === "local" ? "local" : "ai";
  const difficulty = sp.get("difficulty") || "medium";
  const humanSymbol = sp.get("symbol") === "O" ? "O" : "X";

  const {
    settings,
    stats,
    setStats,
    history,
    setHistory,
  } = useAppSettings();
  const sound = useSound(settings.soundEnabled, settings.volume);

  const [popupOpen, setPopupOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const names =
    mode === "ai"
      ? {
          [humanSymbol]: "You",
          [humanSymbol === "X" ? "O" : "X"]: "AI",
        }
      : settings.playerNames;

  const handleWin = useCallback(
    (winner) => {
      sound.play("win");
      // Update stats
      setStats((s) => {
        if (mode === "ai") {
          if (winner === humanSymbol) return { ...s, aiWins: s.aiWins + 1 };
          return { ...s, aiLosses: s.aiLosses + 1 };
        }
        return winner === "X"
          ? { ...s, localX: s.localX + 1 }
          : { ...s, localO: s.localO + 1 };
      });
      // Add to history
      setHistory((h) => [
        {
          id: makeId(),
          date: new Date().toISOString(),
          mode,
          difficulty: mode === "ai" ? difficulty : null,
          result: "won",
          winner,
          winnerName: names?.[winner] || `Player ${winner}`,
          elapsed: 0, // updated below via effect
        },
        ...h.slice(0, 49),
      ]);
      setPopupOpen(true);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode, difficulty, humanSymbol, setStats, setHistory, sound],
  );

  const handleDraw = useCallback(() => {
    sound.play("draw");
    setStats((s) =>
      mode === "ai"
        ? { ...s, aiDraws: s.aiDraws + 1 }
        : { ...s, localDraws: s.localDraws + 1 },
    );
    setHistory((h) => [
      {
        id: makeId(),
        date: new Date().toISOString(),
        mode,
        difficulty: mode === "ai" ? difficulty : null,
        result: "draw",
        winner: null,
        winnerName: null,
        elapsed: 0,
      },
      ...h.slice(0, 49),
    ]);
    setPopupOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, difficulty, setStats, setHistory, sound]);

  const handlePlace = useCallback(() => {
    sound.play("place");
  }, [sound]);

  const game = useGameState({
    mode,
    difficulty,
    humanSymbol,
    onWin: handleWin,
    onDraw: handleDraw,
    onPlace: handlePlace,
  });

  // Patch elapsed onto the latest history entry once game ends
  useEffect(() => {
    if (game.status === "playing") return;
    setHistory((h) => {
      if (h.length === 0) return h;
      const [first, ...rest] = h;
      if (first.elapsed && first.elapsed > 0) return h;
      return [{ ...first, elapsed: game.elapsed }, ...rest];
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.status]);

  const restart = () => {
    setPopupOpen(false);
    game.reset();
  };

  const goHome = () => navigate("/");

  const modeLabel =
    mode === "ai" ? `AI · ${difficulty}` : "Local Multiplayer";

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="ambient-bg" />
      <div
        className="orb"
        style={{
          width: 320,
          height: 320,
          background: "#8b5cf6",
          top: -100,
          right: -80,
        }}
      />
      <div
        className="orb"
        style={{
          width: 280,
          height: 280,
          background: "#f472b6",
          bottom: -80,
          left: -60,
          animationDelay: "-6s",
          opacity: 0.4,
        }}
      />

      <div className="relative z-10 min-h-screen flex flex-col">
        <nav className="flex items-center justify-between px-6 sm:px-10 py-5">
          <button
            onClick={goHome}
            data-testid="nav-logo"
            className="flex items-center gap-2"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #f472b6)",
                boxShadow: "0 0 22px rgba(139,92,246,0.55)",
              }}
            >
              <span className="font-display font-bold text-sm text-white">
                N
              </span>
            </div>
            <span className="font-display font-bold text-lg tracking-tight">
              Neon<span className="neon-purple">.Tac</span>
            </span>
          </button>
          <span className="font-body text-[11px] uppercase tracking-[0.28em] text-white/50 hidden sm:block">
            {modeLabel}
          </span>
        </nav>

        <div className="flex-1 px-4 sm:px-6 lg:px-10 pb-10">
          <div className="mx-auto max-w-7xl grid lg:grid-cols-[1fr_minmax(340px,auto)_1fr] gap-6 lg:gap-8 items-start">
            {/* Left panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="order-2 lg:order-1 space-y-4"
            >
              <Scoreboard mode={mode} stats={stats} names={names} />
              <Leaderboard history={history} />
            </motion.div>

            {/* Center: board */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="order-1 lg:order-2 flex flex-col items-center gap-5"
            >
              <TurnIndicator
                current={game.current}
                isAITurn={game.isAITurn}
                status={game.status}
                winner={game.winner}
                names={names}
              />
              <Board
                board={game.board}
                winLine={game.winLine}
                onCellClick={(i) => game.makeMove(i)}
                disabled={game.status !== "playing" || game.isAITurn}
                current={game.current}
              />
              <GameInfoBar
                moveCount={game.moveCount}
                elapsed={game.elapsed}
                modeLabel={modeLabel}
              />
              <Controls
                onUndo={game.undo}
                onRestart={restart}
                onHome={goHome}
                onOpenSettings={() => setSettingsOpen(true)}
                canUndo={game.canUndo}
              />
            </motion.div>

            {/* Right panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="order-3 space-y-4"
            >
              <MatchHistory history={history} />
            </motion.div>
          </div>
        </div>
      </div>

      <WinPopup
        open={popupOpen}
        result={game.status}
        winner={game.winner}
        names={names}
        onPlayAgain={restart}
        onHome={goHome}
      />
      <SettingsPanel
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  );
}
