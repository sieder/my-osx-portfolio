import { useEffect } from "react";

type KeyMap = {
  up?: () => void;
  down?: () => void;
  left?: () => void;
  right?: () => void;
  select?: () => void;
  back?: () => void;
  any?: () => void;
  custom?: Record<string, () => void>;
};

export function useKeyboard(map: KeyMap, deps: any[] = []) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key;
      const lower = k.toLowerCase();

      if (map.custom?.[lower]) {
        e.preventDefault();
        map.custom[lower]();
        return;
      }

      if (k === "ArrowUp" || lower === "w") {
        e.preventDefault();
        map.up?.();
      } else if (k === "ArrowDown" || lower === "s") {
        e.preventDefault();
        map.down?.();
      } else if (k === "ArrowLeft" || lower === "a") {
        e.preventDefault();
        map.left?.();
      } else if (k === "ArrowRight" || lower === "d") {
        e.preventDefault();
        map.right?.();
      } else if (k === "Enter" || k === " ") {
        e.preventDefault();
        map.select?.();
      } else if (k === "Escape" || k === "Backspace") {
        e.preventDefault();
        map.back?.();
      }

      map.any?.();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
