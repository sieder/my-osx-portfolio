import React from 'react';

interface MenuBarProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const MenuBar: React.FC<MenuBarProps> = ({ isDarkMode, onToggleTheme }) => {
  const currentTime = new Date().toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });

  const currentDate = new Date().toLocaleDateString([], {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className={`fixed top-0 left-0 right-0 h-7 flex items-center justify-between px-4 text-sm z-50 backdrop-blur-md ${
      isDarkMode 
        ? 'bg-gray-900/80 text-white border-b border-gray-700/50' 
        : 'bg-white/80 text-black border-b border-gray-300/50'
    }`}>
      {/* Left side - Apple menu and app menus */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <span className="text-lg">🍎</span>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4 text-xs font-medium">
          <span className="hover:bg-gray-200/20 px-1 sm:px-2 py-1 rounded cursor-pointer">Portfolio</span>
          <span className="hover:bg-gray-200/20 px-1 sm:px-2 py-1 rounded cursor-pointer hidden sm:inline">File</span>
          <span className="hover:bg-gray-200/20 px-1 sm:px-2 py-1 rounded cursor-pointer hidden md:inline">Edit</span>
          <span className="hover:bg-gray-200/20 px-1 sm:px-2 py-1 rounded cursor-pointer hidden md:inline">View</span>
          <span className="hover:bg-gray-200/20 px-1 sm:px-2 py-1 rounded cursor-pointer hidden lg:inline">Window</span>
          <span className="hover:bg-gray-200/20 px-1 sm:px-2 py-1 rounded cursor-pointer hidden lg:inline">Help</span>
        </div>
      </div>

      {/* Right side - System controls */}
      <div className="flex items-center space-x-1 sm:space-x-3 text-xs">
        <button
          onClick={onToggleTheme}
          className="hover:bg-gray-200/20 px-2 sm:px-3 py-1 rounded cursor-pointer transition-colors flex items-center justify-center min-w-[28px] sm:min-w-[32px]"
          title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        >
          <span className="text-sm sm:text-base">{isDarkMode ? '☀️' : '🌙'}</span>
        </button>
        <div className="flex items-center space-x-1 hidden sm:flex">
          <span>🔋</span>
          <span>100%</span>
        </div>
        <div className="flex items-center space-x-1 hidden md:flex">
          <span>📶</span>
        </div>
        <div className="flex items-center space-x-1 hidden lg:flex">
          <span>🔊</span>
        </div>
        <div className="flex flex-row items-center space-x-1 sm:space-x-2 text-right">
          <span className="hidden sm:inline">{currentDate}</span>
          <span className="font-mono">{currentTime}</span>
        </div>
      </div>
    </div>
  );
};
