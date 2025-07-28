import React from 'react';

interface DockProps {
  minimizedWindows: string[];
  onRestoreWindow: (windowName: string) => void;
  isDarkMode: boolean;
}

export const Dock: React.FC<DockProps> = ({ minimizedWindows, onRestoreWindow, isDarkMode }) => {
  if (minimizedWindows.length === 0) return null;

const getWindowIcon = (windowName: string) => {
  switch (windowName) {
    case "Projects":
      return "/icons/projects.png";
    case "Resume":
      return "/icons/resume.png";
    case "About Me":
      return "/icons/about-me.png";
    default:
      return "/icons/about-me.png";
  }
};

  return (
    <div className="fixed bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 z-40">
      <div className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1 sm:py-2 rounded-xl sm:rounded-2xl backdrop-blur-md border ${
        isDarkMode 
          ? 'bg-gray-900/80 border-gray-700/50' 
          : 'bg-white/80 border-gray-300/50'
      }`}>
        {minimizedWindows.map((windowName) => (
          <button
            key={windowName}
            onClick={() => onRestoreWindow(windowName)}
            className={`rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 ${
              isDarkMode 
                ? 'bg-gray-700/50 hover:bg-gray-600/50' 
                : 'bg-gray-100/50 hover:bg-gray-200/50'
            }
            w-10 h-10 sm:w-12 sm:h-12`}
            title={`Restore ${windowName}`}
          >
            <img 
              src={getWindowIcon(windowName)} 
              alt={windowName}
              className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
