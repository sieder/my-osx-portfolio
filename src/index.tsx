import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Global error handler to suppress browser extension errors
window.addEventListener('error', (event) => {
  // Check if the error is from a browser extension
  if (event.filename?.includes('chrome-extension://') || 
      event.error?.stack?.includes('chrome-extension://')) {
    console.log('Suppressing browser extension error:', event.error);
    event.preventDefault();
    return false;
  }
});

// Handle unhandled promise rejections from extensions
window.addEventListener('unhandledrejection', (event) => {
  if (event.reason?.stack?.includes('chrome-extension://')) {
    console.log('Suppressing browser extension promise rejection:', event.reason);
    event.preventDefault();
    return false;
  }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
