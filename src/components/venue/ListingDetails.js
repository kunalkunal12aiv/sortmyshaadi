import React from 'react';
import { motion } from 'framer-motion';

const ListingDetails = ({ venue }) => {
  if (!venue) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg p-8 mt-8 border border-[var(--primary-light)]"
    >
      <h2 className="text-2xl font-bold text-[var(--primary-dark)] mb-4">Listing Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-sm font-medium text-gray-600">Venue Name</p>
          <p className="text-lg font-semibold text-gray-800">{venue.name}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Address</p>
          <p className="text-lg font-semibold text-gray-800">{venue.shortAddress}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Price Per Plate</p>
          <p className="text-lg font-semibold text-gray-800">₹{venue.pricePerPlate}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Guest Capacity</p>
          <p className="text-lg font-semibold text-gray-800">{venue.guestSpace}</p>
        </div>
        {venue.menu && (
          <div className="md:col-span-2">
            <p className="text-sm font-medium text-gray-600">Menu Details</p>
            <p className="text-lg font-semibold text-gray-800 whitespace-pre-wrap">{venue.menu}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ListingDetails;
