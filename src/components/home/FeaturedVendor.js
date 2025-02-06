import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function FeaturedVendor() {
  return (
    <div className="py-20 relative overflow-hidden">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-3)] to-[var(--primary-light)] opacity-30" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-serif text-[var(--primary-dark)] mb-4">
            Our Featured Vendor
          </h2>
          <p className="text-xl text-[var(--text-secondary)]">
            Meet our top-rated partner for exceptional wedding experiences
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Vendor Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative rounded-2xl overflow-hidden shadow-lg"
          >
            <img
              src="/assets/featured-vendor.jpg"
              alt="Featured Vendor"
              className="w-full h-96 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[var(--primary-dark)]/80 to-transparent">
              <h3 className="text-white text-xl font-serif">The Grand Ballroom</h3>
              <p className="text-white/80">Mumbai, India</p>
            </div>
          </motion.div>

          {/* Vendor Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-serif text-[var(--primary-dark)]">
              Experience Unforgettable Celebrations
            </h3>
            <p className="text-[var(--text-secondary)] text-lg">
              The Grand Ballroom offers exquisite venues, personalized service, and unparalleled attention to detail.
            </p>

            <div className="flex flex-wrap gap-4">
              {[
                { label: "Capacity", value: "500+ Guests" },
                { label: "Cuisine", value: "Multi-Cuisine" },
                { label: "Starting Price", value: "₹3,500/plate" }
              ].map((detail, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm"
                >
                  <div className="text-[var(--text-light)] text-sm">{detail.label}</div>
                  <div className="text-[var(--primary-dark)] font-semibold">{detail.value}</div>
                </motion.div>
              ))}
            </div>

            <Link
              to="/venue/grand-ballroom"
              className="inline-block px-8 py-4 bg-[var(--primary-main)] text-[var(--primary-dark)] 
                rounded-xl font-serif hover:bg-[var(--accent-1)] hover:text-white
                transform hover:scale-105 transition-all duration-300"
            >
              Explore Venue
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[var(--primary-main)]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[var(--accent-1)]/10 rounded-full blur-3xl" />
    </div>
  );
}

export default FeaturedVendor;
