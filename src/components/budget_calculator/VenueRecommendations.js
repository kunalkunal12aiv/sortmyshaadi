import React from 'react';
import { Link } from 'react-router-dom';

function VenueRecommendations({ recommendations }) {
  const { venues, budgetBreakdown, allVenues } = recommendations;

  return (
    <div className="space-y-8">
      {/* Recommended Venues Section */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Recommended Venues
        </h2>
        <div className="space-y-6">
          {venues.map((venue) => (
            <div key={venue.id} className="border-2 border-green-100 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="inline-block px-2 py-1 bg-green-50 text-green-700 text-sm rounded mb-2">
                Within Budget
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{venue.name}</h3>
                  <p className="text-gray-600">{venue.shortAddress}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Average room cost: ₹{Math.floor(venue.averageRoomCost).toLocaleString()}/night
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total Stay Cost</p>
                  <p className="text-lg font-bold text-gray-600">
                    ₹{Math.floor(venue.totalCost).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Link 
                  to={`/venue/${venue.id}`}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Other Available Venues Section */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Other Available Venues
        </h2>
        <div className="space-y-6">
          {allVenues
            .filter(venue => !venues.find(v => v.id === venue.id))
            .map((venue) => (
              <div key={venue.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{venue.name}</h3>
                    <p className="text-gray-600">{venue.shortAddress}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Average room cost: ₹{Math.floor(venue.averageRoomCost).toLocaleString()}/night
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total Stay Cost</p>
                    <p className="text-lg font-bold text-gray-600">
                      ₹{Math.floor(venue.totalCost).toLocaleString()}
                    </p>
                    {venue.totalCost > budgetBreakdown.maxAccommodation && (
                      <p className="text-sm text-red-500">
                        Exceeds budget by ₹{Math.floor(venue.totalCost - budgetBreakdown.maxAccommodation).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Link 
                    to={`/venue/${venue.id}`}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VenueRecommendations;
