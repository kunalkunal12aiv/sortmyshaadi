import React from 'react';
import { motion } from 'framer-motion';

const modalVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 }
};

const GalleryModal = ({ media, onClose }) => (
  <motion.div 
    variants={modalVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.4, ease: "easeInOut" }}
    className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center overflow-y-auto"
    onClick={onClose}
  >
    <div className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full mx-4 my-8">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-[var(--primary-dark)] hover:text-[var(--primary-main)] transition-colors duration-200"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className="p-6 space-y-4 overflow-y-auto max-h-[80vh]">
        {media.map((image, index) => (
          <img 
            key={index} 
            src={image} 
            alt="Gallery" 
            className="w-full rounded-lg mb-4 hover:scale-105 transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          />
        ))}
      </div>
    </div>
  </motion.div>
);

export default GalleryModal;
