import React, { useEffect, useState, useCallback } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';

function GuestStats() {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    totalGuests: 0,
    confirmedGuests: 0,
  });

  const loadStats = useCallback(async () => {
    try {
      const guestsQuery = query(
        collection(db, 'guests'),
        where('userId', '==', currentUser.uid)
      );
      const guestsSnap = await getDocs(guestsQuery);
      const guestsList = guestsSnap.docs.map(doc => doc.data());

      setStats({
        totalGuests: guestsList.length,
        confirmedGuests: guestsList.filter(g => g.status === 'confirmed').length,
      });
    } catch (error) {
      console.error('Error loading guest stats:', error);
    }
  }, [currentUser]);

  useEffect(() => {
    loadStats();
  }, [currentUser, loadStats]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Guest Statistics</h2>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-gray-600">Total Guests</p>
          <p className="text-2xl font-bold text-gray-900">{stats.totalGuests}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Confirmed Guests</p>
          <p className="text-2xl font-bold text-green-600">{stats.confirmedGuests}</p>
        </div>
      </div>
    </div>
  );
}

export default GuestStats;
