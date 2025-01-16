import React from 'react';
import HeroSection from '../components/hero_section';
import ServiceCards from '../components/ServiceCards';
import FeaturedVendors from '../components/featured_vendor';
import HowItWorks from '../components/howitworks';
import TestimonialSection from '../components/testimonial_section';

function Home() {
  
  return (
    <div className="home">
      <HeroSection />
      <ServiceCards />
      <HowItWorks />
      <FeaturedVendors />
      <TestimonialSection />
    </div>
  );
}

export default Home;
