import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';

function GuestBook() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    const loadEntries = async () => {
      try {
        const q = query(
          collection(db, 'guestbook'),
          where('websiteId', '==', currentUser.uid) // assuming websiteId matches couple uid
        );
        const snapshot = await getDocs(q);
        setEntries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error('Error loading guestbook entries:', error);
      }
    };
    loadEntries();
  }, [currentUser.uid]);

  const addEntry = async (e) => {
    e.preventDefault();
    if (!newEntry.trim()) return;
    try {
      await addDoc(collection(db, 'guestbook'), {
        websiteId: currentUser.uid,
        text: newEntry,
        createdAt: serverTimestamp()
      });
      setNewEntry('');
      // Optionally reload or push new entry into state
    } catch (error) {
      console.error('Error adding entry:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">RSVP & Guest Book</h1>
      <form onSubmit={addEntry} className="mb-6">
        <textarea
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          className="w-full border rounded p-2"
          placeholder="Leave your RSVP message..."
        />
        <button type="submit" className="mt-2 bg-pink-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
      <div>
        {entries.map(entry => (
          <div key={entry.id} className="border-b py-2">
            <p>{entry.text}</p>
            {/* Optionally show timestamp */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GuestBook;
