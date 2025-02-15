import React from 'react';
import { motion } from 'framer-motion';
import patternImg from '../../assets/pattern.avif'; // Import pattern image

const features = [
  {
    icon: "✨",
    title: "Sort Hotel deals using our FREE AI Deal Negotiator",
    color: "#db2777"
  },
  {
    icon: "📅",
    title: "Sort your planning by using our FREE DIY Tools",
    color: "#db2777"
  },
  {
    icon: "💎",
    title: "Sort Artists & Activities using our FREE Directory",
    color: "#db2777"
  },
  {
    icon: "🤝",
    title: "Sort Decor Budget using our FREE Decor Directory",
    color: "#db2777"
  }
];

function Features() {
  return (
    <div className="py-20 relative overflow-hidden bg-gradient-to-br from-pink-50 to-white">
      {/* Updated decorative background overlay */}
      <div className="absolute inset-0" style={{ 
          backgroundImage: `url(${patternImg})`,
          opacity: 0.1,
          backgroundSize: 'cover'
      }} />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-serif text-[#1f2937] mb-4">
            Sort your wedding with ease
          </h2>
          <p className="text-lg text-gray-600">
            Let our smart recommendations and tools streamline your planning process.
          </p>
        </motion.div>
        
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl flex flex-col items-center text-center hover:shadow-2xl"
            >
              <div className="mb-4">
                <span className="text-5xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-[#1f2937] mb-2">
                {feature.title}
              </h3>
              {/* Optionally include a description if needed */}
              {/* <p className="text-gray-600">{feature.description}</p> */}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Additional decorative shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-pink-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl" />
    </div>
  );
}

export default Features;