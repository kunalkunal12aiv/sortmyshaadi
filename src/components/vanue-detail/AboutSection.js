import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AboutSection = ({ about }) => {
  const [isReadMore, setIsReadMore] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="bg-[#F6F6F6] rounded-xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300"
    >
      <h2 className="text-2xl font-bold text-[#1E2742] mb-6" style={{ fontFamily: 'DM Serif Display, serif' }}>About this Venue</h2>
      <div className="relative">
        <p className={`text-[#1E2742] leading-relaxed ${!isReadMore ? 'line-clamp-4' : ''}`} style={{ fontFamily: 'Kantumruy, sans-serif' }}>
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
