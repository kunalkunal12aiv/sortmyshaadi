import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

function InvitationPage() {
  const { guestId } = useParams();
  const [guest, setGuest] = useState(null);
  const [customMessage, setCustomMessage] = useState('');

  useEffect(() => {
    loadGuest();
  }, []);

  const loadGuest = async () => {
    try {
      const guestRef = doc(db, 'guests', guestId);
      const guestDoc = await getDoc(guestRef);

      if (guestDoc.exists()) {
        setGuest(guestDoc.data());
        setCustomMessage(guestDoc.data().customMessage || '');
      }
    } catch (error) {
      console.error('Error loading guest:', error);
    }
  };

  const handleSave = async () => {
    try {
      const guestRef = doc(db, 'guests', guestId);
      await updateDoc(guestRef, { customMessage });
      alert('Invitation updated successfully!');
    } catch (error) {
      console.error('Error updating invitation:', error);
    }
  };

  if (!guest) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-4">Customize Invitation</h1>
      <p className="text-gray-600 mb-4">You have been invited by {guest.userId}</p>
      <textarea
        value={customMessage}
        onChange={(e) => setCustomMessage(e.target.value)}
        className="w-full max-w-lg p-4 border rounded-lg mb-4"
        placeholder="Add a custom message to your invitation..."
      />
      <button
        onClick={handleSave}
        className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
      >
        Save
      </button>
    </div>
  );
}

export default InvitationPage;
