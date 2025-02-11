import React from 'react';
import { FiHeart } from 'react-icons/fi';

function BrandedFooter() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center space-y-2">
          <p className="text-gray-500 text-sm">
            Created with <FiHeart className="inline-block text-pink-600" /> using
          </p>
          <a
            href="https://sortmyshaadi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 hover:text-pink-700 font-semibold"
          >
            Sort My Shaadi
          </a>
          <p className="text-xs text-gray-400">
            The Ultimate Indian Wedding Planning Platform
          </p>
        </div>
      </div>
    </footer>
  );
}

export default BrandedFooter;
