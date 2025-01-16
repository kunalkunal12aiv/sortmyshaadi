import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function HeroSection() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="/images/mandala-pattern.png" 
          className="absolute top-0 right-0 w-96 h-96 opacity-10"
          alt="" 
        />
        <img 
          src="/images/floral-pattern.png" 
          className="absolute bottom-0 left-0 w-96 h-96 opacity-10"
          alt="" 
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Your Perfect 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
              {" "}Wedding Journey{" "}
            </span>
            Starts Here
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Experience seamless wedding planning with instant venue bookings, 
            customized decor selections, and smart budget planning
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/venues" 
              className="btn-primary px-8 py-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200"
            >
              Explore Venues
            </Link>
            <Link 
              to="/budget-calculator" 
              className="btn-secondary px-8 py-4 text-lg font-semibold rounded-xl border-2 border-pink-500 text-pink-500 hover:bg-pink-50 transform hover:scale-105 transition-all duration-200"
            >
              Plan Your Budget
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-pink-500">500+</h3>
              <p className="text-gray-600">Venues</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-pink-500">1000+</h3>
              <p className="text-gray-600">Happy Couples</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-pink-500">200+</h3>
              <p className="text-gray-600">Decor Options</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default HeroSection;
