import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { EMPTY_BOARD, evaluate, otherPlayer } from "../lib/gameLogic";
import { getAIMove } from "../lib/ai";

/**
 * Central game state hook.
 * mode: 'ai' | 'local'
 * difficulty: 'easy' | 'medium' | 'hard' | 'impossible' (ai mode)
 * humanSymbol: 'X' | 'O' (ai mode) — human always goes on their turn
 * onWin(winner, boardSnapshot): void
 * onDraw(): void
 */
export function useGameState({
  mode = "ai",
  difficulty = "medium",
  humanSymbol = "X",
  onWin,
  onDraw,
  onPlace,
}) {
  const [board, setBoard] = useState(EMPTY_BOARD());
  const [current, setCurrent] = useState("X");
  const [history, setHistory] = useState([]); // stack of previous boards
  const [status, setStatus] = useState("playing"); // playing | won | draw
  const [winner, setWinner] = useState(null);
  const [winLine, setWinLine] = useState(null);
  const [moveCount, setMoveCount] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const startedAtRef = useRef(Date.now());
  const aiThinkingRef = useRef(false);

  // Timer
  useEffect(() => {
    if (status !== "playing") return undefined;
    const id = window.setInterval(() => {
      setElapsed(Math.floor((Date.now() - startedAtRef.current) / 1000));
    }, 500);
    return () => window.clearInterval(id);
  }, [status]);

  const reset = useCallback(() => {
    setBoard(EMPTY_BOARD());
    setCurrent("X");
    setHistory([]);
    setStatus("playing");
    setWinner(null);
    setWinLine(null);
    setMoveCount(0);
    setElapsed(0);
    startedAtRef.current = Date.now();
    aiThinkingRef.current = false;
  }, []);

  // Reset when config changes materially
  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, difficulty, humanSymbol]);

  const isAITurn = mode === "ai" && current !== humanSymbol;

  const makeMove = useCallback(
    (index, byAI = false) => {
      if (status !== "playing") return;
      if (board[index] !== null) return;
      if (mode === "ai" && !byAI && current !== humanSymbol) return;

      const next = board.slice();
      next[index] = current;
      const evalRes = evaluate(next);

      setHistory((h) => [...h, board]);
      setBoard(next);
      setMoveCount((c) => c + 1);
      if (onPlace) onPlace(current);

      if (evalRes.winner) {
        setStatus("won");
        setWinner(evalRes.winner);
        setWinLine(evalRes.line);
        if (onWin) onWin(evalRes.winner, next);
      } else if (evalRes.isDraw) {
        setStatus("draw");
        if (onDraw) onDraw();
      } else {
        setCurrent((p) => otherPlayer(p));
      }
    },
    [board, current, humanSymbol, mode, onWin, onDraw, onPlace, status],
  );

  // Trigger AI move
  useEffect(() => {
    if (mode !== "ai") return undefined;
    if (status !== "playing") return undefined;
    if (current === humanSymbol) return undefined;
    if (aiThinkingRef.current) return undefined;

    aiThinkingRef.current = true;
    const delay = 380 + Math.random() * 320;
    const id = window.setTimeout(() => {
      const move = getAIMove(board, difficulty, current);
      if (move !== -1 && move !== null && move !== undefined) {
        makeMove(move, true);
      }
      aiThinkingRef.current = false;
    }, delay);
    return () => window.clearTimeout(id);
  }, [board, current, status, mode, difficulty, humanSymbol, makeMove]);

  const undo = useCallback(() => {
    if (history.length === 0) return;
    if (status !== "playing") return;
    // In AI mode: undo 2 moves (human + AI), else 1
    const steps = mode === "ai" ? Math.min(2, history.length) : 1;
    const newHistory = history.slice(0, history.length - steps);
    const restored = history[history.length - steps];
    setHistory(newHistory);
    setBoard(restored);
    setMoveCount((c) => Math.max(0, c - steps));
    // Whose turn? — recompute from filled count
    const xCount = restored.filter((v) => v === "X").length;
    const oCount = restored.filter((v) => v === "O").length;
    setCurrent(xCount === oCount ? "X" : "O");
  }, [history, mode, status]);

  const canUndo = history.length > 0 && status === "playing";

  return useMemo(
    () => ({
      board,
      current,
      status,
      winner,
      winLine,
      moveCount,
      elapsed,
      isAITurn,
      canUndo,
      makeMove,
      undo,
      reset,
    }),
    [
      board,
      current,
      status,
      winner,
      winLine,
      moveCount,
      elapsed,
      isAITurn,
      canUndo,
      makeMove,
      undo,
      reset,
    ],
  );
}
