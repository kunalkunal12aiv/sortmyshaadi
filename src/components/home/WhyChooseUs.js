import React from 'react';
import { motion } from 'framer-motion';

const reasons = [
  {
    icon: "🌟",
    title: "Handpicked Venues",
    description: "Carefully curated collection of premium wedding venues across India"
  },
  {
    icon: "💫",
    title: "Real-time Availability",
    description: "Instant booking confirmation and date blocking system"
  },
  {
    icon: "🎨",
    title: "Decor Customization",
    description: "Choose from hundreds of theme-based decor options"
  },
  {
    icon: "💯",
    title: "Best Price Guarantee",
    description: "Get the best rates with our direct venue partnerships"
  },
  {
    icon: "🤝",
    title: "Dedicated Support",
    description: "Personal assistance throughout your wedding planning journey"
  },
  {
    icon: "⚡",
    title: "Instant Booking",
    description: "Book your dream venue with just one click"
  }
];

function WhyChooseUs() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Sort My Shaadi?
          </h2>
          <p className="text-xl text-gray-600">
            Making your wedding planning journey smooth and memorable
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-2xl hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{reason.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{reason.title}</h3>
              <p className="text-gray-600">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WhyChooseUs;
