import { ChessPiece, PieceColor, Position } from '../../../types/chess';

export function createInitialBoard(): (ChessPiece | null)[][] {
  const board: (ChessPiece | null)[][] = Array(8).fill(null).map(() => Array(8).fill(null));
  
  // Place pawns
  for (let col = 0; col < 8; col++) {
    board[1][col] = { type: 'pawn', color: 'black', hasMoved: false };
    board[6][col] = { type: 'pawn', color: 'white', hasMoved: false };
  }

  // Place other pieces
  const backRowPieces: ('rook' | 'knight' | 'bishop' | 'queen' | 'king' | 'bishop' | 'knight' | 'rook')[] = 
    ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];

  for (let col = 0; col < 8; col++) {
    board[0][col] = { type: backRowPieces[col], color: 'black', hasMoved: false };
    board[7][col] = { type: backRowPieces[col], color: 'white', hasMoved: false };
  }

  return board;
}

export function isValidPosition({ row, col }: Position): boolean {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
}

export function getSquareColor(row: number, col: number): 'light' | 'dark' {
  return (row + col) % 2 === 0 ? 'light' : 'dark';
}