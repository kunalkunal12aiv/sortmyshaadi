import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const formatKey = (key) =>
  key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

function FacilitiesAndFoodFaq({ facilities, foodTypes }) {
  const [activeIndex, setActiveIndex] = useState(null);
  
  // Combine facilities and foodTypes into FAQ items using "allowed" in the question.
  const faqItems = [
    ...Object.entries(facilities || {}).reduce((acc, [key, value]) => {
      if (value) {
        acc.push({
          question: `Is ${formatKey(key)} allowed?`,
          answer: (typeof value === 'string' && value.trim() !== '')
                    ? value
                    : `${formatKey(key)} is allowed.`
        });
      }
      return acc;
    }, []),
    ...Object.entries(foodTypes || {}).reduce((acc, [key, value]) => {
      if (value) {
        acc.push({
          question: `Is ${formatKey(key)} allowed?`,
          // Using a fixed response for foodTypes as they are booleans.
          answer: `${formatKey(key)} food is allowed.`
        });
      }
      return acc;
    }, [])
  ];

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold text-[var(--primary-dark)] mb-4">
        Facilities &amp; Food Options
      </h2>
      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
            <button onClick={() => setActiveIndex(activeIndex === index ? null : index)} className="w-full text-left">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-serif text-[var(--primary-dark)] pr-8">
                    {item.question}
                  </h3>
                  <motion.span animate={{ rotate: activeIndex === index ? 180 : 0 }} transition={{ duration: 0.3 }} className="text-[var(--primary-main)]">
                    ▼
                  </motion.span>
                </div>
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                      <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                        {item.answer}
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
  );
}

export default FacilitiesAndFoodFaq;
