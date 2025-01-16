import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function BudgetPlanner() {
  return (
    <div className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Smart Wedding Budget Planning
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Personalized Budget Analysis</h3>
                  <p className="text-gray-600">Get custom venue recommendations based on your budget and guest count</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Cost Breakdown</h3>
                  <p className="text-gray-600">Detailed breakdown of venue costs, including accommodation and catering</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💡</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Smart Recommendations</h3>
                  <p className="text-gray-600">Get suggestions for optimal room distribution and guest accommodation</p>
                </div>
              </div>

              <Link
                to="/budget-calculator"
                className="inline-block mt-8 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl hover:from-pink-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200"
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
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl">
                  <h4 className="text-lg font-semibold mb-2">Example Budget</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Venue Cost</span>
                      <span className="font-semibold">₹2,50,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Accommodation</span>
                      <span className="font-semibold">₹1,50,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Catering</span>
                      <span className="font-semibold">₹3,00,000</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>₹7,00,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-pink-200 rounded-full opacity-20"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-200 rounded-full opacity-20"></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default BudgetPlanner;
