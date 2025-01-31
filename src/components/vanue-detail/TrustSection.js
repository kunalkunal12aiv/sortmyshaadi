import React from 'react';
import { motion } from 'framer-motion';
const TrustSection = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.2 }}
    className="bg-[#F6F6F6] rounded-xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300"
  >
    <h2 className="text-2xl font-bold text-[#1E2742] mb-6" style={{ fontFamily: 'DM Serif Display, serif' }}>Why Trust Us?</h2>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="flex flex-col items-center space-y-2">
        <img src="/assets/2.png" alt="Verified Venues" className="w-40 h-40 rounded-full object-cover" />
        <p className="text-[#1E2742] text-lg text-center" style={{ fontFamily: 'Kantumruy, sans-serif' }}>Verified Venues</p>
      </div>
      <div className="flex flex-col items-center space-y-2">
        <img src="/assets/3.png" alt="Best Price Guarantee" className="w-40 h-40 rounded-full object-cover" />
        <p className="text-[#1E2742] text-lg text-center" style={{ fontFamily: 'Kantumruy, sans-serif' }}>Best Price Guarantee</p>
      </div>
      <div className="flex flex-col items-center space-y-2">
        <img src="/assets/1.png" alt="24/7 Customer Support" className="w-40 h-40 rounded-full object-cover" />
        <p className="text-[#1E2742] text-lg text-center" style={{ fontFamily: 'Kantumruy, sans-serif' }}>24/7 Customer Support</p>
      </div>
      <div className="flex flex-col items-center space-y-2">
        <img src="/assets/4.png" alt="Flexible Payment Options" className="w-40 h-40 rounded-full object-cover" />
        <p className="text-[#1E2742] text-lg text-center" style={{ fontFamily: 'Kantumruy, sans-serif' }}>Flexible Payment Options</p>
      </div>
    </div>
  </motion.div>
);

export default TrustSection;
