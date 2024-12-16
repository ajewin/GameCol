import React from 'react';
import { Users, Bot, RotateCcw } from 'lucide-react';

interface ChessControlsProps {
  currentPlayer: 'white' | 'black';
  gameMode: 'player' | 'bot';
  isGameOver: boolean;
  onGameModeChange: (mode: 'player' | 'bot') => void;
  onReset: () => void;
}

export function ChessControls({
  currentPlayer,
  gameMode,
  isGameOver,
  onGameModeChange,
  onReset,
}: ChessControlsProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div className="flex gap-2">
        <button
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg
            ${gameMode === 'player'
              ? 'bg-violet-600 text-white'
              : 'border border-violet-600 text-violet-600'}
          `}
          onClick={() => onGameModeChange('player')}
        >
          <Users size={20} />
          2 Players
        </button>
        <button
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg
            ${gameMode === 'bot'
              ? 'bg-violet-600 text-white'
              : 'border border-violet-600 text-violet-600'}
          `}
          onClick={() => onGameModeChange('bot')}
        >
          <Bot size={20} />
          vs Bot
        </button>
      </div>

      <div className="text-lg font-semibold text-gray-800">
        {!isGameOver && (
          <span>
            Current Player: {' '}
            <span className={`${currentPlayer === 'white' ? 'text-violet-600' : 'text-gray-900'}`}>
              {currentPlayer}
            </span>
          </span>
        )}
      </div>

      <button
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
        onClick={onReset}
      >
        <RotateCcw size={20} />
        Reset Game
      </button>
    </div>
  );
}