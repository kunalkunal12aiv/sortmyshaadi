import React, { useState } from 'react';

function CompareVenues({ venues }) {
  const [sortOption, setSortOption] = useState('price');

  const sortedVenues = [...venues].sort((a, b) => {
    if (sortOption === 'price') return a.pricePerPlate - b.pricePerPlate;
    if (sortOption === 'capacity') return b.maxGuestCapacity - a.maxGuestCapacity;
    return 0;
  });

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Compare Venues</h2>
      <div className="mb-4">
        <select 
          value={sortOption} 
          onChange={(e) => setSortOption(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="price">Sort by Price</option>
          <option value="capacity">Sort by Capacity</option>
        </select>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2 text-left">Venue</th>
            <th className="border px-4 py-2 text-left">Price/Plate</th>
            <th className="border px-4 py-2 text-left">Capacity</th>
            <th className="border px-4 py-2 text-left">Perks</th>
            <th className="border px-4 py-2 text-left">Facilities</th>
          </tr>
        </thead>
        <tbody>
          {sortedVenues.map(venue => (
            <tr key={venue.id}>
              <td className="border px-4 py-2">{venue.name}</td>
              <td className="border px-4 py-2">₹{venue.pricePerPlate}</td>
              <td className="border px-4 py-2">{venue.maxGuestCapacity}</td>
              <td className="border px-4 py-2">
                {Array.isArray(venue.perks) ? venue.perks.join(', ') : (venue.perks || 'N/A')}
              </td>
              <td className="border px-4 py-2">
                {Array.isArray(venue.facilities)
                  ? venue.facilities.join(', ')
                  : (venue.facilities && typeof venue.facilities === 'object'
                      ? Object.values(venue.facilities).filter(Boolean).join(', ')
                      : (venue.facilities || 'N/A')
                    )
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CompareVenues;
