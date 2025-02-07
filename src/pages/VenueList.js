import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getVenues } from '../utils/firebase';

function VenueList() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  // New state for search query
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchVenues = async () => {
      const data = await getVenues();
      setVenues(data);
      setLoading(false);
    };
    fetchVenues();
  }, []);

  // Filter venues based on searchQuery
  const filteredVenues = venues.filter(venue =>
    venue.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12 px-4">
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent"></div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Manage Venues</h1>
              {/* Search Input */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search venues..."
                className="mt-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <Link 
              to="/add-venue" 
              className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition"
            >
              Add New Venue
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVenues.map((venue) => (
              <div key={venue.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative h-64">
                  <img 
                    src={venue.media[0]} 
                    alt={venue.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <h2 className="text-2xl font-bold text-white">{venue.name}</h2>
                    <p className="text-white/90">{venue.shortAddress}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-pink-600 font-semibold">₹{venue.pricePerPlate} per plate</span>
                    <span className="text-gray-600">{venue.guestSpace} guests</span>
                  </div>
                  <div className="flex space-x-4">
                    <Link 
                      to={`/edit-venue/${venue.id}`}
                      className="flex-1 bg-pink-100 text-pink-700 py-2 px-4 rounded-lg text-center hover:bg-pink-200 transition"
                    >
                      Edit
                    </Link>
                    <Link 
                      to={`/venue/${venue.id}`}
                      className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-center hover:bg-gray-200 transition"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default VenueList;