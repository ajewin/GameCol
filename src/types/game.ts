export interface Game {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  rules: GameRule[];
}

export interface GameRule {
  id: string;
  name: string;
  description: string;
  isEnabled: boolean;
  isDefault: boolean;
}