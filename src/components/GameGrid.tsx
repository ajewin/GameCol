import React from 'react';
import { GameCard } from './GameCard';
import { Game } from '../types/game';

interface GameGridProps {
  games: Game[];
  onPlayGame: (gameId: string) => void;
  onShowInfo: (gameId: string) => void;
}

export function GameGrid({ games, onPlayGame, onShowInfo }: GameGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {games.map(game => (
        <GameCard
          key={game.id}
          game={game}
          onPlay={onPlayGame}
          onInfo={onShowInfo}
        />
      ))}
    </div>
  );
}