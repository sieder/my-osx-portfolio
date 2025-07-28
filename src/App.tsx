// src/App.tsx
import React, { useState, useEffect } from "react";
import { DesktopIcon } from "./components/DesktopIcon";
import { MenuBar } from "./components/MenuBar";
import { PDFViewer } from "./components/PDFViewer";
import { ProjectBrowser } from "./components/ProjectBrowser";
import { MarioGame } from "./components/MarioGame";
import { Dock } from "./components/Dock";
import wallpaper from "./assets/wallpaper.jpg"; // Add any wallpaper you like

function App() {
  const [windows, setWindows] = useState<string[]>([]);
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([]);
  const [isPDFOpen, setIsPDFOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isMarioGameOpen, setIsMarioGameOpen] = useState(false);
  const [isProjectsMaximized, setIsProjectsMaximized] = useState(false);
  const [isPDFMaximized, setIsPDFMaximized] = useState(false);
  const [isMarioGameMaximized, setIsMarioGameMaximized] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const handleOpen = (label: string) => {
    if (!windows.includes(label)) setWindows([...windows, label]);
    
    // Remove from minimized if it was minimized
    setMinimizedWindows(prev => prev.filter(w => w !== label));
    
    // Special handling for different windows
    if (label === "Resume") {
      setIsPDFOpen(true);
    } else if (label === "Projects") {
      setIsProjectsOpen(true);
    } else if (label === "About Me") {
      setIsMarioGameOpen(true);
    }
  };

  const closePDF = () => {
    setIsPDFOpen(false);
    setWindows(prev => prev.filter(w => w !== "Resume"));
  };

  const minimizePDF = () => {
    setIsPDFOpen(false);
    setMinimizedWindows(prev => [...prev, "Resume"]);
  };

  const closeProjects = () => {
    setIsProjectsOpen(false);
    setWindows(prev => prev.filter(w => w !== "Projects"));
  };

  const minimizeProjects = () => {
    setIsProjectsOpen(false);
    setMinimizedWindows(prev => [...prev, "Projects"]);
  };

  const maximizeProjects = () => {
    setIsProjectsMaximized(!isProjectsMaximized);
  };

  const maximizePDF = () => {
    setIsPDFMaximized(!isPDFMaximized);
  };

  const maximizeMarioGame = () => {
    setIsMarioGameMaximized(!isMarioGameMaximized);
  };

  const closeMarioGame = () => {
    setIsMarioGameOpen(false);
    setWindows(prev => prev.filter(w => w !== "About Me"));
  };

  const minimizeMarioGame = () => {
    setIsMarioGameOpen(false);
    setMinimizedWindows(prev => [...prev, "About Me"]);
  };

  const restoreWindow = (windowName: string) => {
    setMinimizedWindows(prev => prev.filter(w => w !== windowName));
    handleOpen(windowName);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Add keyboard shortcut for theme toggle
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 't' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleTheme();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isDarkMode]);

  return (
    <div className={`w-screen h-screen relative overflow-hidden transition-all duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
    }`}>
      {/* Menu Bar */}
      <MenuBar isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />
      
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${wallpaper})` }}
      />
      
      {/* Theme overlay - only affects overlay, not wallpaper */}
      <div className={`absolute inset-0 transition-all duration-300 ${
        isDarkMode ? 'bg-black/20' : 'bg-black/10'
      }`} />

      {/* Desktop Icons - Responsive Layout */}
      <div className="absolute top-12 left-4 z-10
        flex flex-col gap-4 sm:gap-6
        md:flex-col md:gap-6
        lg:flex-col lg:gap-6">
        <DesktopIcon
          icon="/icons/about-me.png"
          label="About Me"
          onDoubleClick={() => handleOpen("About Me")}
          isDarkMode={isDarkMode}
        />
        <DesktopIcon
          icon="/icons/projects.png"
          label="Projects"
          onDoubleClick={() => handleOpen("Projects")}
          isDarkMode={isDarkMode}
        />
        <DesktopIcon
          icon="/icons/resume.png"
          label="Resume"
          onDoubleClick={() => handleOpen("Resume")}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* Debug display */}
      <div className={`absolute bottom-4 left-4 text-sm px-3 py-2 rounded-lg backdrop-blur-md transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gray-900/80 text-white border border-gray-700/50' 
          : 'bg-white/80 text-gray-900 border border-gray-300/50'
      }`}>
        <div className="flex items-center space-x-2">
          <span className="text-xs opacity-70">Opened windows:</span>
          <span className="font-medium">{windows.length > 0 ? windows.join(", ") : "None"}</span>
        </div>
      </div>

      {/* Dock for minimized windows */}
      <Dock 
        minimizedWindows={minimizedWindows}
        onRestoreWindow={restoreWindow}
        isDarkMode={isDarkMode}
      />

      {/* PDF Viewer */}
      <PDFViewer 
        isOpen={isPDFOpen} 
        onClose={closePDF} 
        onMinimize={minimizePDF}
        onMaximize={maximizePDF}
        isMaximized={isPDFMaximized}
        isDarkMode={isDarkMode} 
      />

      {/* Project Browser */}
      <ProjectBrowser 
        isOpen={isProjectsOpen}
        onClose={closeProjects}
        onMinimize={minimizeProjects}
        onMaximize={maximizeProjects}
        isMaximized={isProjectsMaximized}
        isDarkMode={isDarkMode}
      />

      {/* Mario Game */}
      <MarioGame 
        isOpen={isMarioGameOpen}
        onClose={closeMarioGame}
        onMinimize={minimizeMarioGame}
        onMaximize={maximizeMarioGame}
        isMaximized={isMarioGameMaximized}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}

export default App;
