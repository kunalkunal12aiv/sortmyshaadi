import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: "01",
    title: "Share Your Vision",
    description: "Tell us about your dream wedding - style, guest count, and preferences",
    icon: "🎯"
  },
  {
    number: "02",
    title: "Get Smart Matches",
    description: "Our AI analyzes your inputs to find perfectly suited venues",
    icon: "✨"
  },
  {
    number: "03",
    title: "Virtual Tours",
    description: "Explore venues through immersive 360° views and previous events",
    icon: "🎥"
  },
  {
    number: "04",
    title: "Instant Booking",
    description: "Secure your dates with real-time availability and transparent pricing",
    icon: "📅"
  }
];

function HowItWorks() {
  return (
    <div className="py-20 bg-[#ffffff] text-[#1f2937]">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-serif text-[#1f2937] mb-4">
            Simple Steps to Your Dream Wedding
          </h2>
          <p className="text-xl text-[#6b7280]">
            We make wedding planning easy and enjoyable
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-[#fce4ec] p-6 rounded-lg shadow-lg"
            >
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/4 right-0 w-full h-0.5 bg-gradient-to-r from-[#1f2937] to-[#6b7280]" />
              )}

              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg relative z-10">
                <div className="text-6xl font-serif text-[#1f2937]/20 absolute top-4 right-4">
                  {step.number}
                </div>
                <div className="text-3xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-serif text-[#1f2937] mb-3">
                  {step.title}
                </h3>
                <p className="text-[#6b7280]">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#1f2937]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#6b7280]/5 rounded-full blur-3xl" />
    </div>
  );
}

export default HowItWorks;
