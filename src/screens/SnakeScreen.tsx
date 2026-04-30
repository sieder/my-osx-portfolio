import React, { useCallback, useEffect, useRef, useState } from "react";

const COLS = 24;
const ROWS = 18;
const TICK_MS = 110;

type Vec = { x: number; y: number };
type Dir = "U" | "D" | "L" | "R";

const dirVec: Record<Dir, Vec> = {
  U: { x: 0, y: -1 },
  D: { x: 0, y: 1 },
  L: { x: -1, y: 0 },
  R: { x: 1, y: 0 },
};

const opposite: Record<Dir, Dir> = { U: "D", D: "U", L: "R", R: "L" };

const HIGH_KEY = "amber.snake.high";

interface Props {
  active: boolean;
  onBack: () => void;
}

const initialSnake = (): Vec[] => [
  { x: 5, y: 9 },
  { x: 4, y: 9 },
  { x: 3, y: 9 },
];

const placeFood = (snake: Vec[]): Vec => {
  while (true) {
    const f = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
    if (!snake.some((s) => s.x === f.x && s.y === f.y)) return f;
  }
};

export const SnakeScreen: React.FC<Props> = ({ active, onBack }) => {
  const [snake, setSnake] = useState<Vec[]>(initialSnake);
  const [dir, setDir] = useState<Dir>("R");
  const [food, setFood] = useState<Vec>(() => placeFood(initialSnake()));
  const [score, setScore] = useState(0);
  const [over, setOver] = useState(false);
  const [high, setHigh] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    return parseInt(localStorage.getItem(HIGH_KEY) || "0", 10);
  });

  // Refs mirror state so the tick can read latest values without stale closures.
  const snakeRef = useRef(snake);
  snakeRef.current = snake;
  const dirRef = useRef(dir);
  dirRef.current = dir;
  const foodRef = useRef(food);
  foodRef.current = food;
  const scoreRef = useRef(score);
  scoreRef.current = score;
  const overRef = useRef(over);
  overRef.current = over;
  const queuedRef = useRef<Dir | null>(null);

  const reset = useCallback(() => {
    const start = initialSnake();
    setSnake(start);
    snakeRef.current = start;
    setDir("R");
    dirRef.current = "R";
    queuedRef.current = null;
    const f = placeFood(start);
    setFood(f);
    foodRef.current = f;
    setScore(0);
    scoreRef.current = 0;
    setOver(false);
    overRef.current = false;
  }, []);

  // Game tick — pure imperative; no impure state reads inside updaters.
  useEffect(() => {
    if (!active || over) return;
    const id = setInterval(() => {
      if (overRef.current) return;

      // Apply queued direction (one per tick).
      const queued = queuedRef.current;
      let nextDir = dirRef.current;
      if (queued && queued !== opposite[nextDir] && queued !== nextDir) {
        nextDir = queued;
        dirRef.current = nextDir;
        setDir(nextDir);
      }
      queuedRef.current = null;

      const prev = snakeRef.current;
      const v = dirVec[nextDir];
      const head = { x: prev[0].x + v.x, y: prev[0].y + v.y };

      // Wall collision
      if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
        overRef.current = true;
        setOver(true);
        setHigh((h) => {
          const nh = Math.max(h, scoreRef.current);
          if (typeof window !== "undefined") localStorage.setItem(HIGH_KEY, String(nh));
          return nh;
        });
        return;
      }

      const ate = head.x === foodRef.current.x && head.y === foodRef.current.y;

      // Self collision: if eating, body stays full; if not, tail moves out so ignore last segment.
      const bodyToCheck = ate ? prev : prev.slice(0, -1);
      if (bodyToCheck.some((s) => s.x === head.x && s.y === head.y)) {
        overRef.current = true;
        setOver(true);
        setHigh((h) => {
          const nh = Math.max(h, scoreRef.current);
          if (typeof window !== "undefined") localStorage.setItem(HIGH_KEY, String(nh));
          return nh;
        });
        return;
      }

      const next = ate ? [head, ...prev] : [head, ...prev.slice(0, -1)];
      snakeRef.current = next;
      setSnake(next);

      if (ate) {
        const ns = scoreRef.current + 1;
        scoreRef.current = ns;
        setScore(ns);
        const newFood = placeFood(next);
        foodRef.current = newFood;
        setFood(newFood);
      }
    }, TICK_MS);
    return () => clearInterval(id);
  }, [active, over]);

  // Local key handling — capture phase beats global handlers.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      let d: Dir | null = null;
      if (e.key === "ArrowUp" || k === "w") d = "U";
      else if (e.key === "ArrowDown" || k === "s") d = "D";
      else if (e.key === "ArrowLeft" || k === "a") d = "L";
      else if (e.key === "ArrowRight" || k === "d") d = "R";
      if (d) {
        e.stopPropagation();
        e.preventDefault();
        // Compare against the most recent queued direction (or current if none queued)
        // so two presses in a tick can't both be applied (e.g. R + U + L within one tick → L would reverse U).
        const reference = queuedRef.current ?? dirRef.current;
        if (d !== opposite[reference] && d !== reference) {
          queuedRef.current = d;
        }
      }
      if (e.key === "Enter" || e.key === " ") {
        if (overRef.current) {
          e.stopPropagation();
          e.preventDefault();
          reset();
        }
      }
      if (e.key === "Escape" || e.key === "Backspace") {
        e.stopPropagation();
        e.preventDefault();
        onBack();
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [active, reset, onBack]);

  // Reset on activation.
  useEffect(() => {
    if (active) reset();
  }, [active, reset]);

  const cellSize = 16;
  return (
    <div className="w-full h-full p-3 sm:p-6 amber-glow flex flex-col items-center">
      <div className="flex justify-between w-full max-w-[600px] mb-2 text-base sm:text-xl">
        <div className="amber-chroma">SCORE: {score}</div>
        <div className="amber-chroma">HIGH: {high}</div>
      </div>

      <div
        className="relative border-2 border-amber-base/70"
        style={{
          width: COLS * cellSize,
          maxWidth: "100%",
          aspectRatio: `${COLS} / ${ROWS}`,
          background: "rgba(255,176,0,0.04)",
        }}
      >
        {snake.map((s, i) => (
          <div
            key={i}
            className="absolute bg-amber-base"
            style={{
              left: `${(s.x / COLS) * 100}%`,
              top: `${(s.y / ROWS) * 100}%`,
              width: `${100 / COLS}%`,
              height: `${100 / ROWS}%`,
              boxShadow: i === 0 ? "0 0 6px #FFB000" : "none",
            }}
          />
        ))}
        <div
          className="absolute"
          style={{
            left: `${(food.x / COLS) * 100}%`,
            top: `${(food.y / ROWS) * 100}%`,
            width: `${100 / COLS}%`,
            height: `${100 / ROWS}%`,
            background: "#FFCC33",
            boxShadow: "0 0 8px #FFCC33, 0 0 16px #FFCC33",
          }}
        />

        {over && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 amber-chroma flex-col gap-2">
            <div className="font-pixel text-base sm:text-2xl">GAME OVER</div>
            <div className="text-base sm:text-xl">SCORE {score}</div>
            <div className="text-sm sm:text-base opacity-80">ENTER TO RESTART</div>
          </div>
        )}
      </div>

      <div className="text-center text-[10px] sm:text-xs opacity-60 mt-3">
        ↑↓←→ MOVE · ESC BACK
      </div>
    </div>
  );
};
