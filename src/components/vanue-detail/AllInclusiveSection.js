import React from 'react';
import { motion } from 'framer-motion';
import { FaPaintBrush, FaUtensils, FaCamera, FaMusic } from 'react-icons/fa';

const AllInclusiveSection = ({ onEnquire }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-xl shadow-2xl p-8 text-center border border-[var(--primary-light)]"
  >
    <h2 className="text-2xl font-bold text-[var(--primary-dark)] mb-4">All Inclusive Packages</h2>
    <p className="text-[var(--text-secondary)]">
      Experience a complete, stress-free wedding with our comprehensive packages.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex items-center space-x-4">
        <FaPaintBrush className="w-10 h-10 text-[#9A2143]" />
        <p className="text-[#1E2742] text-lg" style={{ fontFamily: 'Kantumruy, sans-serif' }}>Venue Decoration</p>
      </div>
      <div className="flex items-center space-x-4">
        <FaUtensils className="w-10 h-10 text-[#9A2143]" />
        <p className="text-[#1E2742] text-lg" style={{ fontFamily: 'Kantumruy, sans-serif' }}>Catering Services</p>
      </div>
      <div className="flex items-center space-x-4">
        <FaCamera className="w-10 h-10 text-[#9A2143]" />
        <p className="text-[#1E2742] text-lg" style={{ fontFamily: 'Kantumruy, sans-serif' }}>Photography & Videography</p>
      </div>
      <div className="flex items-center space-x-4">
        <FaMusic className="w-10 h-10 text-[#9A2143]" />
        <p className="text-[#1E2742] text-lg" style={{ fontFamily: 'Kantumruy, sans-serif' }}>Entertainment & Music</p>
      </div>
    </div>
    <button
      onClick={onEnquire}
      className="mt-6 w-full bg-gradient-to-r from-[#9A2143] to-[#BFA054] text-white py-3 px-4 rounded-lg text-lg font-semibold hover:from-[#BFA054] hover:to-[#EDD498] transition-all duration-200"
    >
      Enquire Now
    </button>
  </motion.div>
);

export default AllInclusiveSection;
