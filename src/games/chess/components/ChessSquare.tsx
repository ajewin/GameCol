import React from 'react';
import { ChessPiece, Position } from '../../../types/chess';
import { ChessPieceComponent } from './ChessPieceComponent';

interface ChessSquareProps {
  piece: ChessPiece | null;
  position: Position;
  color: 'light' | 'dark';
  isSelected: boolean;
  isPossibleMove: boolean;
  onClick: () => void;
}

export function ChessSquare({
  piece,
  color,
  isSelected,
  isPossibleMove,
  onClick,
}: ChessSquareProps) {
  const baseClasses = 'w-16 h-16 flex items-center justify-center relative';
  const colorClasses = color === 'light' ? 'bg-violet-100' : 'bg-violet-300';
  const stateClasses = isSelected
    ? 'ring-2 ring-violet-600'
    : isPossibleMove
    ? 'ring-2 ring-violet-400 ring-opacity-50'
    : '';

  return (
    <div
      className={`${baseClasses} ${colorClasses} ${stateClasses}`}
      onClick={onClick}
    >
      {piece && <ChessPieceComponent piece={piece} />}
      {isPossibleMove && !piece && (
        <div className="w-3 h-3 rounded-full bg-violet-400 bg-opacity-50" />
      )}
    </div>
  );
}