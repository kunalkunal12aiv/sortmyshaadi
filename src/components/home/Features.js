import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

const features = [
  {
    icon: "✨",
    title: "Curated Venues",
    description: "Sort Hotel deals using our FREE AI Deal Negotiator",
    color: "#db2777"
  },
  {
    icon: "📅",
    title: "Live Availability",
    description: "Sort your planning by using our FREE DIY Tools",
    color: "#db2777"
  },
  {
    icon: "💎",
    title: "Price Transparency",
    description: "Sort Artists & Activities using our FREE Directory",
    color: "#db2777"
  },
  {
    icon: "🤝",
    title: "Dedicated Support",
    description: " Sort Decor Budget using our FREE Decor Directory",
    color: "#db2777"
  }
];

function Features() {
  return (
    <div className="py-20 relative overflow-hidden bg-[#fce4ec] text-[#1f2937]">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-[#db2777] opacity-50" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-serif text-[#1f2937] mb-4">
          Sort your wedding with ease
          </h2>
          
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-[#ffffff]/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg text-center"
            >
              <FaCheckCircle className="text-[#db2777] text-4xl mb-4" />
              <h3 className="text-xl font-serif text-[#1f2937] mb-4">
                {feature.title}
              </h3>
              <p className="text-[#6b7280]">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#db2777]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#db2777]/10 rounded-full blur-3xl" />
    </div>
  );
}

export default Features;