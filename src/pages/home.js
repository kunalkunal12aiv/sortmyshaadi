import React from 'react';
import HeroSection from '../components/home/HeroSection';
import Features from '../components/home/Features';
import VenueShowcase from '../components/home/VenueShowcase';
import DecorGallery from '../components/home/DecorGallery';
import BudgetPlanner from '../components/home/BudgetPlanner';
import WhyChooseUs from '../components/home/WhyChooseUs';
import TestimonialCarousel from '../components/home/TestimonialCarousel';
import Footer from '../components/footer';

function Home() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <Features />
      <VenueShowcase />
      <DecorGallery />
    
      <WhyChooseUs />
      <TestimonialCarousel />
      <Footer />
    </div>
  );
}

export default Home;
