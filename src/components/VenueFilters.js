import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/filters.css'; // Import the CSS file from

function VenueFilters({ venues, onFilterChange }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [availableTags, setAvailableTags] = useState([]);

  const calculateMaxCapacity = () => {
    // Find the maximum guest capacity among all venues
    const maxVenueCapacity = Math.max(...venues.map(venue => parseInt(venue.guestSpace) || 0));
    return Math.min(Math.max(maxVenueCapacity, 2000), 10000); // Cap between 2000 and 10000
  };

  const initialFilters = {
    priceRange: { min: 0, max: 10000 },
    roomPriceRange: { min: 0, max: 20000 },
    capacityRange: { min: 0, max: calculateMaxCapacity() },
    selectedTags: []
  };

  const [tempFilters, setTempFilters] = useState(initialFilters);

  const applyFilters = () => {
    onFilterChange({
      priceRange: tempFilters.priceRange,
      roomPriceRange: tempFilters.roomPriceRange,
      capacityRange: tempFilters.capacityRange,
      selectedTags: tempFilters.selectedTags
    });
  };

  const handleReset = (e) => {
    e.stopPropagation();
    const resetState = {
      priceRange: { min: 0, max: 10000 },
      roomPriceRange: { min: 0, max: 20000 },
      capacityRange: { min: 0, max: calculateMaxCapacity() },
      selectedTags: []
    };
    setTempFilters(resetState);
    onFilterChange(resetState); // Immediately update parent
  };

  // Extract tags from venue data
  useEffect(() => {
    const tags = new Set();
    venues.forEach(venue => {
      // Extract specific keywords from about section
      const aboutText = venue.about.toLowerCase();
      const features = [
        'parking',
        'garden',
        'pool',
        'ac',
        'wifi',
        'catering',
        'decoration',
        'room',
        'hall',
        'outdoor',
        'indoor',
        'lawn',
        'wedding',
        'reception'
      ];

      features.forEach(feature => {
        if (aboutText.includes(feature)) {
          tags.add(feature);
        }
      });

      // Extract from FAQs
      venue.faqs.forEach(faq => {
        const faqText = `${faq.question} ${faq.answer}`.toLowerCase();
        features.forEach(feature => {
          if (faqText.includes(feature)) {
            tags.add(feature);
          }
        });
      });
    });

    const sortedTags = Array.from(tags).sort();
    console.log('Available tags:', sortedTags); // Debug log
    setAvailableTags(sortedTags);
  }, [venues]);

  const handleTagToggle = (tag) => {
    setTempFilters(prev => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tag) 
        ? prev.selectedTags.filter(t => t !== tag)
        : [...prev.selectedTags, tag]
    }));
  };

  const handlePriceRangeChange = (value, type) => {
    setTempFilters(prev => ({
      ...prev,
      priceRange: { ...prev.priceRange, [type]: parseInt(value) }
    }));
  };

  const handleRoomPriceRangeChange = (value, type) => {
    setTempFilters(prev => ({
      ...prev,
      roomPriceRange: { ...prev.roomPriceRange, [type]: parseInt(value) }
    }));
  };

  const handleCapacityRangeChange = (value, type) => {
    setTempFilters(prev => ({
      ...prev,
      capacityRange: { ...prev.capacityRange, [type]: parseInt(value) }
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header with collapse button */}
      <div 
        className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 flex justify-between items-center cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <h3 className="text-xl font-semibold text-gray-800">Filters</h3>
        <div className="flex items-center gap-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleReset(e);
            }}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md transition-colors duration-200"
          >
            Reset All
          </button>
          <svg
            className={`w-6 h-6 transform transition-transform duration-200 ${
              isCollapsed ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 space-y-6 border-t border-gray-100">
              {/* Price per plate range */}
              <div className="filter-group">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Price per plate
                </label>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹{tempFilters.priceRange.min}</span>
                    <span>₹{tempFilters.priceRange.max}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={tempFilters.priceRange.min}
                    onChange={(e) => handlePriceRangeChange(e.target.value, 'min')}
                    className="w-full accent-pink-500"
                  />
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={tempFilters.priceRange.max}
                    onChange={(e) => handlePriceRangeChange(e.target.value, 'max')}
                    className="w-full accent-pink-500"
                  />
                </div>
              </div>

              {/* Room price range */}
              <div className="filter-group">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Room price
                </label>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹{tempFilters.roomPriceRange.min}</span>
                    <span>₹{tempFilters.roomPriceRange.max}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20000"
                    value={tempFilters.roomPriceRange.min}
                    onChange={(e) => handleRoomPriceRangeChange(e.target.value, 'min')}
                    className="w-full accent-pink-500"
                  />
                  <input
                    type="range"
                    min="0"
                    max="20000"
                    value={tempFilters.roomPriceRange.max}
                    onChange={(e) => handleRoomPriceRangeChange(e.target.value, 'max')}
                    className="w-full accent-pink-500"
                  />
                </div>
              </div>

              {/* Capacity range */}
              <div className="filter-group">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Guest capacity (Minimum - Maximum)
                </label>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Min: {tempFilters.capacityRange.min} guests</span>
                    <span>Max: {tempFilters.capacityRange.max} guests</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={calculateMaxCapacity()}
                    value={tempFilters.capacityRange.min}
                    onChange={(e) => handleCapacityRangeChange(e.target.value, 'min')}
                    className="w-full accent-pink-500"
                  />
                  <input
                    type="range"
                    min="0"
                    max={calculateMaxCapacity()}
                    value={tempFilters.capacityRange.max}
                    onChange={(e) => handleCapacityRangeChange(e.target.value, 'max')}
                    className="w-full accent-pink-500"
                  />
                </div>
              </div>

              {/* Dynamic feature tags */}
              <div className="filter-group">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Features & Amenities
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => handleTagToggle(tag)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        tempFilters.selectedTags.includes(tag)
                          ? 'bg-pink-600 text-white shadow-md hover:bg-pink-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add Apply Filters button */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={applyFilters}
                  className="flex-1 bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition-colors duration-200"
                >
                  Apply Filters
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Reset
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default VenueFilters;