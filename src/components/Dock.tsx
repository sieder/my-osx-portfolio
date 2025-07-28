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
      case 'Projects':
        return '🌐';
      case 'Resume':
        return '📄';
      case 'About Me':
        return '👤';
      default:
        return '📱';
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
      <div className={`flex items-center space-x-2 px-4 py-2 rounded-2xl backdrop-blur-md border ${
        isDarkMode 
          ? 'bg-gray-900/80 border-gray-700/50' 
          : 'bg-white/80 border-gray-300/50'
      }`}>
        {minimizedWindows.map((windowName) => (
          <button
            key={windowName}
            onClick={() => onRestoreWindow(windowName)}
            className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl transition-all duration-200 hover:scale-110 ${
              isDarkMode 
                ? 'bg-gray-700/50 hover:bg-gray-600/50' 
                : 'bg-gray-100/50 hover:bg-gray-200/50'
            }`}
            title={`Restore ${windowName}`}
          >
            {getWindowIcon(windowName)}
          </button>
        ))}
      </div>
    </div>
  );
};
