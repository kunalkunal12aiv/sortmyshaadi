import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useShortlist } from '../../contexts/ShortlistContext';
import { useCompare } from '../../contexts/CompareContext';

function VenueRecommendations({ recommendations, filters }) {
  const [filteredResults, setFilteredResults] = useState(recommendations);

  // Update filtered results whenever recommendations or filters change
  useEffect(() => {
    if (!recommendations) return;

    // Debug: log full incoming recommendations to verify structure
    console.log('Received recommendations:', recommendations);

    // If recommendations isn’t structured (i.e. no recommendedVenues), treat it as a flat array
    let data = recommendations;
    if (!data.recommendedVenues && Array.isArray(data)) {
      data = {
        recommendedVenues: data,
        otherVenues: [],
        alternativeVenues: data,
        budgetBreakdown: {}
      };
      console.log('Adjusted flat recommendations data:', data);
    }

    const applyFilters = (venues) => {
      if (!venues || !Array.isArray(venues)) return [];
      if (!filters) return venues;
      
      // Normalize capacity range filters
      const capacityMin = filters.capacityRange?.min === Infinity ? 0 : filters.capacityRange?.min;
      const capacityMax = filters.capacityRange?.max === -Infinity ? Infinity : filters.capacityRange?.max;
      
      return venues.filter(venue => {
        const venueCapacity = parseInt(venue.maxGuestCapacity || venue.guestSpace || 0, 10);
        const matchesPrice = !filters.priceRange || (
          venue.pricePerPlate >= (filters.priceRange?.min || 0) &&
          venue.pricePerPlate <= (filters.priceRange?.max || Infinity)
        );
        const matchesCapacity = !filters.capacityRange || (
          venueCapacity >= capacityMin &&
          venueCapacity <= capacityMax
        );

        const matchesCity = !filters.selectedCity || 
          venue.shortAddress?.toLowerCase().includes(filters.selectedCity.toLowerCase());

        // Fix for amenities check - ensure we're working with strings
        const venueAmenities = Array.isArray(venue.amenities) 
          ? venue.amenities.map(amenity => 
              typeof amenity === 'string' ? amenity : String(amenity)
            )
          : (typeof venue.amenities === 'object' 
              ? Object.values(venue.amenities).map(amenity => 
                  typeof amenity === 'string' ? amenity : String(amenity)
                )
              : []);

        const matchesTags = !filters.selectedTags?.length ||
          filters.selectedTags.every(tag => 
            venueAmenities.some(amenity => 
              amenity.toString().toLowerCase().includes(tag.toLowerCase())
            ) || 
            venue.about?.toLowerCase().includes(tag.toLowerCase())
          );

        return matchesPrice && matchesCapacity && matchesCity && matchesTags;
      });
    };

    const filtered = {
      recommendedVenues: applyFilters(data.recommendedVenues),
      otherVenues: applyFilters(data.otherVenues),
      alternativeVenues: applyFilters(data.alternativeVenues),
      budgetBreakdown: data.budgetBreakdown
    };

    // Debug: log filtered lengths
    console.log('Filtered Recommended Venues:', filtered.recommendedVenues.length);
    console.log('Filtered Alternative Venues:', filtered.alternativeVenues.length);

    // Remove the fallback block so perfect matches remain as-is and all alternatives display in close matches
    // if (filtered.recommendedVenues.length === 0 && filtered.alternativeVenues.length > 0) {
    //   filtered.recommendedVenues = filtered.alternativeVenues.slice(0, 1);
    //   console.log('Using first alternative as recommended');
    // }
    
    setFilteredResults(filtered);
  }, [recommendations, filters]);

  // Use filteredResults instead of recommendations directly
  const { recommendedVenues = [], otherVenues = [], alternativeVenues = [], budgetBreakdown = {} } = filteredResults || {};

  // Remove fallback and update final venues assignment:
  const finalRecommended = recommendedVenues; // Use perfect matches as provided
  const finalAlternative = alternativeVenues;   // Show all alternative venues

  // Show message if no venues found at all
  if (finalRecommended.length === 0 && finalAlternative.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-100 rounded-xl">
        <h2 className="text-xl font-semibold text-gray-800">No Venues Found</h2>
        <p className="text-gray-600 mt-2">Try adjusting your budget or guest count criteria</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Budget Breakdown Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Budget Breakdown</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(budgetBreakdown).map(([category, amount]) => (
            <div key={category} className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 capitalize">{category}</p>
              <p className="text-lg font-semibold">
                ₹{typeof amount === 'object' ? JSON.stringify(amount) : parseInt(amount).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Perfect Matches - render always */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Perfect Matches ({finalRecommended.length})
        </h2>
        {finalRecommended.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {finalRecommended.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No perfect matches available.</p>
        )}
      </div>

      {/* Other Venues */}
      {otherVenues.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Other Available Venues ({otherVenues.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherVenues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} isAlternative={false} />
            ))}
          </div>
        </div>
      )}

      {/* Alternative Venues (shown when no or few exact matches) */}
      {finalAlternative.length > 0 && (
        <div className="bg-yellow-50 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Close Matches ({finalAlternative.length})
          </h2>
          <p className="text-gray-600 mb-4">
            These venues are slightly outside your criteria but might interest you
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {finalAlternative.map((venue) => (
              <VenueCard 
                key={venue.id} 
                venue={venue} 
                isAlternative={true}
                reason={
                  venue.pricePerPlate > Math.floor(recommendations.totalBudget / recommendations.guestCount)
                    ? "Slightly over budget"
                    : "Slightly smaller capacity"
                }
              />
            ))}
          </div>
        </div>
      )}

      {/* No Results Message */}
      {finalRecommended.length === 0 && finalAlternative.length === 0 && (
        <div className="text-center p-8 bg-gray-100 rounded-xl">
          <h2 className="text-xl font-semibold text-gray-800">No Venues Found</h2>
          <p className="text-gray-600 mt-2">
            Try adjusting your budget or guest count criteria to see more options
          </p>
        </div>
      )}
    </div>
  );
}

