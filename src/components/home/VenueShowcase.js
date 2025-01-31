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
            Featured Wedding Venues
          </h2>
          <p className="text-xl text-[#9EA1AB]">
            Explore our handpicked selection of beautiful wedding venues
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
                className="bg-[#FFFFFF] rounded-xl shadow-lg overflow-hidden"
              >
                <Link to={`/venue/${venue.id}`}>
                  <div className="relative h-64">
                    <img 
                      src={venue.image}
                      alt={venue.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E2742]/60 to-transparent p-4">
                      <h2 className="text-2xl font-bold text-white">{venue.name}</h2>
                      <p className="text-white/90">{venue.location}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default VenueShowcase;