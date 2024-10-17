import React, { useState, useEffect } from 'react';
import { Player, Enemy, Skill, EasterEgg, Difficulty } from '../types';
import { Sword, Zap, Salad, Wifi, Bomb, Star, Coffee, Music, Camera, Gift, Feather, Rocket, Heart, Droplet, Sun, Moon, Cloud, Umbrella, Wind, User, UserX, Shield, Users } from 'lucide-react';

interface GameProps {
  onEnd: (victory: boolean) => void;
  difficulty: Difficulty;
}

const Game: React.FC<GameProps> = ({ onEnd, difficulty }) => {
  const [player, setPlayer] = useState<Player>({
    health: 100,
    attack: 10,
    defense: 5,
    mana: 50
  });

  const [enemy, setEnemy] = useState<Enemy>({
    name: '戴老六',
    health: difficulty === 'hard' ? 1200 : 1000,
    attack: difficulty === 'hard' ? 15 : 12,
    defense: difficulty === 'hard' ? 8 : 6
  });

  const [turn, setTurn] = useState<'player' | 'enemy'>('player');
  const [message, setMessage] = useState<string>('');
  const [effectAnimation, setEffectAnimation] = useState<string | null>(null);
  const [easterEgg, setEasterEgg] = useState<EasterEgg | null>(null);

  const skills: Skill[] = [
    { name: '雷霆一击', manaCost: 20, damage: 30 },
    { name: '防御姿态', manaCost: 15, effect: 'defense' },
    { name: '群友召唤', manaCost: 25, damage: 25 }
  ];

  useEffect(() => {
    if (player.health <= 0) {
      onEnd(false);
    } else if (enemy.health <= 0) {
      onEnd(true);
    }
  }, [player.health, enemy.health, onEnd]);

  const handleAttack = () => {
    if (turn === 'player') {
      const damage = Math.max(player.attack - enemy.defense, 1);
      setEnemy(prev => ({ ...prev, health: Math.max(prev.health - damage, 0) }));
      setMessage(`你对戴老六造成了 ${damage} 点伤害！`);
      setEffectAnimation('attack');
      setTurn('enemy');
    }
  };

  const handleSkill = (skill: Skill) => {
    if (turn === 'player' && player.mana >= skill.manaCost) {
      setPlayer(prev => ({ ...prev, mana: prev.mana - skill.manaCost }));
      if (skill.damage) {
        const damage = Math.max(skill.damage - enemy.defense, 1);
        setEnemy(prev => ({ ...prev, health: Math.max(prev.health - damage, 0) }));
        setMessage(`你使用了${skill.name}，对戴老六造成了 ${damage} 点伤害！`);
        setEffectAnimation(skill.name === '雷霆一击' ? 'thunder' : 'friends-attack');
      } else if (skill.effect === 'defense') {
        setPlayer(prev => ({ ...prev, defense: prev.defense + 5 }));
        setMessage(`你使用了${skill.name}，防御力提升了！`);
        setEffectAnimation('defense');
      }
      setTurn('enemy');
    }
  };

  const handleEat = () => {
    if (turn === 'player') {
      const healAmount = 20;
      setPlayer(prev => ({ ...prev, health: Math.min(prev.health + healAmount, 100) }));
      setMessage(`你吃了一份沙拉，恢复了 ${healAmount} 点生命值！`);
      setEffectAnimation('heal');
      setTurn('enemy');
    }
  };

  const enemyTurn = () => {
    if (turn === 'enemy') {
      const damage = Math.max(enemy.attack - player.defense, 1);
      setPlayer(prev => ({ ...prev, health: Math.max(prev.health - damage, 0) }));
      setMessage(`戴老六对你造成了 ${damage} 点伤害！`);
      setEffectAnimation('attack');
      setTurn('player');
    }
  };

  useEffect(() => {
    if (turn === 'enemy') {
      const timer = setTimeout(enemyTurn, 1000);
      return () => clearTimeout(timer);
    }
  }, [turn]);

  const getEasterEggIcon = (name: string) => {
    switch (name) {
      case 'WiFi': return <Wifi />;
      case 'Bomb': return <Bomb />;
      case 'Star': return <Star />;
      case 'Coffee': return <Coffee />;
      case 'Music': return <Music />;
      case 'Camera': return <Camera />;
      case 'Gift': return <Gift />;
      case 'Feather': return <Feather />;
      case 'Rocket': return <Rocket />;
      case 'Sun': return <Sun />;
      case 'Moon': return <Moon />;
      case 'Cloud': return <Cloud />;
      case 'Umbrella': return <Umbrella />;
      case 'Wind': return <Wind />;
      default: return null;
    }
  };

  return (
    <div className="text-white text-center p-4 max-w-md mx-auto game-container">
      <h2 className="text-2xl mb-4 text-red-500">重生之我在群里暴打戴老六</h2>
      <p className="mb-2 text-yellow-500">难度: {difficulty === 'hard' ? '困难' : '普通'}</p>
      
      {/* Boss Area */}
      <div className="bg-gray-800 bg-opacity-70 p-4 rounded-lg mb-4">
        <div className="flex items-center justify-center mb-2">
          <UserX size={32} className="mr-2 text-red-500" />
          <h3 className="text-xl text-red-500">{enemy.name}</h3>
        </div>
        <div className="bg-red-900 h-4 rounded-full overflow-hidden">
          <div className="bg-red-500 h-full" style={{ width: `${(enemy.health / (difficulty === 'hard' ? 1200 : 1000)) * 100}%` }}></div>
        </div>
        <p className="text-red-300">Health: {enemy.health}/{difficulty === 'hard' ? 1200 : 1000}</p>
      </div>

      {/* Player Area */}
      <div className="bg-blue-800 bg-opacity-70 p-4 rounded-lg mb-4">
        <div className="flex items-center justify-center mb-2">
          <User size={32} className="mr-2 text-blue-300" />
          <h3 className="text-xl text-blue-300">你</h3>
        </div>
        <div className="bg-blue-900 h-4 rounded-full overflow-hidden">
          <div className="bg-blue-500 h-full" style={{ width: `${player.health}%` }}></div>
        </div>
        <p className="text-blue-300">Health: {player.health}/100</p>
        <div className="bg-purple-900 h-4 rounded-full overflow-hidden mt-2">
          <div className="bg-purple-500 h-full" style={{ width: `${(player.mana / 50) * 100}%` }}></div>
        </div>
        <p className="text-purple-300">Mana: {player.mana}/50</p>
      </div>

      {/* Effect Animation */}
      {effectAnimation && (
        <div className={`absolute inset-0 pointer-events-none flex items-center justify-center animate-${effectAnimation}`}>
          {effectAnimation === 'attack' && <Sword size={64} className="text-red-500" />}
          {effectAnimation === 'thunder' && <Zap size={64} className="text-yellow-500" />}
          {effectAnimation === 'defense' && <Shield size={64} className="text-blue-500" />}
          {effectAnimation === 'friends-attack' && <Users size={64} className="text-green-500" />}
          {effectAnimation === 'heal' && (
            <div className="flex">
              <Heart size={32} className="text-red-500 mr-2" />
              <Droplet size={32} className="text-blue-500" />
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center btn-glow"
          onClick={handleAttack}
          disabled={turn === 'enemy'}
        >
          攻击 <Sword className="inline-block ml-1" size={16} />
        </button>
        {skills.map((skill, index) => (
          <button
            key={index}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center btn-glow"
            onClick={() => handleSkill(skill)}
            disabled={turn === 'enemy' || player.mana < skill.manaCost}
          >
            {skill.name} {skill.name === '雷霆一击' ? <Zap className="inline-block ml-1" size={16} /> : 
                         skill.name === '防御姿态' ? <Shield className="inline-block ml-1" size={16} /> :
                         <Users className="inline-block ml-1" size={16} />}
          </button>
        ))}
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center btn-glow"
          onClick={handleEat}
          disabled={turn === 'enemy'}
        >
          吃沙拉 <Salad className="inline-block ml-1" size={16} />
        </button>
      </div>

      {/* Message Area */}
      {message && (
        <div className="bg-gray-700 bg-opacity-70 p-2 rounded-lg mb-4">
          <p className="text-yellow-300">{message}</p>
        </div>
      )}

      {/* Easter Egg Icon */}
      {easterEgg && (
        <div className={`text-4xl mb-4 animate-${easterEgg.animation}`}>
          {getEasterEggIcon(easterEgg.name)}
        </div>
      )}
    </div>
  );
};

export default Game;