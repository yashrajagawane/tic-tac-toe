import React from "react";
import { Undo2, RotateCcw, Home, Settings as SettingsIcon } from "lucide-react";

export function Controls({
  onUndo,
  onRestart,
  onHome,
  onOpenSettings,
  canUndo,
}) {
  return (
    <div
      className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
      data-testid="game-controls"
    >
      <button
        className="pill-btn ghost"
        onClick={onUndo}
        disabled={!canUndo}
        data-testid="undo-btn"
      >
        <Undo2 size={16} />
        <span>Undo</span>
      </button>
      <button
        className="pill-btn"
        onClick={onRestart}
        data-testid="restart-btn"
      >
        <RotateCcw size={16} />
        <span>Restart</span>
      </button>
      <button
        className="pill-btn ghost"
        onClick={onHome}
        data-testid="home-btn"
      >
        <Home size={16} />
        <span>New Game</span>
      </button>
      <button
        className="pill-btn ghost"
        onClick={onOpenSettings}
        data-testid="settings-btn"
        aria-label="Settings"
      >
        <SettingsIcon size={16} />
      </button>
    </div>
  );
}
