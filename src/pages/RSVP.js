import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

function RSVP() {
  const { guestId } = useParams();
  const [guest, setGuest] = useState(null);
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    loadGuest();
  }, []);

  const loadGuest = async () => {
    try {
      const guestRef = doc(db, 'guests', guestId);
      const guestDoc = await getDoc(guestRef);

      if (guestDoc.exists()) {
        setGuest(guestDoc.data());
        setStatus(guestDoc.data().status);
      }
    } catch (error) {
      console.error('Error loading guest:', error);
    }
  };

  const handleRSVP = async (newStatus) => {
    try {
      const guestRef = doc(db, 'guests', guestId);
      await updateDoc(guestRef, { status: newStatus });
      setStatus(newStatus);
    } catch (error) {
      console.error('Error updating RSVP:', error);
    }
  };

  if (!guest) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-4">RSVP</h1>
      <p className="text-gray-600 mb-4">You have been invited by {guest.userId}</p>
      <div className="flex space-x-4">
        <button
          onClick={() => handleRSVP('confirmed')}
          className={`px-4 py-2 rounded-lg ${status === 'confirmed' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}
        >
          Confirm
        </button>
        <button
          onClick={() => handleRSVP('declined')}
          className={`px-4 py-2 rounded-lg ${status === 'declined' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'}`}
        >
          Decline
        </button>
      </div>
    </div>
  );
}

export default RSVP;
