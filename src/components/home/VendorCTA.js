import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function VendorCTA() {
  return (
    <div className="py-20 relative overflow-hidden bg-[#ffffff] text-[#1f2937]">
      <div className="absolute inset-0 bg-[var(--bg-gradient-1)]" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-serif text-[#1f2937] mb-4">
            Are You a Wedding Vendor?
          </h2>
          <p className="text-xl text-[#6b7280]">
            Join our platform to reach more clients and grow your business
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <Link
            to="/vendor-signup"
            className="inline-block px-8 py-4 bg-[#db2777] text-white rounded-xl hover:bg-[#b91c1c] transform hover:scale-105 transition-all duration-300 font-semibold"
          >
            Sign Up as a Vendor
          </Link>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[var(--primary-main)]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[var(--accent-1)]/10 rounded-full blur-3xl" />
    </div>
  );
}

export default VendorCTA;
