import React from 'react';
import { Link } from 'react-router-dom';
import { useCompare } from '../contexts/CompareContext';
import { motion, AnimatePresence } from 'framer-motion';

function CompareBadge() {
  const { comparedVenues } = useCompare();
  
  if (comparedVenues.length === 0) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-8 left-8 z-50"
      >
        <Link
          to="/compare"
          className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          <span className="font-semibold">View Compare</span>
          <span className="bg-white text-green-600 w-6 h-6 rounded-full flex items-center justify-center font-bold">
            {comparedVenues.length}
          </span>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}

export default CompareBadge;
