# Neon.Tac — Premium Tic Tac Toe

## Original Problem Statement
Build a modern, production-ready Tic Tac Toe game with a premium look and smooth UX — should NOT look like a college project. Tech: React + Tailwind + Framer Motion + LocalStorage + Canvas Confetti + Howler.js. Features: animated landing, vs AI (Easy/Medium/Hard/Impossible with Minimax), Local Multiplayer, animated 3x3 board, turn indicator, move counter, timer, undo, restart, new game, scoreboard, winning popup with confetti/sound, leaderboard, match history, settings (sound/theme/reset stats). Dark premium UI with purple neon accents, glassmorphism.

## Architecture
- **Client-only React app** (no backend, no MongoDB usage). All persistence in `localStorage` under keys `ntt.settings`, `ntt.stats`, `ntt.history`, `ntt.leaderboard`.
- Routing: `/` → Landing, `/play` → Game
- State: `AppSettingsContext` (settings + stats + history + leaderboard) + local `useGameState` hook
- AI: pure JS Minimax (`/app/frontend/src/lib/ai.js`) with Easy (random) / Medium (heuristic) / Hard (Minimax + 25% mercy) / Impossible (pure Minimax)
- Sound: Howler.js CDN sfx; Confetti: canvas-confetti
- Motion: framer-motion for board entrance, mark placement (spring), popup, transitions

## User Personas
- Casual player looking for a beautiful, quick match
- Competitive solo player wanting a challenge (Impossible AI)
- Two friends sharing one device (Local mode)

## Core Requirements (Static)
1. Beautiful animated landing page ✓
2. vs AI (Easy/Medium/Hard/Impossible) ✓
3. Local multiplayer ✓
4. Animated 3×3 board with hover/click/win effects ✓
5. Turn indicator, move counter, timer, undo, restart, new game ✓
6. Scoreboard (W/L/D) in LocalStorage ✓
7. Winning popup with confetti + sound ✓
8. Responsive design ✓
9. Dark premium UI with purple neon + glassmorphism ✓
10. Settings (sound, theme, reset stats) ✓
11. Leaderboard + match history ✓
12. Modular folder structure ✓

## Implemented (2026-02-12)
- Landing (`pages/Landing.jsx`) with mode/difficulty/symbol selection
- Game (`pages/Game.jsx`) 3-column bento layout: scoreboard+leaderboard | board+controls | history
- Components: `Board`, `Cell`, `Mark` (SVG stroke-draw animation), `TurnIndicator`, `Scoreboard`, `Controls`, `WinPopup`, `MatchHistory`, `Leaderboard`, `SettingsPanel`, `GameInfoBar`
- Hooks: `useGameState`, `useLocalStorage`, `useSound`
- Libs: `gameLogic` (win detection), `ai` (Minimax + heuristics)
- Fonts: Unbounded (display) + Outfit (body) via Google Fonts
- 100% frontend testing success (iteration_1.json)

## Backlog / Future Enhancements
- **P1** — Online multiplayer (WebSocket lobby), avatars, custom themes
- **P2** — Achievement badges (first win, 3-in-a-row streak, beat Impossible)
- **P2** — Shareable match replay links
- **P2** — Board size variants (4×4, 5×5)
- **P2** — Global MongoDB-backed leaderboard (opt-in with nickname)
