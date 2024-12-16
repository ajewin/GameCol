import React from 'react';
import { Game } from '../types/game';
import { PlayCircle, Info } from 'lucide-react';

interface GameCardProps {
  game: Game;
  onPlay: (gameId: string) => void;
  onInfo: (gameId: string) => void;
}

export function GameCard({ game, onPlay, onInfo }: GameCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105">
      <img 
        src={game.thumbnail} 
        alt={game.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">{game.name}</h3>
        <p className="text-gray-600 mt-2">{game.description}</p>
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => onPlay(game.id)}
            className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
          >
            <PlayCircle size={20} />
            Play
          </button>
          <button
            onClick={() => onInfo(game.id)}
            className="flex items-center gap-2 px-4 py-2 border border-violet-600 text-violet-600 rounded-lg hover:bg-violet-50 transition-colors"
          >
            <Info size={20} />
            How to Play
          </button>
        </div>
      </div>
    </div>
  );
}