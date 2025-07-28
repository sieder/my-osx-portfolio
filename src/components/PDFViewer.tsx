import React from 'react';

interface PDFViewerProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMaximized: boolean;
  isDarkMode: boolean;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ isOpen, onClose, onMinimize, onMaximize, isMaximized, isDarkMode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className={`${
        isMaximized 
          ? 'w-full h-full' 
          : 'w-[90vw] h-[90vh] max-w-4xl max-h-[800px]'
      } ${
        isMaximized ? 'rounded-none' : 'rounded-lg'
      } shadow-2xl overflow-hidden transition-all duration-300 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        {/* Window Title Bar */}
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
            <span className="text-sm font-medium">Resume.pdf</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <button className={`px-2 py-1 rounded hover:bg-gray-200/20 transition-colors ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              100%
            </button>
            <button className={`px-2 py-1 rounded hover:bg-gray-200/20 transition-colors ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              📄
            </button>
          </div>
        </div>

        {/* PDF Content Area */}
        <div className={`flex-1 overflow-hidden ${
          isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
        }`} style={{ height: 'calc(100% - 48px)' }}>
          <iframe
            src="/resume.pdf"
            className="w-full h-full border-0"
            title="Resume PDF"
          />
        </div>
      </div>
    </div>
  );
};
