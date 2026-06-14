import React from 'react';
import { motion } from 'framer-motion';

const faqs = [
  {
    question: 'Do you charge couples?',
    answer: 'No. Our consultation is free and designed to help couples understand venue value and negotiation opportunities before any commitment.',
  },
  {
    question: 'What exactly do you negotiate?',
    answer: 'We negotiate hotel room rates, complimentary rooms, room upgrades, venue concessions, welcome amenities, flexible policies, setup access, and F&B value improvements.',
  },
  {
    question: 'Can you guarantee savings?',
    answer: 'We cannot guarantee savings, but we focus on securing better overall value and improved package terms for your wedding budget.',
  },
  {
    question: 'How long does the process take?',
    answer: 'You can expect tailored venue recommendations within one week after your free consultation, depending on destination and availability.',
  },
  {
    question: 'Do you help with destination weddings?',
    answer: 'Yes. We specialize in destination wedding venues and hotel deals across India, helping couples compare options and negotiate destination-specific value.',
  },
  {
    question: 'How are venue recommendations selected?',
    answer: 'We recommend venues based on your wedding size, budget, destination preference, and the best opportunities for negotiation and added value.',
  }
];

function FAQs() {
  return (
    <section id="faqs" className="py-24 bg-white text-[#111827]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-pink-600 font-semibold">Frequently Asked Questions</p>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold">Clear answers before your consultation</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
            The questions couples ask most when they want a specialist-led venue and hotel negotiation service.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{faq.question}</h3>
              <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQs;
