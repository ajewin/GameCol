import { Game } from '../types/game';

export const games: Game[] = [
  {
    id: 'tic-tac-toe',
    name: 'Tic Tac Toe',
    description: 'Classic 3x3 grid game where players aim to create a line of their symbols',
    thumbnail: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?auto=format&fit=crop&q=80&w=300&h=300',
    rules: [
      {
        id: 'standard',
        name: 'Standard Rules',
        description: 'First player to get 3 in a row wins',
        isEnabled: true,
        isDefault: true
      },
      {
        id: '5x5',
        name: '5x5 Grid',
        description: 'Play on a larger 5x5 grid with 4 in a row to win',
        isEnabled: false,
        isDefault: false
      }
    ]
  },
  {
    id: 'chess',
    name: 'Chess',
    description: 'Strategic board game of kings and queens',
    thumbnail: 'https://images.unsplash.com/photo-1528819622765-d6bcf132f793?auto=format&fit=crop&q=80&w=300&h=300',
    rules: [
      {
        id: 'standard',
        name: 'Standard Rules',
        description: 'Official FIDE chess rules',
        isEnabled: true,
        isDefault: true
      },
      {
        id: 'blitz',
        name: 'Blitz Mode',
        description: '3 minute time limit per player',
        isEnabled: false,
        isDefault: false
      }
    ]
  },
  {
    id: 'sudoku',
    name: 'Sudoku',
    description: 'Fill the 9x9 grid with numbers following specific rules',
    thumbnail: 'https://images.unsplash.com/photo-1580541832626-2a7131ee809f?auto=format&fit=crop&q=80&w=300&h=300',
    rules: [
      {
        id: 'standard',
        name: 'Standard Rules',
        description: 'Classic 9x9 grid sudoku',
        isEnabled: true,
        isDefault: true
      },
      {
        id: '6x6',
        name: '6x6 Grid',
        description: 'Easier version on a 6x6 grid',
        isEnabled: false,
        isDefault: false
      }
    ]
  }
];