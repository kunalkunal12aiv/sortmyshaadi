import React, { useState, useEffect } from 'react';
import Calendar from '../components/calendar/calendar';
import { collection, addDoc, onSnapshot, Timestamp, deleteDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { format, isValid } from 'date-fns';

function CalendarManager() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const eventsRef = collection(db, 'events');
    const unsubscribe = onSnapshot(eventsRef, (snapshot) => {
      const updatedEvents = snapshot.docs.map(doc => {
        const data = doc.data();
        try {
          return {
            id: doc.id,
            ...data,
            date: data.date?.toDate() || new Date(data.date)
          };
        } catch (error) {
          console.error('Error parsing date for event:', doc.id);
          return null;
        }
      }).filter(Boolean); // Remove any null events
      
      setEvents(updatedEvents);
    });

    return () => unsubscribe();
  }, []);

  const handleDateSelect = async (date, type, title) => {
    if (!isValid(date)) {
      console.error("Invalid date provided");
      return;
    }

    try {
      const eventsRef = collection(db, 'events');
      // Create a new date at noon to avoid timezone issues
      const normalizedDate = new Date(date);
      normalizedDate.setHours(12, 0, 0, 0);

      const dateStr = format(normalizedDate, 'yyyy-MM-dd');
      const existingEvents = events.filter(event => {
        try {
          return format(event.date, 'yyyy-MM-dd') === dateStr;
        } catch (error) {
          console.error('Error comparing dates:', error);
          return false;
        }
      });

      if (!existingEvents.some(e => e.type === type)) {
        await addDoc(eventsRef, {
          date: Timestamp.fromDate(normalizedDate),
          type: type || 'Peak Demand',
          title: title || '',
          createdAt: Timestamp.now()
        });
      }
    } catch (error) {
      console.error("Error adding event: ", error);
    }
  };

  const handleResetDate = async (date) => {
    try {
      const eventsRef = collection(db, 'events');
      const dateStart = new Date(date);
      dateStart.setHours(0, 0, 0, 0);
      const dateEnd = new Date(date);
      dateEnd.setHours(23, 59, 59, 999);

      const q = query(
        eventsRef, 
        where('date', '>=', Timestamp.fromDate(dateStart)),
        where('date', '<=', Timestamp.fromDate(dateEnd))
      );

      const querySnapshot = await getDocs(q);
      
      const deletePromises = querySnapshot.docs.map(doc => 
        deleteDoc(doc.ref)
      );
      
      await Promise.all(deletePromises);
    } catch (error) {
      console.error("Error resetting date: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Calendar Manager</h1>
            <Calendar 
              onDateSelect={handleDateSelect}
              onResetDate={handleResetDate}
              events={events}
              isManager={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarManager;