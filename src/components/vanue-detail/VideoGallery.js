import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const VideoGallery = ({ previousWeddings, venueId }) => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center text-[var(--primary-dark)]">Previous Celebrations</h2>
        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
          {previousWeddings.map((wedding, index) => (
            <motion.div 
              key={index}
              className="flex-none relative cursor-pointer group w-[225px] h-[400px]"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onClick={() => navigate(`/wedding-events/${venueId}`)}
            >
              <video
                className="w-full h-full object-cover rounded-lg shadow-lg"
                src={wedding.videoUrl}
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-dark)]/70 via-[var(--primary-dark)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 w-full">
                  <h3 className="font-semibold text-white">{wedding.title}</h3>
                  <p className="text-sm text-white/80">{wedding.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default VideoGallery;
