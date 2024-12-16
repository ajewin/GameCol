import React, { useState } from 'react';
import { Player, GameMode, Difficulty, GameState } from '../../types/game-state';
import { TicTacToeBoard } from './TicTacToeBoard';
import { TicTacToeControls } from './TicTacToeControls';
import { calculateWinner } from './utils';

export function TicTacToe() {
  const [board, setBoard] = useState<(Player | null)[]>(Array(9).fill(null));
  const [gameState, setGameState] = useState<GameState>({
    currentPlayer: 'X',
    gameMode: 'player',
    difficulty: 'medium',
    isGameOver: false,
    winner: null,
    isDraw: false,
  });

  const handleCellClick = (index: number) => {
    if (board[index] || gameState.isGameOver) return;

    const newBoard = [...board];
    newBoard[index] = gameState.currentPlayer;

    const winner = calculateWinner(newBoard);
    const isDraw = !winner && newBoard.every(cell => cell !== null);

    setBoard(newBoard);
    setGameState(prev => ({
      ...prev,
      currentPlayer: prev.currentPlayer === 'X' ? 'O' : 'X',
      isGameOver: Boolean(winner) || isDraw,
      winner,
      isDraw,
    }));

    // Bot's turn
    if (!winner && !isDraw && gameState.gameMode === 'bot') {
      setTimeout(makeBotMove, 500);
    }
  };

  const makeBotMove = () => {
    // Simple bot implementation for now
    const emptyCells = board
      .map((cell, index) => (cell === null ? index : null))
      .filter((index): index is number => index !== null);

    if (emptyCells.length > 0) {
      const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      handleCellClick(randomIndex);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setGameState(prev => ({
      ...prev,
      currentPlayer: 'X',
      isGameOver: false,
      winner: null,
      isDraw: false,
    }));
  };

  const changeGameMode = (mode: GameMode) => {
    setGameState(prev => ({ ...prev, gameMode: mode }));
    resetGame();
  };

  const changeDifficulty = (difficulty: Difficulty) => {
    setGameState(prev => ({ ...prev, difficulty }));
    resetGame();
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-6">
      <TicTacToeControls
        gameState={gameState}
        onGameModeChange={changeGameMode}
        onDifficultyChange={changeDifficulty}
        onReset={resetGame}
      />
      
      <TicTacToeBoard
        board={board}
        onCellClick={handleCellClick}
      />

      <div className="mt-4 text-center">
        {gameState.isGameOver ? (
          <div className="text-xl font-bold">
            {gameState.winner ? (
              <span className="text-violet-600">Player {gameState.winner} wins!</span>
            ) : (
              <span className="text-gray-600">It's a draw!</span>
            )}
          </div>
        ) : (
          <div className="text-lg">
            Current player: <span className="font-bold text-violet-600">{gameState.currentPlayer}</span>
          </div>
        )}
      </div>
    </div>
  );
}