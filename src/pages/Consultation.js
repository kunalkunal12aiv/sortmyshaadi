import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

function Consultation() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nDetails: ${details}`);
    window.location.href = `mailto:hello@sortmyshaadi.com?subject=Free 30-Minute Consultation&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-[#f7eef4] text-[#111827] py-20">
      <Helmet>
        <title>Book a Free Consultation | SortMyShaadi</title>
        <meta
          name="description"
          content="Book a free 30-minute consultation with SortMyShaadi to compare venues, negotiate hotel deals, and uncover better value."
        />
      </Helmet>

      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-16 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-pink-600 font-semibold">Free consultation</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold">Book your free 30-minute consultation</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
            Share your wedding season and guest expectations, and our specialist will contact you with tailored venue recommendations and negotiation ideas.
          </p>
        </div>

        <div className="rounded-[36px] border border-slate-200 bg-white p-10 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Your name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-100"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Email address</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-100"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Phone number</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-100"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Wedding details</span>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={5}
                placeholder="Tell us your wedding season, destination, guest size, or venue priorities"
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-100"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-full bg-[#db2777] px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-pink-500/20 hover:bg-[#c21d54] transition-colors"
            >
              Send Consultation Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Consultation;
