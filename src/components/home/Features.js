import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: "🏰",
    title: "One-Click Venue Booking",
    description: "Instantly book your dream venue with our streamlined booking process",
    color: "from-[#9A2143] to-[#BFA054]"
  },
  {
    icon: "✨",
    title: "Customizable Decor",
    description: "Choose from hundreds of decor options to match your wedding theme",
    color: "from-[#9A2143] to-[#BFA054]"
  },
  {
    icon: "💰",
    title: "Smart Budget Planning",
    description: "Get personalized venue recommendations based on your budget",
    color: "from-[#9A2143] to-[#BFA054]"
  },
  {
    icon: "📅",
    title: "Real-time Availability",
    description: "Check venue availability and peak season pricing instantly",
    color: "from-[#9A2143] to-[#BFA054]"
  }
];

function Features() {
  return (
    <div className="py-20 bg-[#F6F6F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1E2742]">
            Plan Your Wedding with Ease
          </h2>
          <p className="mt-4 text-xl text-[#9EA1AB]">
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
              <div className="relative bg-[#FFFFFF] p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-[#1E2742]">{feature.title}</h3>
                <p className="text-[#9EA1AB]">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Features;
