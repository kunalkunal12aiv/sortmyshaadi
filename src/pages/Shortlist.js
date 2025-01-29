import React, { useState } from 'react';
import { useShortlist } from '../contexts/ShortlistContext';
import { useAuth } from '../contexts/AuthContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'framer-motion';

function Shortlist() {
  const { shortlistedVenues, removeFromShortlist, clearShortlist } = useShortlist();
  const { currentUser, userDetails } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleBatchEnquiry = async () => {
    if (!currentUser || !userDetails?.phoneVerified) {
      navigate('/phone-verification');
      return;
    }

    setLoading(true);
    try {
      // Create batch enquiries
      const enquiries = shortlistedVenues.map(venue => ({
        userId: currentUser.uid,
        userName: currentUser.displayName,
        userEmail: currentUser.email,
        userPhone: userDetails.phoneNumber,
        venueId: venue.id,
        venueName: venue.name,
        createdAt: new Date()
      }));

      // Batch add all enquiries
      await Promise.all(
        enquiries.map(enquiry => addDoc(collection(db, 'enquiries'), enquiry))
      );

      setSuccess(true);
      clearShortlist();
    } catch (error) {
      console.error('Error submitting batch enquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  if (shortlistedVenues.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Your Shortlist</h1>
            <p className="text-gray-600">No venues shortlisted yet.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Shortlist</h1>
          <button
            onClick={handleBatchEnquiry}
            disabled={loading}
            className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-pink-700 hover:to-purple-700 disabled:opacity-50 transition-all duration-200"
          >
            {loading ? 'Sending...' : 'Enquire All'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shortlistedVenues.map((venue) => (
            <motion.div
              key={venue.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <img
                src={venue.media[0]}
                alt={venue.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{venue.name}</h3>
                <p className="text-gray-600 mb-4">{venue.shortAddress}</p>
                <div className="flex justify-between items-center">
                  <p className="text-pink-600 font-semibold">
                    ₹{venue.pricePerPlate}/plate
                  </p>
                  <button
                    onClick={() => removeFromShortlist(venue.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shortlist;
