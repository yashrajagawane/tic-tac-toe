import { availableMoves, evaluate, otherPlayer } from "./gameLogic";

// ------- Easy: pure random -------
function easyMove(board) {
  const moves = availableMoves(board);
  return moves[Math.floor(Math.random() * moves.length)];
}

// ------- Medium: win if can, block if must, else random -------
function findImmediate(board, player) {
  for (const i of availableMoves(board)) {
    const test = board.slice();
    test[i] = player;
    if (evaluate(test).winner === player) return i;
  }
  return null;
}

function mediumMove(board, aiPlayer) {
  const human = otherPlayer(aiPlayer);
  return (
    findImmediate(board, aiPlayer) ??
    findImmediate(board, human) ??
    easyMove(board)
  );
}

// ------- Hard: minimax with 30% random suboptimal choice -------
// ------- Impossible: pure minimax -------
function minimax(board, player, aiPlayer, depth = 0) {
  const { winner, isDraw } = evaluate(board);
  if (winner === aiPlayer) return { score: 10 - depth, move: -1 };
  if (winner && winner !== aiPlayer) return { score: depth - 10, move: -1 };
  if (isDraw) return { score: 0, move: -1 };

  const moves = availableMoves(board);
  let best;
  if (player === aiPlayer) {
    best = { score: -Infinity, move: moves[0] };
    for (const m of moves) {
      const copy = board.slice();
      copy[m] = player;
      const res = minimax(copy, otherPlayer(player), aiPlayer, depth + 1);
      if (res.score > best.score) best = { score: res.score, move: m };
    }
  } else {
    best = { score: Infinity, move: moves[0] };
    for (const m of moves) {
      const copy = board.slice();
      copy[m] = player;
      const res = minimax(copy, otherPlayer(player), aiPlayer, depth + 1);
      if (res.score < best.score) best = { score: res.score, move: m };
    }
  }
  return best;
}

function impossibleMove(board, aiPlayer) {
  return minimax(board, aiPlayer, aiPlayer).move;
}

function hardMove(board, aiPlayer) {
  // ~25% chance of playing a slightly weaker move to give a fighting chance
  if (Math.random() < 0.25) {
    const med = mediumMove(board, aiPlayer);
    if (med !== null && med !== undefined) return med;
  }
  return impossibleMove(board, aiPlayer);
}

/**
 * @param {Array} board - length 9 array
 * @param {'easy'|'medium'|'hard'|'impossible'} difficulty
 * @param {'X'|'O'} aiPlayer
 * @returns {number} index 0-8
 */
export function getAIMove(board, difficulty, aiPlayer) {
  switch (difficulty) {
    case "easy":
      return easyMove(board);
    case "medium":
      return mediumMove(board, aiPlayer);
    case "hard":
      return hardMove(board, aiPlayer);
    case "impossible":
    default:
      return impossibleMove(board, aiPlayer);
  }
}
