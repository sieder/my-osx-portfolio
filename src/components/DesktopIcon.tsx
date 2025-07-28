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
  const [imageLoaded, setImageLoaded] = useState(false);

  // Responsive bounds based on screen size
  const getResponsiveBounds = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    if (width < 640) { // Mobile
      return {
        left: -width + 60,
        top: -height + 100,
        right: width - 60,
        bottom: height - 100
      };
    } else if (width < 1024) { // Tablet
      return {
        left: -width + 70,
        top: -height + 110,
        right: width - 70,
        bottom: height - 110
      };
    } else { // Desktop
      return {
        left: -width + 80,
        top: -height + 120,
        right: width - 80,
        bottom: height - 120
      };
    }
  };

  return (
    <Draggable 
      bounds={getResponsiveBounds()}
      nodeRef={nodeRef}
      onStart={() => setIsDragging(true)}
      onStop={() => setIsDragging(false)}
      defaultPosition={{ x: 0, y: 0 }}
    >
      <div
        ref={nodeRef}
        onDoubleClick={onDoubleClick}
        className={`flex flex-col items-center cursor-default select-none transition-all duration-200 ${
          isDragging ? 'scale-110 opacity-80' : 'scale-100 opacity-100'
        } hover:scale-105
        w-16 sm:w-18 md:w-20 lg:w-20`}
      >
        <div className={`rounded-lg p-1 transition-all duration-200 ${
          isDragging ? 'bg-blue-500/30 backdrop-blur-sm' : 'hover:bg-white/10'
        }
        w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-12 lg:h-12`}>
          {!imageLoaded && (
            <div className="w-full h-full bg-gray-300 animate-pulse rounded-lg" />
          )}
          <img 
            src={icon} 
            alt={label} 
            className={`w-full h-full object-contain pointer-events-none select-none transition-opacity duration-200 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            draggable={false}
            loading="eager"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}
          />
        </div>
        <span className={`text-center mt-1 px-1 py-0.5 rounded transition-all duration-200 ${
          isDarkMode ? 'text-white' : 'text-white'
        } ${isDragging ? 'bg-blue-500/20 backdrop-blur-sm' : 'bg-black/60 backdrop-blur-sm'}
        text-xs sm:text-sm md:text-sm lg:text-sm`}>
          {label}
        </span>
      </div>
    </Draggable>
  );
};
