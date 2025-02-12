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
    <div className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--bg-gradient-1)]" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-[var(--primary-dark)] mb-4">
            Simple Steps to Your Dream Wedding
          </h2>
          <p className="text-xl text-[var(--text-secondary)]">
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
              className="relative"
            >
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/4 right-0 w-full h-0.5 bg-gradient-to-r from-[var(--primary-main)] to-[var(--accent-2)]" />
              )}

              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg relative z-10">
                <div className="text-6xl font-serif text-[var(--primary-main)]/20 absolute top-4 right-4">
                  {step.number}
                </div>
                <div className="text-3xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-serif text-[var(--primary-dark)] mb-3">
                  {step.title}
                </h3>
                <p className="text-[var(--text-secondary)]">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--primary-main)]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--accent-1)]/5 rounded-full blur-3xl" />
    </div>
  );
}

export default HowItWorks;
