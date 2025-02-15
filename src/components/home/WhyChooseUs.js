import React from 'react';
import { motion } from 'framer-motion';
import patternImg from '../../assets/pattern.avif'; // Import the pattern image

function WhyChooseUs() {
  return (
    <div className="py-24 md:py-32 relative overflow-hidden">
      {/* Background gradient and overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-purple-50" />
      {/* Use the imported pattern image */}
      <div className="absolute inset-0" style={{ 
        backgroundImage: `url(${patternImg})`,
        opacity: 0.05 
      }} />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-200 to-purple-200 transform rotate-3 rounded-2xl" />
            <img
              src="/assets/vendor.jpg"
              alt="Wedding Planning"
              className="relative rounded-2xl shadow-xl transform -rotate-3 hover:rotate-0 transition-transform duration-500"
            />
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-pink-200 rounded-full opacity-50 blur-xl" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-purple-200 rounded-full opacity-50 blur-xl" />
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#1f2937] relative">
                <span className="text-pink-500">Why</span> Choose Us
                <div className="absolute -top-8 -left-4 w-12 h-12 bg-pink-200 rounded-full opacity-30 blur-xl" />
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
            </div>

            <div className="relative">
              <span className="absolute -left-4 top-0 text-6xl text-pink-200">"</span>
              <p className="text-lg md:text-xl leading-relaxed text-gray-600 pl-8">
                We are dedicated to making your wedding dreams come true. Our team of experts provides personalized service, access to exclusive venues, and comprehensive planning to ensure your special day is perfect.
              </p>
            </div>

            <p className="text-lg text-gray-600">
              We believe in delivering exceptional value while keeping our services affordable and accessible to all couples embarking on their journey together.
            </p>

            {/* Feature highlights */}
            <div className="grid grid-cols-2 gap-6 pt-6">
              {[
                { number: "500+", text: "Happy Couples" },
                { number: "100+", text: "Premium Venues" },
                { number: "50+", text: "Expert Planners" },
                { number: "24/7", text: "Support" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-4 bg-white/50 rounded-xl backdrop-blur-sm"
                >
                  <div className="text-2xl font-bold text-pink-600">{item.number}</div>
                  <div className="text-sm text-gray-600">{item.text}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default WhyChooseUs;