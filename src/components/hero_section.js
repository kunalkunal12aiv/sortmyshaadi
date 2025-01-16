import React from 'react';
import heroImage from '../assets/hero_section.webp';


function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-pink-100 to-purple-100 py-20">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
            Make Your Wedding Planning Effortless
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            From venue selection to guest management, we've got you covered
          </p>
          <button className="bg-pink-500 text-white font-bold py-3 px-8 rounded-full hover:bg-pink-600 transition duration-300 transform hover:scale-105">
            Start Planning Now
          </button>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0">
          <img 
            src={heroImage}
            alt="Wedding Planning" 
            className="rounded-lg shadow-2xl transform hover:scale-105 transition duration-500"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
