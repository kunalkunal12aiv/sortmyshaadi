import React from 'react';
import { motion } from 'framer-motion';

const reasons = [
  {
    title: 'Dedicated Wedding Specialist',
    description: 'A real person guides your venue selection and manages negotiations on your behalf.'
  },
  {
    title: 'Better Negotiation Outcomes',
    description: 'We focus on room blocks, upgrades, concessions, and hidden value that matter to your budget.'
  },
  {
    title: 'Save Time',
    description: 'Avoid contacting dozens of venues manually; we narrow options and negotiate for you.'
  },
  {
    title: 'Free Consultation',
    description: 'Start with a no-obligation discovery session before you commit to any venue or package.'
  }
];

function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-24 bg-[#fdf4f8] text-[#111827]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-pink-600 font-semibold">Specialist advisory service</p>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold">Why you should talk to SortMyShaadi before choosing a venue</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
            Your wedding venue decision should start with negotiation expertise, not a marketplace full of noisy options.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-sm"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-600 text-white text-lg font-bold">
                {index + 1}
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-3">{reason.title}</h3>
              <p className="text-slate-600 leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
