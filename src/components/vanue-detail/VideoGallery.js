import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const VideoGallery = ({ previousWeddings, venueId }) => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mb-8"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center" style={{ fontFamily: 'DM Serif Display, serif', color: '#1E2742' }}>Previous Celebrations</h2>
        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
          {previousWeddings.map((wedding, index) => (
            <div 
              key={index}
              className="flex-none relative cursor-pointer group w-[225px] h-[400px]"
              onClick={() => navigate(`/wedding-events/${venueId}`)}
            >
              <video
                className="w-full h-full object-cover rounded-lg"
                src={wedding.videoUrl}
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E2742]/60 via-[#1E2742]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-semibold">{wedding.title}</h3>
                  <p className="text-sm text-white/80">{wedding.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default VideoGallery;
