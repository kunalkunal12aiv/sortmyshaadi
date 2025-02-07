import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define icon mappings for features and amenities
const iconMapping = {
  // Features
  catering: '🍽',
  alcohol: '🍷',
  decoration: '🎀',
  dj: '🎧',
  // Amenities
  acEventSpace: '❄️',
  acDiningHall: '❄️',
  dressingRoom: '🚪',
  restaurantCatering: '🍴',
  electricityBackup: '⚡',
  barServices: '🍹',
  lightingSound: '🎶',
  poolsideSpace: '🏊'
};

function FeaturesAndAmenitiesAccordion({ facilities, amenities }) {
  const [openAccordion, setOpenAccordion] = useState('features'); // default open

  const formatKey = (key) =>
    key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

  // Updated renderList: use grid layout, bigger text and icon
  const renderList = (data) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {Object.entries(data).map(([key, value]) =>
        value ? (
          <div key={key} className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
            <span className="text-3xl">{iconMapping[key] || '🔹'}</span>
            <span className="mt-2 text-xl font-medium capitalize text-[var(--text-secondary)]">
              {formatKey(key)}
            </span>
          </div>
        ) : null
      )}
    </div>
  );

  return (
    <>
      {/* Moved Header Buttons outside container and removed heading */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <button
          onClick={() => setOpenAccordion('features')}
          className={`flex-1 text-left flex justify-between items-center p-4 rounded-lg border transition-colors duration-200
            ${openAccordion === 'features' ? 'bg-[var(--primary-main)] text-white' : 'bg-gray-100 text-[var(--primary-dark)]'}`}
        >
          <h3 className="text-xl font-semibold">Features</h3>
          <span>{openAccordion === 'features' ? '▲' : '▼'}</span>
        </button>
        <button
          onClick={() => setOpenAccordion('amenities')}
          className={`flex-1 text-left flex justify-between items-center p-4 rounded-lg border transition-colors duration-200
            ${openAccordion === 'amenities' ? 'bg-[var(--primary-main)] text-white' : 'bg-gray-100 text-[var(--primary-dark)]'}`}
        >
          <h3 className="text-xl font-semibold">Amenities</h3>
          <span>{openAccordion === 'amenities' ? '▲' : '▼'}</span>
        </button>
      </div>

      {/* Accordion Content Container */}
      <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
        <AnimatePresence exitBeforeEnter>
          {openAccordion === 'features' && (
            <motion.div
              key="features"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderList(facilities || {})}
            </motion.div>
          )}
          {openAccordion === 'amenities' && (
            <motion.div
              key="amenities"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderList(amenities || {})}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default FeaturesAndAmenitiesAccordion;
