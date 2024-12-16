import React from 'react';
import { Player } from '../../types/game-state';

interface TicTacToeBoardProps {
  board: (Player | null)[];
  onCellClick: (index: number) => void;
}

export function TicTacToeBoard({ board, onCellClick }: TicTacToeBoardProps) {
  return (
    <div className="grid grid-cols-3 gap-2 mt-6">
      {board.map((cell, index) => (
        <button
          key={index}
          className={`
            h-24 bg-violet-50 rounded-lg text-4xl font-bold
            transition-colors hover:bg-violet-100
            ${cell ? 'text-violet-600' : ''}
          `}
          onClick={() => onCellClick(index)}
        >
          {cell}
        </button>
      ))}
    </div>
  );
}