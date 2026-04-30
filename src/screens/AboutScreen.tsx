import React from "react";
import { about } from "../data/about";
import { skills } from "../data/skills";

const Bar: React.FC<{ value: number }> = ({ value }) => {
  const total = 20;
  const filled = Math.round((value / 100) * total);
  return (
    <span className="amber-chroma">
      {"█".repeat(filled)}
      <span className="opacity-30">{"░".repeat(total - filled)}</span>
    </span>
  );
};

export const AboutScreen: React.FC = () => {
  return (
    <div className="w-full h-full p-5 sm:p-8 amber-glow overflow-auto scroll-amber">
      <div className="font-pixel text-sm sm:text-lg amber-chroma mb-3 sm:mb-5">
        ── STATUS ──
      </div>

      <div className="text-base sm:text-xl space-y-1 mb-4 sm:mb-6">
        <div><span className="opacity-70">NAME:    </span><span className="amber-chroma">{about.name}</span></div>
        <div><span className="opacity-70">CLASS:   </span><span className="amber-chroma">{about.class}</span></div>
        <div><span className="opacity-70">LOCATION:</span> {about.location}</div>
        <div><span className="opacity-70">LVL:     </span>{about.level}   <span className="opacity-70">EXP:</span> {about.exp}</div>
        <div><span className="opacity-70">HP:      </span>{about.hp}/{about.hp}   <span className="opacity-70">MP:</span> {about.mp}/{about.mp}</div>
      </div>

      <div className="font-pixel text-sm sm:text-lg amber-chroma mb-2 sm:mb-3">
        ── BIO ──
      </div>
      <div className="text-base sm:text-xl mb-4 sm:mb-6 leading-snug">
        {about.bio}
      </div>

      <div className="font-pixel text-sm sm:text-lg amber-chroma mb-2 sm:mb-3">
        ── SKILLS ──
      </div>
      <div className="text-base sm:text-xl space-y-0.5 sm:space-y-1 font-mono">
        {skills.map((s) => (
          <div key={s.name} className="flex items-center gap-2 whitespace-nowrap">
            <span className="opacity-80 inline-block" style={{ width: "11ch" }}>{s.name}</span>
            <Bar value={s.level} />
            <span className="opacity-70 ml-2">{s.level}</span>
          </div>
        ))}
      </div>

      <div className="text-center text-[10px] sm:text-xs opacity-60 mt-6">
        ESC TO RETURN
      </div>
    </div>
  );
};
