import React from 'react';

function TestimonialSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Happy Couples
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition duration-300">
            <p className="text-gray-600 italic text-lg mb-6">
              "Sort my Shaadi made our wedding planning so much easier!"
            </p>
            <div className="flex items-center">
              <img 
                src="/images/hero.jpg" 
                alt="Happy Couple" 
                className="w-16 h-16 rounded-full object-cover"
              />
              <h4 className="ml-4 font-semibold text-gray-800">Priya & Rahul</h4>
            </div>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition duration-300">
            <p className="text-gray-600 italic text-lg mb-6">
              "Best decision we made for our wedding preparations!"
            </p>
            <div className="flex items-center">
              <img 
                src="/images/couple2.jpg" 
                alt="Happy Couple" 
                className="w-16 h-16 rounded-full object-cover"
              />
              <h4 className="ml-4 font-semibold text-gray-800">Anita & Vikram</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialSection;
