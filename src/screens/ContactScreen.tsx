import React from "react";
import { contacts } from "../data/contact";

interface Props {
  selectedIndex: number;
  onHover: (i: number) => void;
  onSelect: (i: number) => void;
}

export const ContactScreen: React.FC<Props> = ({ selectedIndex, onHover, onSelect }) => {
  return (
    <div className="w-full h-full p-5 sm:p-8 amber-glow flex flex-col">
      <div className="font-pixel text-sm sm:text-lg amber-chroma mb-4 sm:mb-6">
        ── CONTACT ──
      </div>

      <div className="flex-1 flex flex-col gap-2 sm:gap-3 text-base sm:text-2xl">
        {contacts.map((c, i) => {
          const selected = i === selectedIndex;
          return (
            <button
              key={c.label}
              onMouseEnter={() => onHover(i)}
              onClick={() => onSelect(i)}
              className={
                "text-left px-2 py-1 transition-all " +
                (selected ? "amber-chroma bg-amber-base/10" : "opacity-80 hover:opacity-100")
              }
            >
              <span className="inline-block w-6">
                {selected ? ">" : " "}
              </span>
              <span className="inline-block" style={{ width: "10ch" }}>{c.label}</span>
              <span>{c.value}</span>
            </button>
          );
        })}
      </div>

      <div className="text-center text-[10px] sm:text-xs opacity-60 mt-4">
        ↑↓ NAVIGATE · ENTER OPEN · ESC BACK
      </div>
    </div>
  );
};
