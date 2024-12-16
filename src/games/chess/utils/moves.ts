import { ChessPiece, Position, Move } from '../../../types/chess';
import { isValidPosition } from './board';

export function getPossibleMoves(
  board: (ChessPiece | null)[][],
  position: Position,
  piece: ChessPiece
): Move[] {
  const moves: Move[] = [];

  switch (piece.type) {
    case 'pawn':
      addPawnMoves(board, position, piece, moves);
      break;
    case 'rook':
      addStraightMoves(board, position, piece, moves);
      break;
    case 'knight':
      addKnightMoves(board, position, piece, moves);
      break;
    case 'bishop':
      addDiagonalMoves(board, position, piece, moves);
      break;
    case 'queen':
      addStraightMoves(board, position, piece, moves);
      addDiagonalMoves(board, position, piece, moves);
      break;
    case 'king':
      addKingMoves(board, position, piece, moves);
      break;
  }

  return moves;
}

function addPawnMoves(
  board: (ChessPiece | null)[][],
  from: Position,
  piece: ChessPiece,
  moves: Move[]
) {
  const direction = piece.color === 'white' ? -1 : 1;
  const startRow = piece.color === 'white' ? 6 : 1;

  // Forward move
  const oneStep = { row: from.row + direction, col: from.col };
  if (isValidPosition(oneStep) && !board[oneStep.row][oneStep.col]) {
    moves.push({ from, to: oneStep, piece });

    // Two steps from starting position
    if (from.row === startRow) {
      const twoStep = { row: from.row + direction * 2, col: from.col };
      if (!board[twoStep.row][twoStep.col]) {
        moves.push({ from, to: twoStep, piece });
      }
    }
  }

  // Captures
  const captures = [
    { row: from.row + direction, col: from.col - 1 },
    { row: from.row + direction, col: from.col + 1 }
  ];

  for (const to of captures) {
    if (isValidPosition(to)) {
      const targetPiece = board[to.row][to.col];
      if (targetPiece && targetPiece.color !== piece.color) {
        moves.push({ from, to, piece, capturedPiece: targetPiece });
      }
    }
  }
}

function addStraightMoves(
  board: (ChessPiece | null)[][],
  from: Position,
  piece: ChessPiece,
  moves: Move[]
) {
  const directions = [
    { row: -1, col: 0 }, // up
    { row: 1, col: 0 },  // down
    { row: 0, col: -1 }, // left
    { row: 0, col: 1 }   // right
  ];

  for (const dir of directions) {
    let current = { row: from.row + dir.row, col: from.col + dir.col };
    
    while (isValidPosition(current)) {
      const targetPiece = board[current.row][current.col];
      
      if (!targetPiece) {
        moves.push({ from, to: current, piece });
      } else {
        if (targetPiece.color !== piece.color) {
          moves.push({ from, to: current, piece, capturedPiece: targetPiece });
        }
        break;
      }
      
      current = { row: current.row + dir.row, col: current.col + dir.col };
    }
  }
}

function addDiagonalMoves(
  board: (ChessPiece | null)[][],
  from: Position,
  piece: ChessPiece,
  moves: Move[]
) {
  const directions = [
    { row: -1, col: -1 }, // up-left
    { row: -1, col: 1 },  // up-right
    { row: 1, col: -1 },  // down-left
    { row: 1, col: 1 }    // down-right
  ];

  for (const dir of directions) {
    let current = { row: from.row + dir.row, col: from.col + dir.col };
    
    while (isValidPosition(current)) {
      const targetPiece = board[current.row][current.col];
      
      if (!targetPiece) {
        moves.push({ from, to: current, piece });
      } else {
        if (targetPiece.color !== piece.color) {
          moves.push({ from, to: current, piece, capturedPiece: targetPiece });
        }
        break;
      }
      
      current = { row: current.row + dir.row, col: current.col + dir.col };
    }
  }
}

function addKnightMoves(
  board: (ChessPiece | null)[][],
  from: Position,
  piece: ChessPiece,
  moves: Move[]
) {
  const knightMoves = [
    { row: -2, col: -1 },
    { row: -2, col: 1 },
    { row: -1, col: -2 },
    { row: -1, col: 2 },
    { row: 1, col: -2 },
    { row: 1, col: 2 },
    { row: 2, col: -1 },
    { row: 2, col: 1 }
  ];

  for (const move of knightMoves) {
    const to = {
      row: from.row + move.row,
      col: from.col + move.col
    };

    if (isValidPosition(to)) {
      const targetPiece = board[to.row][to.col];
      if (!targetPiece || targetPiece.color !== piece.color) {
        moves.push({
          from,
          to,
          piece,
          capturedPiece: targetPiece || undefined
        });
      }
    }
  }
}

function addKingMoves(
  board: (ChessPiece | null)[][],
  from: Position,
  piece: ChessPiece,
  moves: Move[]
) {
  const kingMoves = [
    { row: -1, col: -1 },
    { row: -1, col: 0 },
    { row: -1, col: 1 },
    { row: 0, col: -1 },
    { row: 0, col: 1 },
    { row: 1, col: -1 },
    { row: 1, col: 0 },
    { row: 1, col: 1 }
  ];

  for (const move of kingMoves) {
    const to = {
      row: from.row + move.row,
      col: from.col + move.col
    };

    if (isValidPosition(to)) {
      const targetPiece = board[to.row][to.col];
      if (!targetPiece || targetPiece.color !== piece.color) {
        moves.push({
          from,
          to,
          piece,
          capturedPiece: targetPiece || undefined
        });
      }
    }
  }
}