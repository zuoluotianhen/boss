import React from 'react';
import { Trophy, RefreshCw } from 'lucide-react';
import { Difficulty } from '../types';

interface VictoryScreenProps {
  onRestart: (difficulty: Difficulty) => void;
  hasUnlockedHardMode: boolean;
}

const VictoryScreen: React.FC<VictoryScreenProps> = ({ onRestart, hasUnlockedHardMode }) => {
  return (
    <div className="text-white text-center">
      <h1 className="text-4xl mb-4">恭喜您！</h1>
      <h2 className="text-2xl mb-4">已成功攻克戴老六！</h2>
      <Trophy className="mx-auto mb-4" size={64} />
      <div className="grid grid-cols-1 gap-4">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
          onClick={() => onRestart('normal')}
        >
          再玩一次（普通模式） <RefreshCw className="ml-2" size={20} />
        </button>
        {hasUnlockedHardMode && (
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
            onClick={() => onRestart('hard')}
          >
            挑战困难模式 <Trophy className="ml-2" size={20} />
          </button>
        )}
        {!hasUnlockedHardMode && (
          <p className="text-yellow-500">
            恭喜！您已解锁困难模式！再次获胜即可挑战。
          </p>
        )}
      </div>
    </div>
  );
};

export default VictoryScreen;