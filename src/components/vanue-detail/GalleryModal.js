import React from 'react';
import { motion } from 'framer-motion';

const GalleryModal = ({ media, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 bg-[#1E2742]/95 flex items-center"
    onClick={onClose}
  >
    <div className="relative w-full">
      <button 
        className="absolute top-4 right-4 text-white p-2 z-50"
        onClick={onClose}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {media.map((url, index) => (
            <motion.img
              key={index}
              src={url}
              alt={`Gallery ${index + 1}`}
              className="w-full h-80 object-cover rounded-lg cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={(e) => e.stopPropagation()}
            />
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

export default GalleryModal;
