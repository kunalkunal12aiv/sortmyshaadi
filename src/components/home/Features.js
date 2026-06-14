import React from 'react';
import { motion } from 'framer-motion';

const benefits = [
  {
    title: 'Better Room Rates',
    description: 'We help secure more competitive room pricing and favorable group rates from hotels and resorts.'
  },
  {
    title: 'More Menu, Same Budget',
    description: 'Negotiate value improvements so your catering package feels richer without increasing your spend.'
  },
  {
    title: 'Smarter Bar Costs',
    description: 'We explore bar options, menu structuring, and softer beverage deals that protect your budget.'
  },
  {
    title: 'Extra Perks & Upgrades',
    description: 'Unlock complimentary upgrades, welcome amenities, early access, and more perks from venues.'
  }
];

function Features() {
  return (
    <section id="benefits" className="py-24 bg-white text-[#111827]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-pink-600 font-semibold">What a Better Deal Can Look Like</p>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold">Your venue package, improved in the right places</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
            We focus on the exact parts of your destination wedding proposal that can add more value without asking for a higher headline price.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm"
            >
              <div className="mb-5 h-12 w-12 rounded-2xl bg-pink-600 text-white grid place-items-center text-xl font-bold">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{benefit.title}</h3>
              <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-slate-500">Benefits vary by property and destination.</p>
      </div>
    </section>
  );
}

export default Features;
