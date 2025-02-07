import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AboutSection = ({ about }) => {
  const [isReadMore, setIsReadMore] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-2xl p-8 border border-[var(--primary-light)]"
    >
      <h2 className="text-2xl font-bold text-[var(--primary-dark)] mb-4">About</h2>
      <div className="relative">
        <p className={`text-[var(--text-secondary)] leading-relaxed ${!isReadMore ? 'line-clamp-4' : ''}`} style={{ fontFamily: 'Kantumruy, sans-serif' }}>
          {about}
        </p>
        {about.length > 300 && (
          <button
            onClick={() => setIsReadMore(!isReadMore)}
            className="mt-2 text-[#9A2143] hover:text-[#BFA054] font-medium"
          >
            {isReadMore ? 'Show Less' : 'Read More'}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default AboutSection;
