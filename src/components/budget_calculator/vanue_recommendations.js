import React from 'react';
import { Link } from 'react-router-dom';

function VenueRecommendations({ recommendations }) {
  const { recommendedVenues, otherVenues, budgetBreakdown } = recommendations;

  return (
    <div className="space-y-8">
      {/* Budget Analysis Card */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Budget Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Accommodation Budget</p>
            <p className="text-lg font-bold text-pink-600">
              ₹{Math.floor(budgetBreakdown.minAccommodation).toLocaleString()} - 
              ₹{Math.floor(budgetBreakdown.maxAccommodation).toLocaleString()}
            </p>
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600"> Rooms Required</p>
            <p className="text-lg font-bold text-gray-900">{budgetBreakdown.doubleRooms}</p>
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Extra Beds Required</p>
            <p className="text-lg font-bold text-gray-900">{budgetBreakdown.extraBeds}</p>
          </div>
        </div>
      </div>

      {/* Recommended Venues */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Recommended Venues ({recommendedVenues.length})
        </h2>
        <div className="space-y-6">
          {recommendedVenues.map((venue) => (
            <div key={venue.id} className="border-2 border-green-100 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <div className="inline-block px-2 py-1 bg-green-50 text-green-700 text-sm rounded mb-2">
                    Within Budget
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{venue.name}</h3>
                  <p className="text-gray-600">{venue.shortAddress}</p>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-500">
                      Double Room: ₹{Math.floor(venue.doubleRoomPrice).toLocaleString()}/night
                    </p>
                    <p className="text-sm text-gray-500">
                      Extra Bed: ₹{Math.floor(venue.extraBedPrice).toLocaleString()}/night
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total Stay Cost</p>
                  <p className="text-lg font-bold text-green-600">
                    ₹{Math.floor(venue.totalCost).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Link 
                  to={`/venue/${venue.id}`}
                  className="bg-green-100 text-green-700 px-6 py-2 rounded-lg hover:bg-green-200 transition-colors font-medium"
                >
                  Explore Wedding
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Other Venues */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Other Available Venues ({otherVenues.length})
        </h2>
        <div className="space-y-6">
          {otherVenues.map((venue) => (
            <div key={venue.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{venue.name}</h3>
                  <p className="text-gray-600">{venue.shortAddress}</p>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-500">
                      Double Room: ₹{Math.floor(venue.doubleRoomPrice).toLocaleString()}/night
                    </p>
                    <p className="text-sm text-gray-500">
                      Extra Bed: ₹{Math.floor(venue.extraBedPrice).toLocaleString()}/night
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total Stay Cost</p>
                  <p className="text-lg font-bold text-gray-600">
                    ₹{Math.floor(venue.totalCost).toLocaleString()}
                  </p>
                  <p className="text-sm text-red-500">
                    Exceeds budget by ₹{Math.floor(venue.totalCost - budgetBreakdown.maxAccommodation).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Link 
                  to={`/venue/${venue.id}`}
                  className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Explore Wedding
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
