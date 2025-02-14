import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function VenueShowcase() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVenues = async () => {
      const venuesCollection = collection(db, 'venues');
      const snapshot = await getDocs(venuesCollection);
      const venuesData = [];
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        venuesData.push({
          id: doc.id,
          name: data.name,
          image: data.media[0],
          location: data.shortAddress
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#db2777]"></div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-[#ffffff] text-[#000000]">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-serif text-[#000000] mb-4">
            Featured Venues
          </h2>
          <p className="text-xl text-[#374151]">
            Discover some of our most popular wedding venues
          </p>
        </motion.div>

        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          modules={[Navigation, Pagination]}
        >
          {venues.map((venue) => (
            <SwiperSlide key={venue.id}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-[#fce4ec] backdrop-blur-sm rounded-2xl shadow-lg"
              >
                <Link to={`/venue/${venue.id}`}>
                  <div className="relative h-64">
                    <img 
                      src={venue.image}
                      alt={venue.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1f2937]/60 via-transparent to-transparent p-4">
                      <h3 className="text-xl font-serif text-white mb-2">{venue.name}</h3>
                      <p className="text-white/80">{venue.location}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#db2777]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#db2777]/10 rounded-full blur-3xl" />
    </div>
  );
}

export default VenueShowcase;