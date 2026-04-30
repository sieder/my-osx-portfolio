import React from "react";
import { MENU_ITEMS } from "../state/reducer";

interface Props {
  selectedIndex: number;
  onHover: (i: number) => void;
  onSelect: (i: number) => void;
}

export const MainMenu: React.FC<Props> = ({ selectedIndex, onHover, onSelect }) => {
  return (
    <div className="w-full h-full flex flex-col p-6 sm:p-10 amber-glow">
      {/* Header */}
      <div className="text-center mb-4 sm:mb-8">
        <div className="font-pixel text-base sm:text-xl md:text-2xl amber-chroma tracking-widest">
          SIEDER.SYS
        </div>
        <div className="text-sm sm:text-lg opacity-70 mt-1 sm:mt-2">
          ── MAIN MENU ──
        </div>
      </div>

      {/* Items */}
      <div className="flex-1 flex flex-col items-center justify-center gap-1 sm:gap-2 text-xl sm:text-3xl md:text-4xl">
        {MENU_ITEMS.map((label, i) => (
          <button
            key={label}
            onMouseEnter={() => onHover(i)}
            onClick={() => onSelect(i)}
            className="amber-chroma px-4 py-1 hover:scale-105 transition-transform"
            style={{ minWidth: "min(80%, 320px)", textAlign: "left" }}
          >
            <span className="inline-block w-6">
              {i === selectedIndex ? ">" : " "}
            </span>
            {label}
          </button>
        ))}
      </div>

      {/* Footer hint */}
      <div className="text-center text-[10px] sm:text-xs opacity-60 mt-4">
        <span className="hidden md:inline">↑↓ NAVIGATE · ENTER SELECT · ESC BACK</span>
        <span className="md:hidden">USE D-PAD AND A/B BUTTONS</span>
      </div>
    </div>
  );
};
