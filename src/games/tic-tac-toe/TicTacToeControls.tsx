import React from 'react';
import { GameMode, Difficulty, GameState } from '../../types/game-state';
import { Users, Bot, RotateCcw } from 'lucide-react';

interface TicTacToeControlsProps {
  gameState: GameState;
  onGameModeChange: (mode: GameMode) => void;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onReset: () => void;
}

export function TicTacToeControls({
  gameState,
  onGameModeChange,
  onDifficultyChange,
  onReset,
}: TicTacToeControlsProps) {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-between">
      <div className="flex gap-2">
        <button
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg
            ${gameState.gameMode === 'player'
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
            ${gameState.gameMode === 'bot'
              ? 'bg-violet-600 text-white'
              : 'border border-violet-600 text-violet-600'}
          `}
          onClick={() => onGameModeChange('bot')}
        >
          <Bot size={20} />
          vs Bot
        </button>
      </div>

      {gameState.gameMode === 'bot' && (
        <select
          className="px-4 py-2 border border-violet-600 rounded-lg text-violet-600"
          value={gameState.difficulty}
          onChange={(e) => onDifficultyChange(e.target.value as Difficulty)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      )}

      <button
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
        onClick={onReset}
      >
        <RotateCcw size={20} />
        Reset
      </button>
    </div>
  );
}