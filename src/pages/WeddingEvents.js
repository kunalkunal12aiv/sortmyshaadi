import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/wedding-events.css';

function WeddingEvents() {
  const { venueId } = useParams();
  const [weddings, setWeddings] = useState([]);
  const [selectedWedding, setSelectedWedding] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeddings = async () => {
      const venueDoc = await getDoc(doc(db, 'venues', venueId));
      if (venueDoc.exists()) {
        const weddingData = venueDoc.data().previousWeddings || [];
        setWeddings(weddingData);
        setSelectedWedding(weddingData[0]);
      }
      setLoading(false);
    };
    fetchWeddings();
  }, [venueId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12">
      <div className="wedding-events-container">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Wedding Stories
        </motion.h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="video-gallery scrollbar-hide"
            >
              <div className="flex md:grid md:grid-cols-2 overflow-x-auto gap-4 md:gap-6 md:video-grid">
                {weddings.map((wedding, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="video-container flex-none cursor-pointer"
                    onClick={() => setSelectedWedding(wedding)}
                  >
                    <video
                      className="w-full h-full object-cover"
                      src={wedding.videoUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 p-4">
                      <div className="absolute bottom-4 left-4">
                        <h3 className="text-white font-bold text-lg">{wedding.title}</h3>
                        <p className="text-white/80 text-sm">{wedding.date}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="details-panel"
          >
            {selectedWedding ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-gray-900">{selectedWedding.title}</h2>
                <p className="text-gray-600 leading-relaxed">{selectedWedding.description}</p>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">Photo Gallery</h3>
                  <div className="photo-grid">
                    {selectedWedding.images.map((image, index) => (
                      <motion.img
                        key={index}
                        src={image}
                        alt={`Wedding ${index + 1}`}
                        className="photo-item cursor-pointer"
                        onClick={() => window.open(image, '_blank')}
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                Select a wedding to view details
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default WeddingEvents;