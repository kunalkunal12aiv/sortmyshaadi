import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: "🏰",
    title: "One-Click Venue Booking",
    description: "Instantly book your dream venue with our streamlined booking process",
    color: "from-pink-500 to-rose-500"
  },
  {
    icon: "✨",
    title: "Customizable Decor",
    description: "Choose from hundreds of decor options to match your wedding theme",
    color: "from-purple-500 to-indigo-500"
  },
  {
    icon: "💰",
    title: "Smart Budget Planning",
    description: "Get personalized venue recommendations based on your budget",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: "📅",
    title: "Real-time Availability",
    description: "Check venue availability and peak season pricing instantly",
    color: "from-green-500 to-emerald-500"
  }
];

function Features() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">
            Plan Your Wedding with Ease
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Everything you need to create your perfect wedding day
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r w-full h-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                   style={{
                     background: `linear-gradient(to right, ${feature.color})`
                   }}
              />
              <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Features;
