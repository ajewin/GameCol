export type Player = 'X' | 'O';
export type GameMode = 'bot' | 'player';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface GameState {
  currentPlayer: Player;
  gameMode: GameMode;
  difficulty: Difficulty;
  isGameOver: boolean;
  winner: Player | null;
  isDraw: boolean;
}