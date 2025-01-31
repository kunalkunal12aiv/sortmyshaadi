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
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9A2143]"></div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gradient-to-br from-[#F6F6F6] to-[#EDD498]">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#1E2742] mb-4">
            Venue Video Highlights
          </h2>
          <p className="text-xl text-[#9EA1AB]">
            Watch highlights from our featured venues
          </p>
        </motion.div>

        <div className="flex overflow-x-auto gap-8 pb-4 scrollbar-hide">
          {venues.map((venue) => (
            <motion.div 
              key={venue.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex-none w-64 h-96 bg-[#FFFFFF] rounded-xl shadow-lg overflow-hidden"
            >
              <Link to={`/venue/${venue.id}`}>
                <div className="relative h-full">
                  <video 
                    src={venue.videoUrl}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E2742]/60 via-transparent to-transparent">
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-xl font-bold">{venue.name}</h3>
                    </div>
                  </div>
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
