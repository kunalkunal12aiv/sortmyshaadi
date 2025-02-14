import React from 'react';
import { Helmet } from 'react-helmet-async';
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
    <>
      <Helmet>
        <title>Home - Sort My Shaadi</title>
        <meta name="description" content="Discover the best wedding hotel deals with Sort My Shaadi." />
        <link rel="canonical" href={`${window.location.origin}/`} />
      </Helmet>
      <div className="overflow-hidden bg-gradient-to-br from-[#fce4ec] to-[#db2777] text-theme-color">
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
    </>
  );
}

export default Home;
