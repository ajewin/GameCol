import React from 'react';
import { Game } from '../types/game';
import { TicTacToe } from '../games/tic-tac-toe/TicTacToe';
import { Chess } from '../games/chess/Chess';
import { ArrowLeft } from 'lucide-react';

interface GameContainerProps {
  game: Game;
  onBack: () => void;
}

export function GameContainer({ game, onBack }: GameContainerProps) {
  const renderGame = () => {
    switch (game.id) {
      case 'tic-tac-toe':
        return <TicTacToe />;
      case 'chess':
        return <Chess />;
      default:
        return <div>Game not implemented yet</div>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-white mb-8 hover:text-violet-200 transition-colors"
      >
        <ArrowLeft size={24} />
        Back to Games
      </button>
      
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        {game.name}
      </h2>
      
      {renderGame()}
    </div>
  );
}