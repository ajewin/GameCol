import React from 'react';
import { ChessPiece } from '../../../types/chess';
import {
  Crown,
  Cross,
  Sword,
} from 'lucide-react';

interface ChessPieceProps {
  piece: ChessPiece;
}

export function ChessPieceComponent({ piece }: ChessPieceProps) {
  const color = piece.color === 'white' ? 'text-white' : 'text-gray-900';
  const size = 36;

  const getPieceIcon = () => {
    switch (piece.type) {
      case 'king':
        return <Crown size={size} />;
      case 'queen':
        return <Crown size={size} className="rotate-180" />;
      case 'bishop':
        return <Cross size={size} className="rotate-45" />;
      case 'knight':
        return <Sword size={size} />;
      case 'rook':
        return <Cross size={size} />;
      case 'pawn':
        return <Cross size={size} className="scale-75" />;
      default:
        return <Cross size={size} />;
    }
  };

  return (
    <div className={`${color} drop-shadow-md`}>
      {getPieceIcon()}
    </div>
  );
}