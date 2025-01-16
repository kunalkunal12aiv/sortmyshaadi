import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const VenueCard = ({ venue }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const maxImagesToShow = 5;
  const autoSlideInterval = 3000;

  // Get first 5 images or all if less than 5
  const displayImages = venue.media.slice(0, maxImagesToShow);

  const nextImage = useCallback(() => {
    setCurrentImageIndex(current => 
      current === displayImages.length - 1 ? 0 : current + 1
    );
  }, [displayImages.length]);

  useEffect(() => {
    let interval;
    if (isHovered) {
      interval = setInterval(nextImage, autoSlideInterval);
    }
    return () => clearInterval(interval);
  }, [isHovered, nextImage]);

  const formatCapacityRange = (capacityString) => {
    try {
      const [min, max] = capacityString.split('-').map(num => parseInt(num.trim()));
      if (min === max || !max) {
        return `${min.toLocaleString('en-IN')} guests`;
      }
      return `${min.toLocaleString('en-IN')} - ${max.toLocaleString('en-IN')} guests`;
    } catch (error) {
      return capacityString;
    }
  };

  return (
    <Link 
      to={`/venue/${venue.id}`}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-64">
        <AnimatePresence initial={false}>
          <motion.img 
            key={currentImageIndex}
            src={displayImages[currentImageIndex]}
            alt={`${venue.name} view ${currentImageIndex + 1}`}
            className="w-full h-full object-cover absolute top-0 left-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>

        {/* Image Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {displayImages.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                setCurrentImageIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentImageIndex === index 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>

        {/* Venue Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h2 className="text-2xl font-bold text-white">{venue.name}</h2>
          <p className="text-white/90">{venue.shortAddress}</p>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-pink-600 font-semibold">
            ₹{parseInt(venue.pricePerPlate).toLocaleString('en-IN')} per plate
          </span>
          <span className="text-gray-600">
            {formatCapacityRange(venue.guestSpace)}
          </span>
        </div>
        <p className="text-gray-600 line-clamp-2">{venue.about}</p>
      </div>
    </Link>
  );
}

export default VenueCard;
