import React from "react";
import { projects } from "../data/projects";

interface Props {
  projectId: string | null;
  onVisit: () => void;
}

export const ProjectDetailScreen: React.FC<Props> = ({ projectId, onVisit }) => {
  const p = projects.find((x) => x.id === projectId);
  if (!p) return null;

  return (
    <div className="w-full h-full p-5 sm:p-8 amber-glow flex flex-col">
      <div className="font-pixel text-xs sm:text-sm amber-chroma opacity-70 mb-1 sm:mb-2">
        [{p.category}]
      </div>
      <div className="font-pixel text-base sm:text-2xl amber-chroma mb-3 sm:mb-5 leading-tight">
        {p.title}
      </div>

      <div className="text-base sm:text-xl mb-3 sm:mb-5">
        <span className="opacity-70">STACK: </span>
        {p.tech.join(" · ")}
      </div>

      <div className="text-base sm:text-xl mb-4 sm:mb-6 leading-snug flex-1 overflow-auto scroll-amber pr-2">
        {p.description}
      </div>

      {p.url ? (
        <button
          onClick={onVisit}
          className="amber-chroma border-2 border-amber-base/70 px-4 py-2 self-start hover:bg-amber-base/20 transition-colors text-base sm:text-xl"
        >
          {">"} VISIT SITE
        </button>
      ) : (
        <div className="text-sm sm:text-base opacity-60 italic">
          [PRIVATE PROJECT — NO PUBLIC LINK]
        </div>
      )}

      <div className="text-center text-[10px] sm:text-xs opacity-60 mt-4">
        ENTER VISIT · ESC BACK
      </div>
    </div>
  );
};
