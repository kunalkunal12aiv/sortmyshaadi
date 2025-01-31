import React from 'react';
import { motion } from 'framer-motion';
import { FaPaintBrush, FaUtensils, FaCamera, FaMusic } from 'react-icons/fa';

const AllInclusiveSection = ({ onEnquire }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.2 }}
    className="bg-[#F6F6F6] rounded-xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300"
  >
    <h2 className="text-2xl font-bold text-[#1E2742] mb-6" style={{ fontFamily: 'DM Serif Display, serif' }}>All-Inclusive Packages</h2>
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
