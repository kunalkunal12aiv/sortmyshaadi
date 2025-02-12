import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background styling */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/40 z-10"
        />
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/assets/hero.jpg')",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">
            Your Dream Wedding
            <span className="block mt-2 text-primary-main">Perfectly Planned</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto font-light">
            Experience personalized venue recommendations, real-time availability, 
            and transparent pricing for your special day
          </p>

          {/* Updated CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/venues" 
              className="px-8 py-4 text-lg font-medium rounded-xl 
                bg-white/10 backdrop-blur-md border border-white/20 
                text-white hover:bg-white/20 
                transition-all duration-300 shadow-lg"
            >
              Explore Venues
            </Link>
            
            <Link 
              to="/budget-calculator"
              className="px-8 py-4 text-lg font-medium rounded-xl 
                bg-black/20 backdrop-blur-md border border-white/10 
                text-white hover:bg-black/30 
                transition-all duration-300 shadow-lg"
            >
              Calculate Budget
            </Link>
          </div>

          {/* Updated Trust Indicators with subtle design and hover animations */}
          <div className="mt-16 grid grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { number: "200+", label: "Premium Venues" },
              { number: "1000+", label: "Happy Couples" },
              { number: "4.9/5", label: "Customer Rating" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 
                  rounded-lg p-4 cursor-pointer
                  hover:bg-white/10 hover:border-white/20
                  transition-all duration-300"
              >
                <motion.div 
                  className="text-2xl font-bold text-white"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm text-white/60 hover:text-white/80 transition-colors duration-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Add subtle floating particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Optional: Add floating particles or decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/5 to-black/20" />
      </div>
    </div>
  );
}

export default HeroSection;