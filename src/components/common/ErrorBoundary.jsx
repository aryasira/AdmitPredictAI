import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] p-6">
          <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border-2 border-red-100 text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle size={32} className="text-red-500" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#2C2220] mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We encountered an unexpected error. Please try refreshing the page.
            </p>
            {this.state.error && (
                <div className="mb-6 p-4 bg-red-50 rounded-lg text-left overflow-auto max-h-40 text-xs text-red-800 font-mono border border-red-100">
                    {this.state.error.toString()}
                </div>
            )}
            <button 
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center bg-[#2E7D32] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#1B5E20] transition-colors shadow-lg"
            >
              <RefreshCw size={20} className="mr-2" /> Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
