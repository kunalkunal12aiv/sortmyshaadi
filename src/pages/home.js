import React from 'react';
import HeroSection from '../components/home/HeroSection';
import Features from '../components/home/Features';
import VenueShowcase from '../components/home/VenueShowcase';
import DecorGallery from '../components/home/DecorGallery';
import BudgetPlanner from '../components/home/BudgetPlanner';
import WhyChooseUs from '../components/home/WhyChooseUs';
import TestimonialCarousel from '../components/home/TestimonialCarousel';
import VideoShowcase from '../components/home/VideoShowcase';
import DestinationTypes from '../components/home/DestinationTypes';
import HowItWorks from '../components/home/HowItWorks';
import FAQs from '../components/home/FAQs';
import VendorCTA from '../components/home/VendorCTA';

function Home() {
  return (
    <div className="overflow-hidden bg-gradient-to-br from-[#F6F6F6] to-[#EDD498] text-theme-color">
      <HeroSection />
      <VideoShowcase />
      <Features />
      <HowItWorks />
      <DestinationTypes />
      <VenueShowcase />
      <DecorGallery />
      <BudgetPlanner />
      <WhyChooseUs />
      <TestimonialCarousel />
      <FAQs />
      <VendorCTA />
    </div>
  );
}

export default Home;
