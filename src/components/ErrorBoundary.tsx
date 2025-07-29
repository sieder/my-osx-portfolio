import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details but don't crash the app
    console.warn('ErrorBoundary caught an error:', error, errorInfo);
    
    // Check if it's a browser extension error and ignore it
    if (error.stack?.includes('chrome-extension://') || 
        error.message?.includes('chrome-extension://')) {
      console.log('Ignoring browser extension error');
      this.setState({ hasError: false, error: undefined });
      return;
    }
  }

  public render() {
    if (this.state.hasError && this.state.error) {
      // Don't show error UI for extension errors
      if (this.state.error.stack?.includes('chrome-extension://')) {
        return this.props.children;
      }

      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
            <h2 className="text-xl font-bold text-red-600 mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-4">
              An unexpected error occurred. Please refresh the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
