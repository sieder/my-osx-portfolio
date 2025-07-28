// src/components/DesktopIcon.tsx
import React, { useRef, useState } from "react";
import Draggable from "react-draggable";

interface DesktopIconProps {
  icon: string;
  label: string;
  onDoubleClick: () => void;
  isDarkMode: boolean;
}

export const DesktopIcon = ({ icon, label, onDoubleClick, isDarkMode }: DesktopIconProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <Draggable 
      bounds={{
        left: -window.innerWidth + 80,
        top: -window.innerHeight + 120,
        right: window.innerWidth - 80,
        bottom: window.innerHeight - 120
      }}
      nodeRef={nodeRef}
      onStart={() => setIsDragging(true)}
      onStop={() => setIsDragging(false)}
      defaultPosition={{ x: 0, y: 0 }}
    >
      <div
        ref={nodeRef}
        onDoubleClick={onDoubleClick}
        className={`flex flex-col items-center w-20 cursor-default select-none transition-all duration-200 ${
          isDragging ? 'scale-110 opacity-80' : 'scale-100 opacity-100'
        } hover:scale-105`}
      >
        <div className={`w-12 h-12 rounded-lg p-1 transition-all duration-200 ${
          isDragging ? 'bg-blue-500/30 backdrop-blur-sm' : 'hover:bg-white/10'
        }`}>
          <img 
            src={icon} 
            alt={label} 
            className="w-full h-full object-contain pointer-events-none select-none" 
            draggable={false}
          />
        </div>
        <span className={`text-sm text-center mt-1 px-1 py-0.5 rounded transition-all duration-200 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        } ${isDragging ? 'bg-blue-500/20 backdrop-blur-sm' : 'bg-black/20 backdrop-blur-sm'}`}>
          {label}
        </span>
      </div>
    </Draggable>
  );
};
