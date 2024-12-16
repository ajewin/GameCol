import React, { useState } from 'react';
import { Header } from './components/Header';
import { GameGrid } from './components/GameGrid';
import { GameRules } from './components/GameRules';
import { GameContainer } from './components/GameContainer';
import { games } from './data/games';

function App() {
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [showRules, setShowRules] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const selectedGame = games.find(game => game.id === selectedGameId);

  const handlePlayGame = (gameId: string) => {
    setSelectedGameId(gameId);
    setIsPlaying(true);
  };

  const handleShowInfo = (gameId: string) => {
    setSelectedGameId(gameId);
    setShowRules(true);
  };

  const handleBack = () => {
    setIsPlaying(false);
    setSelectedGameId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-500 to-purple-700">
      {isPlaying && selectedGame ? (
        <GameContainer game={selectedGame} onBack={handleBack} />
      ) : (
        <div className="container mx-auto px-4 py-8">
          <Header />
          <GameGrid 
            games={games}
            onPlayGame={handlePlayGame}
            onShowInfo={handleShowInfo}
          />
        </div>
      )}

      {showRules && selectedGame && (
        <GameRules
          game={selectedGame}
          onClose={() => setShowRules(false)}
        />
      )}
    </div>
  );
}

export default App;