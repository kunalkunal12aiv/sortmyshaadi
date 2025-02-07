import React, { useState, useEffect } from 'react';
import { getVenues } from '../utils/firebase';
import VenueFilters from '../components/VenueFilters';
import VenueCard from '../components/VenueCard';
import { useAuth } from '../contexts/AuthContext';

const VenueList = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 10000 },
    roomPriceRange: { min: 0, max: 20000 },
    capacityRange: { min: 0, max: 2000 },
    selectedTags: [],
    selectedCity: '' // Add city filter
  });
  const [showFilters, setShowFilters] = useState(false);

  const { currentUser } = useAuth();

  const parseCapacityRange = (capacityString) => {
    try {
      const [min, max] = capacityString.split('-').map(num => parseInt(num.trim()));
      return { min: min || 0, max: max || min };
    } catch (error) {
      console.error('Error parsing capacity range:', capacityString);
      return { min: 0, max: 0 };
    }
  };

  useEffect(() => {
    const fetchVenues = async () => {
      const data = await getVenues();
      setVenues(data);
      setFilteredVenues(data);
      setLoading(false);
    };
    fetchVenues();
  }, []);

  useEffect(() => {
    const results = venues.filter(venue => {
      const venuePricePerPlate = parseInt(venue.pricePerPlate) || 0;
      const venueDoubleRoomPrice = parseInt(venue.doubleRoomPrice) || 0;

      const matchesSearch = venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        venue.shortAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
        venue.about.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPrice = venuePricePerPlate >= Number(filters.priceRange.min) && 
        venuePricePerPlate <= Number(filters.priceRange.max);

      const matchesRoomPrice = venueDoubleRoomPrice >= Number(filters.roomPriceRange.min) && 
        venueDoubleRoomPrice <= Number(filters.roomPriceRange.max);

      const venueCapacity = parseCapacityRange(venue.guestSpace);
      const requestedMin = Number(filters.capacityRange.min);
      const requestedMax = Number(filters.capacityRange.max);

      const matchesCapacity = 
        venueCapacity.min <= requestedMax && 
        venueCapacity.max >= requestedMin;

      const matchesTags = filters.selectedTags.length === 0 || 
        filters.selectedTags.some(tag => 
          venue.about.toLowerCase().includes(tag.toLowerCase()) ||
          venue.faqs.some(faq => 
            faq.question.toLowerCase().includes(tag.toLowerCase()) || 
            faq.answer.toLowerCase().includes(tag.toLowerCase())
          )
        );

      const matchesCity = filters.selectedCity === '' || 
        venue.shortAddress.toLowerCase().includes(filters.selectedCity.toLowerCase());

      return matchesSearch && matchesPrice && matchesRoomPrice && matchesCapacity && matchesTags && matchesCity;
    });

    setFilteredVenues(results);
  }, [searchTerm, venues, filters]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#9A2143] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--primary-light)] to-[var(--accent-1)] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-[var(--primary-dark)]">Wedding Venues</h1>
          <div className="mt-4 md:mt-0 relative">
            <input
              type="text"
              placeholder="Search venues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-80 px-4 py-2 rounded-lg border border-[var(--text-secondary)] focus:ring-2 focus:ring-[var(--primary-main)] focus:border-transparent outline-none"
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-[var(--text-secondary)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-[var(--primary-main)] text-[var(--primary-dark)] px-6 py-2 rounded-lg hover:bg-[var(--accent-1)] transition"
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {showFilters && (
          <div className="mb-8">
            <VenueFilters 
              venues={venues} 
              onFilterChange={setFilters}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVenues.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#1E2742] text-xl">No venues found matching your criteria.</p>
            </div>
          ) : (
            filteredVenues.map((venue) => (
              <VenueCard 
                key={venue.id} 
                venue={venue}
                className="hover-card"
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default VenueList;