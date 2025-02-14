import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function BudgetPlanner() {
  return (
    <div className="py-20 relative overflow-hidden bg-[#ffffff] text-[#1f2937]">
      <div className="absolute inset-0 bg-[var(--bg-gradient-1)]" />
      
      <div className="max-w-7xl mx-auto px-4 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left Content */}
          <div className="space-y-8">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-4xl font-serif text-[#1f2937]"
            >
              Smart Wedding Budget Calculator
            </motion.h2>
            
            <div className="space-y-6">
              {[ 
                {
                  icon: "✨",
                  title: "AI-Powered Recommendations",
                  desc: "Get venue suggestions based on your budget and preferences"
                },
                {
                  icon: "📊",
                  title: "Dynamic Cost Analysis",
                  desc: "Real-time calculations for accommodation and catering"
                },
                {
                  icon: "💡",
                  title: "Smart Tips & Insights",
                  desc: "Maximize your budget with our intelligent planning system"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="flex items-start gap-4 bg-[#fce4ec] p-6 rounded-xl backdrop-blur-sm"
                >
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-[#1f2937] mb-2">{item.title}</h3>
                    <p className="text-[#6b7280]">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              to="/budget-calculator"
              className="inline-block px-8 py-4 bg-[#a855f7] text-white rounded-xl hover:bg-[#9333ea] transform hover:scale-105 transition-all duration-300 font-semibold"
            >
              Calculate Your Budget
            </Link>
          </div>

          {/* Right Content - Calculator Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="bg-[#fce4ec] rounded-2xl shadow-2xl p-8">
              <div className="space-y-6">
                {/* Calculator preview content with dummy data */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-[#1f2937] mb-4">Example Budget</h3>
                  <div className="text-left max-w-xs mx-auto">
                    <div className="flex justify-between mb-2">
                      <span>Venue Cost</span>
                      <span>₹2,50,000</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Accommodation</span>
                      <span>₹1,50,000</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Catering</span>
                      <span>₹3,00,000</span>
                    </div>
                    <div className="flex justify-between font-semibold mt-4 border-t pt-2">
                      <span>Total</span>
                      <span>₹7,00,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-20 w-64 h-64 bg-[var(--primary-main)]/20 rounded-full blur-3xl"
      />
    </div>
  );
}

export default BudgetPlanner;
