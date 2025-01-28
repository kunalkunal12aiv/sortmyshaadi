import React, { useState, useEffect } from 'react';
import { doc, updateDoc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

function AddPreviousWeddings() {
  const [venues, setVenues] = useState([]);
  const [selectedVenueId, setSelectedVenueId] = useState('');
  const [weddingData, setWeddingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [newWedding, setNewWedding] = useState({
    title: '',
    date: '',
    videoUrl: '',
    images: [''],
    description: ''
  });

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const venuesRef = collection(db, 'venues');
        const snapshot = await getDocs(venuesRef);
        const venueList = [];
        snapshot.forEach((doc) => {
          venueList.push({ id: doc.id, name: doc.data().name });
        });
        setVenues(venueList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching venues:', error);
        setNotification({ type: 'error', message: 'Failed to load venues' });
      }
    };
    fetchVenues();
  }, []);

  // Fetch existing weddings when venue is selected
  useEffect(() => {
    const fetchVenueData = async () => {
      if (!selectedVenueId) return;
      
      try {
        const venueDoc = await getDoc(doc(db, 'venues', selectedVenueId));
        if (venueDoc.exists()) {
          setWeddingData(venueDoc.data().previousWeddings || []);
        }
      } catch (error) {
        console.error('Error fetching venue data:', error);
        setNotification({ type: 'error', message: 'Failed to load venue data' });
      }
    };

    if (selectedVenueId) {
      fetchVenueData();
    }
  }, [selectedVenueId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedVenueId) {
      setNotification({ type: 'error', message: 'Please select a venue' });
      return;
    }

    try {
      const venueRef = doc(db, 'venues', selectedVenueId);
      await updateDoc(venueRef, {
        previousWeddings: [...weddingData, newWedding]
      });

      setNotification({ type: 'success', message: 'Wedding added successfully!' });
      setNewWedding({
        title: '',
        date: '',
        videoUrl: '',
        images: [''],
        description: ''
      });

      // Refresh wedding data
      const updatedDoc = await getDoc(venueRef);
      setWeddingData(updatedDoc.data().previousWeddings || []);
    } catch (error) {
      console.error('Error adding wedding:', error);
      setNotification({ type: 'error', message: 'Failed to add wedding' });
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent"></div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Add Previous Wedding</h1>

        {notification && (
          <div className={`mb-4 p-4 rounded-lg ${
            notification.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {notification.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Venue *
            </label>
            <select
              value={selectedVenueId}
              onChange={(e) => setSelectedVenueId(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border"
              required
            >
              <option value="">Select a venue</option>
              {venues.map((venue) => (
                <option key={venue.id} value={venue.id}>
                  {venue.name}
                </option>
              ))}
            </select>
          </div>

          {selectedVenueId && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Wedding Title
                </label>
                <input
                  type="text"
                  value={newWedding.title}
                  onChange={(e) => setNewWedding({...newWedding, title: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Wedding Date
                </label>
                <input
                  type="date"
                  value={newWedding.date}
                  onChange={(e) => setNewWedding({...newWedding, date: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video URL
                </label>
                <input
                  type="text"
                  value={newWedding.videoUrl}
                  onChange={(e) => setNewWedding({...newWedding, videoUrl: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Images (One URL per line)
                </label>
                <textarea
                  value={newWedding.images.join('\n')}
                  onChange={(e) => setNewWedding({
                    ...newWedding, 
                    images: e.target.value.split('\n').filter(url => url.trim())
                  })}
                  rows={5}
                  className="w-full px-4 py-2 rounded-lg border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newWedding.description}
                  onChange={(e) => setNewWedding({...newWedding, description: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={!selectedVenueId}
            className={`w-full py-3 rounded-lg ${
              selectedVenueId 
                ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:from-pink-700 hover:to-purple-700' 
                : 'bg-gray-300 cursor-not-allowed'
            } transition-all duration-200`}
          >
            Add Wedding
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPreviousWeddings;
