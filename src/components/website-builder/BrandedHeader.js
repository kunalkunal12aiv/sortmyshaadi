import React from 'react';
import { FiHeart } from 'react-icons/fi';

function BrandedHeader() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">
            Powered by
          </div>
          <a 
            href="https://sortmyshaadi.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-pink-600 hover:text-pink-700"
          >
            <FiHeart className="w-3 h-3" />
            <span className="text-sm font-semibold">Sort My Shaadi</span>
          </a>
        </div>
      </div>
    </header>
  );
}

export default BrandedHeader;
