import React from 'react';
import { Game } from '../types/game';
import { X } from 'lucide-react';

interface GameRulesProps {
  game: Game;
  onClose: () => void;
}

export function GameRules({ game, onClose }: GameRulesProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">How to Play {game.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4">
          {game.rules.map(rule => (
            <div key={rule.id} className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-lg text-gray-800">{rule.name}</h3>
              <p className="text-gray-600 mt-1">{rule.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}