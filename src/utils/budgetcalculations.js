import { firestore } from '../firebase';

export const calculateVenueRecommendations = async (criteria) => {
  try {
    console.log('Processing criteria:', criteria);
    
    // First fetch ALL venues without any city filter
    const snapshot = await firestore.collection('venues').get();
    console.log('Total venues found:', snapshot.size);

    // Map all venues
    let allVenues = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Apply city filter in memory for more flexible matching
    if (criteria.city && criteria.city !== 'all') {
      console.log('Filtering by city:', criteria.city);
      allVenues = allVenues.filter(venue => 
        venue.shortAddress?.toLowerCase().includes(criteria.city.toLowerCase())
      );
      console.log('Venues after city filter:', allVenues.length);
    }

    // Helper function to parse guest capacity
    const parseGuestCapacity = (capacity) => {
      if (typeof capacity === 'number') return capacity;
      if (typeof capacity === 'string') {
        // Handle ranges like "50-300" or "25-2200"
        if (capacity.includes('-')) {
          const [min, max] = capacity.split('-').map(num => parseInt(num.trim()));
          return max; // Return the maximum capacity
        }
        return parseInt(capacity);
      }
      return 0;
    };

    // Apply additional filters
    const filteredVenues = allVenues.filter(venue => {
      const guestSpace = parseGuestCapacity(venue.guestSpace) || parseGuestCapacity(venue.maxGuestCapacity) || 0;
      const pricePerPlate = parseInt(venue.pricePerPlate) || 0;
      
      console.log(`Filtering venue ${venue.name}:`, {
        address: venue.shortAddress,
        guestSpace,
        originalGuestSpace: venue.guestSpace,
        pricePerPlate,
        meetsGuestRequirement: guestSpace >= criteria.guestCount,
        meetsBudgetRequirement: pricePerPlate * criteria.guestCount <= criteria.totalBudget
      });

      return guestSpace >= criteria.guestCount;
    });

    console.log('Final filtered venues:', filteredVenues.length);

    return {
      recommendedVenues: [],
      alternativeVenues: filteredVenues,
      totalResults: filteredVenues.length,
      budgetBreakdown: {
        venue: Math.max(0, criteria.totalBudget * 0.4),
        catering: Math.max(0, criteria.totalBudget * 0.3),
        decoration: Math.max(0, criteria.totalBudget * 0.2),
        other: Math.max(0, criteria.totalBudget * 0.1),
        accommodation: Math.max(0, criteria.stayingGuests * 5000 * criteria.stayDuration)
      }
    };

  } catch (error) {
    console.error('Error in calculateVenueRecommendations:', error);
    throw error;
  }
};
