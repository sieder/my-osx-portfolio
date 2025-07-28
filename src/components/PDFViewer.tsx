import React from 'react';

interface PDFViewerProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
  isDarkMode: boolean;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ isOpen, onClose, onMinimize, isDarkMode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className={`w-[90vw] h-[90vh] max-w-4xl max-h-[800px] rounded-lg shadow-2xl overflow-hidden ${
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
              <button className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors" />
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
        <div className={`flex-1 p-6 overflow-auto h-full ${
          isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
        }`} style={{ height: 'calc(100% - 48px)' }}>
          <div className={`mx-auto max-w-2xl rounded-lg shadow-lg p-8 ${
            isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
          }`}>
            {/* Resume Content */}
            <div className="space-y-6">
              <header className="text-center border-b pb-4">
                <h1 className="text-3xl font-bold mb-2">John Doe</h1>
                <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Full Stack Developer
                </p>
                <div className={`flex justify-center space-x-4 mt-2 text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <span>📧 john.doe@email.com</span>
                  <span>📱 (555) 123-4567</span>
                  <span>🌐 linkedin.com/in/johndoe</span>
                </div>
              </header>

              <section>
                <h2 className="text-xl font-semibold mb-3 border-b pb-1">Experience</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Senior Full Stack Developer</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Tech Company Inc. • 2022 - Present
                    </p>
                    <ul className={`mt-2 text-sm space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <li>• Developed and maintained React applications with TypeScript</li>
                      <li>• Built scalable backend APIs using Node.js and Express</li>
                      <li>• Collaborated with cross-functional teams to deliver high-quality products</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold">Frontend Developer</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Startup Co. • 2020 - 2022
                    </p>
                    <ul className={`mt-2 text-sm space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <li>• Created responsive web applications using React and Tailwind CSS</li>
                      <li>• Implemented modern UI/UX designs with attention to detail</li>
                      <li>• Optimized application performance and user experience</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 border-b pb-1">Skills</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <h3 className="font-semibold mb-2">Frontend</h3>
                    <ul className={`space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <li>• React, TypeScript, JavaScript</li>
                      <li>• HTML5, CSS3, Tailwind CSS</li>
                      <li>• Next.js, Vite</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Backend</h3>
                    <ul className={`space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <li>• Node.js, Express</li>
                      <li>• PostgreSQL, MongoDB</li>
                      <li>• REST APIs, GraphQL</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 border-b pb-1">Education</h2>
                <div>
                  <h3 className="font-semibold">Bachelor of Science in Computer Science</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    University of Technology • 2016 - 2020
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
