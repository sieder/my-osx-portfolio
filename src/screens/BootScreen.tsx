import React, { useEffect, useState } from "react";

interface Props {
  onDone: () => void;
}

const LINES = [
  "AMBER OS v1.0",
  "(C) SIEDER VILLAREAL 1989-2026",
  "",
  "MEMORY TEST..... 64K OK",
  "GRAPHICS........ AMBER MONOCHROME",
  "INPUT........... KEYBOARD / GAMEPAD",
  "",
  "LOADING PORTFOLIO.SYS",
];

export const BootScreen: React.FC<Props> = ({ onDone }) => {
  const [shown, setShown] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (shown >= LINES.length) {
      const t = setTimeout(onDone, 600);
      return () => clearTimeout(t);
    }
    const delay = LINES[shown] === "" ? 80 : 180;
    const t = setTimeout(() => setShown((n) => n + 1), delay);
    return () => clearTimeout(t);
  }, [shown, onDone]);

  useEffect(() => {
    const onKey = () => onDone();
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onKey);
    };
  }, [onDone]);

  useEffect(() => {
    const t = setInterval(() => setShowCursor((c) => !c), 500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full h-full p-6 sm:p-10 amber-glow text-base sm:text-xl md:text-2xl leading-relaxed">
      {/* Initial flash */}
      <div className="absolute inset-0 bg-amber-base/30 pointer-events-none animate-bootFlash" />
      {LINES.slice(0, shown).map((line, i) => (
        <div key={i} className="amber-chroma">
          {line || " "}
        </div>
      ))}
      {shown < LINES.length && (
        <div className="amber-chroma">
          {LINES[shown]}
          <span style={{ opacity: showCursor ? 1 : 0 }}>_</span>
        </div>
      )}
      <div className="absolute bottom-3 left-6 text-[10px] sm:text-xs opacity-60">
        PRESS ANY KEY TO SKIP
      </div>
    </div>
  );
};
