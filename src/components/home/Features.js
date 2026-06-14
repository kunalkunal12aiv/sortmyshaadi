import React from 'react';
import { motion } from 'framer-motion';

const benefits = [
  {
    title: 'Better Room Rates',
    description: 'We secure stronger hotel group rates and real rate protections so your room block does not carry hidden premium pricing.',
    accent: 'from-pink-500 to-rose-400',
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12 text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="14" width="36" height="24" rx="10" fill="currentColor" opacity="0.2" />
        <path d="M14 18H34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M14 24H34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M14 30H26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M22 10C22 8.34315 23.3431 7 25 7H31C32.6569 7 34 8.34315 34 10V13H22V10Z" stroke="currentColor" strokeWidth="2" />
      </svg>
    )
  },
  {
    title: 'Larger Menu, Same Budget',
    description: 'A richer catering package with more chef-selected items, delivered without increasing your spend.',
    accent: 'from-sky-500 to-cyan-400',
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12 text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 14H36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 20H36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 26H28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M19 34C19 30 23 26 25 26C27 26 31 30 31 34V38H19V34Z" stroke="currentColor" strokeWidth="2" />
        <path d="M23 10V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    title: 'Save on the Bar',
    description: 'We structure bar terms, reduce open-bar risk, and lock in beverages that guests actually choose.',
    accent: 'from-emerald-500 to-lime-400',
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12 text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 14H32L30 34H18L16 14Z" stroke="currentColor" strokeWidth="2" />
        <path d="M19 14V10C19 8.34315 20.3431 7 22 7H26C27.6569 7 29 8.34315 29 10V14" stroke="currentColor" strokeWidth="2" />
        <path d="M22 34H26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M24 18C24 18 30 20 30 26C30 31.5228 25.5228 36 20 36" stroke="currentColor" strokeWidth="2" />
      </svg>
    )
  },
  {
    title: 'Waived Venue Fees',
    description: 'We remove or reduce separate banquet, venue hire, and service fees hotels often add on top of the package.',
    accent: 'from-violet-500 to-fuchsia-500',
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12 text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 8L38 14V26C38 32.6274 32.6274 38 26 38H22C15.3726 38 10 32.6274 10 26V14L24 8Z" stroke="currentColor" strokeWidth="2" />
        <path d="M16 26C16 24.3431 17.3431 23 19 23H29C30.6569 23 32 24.3431 32 26V33C32 34.6569 30.6569 36 29 36H19C17.3431 36 16 34.6569 16 33V26Z" stroke="currentColor" strokeWidth="2" />
        <path d="M21 29H27" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    title: 'Extra Perks & Upgrades',
    description: 'Complimentary upgrades, welcome amenities, early check-in, and the extras that don’t appear on the published price list.',
    accent: 'from-amber-500 to-orange-400',
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12 text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 9L28.4721 17.4721L37 19L30 25.5279L31.9443 34.0557L24 29.5L16.0557 34.0557L18 25.5279L11 19L19.5279 17.4721L24 9Z" stroke="currentColor" strokeWidth="2" />
        <path d="M10 38L38 38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }
];

function Features() {
  return (
    <section id="benefits" className="relative overflow-hidden py-24 bg-gradient-to-b from-[#fff5f9] via-white to-[#fffaf3] text-[#111827]">
      <div className="absolute left-0 top-[-20%] h-72 w-72 rounded-full bg-pink-200 opacity-30 blur-3xl" />
      <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-sky-200 opacity-30 blur-3xl" />
      <div className="max-w-6xl mx-auto relative px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-[0.35em] text-pink-600 font-semibold">What a better deal can look like</p>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold leading-tight">Your venue package, improved in the right places.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base md:text-lg text-slate-600">
            These are the outcome areas we target when negotiating hotel and venue terms for your wedding.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className={`relative overflow-hidden rounded-[36px] border border-slate-200 bg-white p-8 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.16)] transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_30px_80px_-35px_rgba(219,39,119,0.18)] ${index === 4 ? 'md:col-span-2' : ''}`}
            >
              <div className="absolute -right-10 top-6 h-28 w-28 rounded-full bg-gradient-to-br from-white to-slate-100 opacity-90 blur-xl" />
              <div className="absolute -left-8 bottom-8 h-16 w-16 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 opacity-80 blur-2xl" />
              <div className="relative flex items-start gap-5">
                <div className={`flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br ${benefit.accent} shadow-lg shadow-pink-300/30`}>{benefit.icon}</div>
                <div className="min-w-0">
                  <p className="text-3xl font-semibold text-slate-900">{benefit.title}</p>
                  <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">{benefit.description}</p>
                </div>
              </div>
              <div className="mt-8 flex items-center justify-between gap-4 rounded-3xl bg-slate-50 p-4 text-sm text-slate-500">
                <span className="font-semibold text-slate-900">Why it matters</span>
                <span>{index === 0 ? 'Protects your room budget' : index === 1 ? 'More value per guest' : index === 2 ? 'Safer bar spend' : index === 3 ? 'No surprise venue add-ons' : 'Luxury without the premium'}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-5 text-center">
          <button
            type="button"
            onClick={() => window.open('https://calendly.com/sortmyshaadi/consultation', '_blank')}
            className="rounded-full bg-[#db2777] px-10 py-4 text-base font-semibold text-white shadow-lg shadow-pink-500/20 hover:bg-[#c21d54] transition-colors"
          >
            Book a Free 7-Minute Consultation
          </button>
          <p className="max-w-3xl text-sm text-slate-500 md:text-base">
            One short call to confirm whether our hotel deal expertise is a fit for your wedding. We are not a discovery platform—please do your own research before the call.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Features;
