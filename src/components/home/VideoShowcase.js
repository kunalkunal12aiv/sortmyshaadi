import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { motion } from 'framer-motion';

function VideoShowcase() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVenues = async () => {
      const venuesCollection = collection(db, 'venues');
      const snapshot = await getDocs(venuesCollection);
      const venuesData = [];
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.previousWeddings && data.previousWeddings.length > 0) {
          venuesData.push({
            id: doc.id,
            name: data.name,
            videoUrl: data.previousWeddings[0].videoUrl
          });
        }
      });
      
      setVenues(venuesData);
      setLoading(false);
    };

    fetchVenues();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9A2143]"></div>
      </div>
    );
  }

  return (
    <div className="py-10 relative overflow-hidden bg-[#ffffff]">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
          {venues.map((venue) => (
            <motion.div 
              key={venue.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex-none w-40 h-72 bg-[#fce4ec] backdrop-blur-sm rounded-3xl shadow-lg"
            >
              <Link to={`/venue/${venue.id}`}>
                <div className="relative h-full">
                  <video 
                    src={venue.videoUrl}
                    className="w-full h-full object-cover rounded-md"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VideoShowcase;