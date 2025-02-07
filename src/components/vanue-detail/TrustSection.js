import React from 'react';
import { motion } from 'framer-motion';

const TrustSection = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[var(--accent-2)]/10 rounded-xl shadow-xl p-8 text-center"
    >
      <h2 className="text-2xl font-bold text-[var(--primary-dark)] mb-4">Trusted & Verified</h2>
      <p className="text-[var(--text-secondary)]">
        All our venues are verified by industry experts, ensuring superior quality and service.
      </p>
    </motion.div>
  );
};

export default TrustSection;
