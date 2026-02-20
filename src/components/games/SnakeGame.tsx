import React, { useEffect, useRef, useState } from 'react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 15, y: 10 };
const INITIAL_DIRECTION = { x: 1, y: 0 };

export const SnakeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': if (direction.y === 0) setDirection({ x: 0, y: -1 }); break;
        case 'ArrowDown': if (direction.y === 0) setDirection({ x: 0, y: 1 }); break;
        case 'ArrowLeft': if (direction.x === 0) setDirection({ x: -1, y: 0 }); break;
        case 'ArrowRight': if (direction.x === 0) setDirection({ x: 1, y: 0 }); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (gameOver) return;

    const moveSnake = () => {
      const newSnake = [...snake];
      const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };

      // Check collisions
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE || 
          newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        return;
      }

      newSnake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        setScore(s => s + 10);
        setFood({
          x: Math.floor(Math.random() * GRID_SIZE),
          y: Math.floor(Math.random() * GRID_SIZE),
        });
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
    };

    const interval = setInterval(moveSnake, 150);
    return () => clearInterval(interval);
  }, [snake, direction, food, gameOver]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    ctx.fillStyle = '#000000';
    snake.forEach(segment => {
      ctx.fillRect(segment.x * 20, segment.y * 20, 18, 18);
    });

    // Draw food
    ctx.fillStyle = '#00FF00';
    ctx.fillRect(food.x * 20, food.y * 20, 18, 18);
  }, [snake, food]);

  const reset = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection(INITIAL_DIRECTION);
    setGameOver(false);
    setScore(0);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex justify-between w-full font-mono text-xl">
        <span>SCORE: {score}</span>
        {gameOver && <span className="text-red-600 font-bold">GAME OVER!</span>}
      </div>
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="brutal-border bg-white"
      />
      <button 
        onClick={reset}
        className="brutal-btn brutal-border px-8 py-2 text-xl"
      >
        RESTART
      </button>
      <p className="text-sm opacity-60">USE ARROW KEYS TO MOVE</p>
    </div>
  );
};
