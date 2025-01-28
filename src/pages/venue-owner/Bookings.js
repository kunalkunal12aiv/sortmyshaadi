import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';

function VenueBookings() {
  const { currentUser } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, confirmed, completed

  useEffect(() => {
    const fetchBookings = async () => {
      if (!currentUser) return;

      const bookingsRef = collection(db, 'bookings');
      const q = query(bookingsRef, where('venueOwnerId', '==', currentUser.uid));
      const snapshot = await getDocs(q);
      
      const bookingsData = [];
      snapshot.forEach((doc) => {
        bookingsData.push({ id: doc.id, ...doc.data() });
      });

      setBookings(bookingsData);
      setLoading(false);
    };

    fetchBookings();
  }, [currentUser]);

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Venue Bookings</h1>

            {/* Filter Tabs */}
            <div className="flex space-x-4 mb-8">
              {['all', 'pending', 'confirmed', 'completed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg capitalize ${
                    filter === status
                      ? 'bg-pink-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Bookings List */}
            <div className="space-y-4">
              {filteredBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="border rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{booking.customerName}</h3>
                      <p className="text-gray-600">{booking.venueName}</p>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm text-gray-500">Dates: {booking.dates.join(', ')}</p>
                        <p className="text-sm text-gray-500">Guests: {booking.guestCount}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm capitalize ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {filteredBookings.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No bookings found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VenueBookings;
