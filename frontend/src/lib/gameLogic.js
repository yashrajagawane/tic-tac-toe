// Pure game logic utilities

export const EMPTY_BOARD = () => Array(9).fill(null);

export const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/**
 * Returns { winner: 'X'|'O'|null, line: number[] | null, isDraw: boolean }
 */
export function evaluate(board) {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line, isDraw: false };
    }
  }
  const isDraw = board.every((c) => c !== null);
  return { winner: null, line: null, isDraw };
}

export function availableMoves(board) {
  const moves = [];
  for (let i = 0; i < 9; i++) if (board[i] === null) moves.push(i);
  return moves;
}

export function otherPlayer(p) {
  return p === "X" ? "O" : "X";
}
