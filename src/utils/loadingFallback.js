import React from 'react';

export const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
    <div className="relative">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-500 border-t-transparent"></div>
      <div className="mt-4 text-center text-gray-600">Loading...</div>
    </div>
  </div>
);
