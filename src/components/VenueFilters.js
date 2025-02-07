import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/filters.css';

function VenueFilters({ venues, onFilterChange }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [availableTags, setAvailableTags] = useState([]);
  const [availableCities, setAvailableCities] = useState([]); // Add state for available cities

  const calculateMaxCapacity = () => {
    const maxVenueCapacity = Math.max(...venues.map(venue => parseInt(venue.guestSpace) || 0));
    return Math.min(Math.max(maxVenueCapacity, 2000), 10000);
  };

  const initialFilters = {
    priceRange: { min: 0, max: 10000 },
    roomPriceRange: { min: 0, max: 20000 },
    capacityRange: { min: 0, max: calculateMaxCapacity() },
    selectedTags: [],
    selectedCity: '' // Add selected city filter
  };

  const [tempFilters, setTempFilters] = useState(initialFilters);

  const applyFilters = () => {
    onFilterChange({
      priceRange: tempFilters.priceRange,
      roomPriceRange: tempFilters.roomPriceRange,
      capacityRange: tempFilters.capacityRange,
      selectedTags: tempFilters.selectedTags,
      selectedCity: tempFilters.selectedCity // Include selected city in filters
    });
  };

  const handleReset = (e) => {
    e.stopPropagation();
    const resetState = {
      priceRange: { min: 0, max: 10000 },
      roomPriceRange: { min: 0, max: 20000 },
      capacityRange: { min: 0, max: calculateMaxCapacity() },
      selectedTags: [],
      selectedCity: '' // Reset selected city
    };
    setTempFilters(resetState);
    onFilterChange(resetState);
  };

  useEffect(() => {
    const tags = new Set();
    const cities = new Set(); // Create a set for cities
    venues.forEach(venue => {
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

      (venue.faqs || []).forEach(faq => {
        const faqText = `${faq.question} ${faq.answer}`.toLowerCase();
        features.forEach(feature => {
          if (faqText.includes(feature)) {
            tags.add(feature);
          }
        });
      });

      // Extract city from shortAddress and add to cities set
      const city = venue.shortAddress.split(',').pop().trim();
      cities.add(city);
    });

    const sortedTags = Array.from(tags).sort();
    const sortedCities = Array.from(cities).sort(); // Sort cities
    setAvailableTags(sortedTags);
    setAvailableCities(sortedCities); // Set available cities
  }, [venues]);

  const handleTagToggle = (tag) => {
    setTempFilters(prev => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tag) 
        ? prev.selectedTags.filter(t => t !== tag)
        : [...prev.selectedTags, tag]
    }));
  };

  const handleCityChange = (e) => {
    setTempFilters(prev => ({
      ...prev,
      selectedCity: e.target.value
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
      capacityRange: { ...prev, [type]: parseInt(value) }
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div 
        className="p-4 bg-gradient-to-r from-[var(--primary-light)] to-[var(--accent-2)] flex justify-between items-center cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <h3 className="text-xl font-semibold text-[var(--primary-dark)]">Filters</h3>
        <div className="flex items-center gap-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleReset(e);
            }}
            className="px-3 py-1 text-sm bg-[var(--accent-1)]/10 hover:bg-[var(--accent-1)]/20 text-[var(--primary-dark)] rounded-md transition-colors duration-200"
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
              {/* City Filter */}
              <div className="filter-group">
                <label className="block text-sm font-medium text-[var(--primary-dark)] mb-3">
                  City
                </label>
                <select
                  value={tempFilters.selectedCity}
                  onChange={handleCityChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary-main)] focus:border-transparent"
                >
                  <option value="">All Cities</option>
                  {availableCities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* Price per plate range */}
              <div className="filter-group">
                <label className="block text-sm font-medium text-[var(--primary-dark)] mb-3">
                  Price per plate
                </label>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-[var(--text-secondary)]">
                    <span>₹{tempFilters.priceRange.min}</span>
                    <span>₹{tempFilters.priceRange.max}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={tempFilters.priceRange.min}
                    onChange={(e) => handlePriceRangeChange(e.target.value, 'min')}
                    className="w-full accent-[var(--primary-main)]"
                  />
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={tempFilters.priceRange.max}
                    onChange={(e) => handlePriceRangeChange(e.target.value, 'max')}
                    className="w-full accent-[var(--primary-main)]"
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
                    className="w-full accent-[var(--primary-main)]"
                  />
                  <input
                    type="range"
                    min="0"
                    max="20000"
                    value={tempFilters.roomPriceRange.max}
                    onChange={(e) => handleRoomPriceRangeChange(e.target.value, 'max')}
                    className="w-full accent-[var(--primary-main)]"
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
                    className="w-full accent-[var(--primary-main)]"
                  />
                  <input
                    type="range"
                    min="0"
                    max={calculateMaxCapacity()}
                    value={tempFilters.capacityRange.max}
                    onChange={(e) => handleCapacityRangeChange(e.target.value, 'max')}
                    className="w-full accent-[var(--primary-main)]"
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
                  className="flex-1 bg-[var(--primary-main)] text-[var(--primary-dark)] py-2 px-4 rounded-lg hover:bg-[var(--accent-1)] transition-colors duration-200"
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