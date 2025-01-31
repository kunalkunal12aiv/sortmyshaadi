import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function BudgetPlanner() {
  return (
    <div className="py-20 bg-gradient-to-br from-[#F6F6F6] to-[#EDD498]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-[#1E2742] mb-6">
              Smart Wedding Budget Planning
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#EDD498] rounded-full flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-[#1E2742]">Personalized Budget Analysis</h3>
                  <p className="text-[#9EA1AB]">Get custom venue recommendations based on your budget and guest count</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#EDD498] rounded-full flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-[#1E2742]">Cost Breakdown</h3>
                  <p className="text-[#9EA1AB]">Detailed breakdown of venue costs, including accommodation and catering</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#EDD498] rounded-full flex items-center justify-center">
                  <span className="text-2xl">💡</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-[#1E2742]">Smart Recommendations</h3>
                  <p className="text-[#9EA1AB]">Get suggestions for optimal room distribution and guest accommodation</p>
                </div>
              </div>

              <Link
                to="/budget-calculator"
                className="inline-block mt-8 px-8 py-4 bg-gradient-to-r from-[#9A2143] to-[#BFA054] text-white rounded-xl hover:from-[#BFA054] hover:to-[#EDD498] transform hover:scale-105 transition-all duration-200"
              >
                Plan Your Budget Now
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-[#FFFFFF] rounded-2xl shadow-xl p-8">
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-[#F6F6F6] to-[#EDD498] p-6 rounded-xl">
                  <h4 className="text-lg font-semibold mb-2 text-[#1E2742]">Example Budget</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-[#9EA1AB]">Venue Cost</span>
                      <span className="font-semibold text-[#1E2742]">₹2,50,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#9EA1AB]">Accommodation</span>
                      <span className="font-semibold text-[#1E2742]">₹1,50,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#9EA1AB]">Catering</span>
                      <span className="font-semibold text-[#1E2742]">₹3,00,000</span>
                    </div>
                    <div className="border-t pt-2 border-[#9EA1AB]">
                      <div className="flex justify-between text-lg font-bold text-[#1E2742]">
                        <span>Total</span>
                        <span>₹7,00,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#EDD498] rounded-full opacity-20"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#EDD498] rounded-full opacity-20"></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default BudgetPlanner;
