import React from 'react';
import { Link } from 'react-router-dom';

function VenueRecommendations({ recommendations }) {
  const { recommendedVenues, otherVenues, budgetBreakdown } = recommendations;

  return (
    <div className="space-y-8">
      {/* Budget Analysis Card */}
      <div className="bg-[#F6F6F6] rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-[#1E2742] mb-6" style={{ fontFamily: 'DM Serif Display, serif' }}>Budget Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-[#EDD498] to-[#BFA054] p-4 rounded-lg">
            <p className="text-sm text-[#1E2742]">Accommodation Budget</p>
            <p className="text-lg font-bold text-[#9A2143]">
              ₹{Math.floor(budgetBreakdown.minAccommodation).toLocaleString()} - 
              ₹{Math.floor(budgetBreakdown.maxAccommodation).toLocaleString()}
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#EDD498] to-[#BFA054] p-4 rounded-lg">
            <p className="text-sm text-[#1E2742]"> Rooms Required</p>
            <p className="text-lg font-bold text-[#1E2742]">{budgetBreakdown.doubleRooms}</p>
          </div>
          <div className="bg-gradient-to-br from-[#EDD498] to-[#BFA054] p-4 rounded-lg">
            <p className="text-sm text-[#1E2742]">Extra Beds Required</p>
            <p className="text-lg font-bold text-[#1E2742]">{budgetBreakdown.extraBeds}</p>
          </div>
        </div>
      </div>

      {/* Recommended Venues */}
      <div className="bg-[#F6F6F6] rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-[#1E2742] mb-6" style={{ fontFamily: 'DM Serif Display, serif' }}>
          Recommended Venues ({recommendedVenues.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendedVenues.map((venue) => (
            <div key={venue.id} className="bg-[#FFFFFF] rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-64">
                <img 
                  src={venue.media[0]} 
                  alt={venue.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1E2742]/60 to-transparent p-4">
                  <h2 className="text-2xl font-bold text-white">{venue.name}</h2>
                  <p className="text-white/90">{venue.shortAddress}</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[#9A2143] font-semibold">₹{venue.pricePerPlate} per plate</span>
                  <span className="text-[#1E2742]">{venue.guestSpace} guests</span>
                </div>
                <div className="flex space-x-4">
                  <Link 
                    to={`/venue/${venue.id}`}
                    className="flex-1 bg-[#EDD498] text-[#9A2143] py-2 px-4 rounded-lg text-center hover:bg-[#BFA054] transition"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Other Venues */}
      <div className="bg-[#F6F6F6] rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-[#1E2742] mb-6" style={{ fontFamily: 'DM Serif Display, serif' }}>
          Other Available Venues ({otherVenues.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherVenues.map((venue) => (
            <div key={venue.id} className="bg-[#FFFFFF] rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-64">
                <img 
                  src={venue.media[0]} 
                  alt={venue.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1E2742]/60 to-transparent p-4">
                  <h2 className="text-2xl font-bold text-white">{venue.name}</h2>
                  <p className="text-white/90">{venue.shortAddress}</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[#9A2143] font-semibold">₹{venue.pricePerPlate} per plate</span>
                  <span className="text-[#1E2742]">{venue.guestSpace} guests</span>
                </div>
                <div className="flex space-x-4">
                  <Link 
                    to={`/venue/${venue.id}`}
                    className="flex-1 bg-[#EDD498] text-[#9A2143] py-2 px-4 rounded-lg text-center hover:bg-[#BFA054] transition"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VenueRecommendations;
