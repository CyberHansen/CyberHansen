import { useEffect, useState, useRef, useCallback } from 'react';

// Definerer typer
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

interface SnakeState {
  snake: Position[];
  food: Position;
  direction: Direction;
  gameOver: boolean;
  paused: boolean;
  score: number;
  highScore: number;
}

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const MOVE_INTERVAL = 200; // Millisekunder mellom hvert trekk (høyere = tregere)

const Snake = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<SnakeState>({
    snake: [{ x: 10, y: 10 }],
    food: { x: 15, y: 15 },
    direction: 'RIGHT',
    gameOver: false,
    paused: false,
    score: 0,
    highScore: 0
  });
  
  const lastMoveTimeRef = useRef<number>(0);
  const requestRef = useRef<number>();
  
  // Last inn highscore fra localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem('snakeHighScore');
    if (savedHighScore) {
      setGameState(prev => ({ ...prev, highScore: parseInt(savedHighScore) }));
    }
  }, []);

  // Generer mat på en tilfeldig posisjon
  const generateFood = useCallback((snake: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
      // Sjekk at maten ikke er på slangen
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, []);

  // Sjekk om slangen kolliderer med seg selv
  const checkCollision = useCallback((head: Position, snake: Position[]): boolean => {
    return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
  }, []);

  // Sjekk om slangen er utenfor brettet
  const checkOutOfBounds = useCallback((head: Position): boolean => {
    return head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE;
  }, []);

  // Oppdater spilltilstanden
  const updateGameState = useCallback(() => {
    if (gameState.gameOver || gameState.paused) return;

    setGameState(prevState => {
      const { snake, food, direction, score, highScore } = prevState;
      
      // Beregn ny hodeposisjon
      const head = { ...snake[0] };
      
      switch (direction) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
      }

      // Sjekk kollisjoner
      if (checkOutOfBounds(head) || checkCollision(head, snake)) {
        const newHighScore = score > highScore ? score : highScore;
        if (newHighScore > highScore) {
          localStorage.setItem('snakeHighScore', newHighScore.toString());
        }
        return { ...prevState, gameOver: true, highScore: newHighScore };
      }

      // Lag ny slange
      const newSnake = [head, ...snake];
      
      // Sjekk om slangen spiser mat
      let newFood = food;
      let newScore = score;
      
      if (head.x === food.x && head.y === food.y) {
        newFood = generateFood(newSnake);
        newScore = score + 1;
      } else {
        // Fjern halen hvis slangen ikke spiser
        newSnake.pop();
      }

      return {
        ...prevState,
        snake: newSnake,
        food: newFood,
        score: newScore
      };
    });
  }, [gameState, checkOutOfBounds, checkCollision, generateFood]);

  // Tegn spillet på canvas
  const drawGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Tøm canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Tegn bakgrunn
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Tegn rutenett for visuell hjelp
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 0.5;
    
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }

    // Tegn slangen med gradient
    gameState.snake.forEach((segment, index) => {
      // Bruk konsistent blåfarge for slangen, med gradvis redusert opacity for halen
      ctx.fillStyle = index === 0 
        ? '#4287f5' // Hodet er mørkere blå
        : `rgb(66, 135, 245, ${0.8 - (index * 0.03)})`;
      
      // Tegn slangen med avrundede hjørner for et glattere utseende
      const radius = CELL_SIZE / 5;
      const x = segment.x * CELL_SIZE;
      const y = segment.y * CELL_SIZE;
      const size = CELL_SIZE - 1; // Litt mindre for å se mellomrom
      
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.arcTo(x + size, y, x + size, y + size, radius);
      ctx.arcTo(x + size, y + size, x, y + size, radius);
      ctx.arcTo(x, y + size, x, y, radius);
      ctx.arcTo(x, y, x + size, y, radius);
      ctx.closePath();
      ctx.fill();
      
      // Tegn øyne på hodet
      if (index === 0) {
        ctx.fillStyle = 'white';
        
        // Posisjoner øynene basert på retning
        let leftEyeX, leftEyeY, rightEyeX, rightEyeY;
        const eyeSize = CELL_SIZE / 5;
        
        switch (gameState.direction) {
          case 'UP':
            leftEyeX = x + CELL_SIZE / 3 - eyeSize / 2;
            leftEyeY = y + CELL_SIZE / 3 - eyeSize / 2;
            rightEyeX = x + (CELL_SIZE * 2/3) - eyeSize / 2;
            rightEyeY = y + CELL_SIZE / 3 - eyeSize / 2;
            break;
          case 'DOWN':
            leftEyeX = x + CELL_SIZE / 3 - eyeSize / 2;
            leftEyeY = y + (CELL_SIZE * 2/3) - eyeSize / 2;
            rightEyeX = x + (CELL_SIZE * 2/3) - eyeSize / 2;
            rightEyeY = y + (CELL_SIZE * 2/3) - eyeSize / 2;
            break;
          case 'LEFT':
            leftEyeX = x + CELL_SIZE / 3 - eyeSize / 2;
            leftEyeY = y + CELL_SIZE / 3 - eyeSize / 2;
            rightEyeX = x + CELL_SIZE / 3 - eyeSize / 2;
            rightEyeY = y + (CELL_SIZE * 2/3) - eyeSize / 2;
            break;
          case 'RIGHT':
            leftEyeX = x + (CELL_SIZE * 2/3) - eyeSize / 2;
            leftEyeY = y + CELL_SIZE / 3 - eyeSize / 2;
            rightEyeX = x + (CELL_SIZE * 2/3) - eyeSize / 2;
            rightEyeY = y + (CELL_SIZE * 2/3) - eyeSize / 2;
            break;
        }
        
        ctx.beginPath();
        ctx.arc(leftEyeX, leftEyeY, eyeSize, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(rightEyeX, rightEyeY, eyeSize, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Tegn mat (eple)
    const foodX = gameState.food.x * CELL_SIZE;
    const foodY = gameState.food.y * CELL_SIZE;
    
    // Eple-form
    ctx.fillStyle = '#ff4757';
    ctx.beginPath();
    ctx.arc(foodX + CELL_SIZE / 2, foodY + CELL_SIZE / 2, CELL_SIZE / 2 - 1, 0, Math.PI * 2);
    ctx.fill();
    
    // Stilk
    ctx.fillStyle = '#2f3542';
    ctx.fillRect(foodX + CELL_SIZE / 2 - 1, foodY + 2, 2, 4);
    
    // Blad
    ctx.fillStyle = '#26de81';
    ctx.beginPath();
    ctx.ellipse(foodX + CELL_SIZE / 2 + 3, foodY + 4, 3, 2, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();

    // Tegn Game Over skjerm
    if (gameState.gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.font = '24px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 50);
      
      ctx.font = '18px Arial';
      ctx.fillText(`Score: ${gameState.score}`, canvas.width / 2, canvas.height / 2 - 20);
      ctx.fillText(`High Score: ${gameState.highScore}`, canvas.width / 2, canvas.height / 2 + 10);
      
      ctx.font = '14px Arial';
      ctx.fillText('Press SPACE to restart', canvas.width / 2, canvas.height / 2 + 50);
    }
    
    // Tegn pause skjerm
    if (gameState.paused && !gameState.gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.font = '24px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText('Paused', canvas.width / 2, canvas.height / 2 - 20);
      
      ctx.font = '14px Arial';
      ctx.fillText('Press SPACE to continue', canvas.width / 2, canvas.height / 2 + 20);
    }

    // Tegn score
    if (!gameState.gameOver && !gameState.paused) {
      ctx.font = '16px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'left';
      ctx.fillText(`Score: ${gameState.score}`, 10, 25);
      ctx.fillText(`High Score: ${gameState.highScore}`, 10, 50);
    }
  }, [gameState]);

  // Game loop med requestAnimationFrame for smooth animasjon
  const gameLoop = useCallback((timestamp: number) => {
    // Tegn spillet uansett for smooth animasjon
    drawGame();
    
    // Oppdater spilltilstanden basert på tid
    if (!gameState.gameOver && !gameState.paused) {
      // Sjekk om det er på tide å flytte slangen
      if (timestamp - lastMoveTimeRef.current > MOVE_INTERVAL) {
        updateGameState();
        lastMoveTimeRef.current = timestamp;
      }
    }
    
    // Fortsett game loop
    requestRef.current = requestAnimationFrame(gameLoop);
  }, [drawGame, updateGameState, gameState.gameOver, gameState.paused]);

  // Start game loop
  useEffect(() => {
    lastMoveTimeRef.current = performance.now();
    requestRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [gameLoop]);

  // Håndter tastetrykk
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Forhindre standard oppførsel for piltaster og space for å unngå scrolling
      if (e.key === ' ' || 
          e.key === 'ArrowUp' || 
          e.key === 'ArrowDown' || 
          e.key === 'ArrowLeft' || 
          e.key === 'ArrowRight' ||
          e.key === 'w' || 
          e.key === 'a' || 
          e.key === 's' || 
          e.key === 'd' ||
          e.key === 'W' || 
          e.key === 'A' || 
          e.key === 'S' || 
          e.key === 'D') {
        e.preventDefault();
      }
      
      if (e.key === ' ') {
        // Restart spillet hvis game over, ellers pause/fortsett
        if (gameState.gameOver) {
          setGameState({
            snake: [{ x: 10, y: 10 }],
            food: generateFood([{ x: 10, y: 10 }]),
            direction: 'RIGHT',
            gameOver: false,
            paused: false,
            score: 0,
            highScore: gameState.highScore
          });
        } else {
          setGameState(prev => ({ ...prev, paused: !prev.paused }));
        }
        return;
      }
      
      if (gameState.gameOver || gameState.paused) return;

      // Unngå at slangen kan snu 180 grader
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (gameState.direction !== 'DOWN') {
            setGameState(prev => ({ ...prev, direction: 'UP' }));
          }
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (gameState.direction !== 'UP') {
            setGameState(prev => ({ ...prev, direction: 'DOWN' }));
          }
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (gameState.direction !== 'RIGHT') {
            setGameState(prev => ({ ...prev, direction: 'LEFT' }));
          }
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (gameState.direction !== 'LEFT') {
            setGameState(prev => ({ ...prev, direction: 'RIGHT' }));
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameState.direction, gameState.gameOver, gameState.paused, generateFood, gameState.highScore]);

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-center mb-2">Snake Game</h2>
        <p className="text-gray-300 text-center mb-4">Kan du slå rekorden på {gameState.highScore} poeng?</p>
        <p className="text-gray-400 text-sm text-center mb-6">Bruk piltastene eller WASD for å styre. Trykk SPACE for å starte/pause/starte på nytt.</p>
      </div>
      
      <div className="relative border-4 border-gray-700 rounded-lg overflow-hidden shadow-lg">
        <canvas 
          ref={canvasRef} 
          width={GRID_SIZE * CELL_SIZE} 
          height={GRID_SIZE * CELL_SIZE}
          className="bg-gray-900"
        />
      </div>
      
      <div className="mt-6 flex gap-4">
        <button 
          onClick={() => {
            if (gameState.gameOver) {
              setGameState({
                snake: [{ x: 10, y: 10 }],
                food: generateFood([{ x: 10, y: 10 }]),
                direction: 'RIGHT',
                gameOver: false,
                paused: false,
                score: 0,
                highScore: gameState.highScore
              });
            } else {
              setGameState(prev => ({ ...prev, paused: !prev.paused }));
            }
          }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
        >
          {gameState.gameOver ? 'Restart' : gameState.paused ? 'Fortsett' : 'Pause'}
        </button>
      </div>
    </div>
  );
};

export default Snake;
