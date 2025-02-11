import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

function Timeline() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ name: '', date: '' });
  const { currentUser } = useAuth();

  useEffect(() => {
    loadEvents();
  }, [currentUser]);

  const loadEvents = async () => {
    try {
      const eventsRef = collection(db, 'timeline');
      const q = query(eventsRef, where('userId', '==', currentUser.uid));
      const snapshot = await getDocs(q);
      
      const eventList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setEvents(eventList);
    } catch (error) {
      console.error('Error loading events:', error);
    }
  };

  const addEvent = async () => {
    try {
      const eventsRef = collection(db, 'timeline');
      await addDoc(eventsRef, {
        ...newEvent,
        userId: currentUser.uid,
        createdAt: new Date()
      });
      setNewEvent({ name: '', date: '' });
      await loadEvents();
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      await deleteDoc(doc(db, 'timeline', eventId));
      await loadEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Timeline</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Event</h2>
        <div className="flex gap-4">
          <input
            type="text"
            value={newEvent.name}
            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
            placeholder="Event Name"
            className="flex-1 rounded-lg border-gray-300 focus:ring-pink-500 focus:border-pink-500"
          />
          <input
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            className="flex-1 rounded-lg border-gray-300 focus:ring-pink-500 focus:border-pink-500"
          />
          <button
            onClick={addEvent}
            className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
          >
            <FiPlus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Events</h2>
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event.id} className="flex justify-between items-center">
              <span>{event.name}</span>
              <span>{new Date(event.date).toLocaleDateString()}</span>
              <button
                onClick={() => deleteEvent(event.id)}
                className="text-red-600 hover:text-red-800"
              >
                <FiTrash2 className="w-5 h-5" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Timeline;
