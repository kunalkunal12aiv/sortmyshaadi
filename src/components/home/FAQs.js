import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "How do I sign up?",
    answer: "You can sign up by clicking the 'Sign Up' button on the top right corner of the homepage.",
  },
  {
    question: "What packages do you offer?",
    answer: "We offer a variety of packages to suit different needs and budgets. You can view them on our 'Packages' page.",
  },
  {
    question: "Can I customize my package?",
    answer: "Yes, you can customize your package by adding or removing services as per your requirements.",
  },
  {
    question: "How do I contact customer support?",
    answer: "You can contact our customer support team by clicking the 'Contact Us' button on the homepage.",
  }
];

function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="py-20 relative overflow-hidden bg-[#ffffff] text-[#1f2937]">
      <div className="absolute inset-0 bg-[var(--accent-3)] opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-[#1f2937] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-[#6b7280]">
            Find answers to some of the most common questions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-[#fce4ec] p-8 rounded-2xl shadow-lg"
            >
              <h3 className="text-xl font-serif text-[#1f2937] mb-4">
                {faq.question}
              </h3>
              <p className="text-[#6b7280]">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[var(--primary-main)]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[var(--accent-1)]/10 rounded-full blur-3xl" />
    </div>
  );
}

export default FAQs;
