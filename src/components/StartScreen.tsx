import React from 'react';
import { Sword, Shield } from 'lucide-react';
import { Difficulty } from '../types';

interface StartScreenProps {
  onStart: (difficulty: Difficulty) => void;
  hasUnlockedHardMode: boolean;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart, hasUnlockedHardMode }) => {
  return (
    <div className="text-white text-center">
      <h1 className="text-4xl mb-4">重生之我在群里暴打戴老六</h1>
      <p className="mb-4">Reborn: Beating Dai Laoliu in the Group Chat</p>
      <div className="grid grid-cols-1 gap-4">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
          onClick={() => onStart('normal')}
        >
          开始游戏（普通模式） <Sword className="ml-2" size={20} />
        </button>
        {hasUnlockedHardMode && (
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
            onClick={() => onStart('hard')}
          >
            开始游戏（困难模式） <Shield className="ml-2" size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default StartScreen;