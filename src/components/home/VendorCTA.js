import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function VendorCTA() {
  return (
    <div className="relative py-20 overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[var(--primary-dark)]/90 mix-blend-multiply" />
        <img
          src="/assets/vendor.jpg"
          alt="Vendor Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-white space-y-6"
          >
            <h2 className="text-4xl font-serif">Partner With Sort My Shaadi</h2>
            <p className="text-white/80 text-lg">
              Join our network of premium wedding venues and reach thousands of couples planning their dream wedding
            </p>
            
            <div className="flex flex-wrap gap-8 pt-4">
              {[
                { number: "10K+", label: "Monthly Inquiries" },
                { number: "98%", label: "Booking Rate" },
                { number: "5⭐", label: "Vendor Rating" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-2xl font-bold text-[var(--primary-main)]">{stat.number}</div>
                  <div className="text-white/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20"
          >
            <h3 className="text-2xl font-serif text-white mb-6">Get Started Today</h3>
            <div className="space-y-4">
              <Link
                to="/venue-owner/auth"
                className="block w-full py-3 px-6 bg-[var(--primary-main)] text-[var(--primary-dark)] 
                  rounded-xl font-semibold text-center hover:bg-[var(--accent-2)] 
                  transform hover:scale-105 transition-all duration-300"
              >
                Register as a Vendor
              </Link>
              <Link
                to="/vendor-benefits"
                className="block w-full py-3 px-6 bg-transparent border-2 border-white/30 
                  text-white rounded-xl font-semibold text-center 
                  hover:bg-white/10 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[var(--primary-dark)] to-transparent" />
    </div>
  );
}

export default VendorCTA;
