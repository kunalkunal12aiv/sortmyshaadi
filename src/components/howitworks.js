import React from 'react';

function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
          How Sort my Shaadi Works
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
              1
            </div>
            <h3 className="text-xl font-semibold mb-4">Create Your Profile</h3>
            <p className="text-gray-600">Set up your wedding details and preferences</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
              2
            </div>
            <h3 className="text-xl font-semibold mb-4">Browse Vendors</h3>
            <p className="text-gray-600">Explore and connect with top vendors</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
              3
            </div>
            <h3 className="text-xl font-semibold mb-4">Plan & Organize</h3>
            <p className="text-gray-600">Manage your tasks, budget, and guest list</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
