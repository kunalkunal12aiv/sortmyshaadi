import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "How does Sort My Shaadi's venue matching work?",
    answer: "Our AI-powered system analyzes your preferences, budget, and guest count to suggest perfectly matched venues. We consider factors like location, style, and peak season availability to ensure you find your ideal venue."
  },
  {
    question: "What makes Sort My Shaadi different from traditional wedding planners?",
    answer: "We combine technology with personalized service. Our platform offers real-time availability, transparent pricing, and instant booking capabilities, while maintaining the personal touch of dedicated support throughout your journey."
  },
  // ...add more relevant FAQs
];

function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--accent-3)]" />
      
      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <motion.div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-[var(--primary-dark)] mb-4">
            Common Questions
          </h2>
          <p className="text-xl text-[var(--text-secondary)]">
            Everything you need to know about our services
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left"
              >
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-serif text-[var(--primary-dark)] pr-8">
                      {faq.question}
                    </h3>
                    <motion.span
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-[var(--primary-main)]"
                    >
                      ▼
                    </motion.span>
                  </div>
                  
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[var(--primary-main)]/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[var(--accent-1)]/10 rounded-full blur-3xl" />
    </div>
  );
}

export default FAQs;
