import React, { useState, useRef } from 'react';
import BudgetForm from '../components/budget_calculator/budgetform';
import VenueRecommendations from '../components/budget_calculator/vanue_recommendations';
import { calculateVenueRecommendations } from '../utils/budgetcalculations';

function BudgetCalculator() {
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const resultsRef = useRef(null);

  const handleCalculation = async (formData) => {
    setLoading(true);
    try {
      const results = await calculateVenueRecommendations(formData);
      setRecommendations(results);
      
      // Enhanced smooth scroll with better offset
      setTimeout(() => {
        const yOffset = -50; // Adjust this value to control how far from the top
        const element = resultsRef.current;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }, 100);
    } catch (error) {
      console.error('Error calculating recommendations:', error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F6F6] to-[#EDD498] py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold text-center text-[#1E2742] mb-4" style={{ fontFamily: 'DM Serif Display, serif' }}>
          Wedding Venue Finder
        </h1>
        <p className="text-center text-[#1E2742] mb-12 max-w-2xl mx-auto" style={{ fontFamily: 'Kantumruy, sans-serif' }}>
          Find perfect venues within your budget based on your guest count and stay duration
        </p>
        
        <div className="max-w-3xl mx-auto mb-12">
          <BudgetForm onSubmit={handleCalculation} />
        </div>

        <div ref={resultsRef} tabIndex="-1" className="scroll-mt-20">
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#9A2143] border-t-transparent"></div>
            </div>
          ) : (
            recommendations && <VenueRecommendations recommendations={recommendations} />
          )}
        </div>
      </div>
    </div>
  );
}

export default BudgetCalculator;
