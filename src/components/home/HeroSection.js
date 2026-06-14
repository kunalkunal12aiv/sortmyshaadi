import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const guestOptions = [
  { value: 'two', label: 'Just the Two of Us' },
  { value: 'small', label: 'Small (1–24)' },
  { value: 'medium', label: 'Medium (25–49)' },
  { value: 'large', label: 'Large (50–99)' },
  { value: 'grand', label: 'Grand Affair (100+)' }
];

function HeroSection() {
  const [dateSeason, setDateSeason] = useState('');
  const [guestCount, setGuestCount] = useState('small');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/consultation');
  };

  return (
    <section className="relative min-h-[88vh] flex items-center justify-center bg-[#f7eef4]">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/assets/hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/35" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div className="text-center lg:text-left">
              <span className="inline-flex rounded-full bg-white/20 px-4 py-2 text-xs uppercase tracking-[0.3em] font-semibold text-white/90">
                Venue & hotel deal specialists
              </span>
              <h1 className="mt-7 text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight text-white">
                Better Wedding Venue Deals. Less Stress.
              </h1>
              <p className="mt-6 max-w-2xl text-lg md:text-xl text-white/80 leading-relaxed">
                We compare venues, negotiate with hotels, and help couples uncover better rates, added perks, and better overall value for their wedding budget.
              </p>

              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <button
                  type="button"
                  onClick={() => navigate('/consultation')}
                  className="inline-flex items-center justify-center rounded-full bg-[#db2777] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-pink-500/20 hover:bg-[#c21d54] transition-colors"
                >
                  Book a Free 30-Minute Consultation
                </button>
                <div className="text-sm text-white/80">
                  Receive tailored venue recommendations within one week.
                </div>
              </div>
            </div>

            <div className="rounded-[36px] border border-white/20 bg-white/95 p-8 shadow-2xl shadow-slate-900/10">
              <div className="text-center mb-6">
                <span className="text-sm uppercase tracking-[0.3em] text-pink-600 font-semibold">Qualification Form</span>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Get matched with a wedding specialist</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <label className="block text-sm font-medium text-slate-600">
                  Wedding Date / Wedding Season
                  <input
                    type="text"
                    value={dateSeason}
                    onChange={(e) => setDateSeason(e.target.value)}
                    placeholder="e.g. Dec 2026 or Winter wedding"
                    className="mt-3 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-100"
                  />
                </label>

                <div>
                  <p className="text-sm font-medium text-slate-600 mb-3">Guest Count</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {guestOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setGuestCount(option.value)}
                        className={`rounded-3xl border px-4 py-3 text-left text-sm transition-all ${guestCount === option.value ? 'border-pink-600 bg-pink-50 text-pink-700' : 'border-slate-200 bg-white text-slate-700 hover:border-pink-600 hover:bg-pink-50'}`}
                      >
                        <span className="block font-semibold">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-slate-900 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 hover:bg-slate-800 transition-colors"
                >
                  Get Matched With A Wedding Specialist
                </button>

                <p className="text-xs text-slate-500">
                  One quick step to book your free consultation and begin a specialist-led venue negotiation process.
                </p>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
