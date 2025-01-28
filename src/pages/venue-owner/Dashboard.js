import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

function OwnerDashboard() {
  const { currentUser } = useAuth();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalVenues: 0,
    activeEnquiries: 0,
    totalBookings: 0
  });

  useEffect(() => {
    const fetchVenues = async () => {
      if (!currentUser) return;

      const venuesRef = collection(db, 'venues');
      const q = query(venuesRef, where('ownerId', '==', currentUser.uid));
      const snapshot = await getDocs(q);
      
      const venueData = [];
      snapshot.forEach((doc) => {
        venueData.push({ id: doc.id, ...doc.data() });
      });
      
      setVenues(venueData);
      setStats({
        totalVenues: venueData.length,
        activeEnquiries: 0, // You'll need to implement this
        totalBookings: 0 // You'll need to implement this
      });
      setLoading(false);
    };

    fetchVenues();
  }, [currentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Venue Owner Dashboard</h1>
          <Link
            to="/venue-owner/add-venue"
            className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-2 rounded-lg"
          >
            Add New Venue
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500">Total Venues</h3>
            <p className="text-3xl font-bold">{stats.totalVenues}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500">Active Enquiries</h3>
            <p className="text-3xl font-bold">{stats.activeEnquiries}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500">Total Bookings</h3>
            <p className="text-3xl font-bold">{stats.totalBookings}</p>
          </div>
        </div>

        {/* Venues List */}
        <div className="bg-white rounded-xl shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Your Venues</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {venues.map((venue) => (
                <div key={venue.id} className="border rounded-lg overflow-hidden">
                  <img
                    src={venue.media[0]}
                    alt={venue.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold">{venue.name}</h3>
                    <p className="text-gray-600">{venue.shortAddress}</p>
                    <div className="mt-4 flex space-x-2">
                      <Link
                        to={`/venue-owner/edit/${venue.id}`}
                        className="px-4 py-2 bg-gray-100 rounded-lg"
                      >
                        Edit
                      </Link>
                      <Link
                        to={`/venue-owner/bookings/${venue.id}`}
                        className="px-4 py-2 bg-pink-100 text-pink-700 rounded-lg"
                      >
                        View Bookings
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnerDashboard;
