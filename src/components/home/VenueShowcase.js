import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

function VenueShowcase() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVenues = async () => {
      const venuesCollection = collection(db, 'venues');
      const snapshot = await getDocs(venuesCollection);
      const venuesData = [];
      
      snapshot.forEach((doc) => {
        venuesData.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      setVenues(venuesData);
      setLoading(false);
    };

    fetchVenues();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Wedding Venues
          </h2>
          <p className="text-xl text-gray-600">
            Discover our handpicked selection of stunning venues
          </p>
        </motion.div>

        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, EffectCoverflow]}
          className="w-full"
        >
          {venues.map((venue) => (
            <SwiperSlide key={venue.id} className="max-w-lg">
              <Link to={`/venue/${venue.id}`}>
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className="relative h-64">
                    <img 
                      src={venue.media?.[0]}
                      alt={venue.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300?text=Venue+Image';
                      }}
                    />
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1 text-gray-800">{venue.rating || '4.8'}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900">{venue.name}</h3>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-pink-600 font-semibold">
                        From ₹{venue.pricePerPlate?.toLocaleString()}/plate
                      </span>
                      <span className="text-gray-600">
                        {venue.capacity} guests
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="text-center mt-12">
          <Link
            to="/venues"
            className="inline-block px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl hover:from-pink-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200"
          >
            Explore All Venues
          </Link>
        </div>
      </div>
    </div>
  );
}

export default VenueShowcase;