// Venue Card Component
function VenueCard({ venue, isAlternative, reason }) {
  const { addToShortlist, shortlistedVenues } = useShortlist();
  const { addToCompare, comparedVenues } = useCompare();
  // Use PUBLIC_URL to ensure correct path resolution for fallback image
  const fallbackImage = process.env.PUBLIC_URL + '/placeholder-venue.jpg';

  // Check if venue is already shortlisted
  const isShortlisted = shortlistedVenues.some(v => v.id === venue.id);
  const isCompared = comparedVenues.some(v => v.id === venue.id);

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${isAlternative ? 'border-2 border-yellow-400' : ''}`}>
      <div className="relative h-48">
        <img 
          src={venue.media?.[0] || fallbackImage} 
          alt={venue.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = fallbackImage;
            console.log('Image failed to load for venue:', venue.name);
          }}
        />
        {isAlternative && reason && (
          <div className="absolute top-2 right-2 bg-yellow-400 text-gray-800 px-2 py-1 rounded text-sm">
            {reason}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{venue.name}</h3>
        <p className="text-gray-600">{venue.shortAddress}</p>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-pink-600 font-medium">₹{venue.pricePerPlate}/plate</span>
          <span className="text-gray-500">{venue.maxGuestCapacity} guests</span>
        </div>
        <Link 
          to={`/venue/${venue.id}`}
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-3 block w-full bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition text-center"
        >
          View Details
        </Link>
        {/* Shortlist Button */}
        <button
          onClick={() => addToShortlist(venue)}
          disabled={isShortlisted}
          className={`mt-2 block w-full py-2 px-4 rounded-lg transition-colors text-center ${isShortlisted ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
        >
          {isShortlisted ? 'Shortlisted' : 'Add to Shortlist'}
        </button>
        {/* Compare Button */}
        <button
          onClick={() => addToCompare(venue)}
          disabled={isCompared}
          className={`mt-2 block w-full py-2 px-4 rounded-lg transition-colors text-center ${isCompared ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'}`}
        >
          {isCompared ? 'Added to Compare' : 'Add to Compare'}
        </button>
      </div>
    </div>
  );
}

export default VenueRecommendations;
