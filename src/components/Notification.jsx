import React from 'react';
import { motion } from 'framer-motion';

function Notification({ type, message, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      className={`
        fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg
        ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}
        text-white min-w-[300px]
      `}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button 
          onClick={onClose}
          className="ml-4 hover:opacity-75"
        >
          ✕
        </button>
      </div>
    </motion.div>
  );
}

export default Notification;
