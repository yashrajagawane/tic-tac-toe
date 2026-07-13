import React, { createContext, useContext, useEffect, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AppSettingsContext = createContext(null);

const DEFAULT_SETTINGS = {
  soundEnabled: true,
  volume: 0.5,
  theme: "dark", // 'dark' | 'light'
  playerNames: { X: "Player X", O: "Player O" },
};

export function AppSettingsProvider({ children }) {
  const [settings, setSettings] = useLocalStorage(
    "ntt.settings",
    DEFAULT_SETTINGS,
  );

  // Force dark theme on <html data-theme> — light removed by design
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
    // Migrate any older 'light' preference silently
    if (settings?.theme && settings.theme !== "dark") {
      setSettings((s) => ({ ...s, theme: "dark" }));
    }
  }, [settings?.theme, setSettings]);
  const [stats, setStats, resetStatsRaw] = useLocalStorage("ntt.stats", {
    aiWins: 0,
    aiLosses: 0,
    aiDraws: 0,
    localX: 0,
    localO: 0,
    localDraws: 0,
  });
  const [history, setHistory, resetHistoryRaw] = useLocalStorage(
    "ntt.history",
    [],
  );
  const [leaderboard, setLeaderboard, resetLeaderboardRaw] = useLocalStorage(
    "ntt.leaderboard",
    [],
  );

  const value = useMemo(
    () => ({
      settings,
      setSettings,
      updateSetting: (patch) => setSettings((s) => ({ ...s, ...patch })),
      stats,
      setStats,
      history,
      setHistory,
      leaderboard,
      setLeaderboard,
      resetAll: () => {
        resetStatsRaw();
        resetHistoryRaw();
        resetLeaderboardRaw();
      },
    }),
    [
      settings,
      setSettings,
      stats,
      setStats,
      history,
      setHistory,
      leaderboard,
      setLeaderboard,
      resetStatsRaw,
      resetHistoryRaw,
      resetLeaderboardRaw,
    ],
  );

  return (
    <AppSettingsContext.Provider value={value}>
      {children}
    </AppSettingsContext.Provider>
  );
}

export function useAppSettings() {
  const ctx = useContext(AppSettingsContext);
  if (!ctx)
    throw new Error("useAppSettings must be used inside AppSettingsProvider");
  return ctx;
}
