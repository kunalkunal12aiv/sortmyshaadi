import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/home/HeroSection';
import Features from '../components/home/Features';

function Home() {
  return (
    <>
      <Helmet>
        <title>SortMyShaadi | Wedding Venue & Hotel Deal Specialists</title>
        <meta
          name="description"
          content="India's wedding venue and hotel deal specialist. Book a free consultation to compare venues, negotiate with hotels, and uncover better rates and perks."
        />
        <link rel="canonical" href={`${window.location.origin}/`} />
      </Helmet>
      <div
        className="overflow-y-auto overflow-x-hidden bg-[#fff8fb] text-[#1f2937]"
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'smooth'
        }}
      >
        <div className="relative">
          <HeroSection />
          <Features />
        </div>
      </div>
    </>
  );
}

export default Home;
