import React, { useState, useEffect, useCallback } from 'react';
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

function VenueManagement() {
  const { currentUser } = useAuth();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVenues = useCallback(async () => {
    if (!currentUser) return;
    
    const venuesRef = collection(db, 'venues');
    const q = query(venuesRef, where('ownerId', '==', currentUser.uid));
    const snapshot = await getDocs(q);
    
    const venueData = [];
    snapshot.forEach((doc) => {
      venueData.push({ id: doc.id, ...doc.data() });
    });
    
    setVenues(venueData);
    setLoading(false);
  }, [currentUser]);

  useEffect(() => {
    fetchVenues();
  }, [fetchVenues]);

  const handleStatusChange = async (venueId, newStatus) => {
    try {
      const venueRef = doc(db, 'venues', venueId);
      await updateDoc(venueRef, { status: newStatus });
      fetchVenues(); // Refresh the list
    } catch (error) {
      console.error('Error updating venue status:', error);
    }
  };

  const handleDelete = async (venueId) => {
    if (window.confirm('Are you sure you want to delete this venue?')) {
      try {
        await deleteDoc(doc(db, 'venues', venueId));
        setVenues(venues.filter(venue => venue.id !== venueId));
      } catch (error) {
        console.error('Error deleting venue:', error);
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8"><div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent"></div></div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Your Venues</h1>
          <Link
            to="/venue-owner/add-venue"
            className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-2 rounded-lg"
          >
            Add New Venue
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {venues.map((venue) => (
            <div key={venue.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img
                src={venue.media[0]}
                alt={venue.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{venue.name}</h2>
                <p className="text-gray-600 mb-4">{venue.shortAddress}</p>
                
                <div className="space-y-4">
                  <select
                    value={venue.status || 'active'}
                    onChange={(e) => handleStatusChange(venue.id, e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="active">Active</option>
                    <option value="maintenance">Under Maintenance</option>
                    <option value="inactive">Inactive</option>
                  </select>

                  <div className="flex space-x-2">
                    <Link
                      to={`/venue-owner/edit/${venue.id}`}
                      className="flex-1 text-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(venue.id)}
                      className="flex-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VenueManagement;
