import React from 'react';
import { motion } from 'framer-motion';

const negotiationItems = [
  'Better room rates',
  'Complimentary rooms',
  'Room upgrades',
  'Venue concessions',
  'Welcome amenities',
  'Flexible vendor policies',
  'Extended setup access',
  'Food and beverage value improvements'
];

function NegotiationValues() {
  return (
    <section id="how-it-works" className="py-24 bg-[#fff7fb] text-[#111827]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-pink-600 font-semibold">How we create value</p>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold">What SortMyShaadi negotiates for your wedding</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
            We focus on the specific hotel and venue terms that add value, not just headline discounts.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {negotiationItems.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 h-12 w-12 rounded-2xl bg-pink-600 text-white grid place-items-center text-xl font-bold">
                {index + 1}
              </div>
              <p className="text-slate-700 font-semibold">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NegotiationValues;
