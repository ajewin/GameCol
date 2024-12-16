import { ChessPiece, Position, Move, PieceColor } from '../../../types/chess';
import { getPossibleMoves } from './moves';

export function isKingInCheck(
  board: (ChessPiece | null)[][],
  kingColor: PieceColor
): boolean {
  // Find king's position
  let kingPosition: Position | null = null;
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece?.type === 'king' && piece.color === kingColor) {
        kingPosition = { row, col };
        break;
      }
    }
    if (kingPosition) break;
  }

  if (!kingPosition) return false;

  // Check if any opponent piece can capture the king
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.color !== kingColor) {
        const moves = getPossibleMoves(board, { row, col }, piece);
        if (moves.some(move => 
          move.to.row === kingPosition!.row && 
          move.to.col === kingPosition!.col
        )) {
          return true;
        }
      }
    }
  }

  return false;
}

export function isCheckmate(
  board: (ChessPiece | null)[][],
  kingColor: PieceColor
): boolean {
  if (!isKingInCheck(board, kingColor)) return false;

  // Check if any move can get out of check
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.color === kingColor) {
        const moves = getPossibleMoves(board, { row, col }, piece);
        
        for (const move of moves) {
          // Try the move
          const newBoard = board.map(row => [...row]);
          newBoard[move.to.row][move.to.col] = piece;
          newBoard[row][col] = null;

          // If this move gets us out of check, it's not checkmate
          if (!isKingInCheck(newBoard, kingColor)) {
            return false;
          }
        }
      }
    }
  }

  return true;
}

export function isCastlingPossible(
  board: (ChessPiece | null)[][],
  king: ChessPiece,
  from: Position,
  to: Position
): boolean {
  if (king.hasMoved || Math.abs(to.col - from.col) !== 2) return false;
  
  const row = from.row;
  const rookCol = to.col > from.col ? 7 : 0;
  const rook = board[row][rookCol];
  
  if (!rook || rook.type !== 'rook' || rook.hasMoved) return false;

  // Check if path is clear
  const direction = to.col > from.col ? 1 : -1;
  for (let col = from.col + direction; col !== rookCol; col += direction) {
    if (board[row][col]) return false;
  }

  // Check if king passes through check
  const intermediate = { row, col: from.col + direction };
  const tempBoard = board.map(row => [...row]);
  tempBoard[from.row][from.col] = null;
  tempBoard[intermediate.row][intermediate.col] = king;
  
  return !isKingInCheck(tempBoard, king.color);
}

export function isEnPassantPossible(
  board: (ChessPiece | null)[][],
  from: Position,
  to: Position,
  lastMove: Move | null
): boolean {
  if (!lastMove) return false;

  const piece = board[from.row][from.col];
  if (!piece || piece.type !== 'pawn') return false;

  const isDoublePawnMove = 
    lastMove.piece.type === 'pawn' && 
    Math.abs(lastMove.from.row - lastMove.to.row) === 2;

  if (!isDoublePawnMove) return false;

  return (
    to.row === (piece.color === 'white' ? 2 : 5) &&
    Math.abs(to.col - from.col) === 1 &&
    to.col === lastMove.to.col
  );
}