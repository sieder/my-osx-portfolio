import React, { useEffect, useRef } from "react";
import { projects } from "../data/projects";

interface Props {
  selectedIndex: number;
  onHover: (i: number) => void;
  onSelect: (i: number) => void;
}

export const ProjectsScreen: React.FC<Props> = ({ selectedIndex, onHover, onSelect }) => {
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    itemRefs.current[selectedIndex]?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  return (
    <div className="w-full h-full p-5 sm:p-8 amber-glow flex flex-col">
      <div className="font-pixel text-sm sm:text-lg amber-chroma mb-2 sm:mb-4">
        ── PROJECTS ──
      </div>

      <div className="flex-1 overflow-auto scroll-amber pr-2">
        {projects.map((p, i) => {
          const selected = i === selectedIndex;
          return (
            <button
              key={p.id}
              ref={(el) => { itemRefs.current[i] = el; }}
              onMouseEnter={() => onHover(i)}
              onClick={() => onSelect(i)}
              className={
                "block w-full text-left text-base sm:text-xl py-1 px-2 transition-all " +
                (selected ? "amber-chroma bg-amber-base/10" : "opacity-80 hover:opacity-100")
              }
            >
              <span className="inline-block w-5">{selected ? ">" : " "}</span>
              <span className="opacity-70">[{p.category}]</span> {p.title}
              <div className="ml-7 text-xs sm:text-sm opacity-60">
                {p.tech.join(" · ")}
              </div>
            </button>
          );
        })}
      </div>

      <div className="text-center text-[10px] sm:text-xs opacity-60 mt-2">
        ↑↓ NAVIGATE · ENTER OPEN · ESC BACK
      </div>
    </div>
  );
};
