import React from 'react';

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin" />
        <div className="mt-4 text-gray-600 text-center animate-pulse">
          Loading...
        </div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
