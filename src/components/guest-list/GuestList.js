import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';
import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import GuestForm from './GuestForm';
import GuestTable from './GuestTable';
import GuestStats from './GuestStats';

function GuestList() {
  const [guests, setGuests] = useState([]);
  const [isAddingGuest, setIsAddingGuest] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    loadGuests();
  }, [currentUser]);

  const loadGuests = async () => {
    try {
      const guestsRef = collection(db, 'guests');
      const q = query(guestsRef, where('userId', '==', currentUser.uid));
      const snapshot = await getDocs(q);
      
      const guestList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setGuests(guestList);
    } catch (error) {
      console.error('Error loading guests:', error);
    }
  };

  const addGuest = async (guestData) => {
    try {
      const guestsRef = collection(db, 'guests');
      const docRef = await addDoc(guestsRef, {
        ...guestData,
        userId: currentUser.uid,
        createdAt: new Date()
      });
      setGuests(prevGuests => [...prevGuests, { id: docRef.id, ...guestData }]);
      setIsAddingGuest(false);
    } catch (error) {
      console.error('Error adding guest:', error);
    }
  };

  const deleteGuest = async (guestId) => {
    try {
      await deleteDoc(doc(db, 'guests', guestId));
      setGuests(prevGuests => prevGuests.filter(guest => guest.id !== guestId));
    } catch (error) {
      console.error('Error deleting guest:', error);
    }
  };

  const updateGuest = async (guestId, updates) => {
    try {
      if (!guestId || !updates) {
        throw new Error('Invalid data for updating guest');
      }
      await updateDoc(doc(db, 'guests', guestId), updates);
      setGuests(prevGuests => prevGuests.map(guest => guest.id === guestId ? { ...guest, ...updates } : guest));
    } catch (error) {
      console.error('Error updating guest:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Guest List</h1>
        <button
          onClick={() => setIsAddingGuest(true)}
          className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
        >
          Add Guest
        </button>
      </div>

      <GuestStats guests={guests} />

      {isAddingGuest && (
        <GuestForm 
          onSubmit={addGuest}
          onCancel={() => setIsAddingGuest(false)}
        />
      )}

      <GuestTable 
        guests={guests}
        onDelete={deleteGuest}
        onUpdate={updateGuest}
      />
    </div>
  );
}

export default GuestList;
