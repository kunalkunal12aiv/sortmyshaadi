import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/assets/hero.jpg')", // Ensure this path is correct
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#1E2742] opacity-50"></div> {/* Added dark overlay effect */}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-[#FFFFFF] mb-6" style={{ fontFamily: 'DM Serif Display, serif' }}>
            Your Perfect 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9A2143] to-[#BFA054]">
              {" "}Wedding Journey{" "}
            </span>
            Starts Here
          </h1>
          
          <p className="text-sm md:text-2xl text-[#FFFFFF] mb-12 max-w-3xl mx-auto" style={{ fontFamily: 'Kantumruy, sans-serif' }}>
            Experience seamless wedding planning with instant venue bookings, 
            customized decor selections, and smart budget planning
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/budget-calculator" 
              className="px-8 py-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-[#9A2143] to-[#BFA054] text-white hover:from-[#BFA054] hover:to-[#EDD498] transform hover:scale-105 transition-all duration-200"
              style={{ fontFamily: 'DM Serif Display, serif' }}
            >
              Let's Sort it For You
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default HeroSection;