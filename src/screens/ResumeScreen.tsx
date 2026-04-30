import React from "react";
import { about } from "../data/about";
import { skills } from "../data/skills";
import { projects } from "../data/projects";

interface Props {
  mode: "text" | "pdf";
  onToggleMode: () => void;
}

export const ResumeScreen: React.FC<Props> = ({ mode, onToggleMode }) => {
  if (mode === "pdf") {
    return (
      <div className="w-full h-full p-2 sm:p-4 amber-glow flex flex-col">
        <div className="flex justify-between items-center mb-2 px-2">
          <div className="font-pixel text-xs sm:text-sm amber-chroma">
            RESUME.PDF
          </div>
          <div className="text-xs sm:text-sm opacity-70">
            [V] TOGGLE TEXT · [D] DOWNLOAD · ESC BACK
          </div>
        </div>
        <iframe
          src="/resume.pdf"
          title="Resume"
          className="flex-1 w-full bg-amber-base/5 border-2 border-amber-base/40"
          style={{ filter: "sepia(1) hue-rotate(-15deg) saturate(1.5) contrast(1.1)" }}
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full p-5 sm:p-8 amber-glow overflow-auto scroll-amber">
      <div className="font-pixel text-sm sm:text-lg amber-chroma mb-2">
        ── RESUME ──
      </div>

      <div className="text-base sm:text-xl mb-1">
        <span className="amber-chroma">{about.name}</span>
      </div>
      <div className="text-sm sm:text-lg opacity-80 mb-4">
        {about.class} · {about.location}
      </div>

      <div className="font-pixel text-xs sm:text-sm amber-chroma mb-1">
        ── SUMMARY ──
      </div>
      <div className="text-base sm:text-xl mb-4 leading-snug">{about.bio}</div>

      <div className="font-pixel text-xs sm:text-sm amber-chroma mb-1">
        ── SKILLS ──
      </div>
      <div className="text-base sm:text-xl mb-4">
        {skills.map((s) => s.name).join(" · ")}
      </div>

      <div className="font-pixel text-xs sm:text-sm amber-chroma mb-1">
        ── EXPERIENCE ──
      </div>
      <div className="text-base sm:text-xl mb-4 space-y-2">
        {projects
          .filter((p) => p.category === "WORK")
          .map((p) => (
            <div key={p.id}>
              <span className="amber-chroma">{p.title}</span>
              <div className="ml-2 text-sm sm:text-base opacity-70">
                {p.tech.join(" · ")}
              </div>
              <div className="ml-2 text-sm sm:text-base opacity-80">
                {p.description}
              </div>
            </div>
          ))}
      </div>

      <div className="font-pixel text-xs sm:text-sm amber-chroma mb-1">
        ── PERSONAL PROJECTS ──
      </div>
      <div className="text-base sm:text-xl mb-6 space-y-2">
        {projects
          .filter((p) => p.category === "PERSONAL")
          .map((p) => (
            <div key={p.id}>
              <span className="amber-chroma">{p.title}</span>
              <div className="ml-2 text-sm sm:text-base opacity-70">
                {p.tech.join(" · ")}
              </div>
            </div>
          ))}
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <button
          onClick={onToggleMode}
          className="amber-chroma border-2 border-amber-base/70 px-3 py-1 hover:bg-amber-base/20"
        >
          {">"} VIEW PDF [V]
        </button>
        <a
          href="/resume.pdf"
          download
          className="amber-chroma border-2 border-amber-base/70 px-3 py-1 hover:bg-amber-base/20 inline-block"
        >
          {">"} DOWNLOAD [D]
        </a>
      </div>

      <div className="text-center text-[10px] sm:text-xs opacity-60">
        ESC TO RETURN
      </div>
    </div>
  );
};
