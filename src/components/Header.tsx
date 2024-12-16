import React from 'react';
import { Gamepad2 } from 'lucide-react';

export function Header() {
  return (
    <header className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Gamepad2 size={48} className="text-white" />
        <h1 className="text-4xl font-bold text-white">Mini Games Hub</h1>
      </div>
      <p className="text-violet-200 text-lg">
        Choose your game and challenge yourself or play with friends
      </p>
    </header>
  );
}