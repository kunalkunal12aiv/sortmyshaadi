import React from 'react';
import HeroSection from '../components/home/HeroSection';
import Features from '../components/home/Features';
import VenueShowcase from '../components/home/VenueShowcase';
import DecorGallery from '../components/home/DecorGallery';
import BudgetPlanner from '../components/home/BudgetPlanner';
import WhyChooseUs from '../components/home/WhyChooseUs';
import TestimonialCarousel from '../components/home/TestimonialCarousel';
import VideoShowcase from '../components/home/VideoShowcase'; // Import the new component

function Home() {
  return (
    <div className="overflow-hidden bg-gradient-to-br from-[#F6F6F6] to-[#EDD498] text-theme-color">
      <HeroSection />
      <VideoShowcase /> {/* Move the new component to the second position */}
      <Features />
      <VenueShowcase />
      <DecorGallery />
      <BudgetPlanner />
      <WhyChooseUs />
      <TestimonialCarousel />
    </div>
  );
}

export default Home;
