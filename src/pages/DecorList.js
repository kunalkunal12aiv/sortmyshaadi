import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getHotelDetails } from '../utils/firebase';

function DecorList() {
  const [hotelDetails, setHotelDetails] = useState([]);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const details = await getHotelDetails();
        setHotelDetails(details);
      } catch (error) {
        console.error('Error fetching hotel details:', error);
      }
    };

    fetchHotelDetails();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Decor List</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {hotelDetails.map((hotel, index) => (
          <div key={index} className="relative group">
            <h2 className="text-xl font-semibold">{hotel.name}</h2>
            {hotel.decorImages.map((image, imgIndex) => (
              <div key={imgIndex} className="relative group">
                <img 
                  src={image} 
                  alt={`Decor ${imgIndex + 1}`}
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                  <Link 
                    to={`/decor/${index}`}
                    className="text-white text-lg font-semibold"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DecorList;