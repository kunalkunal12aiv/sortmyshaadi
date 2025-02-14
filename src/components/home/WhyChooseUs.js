import React from 'react';
import { motion } from 'framer-motion';

const reasons = [
  {
    icon: "✨",
    title: "Expert Planning",
    description: "Our team of experts will help you plan the perfect wedding."
  },
  {
    icon: "🎯",
    title: "Exclusive Venues",
    description: "Access to exclusive venues that you won't find anywhere else."
  },
  {
    icon: "💫",
    title: "Personalized Service",
    description: "We provide personalized service to make your wedding unique."
  },
  {
    icon: "🌟",
    title: "Affordable Packages",
    description: "We offer affordable packages to suit every budget."
  }
];

function WhyChooseUs() {
  return (
    <div className="py-20 relative overflow-hidden bg-[#fce4ec] text-[#1f2937]">
      <div className="absolute inset-0 bg-[var(--accent-3)] opacity-50" />
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#1f2937] mb-4">
            Why Choose Us
          </h2>
          <p className="text-xl text-[#6b7280]">
            Reasons to choose Sort My Shaadi for your wedding planning
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-[#ffffff] p-8 rounded-2xl shadow-lg"
            >
              <div className="text-4xl mb-6">{reason.icon}</div>
              <h3 className="text-xl font-serif text-[#1f2937] mb-4">
                {reason.title}
              </h3>
              <p className="text-[#6b7280]">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-0 right-0 w-96 h-96 bg-[var(--primary-main)]/10 rounded-full blur-3xl"
      />
    </div>
  );
}

export default WhyChooseUs;
