import React, { useState, useEffect } from 'react';
import Game from './components/Game';
import StartScreen from './components/StartScreen';
import VictoryScreen from './components/VictoryScreen';
import { GameState, Difficulty } from './types';

function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [difficulty, setDifficulty] = useState<Difficulty>('normal');
  const [hasUnlockedHardMode, setHasUnlockedHardMode] = useState(false);

  const startGame = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    setGameState('playing');
  };

  const endGame = (victory: boolean) => {
    if (victory) {
      setGameState('victory');
      if (!hasUnlockedHardMode) {
        setHasUnlockedHardMode(true);
      }
    } else {
      setGameState('end');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="game-container">
        {gameState === 'start' && (
          <StartScreen onStart={startGame} hasUnlockedHardMode={hasUnlockedHardMode} />
        )}
        {gameState === 'playing' && <Game onEnd={endGame} difficulty={difficulty} />}
        {gameState === 'victory' && (
          <VictoryScreen onRestart={startGame} hasUnlockedHardMode={hasUnlockedHardMode} />
        )}
        {gameState === 'end' && (
          <div className="text-white text-center">
            <h2 className="text-2xl mb-4 text-red-500">Game Over</h2>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded btn-glow"
              onClick={() => setGameState('start')}
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;