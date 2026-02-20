import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export const ClickerGame: React.FC = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isActive, setIsActive] = useState(false);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (score > highScore) setHighScore(score);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, score, highScore]);

  const handleClick = () => {
    if (!isActive && timeLeft === 10) {
      setIsActive(true);
    }
    if (isActive) {
      setScore(s => s + 1);
    }
  };

  const reset = () => {
    setScore(0);
    setTimeLeft(10);
    setIsActive(false);
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-white brutal-border w-full max-w-md">
      <div className="grid grid-cols-2 gap-4 w-full font-mono text-center">
        <div className="p-2 border-2 border-black">
          <div className="text-xs uppercase opacity-60">Time</div>
          <div className="text-2xl font-bold">{timeLeft}s</div>
        </div>
        <div className="p-2 border-2 border-black">
          <div className="text-xs uppercase opacity-60">Score</div>
          <div className="text-2xl font-bold">{score}</div>
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.9, rotate: 5 }}
        onClick={handleClick}
        disabled={timeLeft === 0}
        className={`w-48 h-48 rounded-full border-8 border-black flex items-center justify-center text-4xl font-display uppercase transition-colors ${
          isActive ? 'bg-neon-green' : 'bg-gray-200'
        } ${timeLeft === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        {isActive ? 'CLICK!' : timeLeft === 0 ? 'DONE' : 'START'}
      </motion.button>

      {timeLeft === 0 && (
        <div className="text-center animate-bounce">
          <div className="font-display text-2xl">FINAL SCORE: {score}</div>
          <div className="font-mono text-sm">HIGH SCORE: {highScore}</div>
        </div>
      )}

      <button 
        onClick={reset}
        className="brutal-btn brutal-border px-8 py-2 text-xl w-full"
      >
        RESET
      </button>
    </div>
  );
};
