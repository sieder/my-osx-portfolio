import React, { useState } from 'react';

interface ProjectBrowserProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMaximized: boolean;
  isDarkMode: boolean;
}

interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  image: string;
  tech: string[];
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Airasia Duty Free',
    description: 'A full-stack e-commerce solution built with AstroJS, Zustand, and Tailwind CSS',
    url: 'https://www.airasia.com/dutyfree/en/gb',
    image: '/images/duty-free.png', // <-- Use a static image path or actual image URL
    tech: ['AstroJS', 'Zustand', 'Tailwind CSS']
  },
  {
    id: '4',
    title: 'AirAsia Play',
    description: 'A digital media brand and content hub featuring articles, stories, and multimedia about travel, culture, food, and pop‑culture moments in ASEAN countries.',
    url: 'https://www.airasia.com/play/',
    image: '/images/play.png',
    tech: ['React', 'Framer Motion', 'TypeScript', 'Tailwind']
  }
];

export const ProjectBrowser: React.FC<ProjectBrowserProps> = ({ 
  isOpen, 
  onClose, 
  onMinimize, 
  onMaximize,
  isMaximized,
  isDarkMode 
}) => {
  const [currentUrl, setCurrentUrl] = useState('projects://localhost/portfolio');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleLinkClick = (url: string) => {
    setIsLoading(true);
    setCurrentUrl(url);
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      // Open actual link in new tab
      window.open(url, '_blank');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className={`${
        isMaximized 
          ? 'w-full h-full' 
          : 'w-[95vw] h-[90vh] max-w-6xl'
      } ${
        isMaximized ? 'rounded-none' : 'rounded-lg'
      } shadow-2xl overflow-hidden transition-all duration-300 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        {/* Browser Title Bar */}
        <div className={`flex items-center justify-between px-4 py-2 border-b ${
          isDarkMode 
            ? 'bg-gray-700 border-gray-600 text-white' 
            : 'bg-gray-100 border-gray-300 text-black'
        }`}>
          <div className="flex items-center space-x-3">
            {/* Traffic Light Buttons */}
            <div className="flex space-x-2">
              <button 
                onClick={onClose}
                className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                title="Close"
              />
              <button 
                onClick={onMinimize}
                className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors"
                title="Minimize"
              />
              <button 
                onClick={onMaximize}
                className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors"
                title={isMaximized ? "Restore" : "Maximize"}
              />
            </div>
            <span className="text-sm font-medium">Projects - Safari</span>
          </div>
        </div>

        {/* Browser Navigation Bar */}
        <div className={`flex items-center px-4 py-2 border-b space-x-3 ${
          isDarkMode 
            ? 'bg-gray-750 border-gray-600' 
            : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="flex space-x-2">
            <button className={`p-1 rounded hover:bg-gray-200/20 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              ←
            </button>
            <button className={`p-1 rounded hover:bg-gray-200/20 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              →
            </button>
            <button className={`p-1 rounded hover:bg-gray-200/20 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              ↻
            </button>
          </div>
          <div className={`flex-1 px-3 py-1 rounded-md text-sm ${
            isDarkMode 
              ? 'bg-gray-600 text-white' 
              : 'bg-white border border-gray-300 text-black'
          }`}>
            {isLoading ? 'Loading...' : currentUrl}
          </div>
        </div>

        {/* Browser Content */}
        <div className={`flex-1 p-6 overflow-auto ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`} style={{ height: 'calc(100% - 96px)' }}>
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className={`text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>
                Loading...
              </div>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
              <header className="text-center mb-8">
                <h1 className={`text-4xl font-bold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  My Projects
                </h1>
                <p className={`text-lg ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  A collection of my recent work and side projects
                </p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className={`rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 ${
                      isDarkMode ? 'bg-gray-700' : 'bg-white border border-gray-200'
                    }`}
                  >
                    <div className="w-full h-48 bg-gray-100 border-b overflow-hidden flex items-center justify-center">
                      <img
                        src={project.image}
                        alt={`Screenshot of ${project.title}`}
                        className="object-cover w-full h-full"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className={`text-xl font-semibold mb-2 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {project.title}
                      </h3>
                      <p className={`text-sm mb-4 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className={`px-2 py-1 rounded-full text-xs ${
                              isDarkMode
                                ? 'bg-blue-600 text-white'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() => handleLinkClick(project.url)}
                        className={`w-full py-2 px-4 rounded-md transition-colors ${
                          isDarkMode
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                      >
                        View Project →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
