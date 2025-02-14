import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useShortlist } from '../contexts/ShortlistContext';
import { useAuth } from '../contexts/AuthContext';
import { setRedirectUrl } from '../utils/auth';

const VenueCard = ({ venue }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const maxImagesToShow = 5;
  const autoSlideInterval = 3000;

  const { shortlistedVenues, addToShortlist, removeFromShortlist } = useShortlist();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const isShortlisted = shortlistedVenues.some(v => v.id === venue.id);

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

  const handleShortlist = (e) => {
    e.preventDefault(); // Prevent navigation to venue detail
    e.stopPropagation(); // Prevent event bubbling

    if (!currentUser) {
      setRedirectUrl(window.location.pathname);
      navigate('/signin');
      return;
    }

    if (isShortlisted) {
      removeFromShortlist(venue.id);
    } else {
      addToShortlist(venue);
    }
  };

  return (
    <Link 
      to={`/venue/${venue.id}`}
      className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
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
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--primary-dark)]/60 to-transparent p-4">
          <h2 className="text-xl font-bold text-white">{venue.name}</h2>
          <p className="text-xs text-white/90">{venue.shortAddress}</p>
        </div>

        {/* Shortlist Button */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={handleShortlist}
            className={`p-2 rounded-full ${
              isShortlisted 
                ? 'bg-[var(--primary-main)] text-[var(--primary-dark)]' 
                : 'bg-white/80 hover:bg-white text-[var(--primary-dark)]'
            } transition-all duration-200`}
          >
            <svg
              className="w-6 h-6"
              fill={isShortlisted ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-[var(--primary-main)]">
            ₹{parseInt(venue.pricePerPlate).toLocaleString('en-IN')} per plate
          </span>
          <span className="text-sm text-[var(--text-secondary)]">
            {formatCapacityRange(venue.guestSpace)}
          </span>
        </div>
        <p className="text-xs text-[var(--text-secondary)] line-clamp-2">{venue.about}</p>
      </div>
    </Link>
  );
}

export default VenueCard;
