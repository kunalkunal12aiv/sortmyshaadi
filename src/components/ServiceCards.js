import React, { useState } from 'react';

function ServiceCards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const services = [
    {
      title: "Planning tools",
      description: "Custom planning tools to manage your checklist, budget, guests and vendors.",
      cta: "Discover our tools",
      icon: "📋",
      bgColor: "from-rose-300 to-pink-200"
    },
    {
      title: "Wedding venues",
      description: "Photos, reviews, and so much more... get in touch from here!",
      cta: "Explore venues",
      icon: "🏰",
      bgColor: "from-slate-200 to-gray-100"
    },
    {
      title: "Vendors",
      description: "Find the top-rated wedding vendors near you in every category.",
      cta: "Start your search",
      icon: "👥",
      bgColor: "from-violet-200 to-purple-100"
    },
    {
      title: "Your free wedding website",
      description: "Share your wedding details - and your love story - with a customisable website.",
      cta: "Personalise your free website",
      icon: "💻",
      bgColor: "from-champagne-200 to-beige-100"
    },
    {
      title: "Infinite inspiration",
      description: "All the freshest wedding inspiration, trends and ideas in one place.",
      cta: "Get inspired here",
      icon: "✨",
      bgColor: "from-blush-200 to-rose-100"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === services.length - 3 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? services.length - 3 : prevIndex - 1
    );
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Wedding Planning Services
        </h2>
        <div className="relative">
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}
            >
              {services.map((service, index) => (
                <div key={index} className="min-w-[33.33%] px-4">
                  <div className={`bg-gradient-to-r ${service.bgColor} text-gray-700 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
                    <div className="text-5xl mb-6">{service.icon}</div>
                    <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                    <p className="mb-6 opacity-90">{service.description}</p>
                    <button className="bg-white text-gray-800 font-semibold py-2 px-6 rounded-full hover:bg-opacity-90 transition-all duration-300 flex items-center">
                      {service.cta}
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default ServiceCards;