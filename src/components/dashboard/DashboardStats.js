import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';

function DashboardStats() {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    totalGuests: 0,
    confirmedGuests: 0,
    completedTasks: 0,
    totalTasks: 0,
    totalVendors: 0,
    daysUntilWedding: 0
  });

  useEffect(() => {
    loadStats();
  }, [currentUser]);

  const loadStats = async () => {
    try {
      // Load guests stats
      const guestsQuery = query(
        collection(db, 'guests'),
        where('userId', '==', currentUser.uid)
      );
      const guestsSnap = await getDocs(guestsQuery);
      const guestsList = guestsSnap.docs.map(doc => doc.data());
      
      // Load tasks stats
      const tasksQuery = query(
        collection(db, 'checklists'),
        where('userId', '==', currentUser.uid)
      );
      const tasksSnap = await getDocs(tasksQuery);
      const tasksList = tasksSnap.docs[0]?.data()?.categories || [];
      
      // Load vendors stats
      const vendorsQuery = query(
        collection(db, 'vendors'),
        where('userId', '==', currentUser.uid)
      );
      const vendorsSnap = await getDocs(vendorsQuery);

      setStats({
        totalGuests: guestsList.length,
        confirmedGuests: guestsList.filter(g => g.status === 'confirmed').length,
        completedTasks: tasksList.reduce((acc, cat) => 
          acc + cat.tasks.filter(t => t.completed).length, 0),
        totalTasks: tasksList.reduce((acc, cat) => acc + cat.tasks.length, 0),
        totalVendors: vendorsSnap.size,
        daysUntilWedding: calculateDaysUntilWedding()
      });
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
    }
  };

  const calculateDaysUntilWedding = () => {
    // You would get this from user settings or preferences
    const weddingDate = new Date('2024-12-31'); // Example date
    const today = new Date();
    const diffTime = Math.abs(weddingDate - today);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Planning Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div>
          <p className="text-sm text-gray-600">Total Guests</p>
          <p className="text-2xl font-bold text-gray-900">{stats.totalGuests}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Confirmed</p>
          <p className="text-2xl font-bold text-green-600">{stats.confirmedGuests}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Tasks Done</p>
          <p className="text-2xl font-bold text-blue-600">
            {stats.completedTasks}/{stats.totalTasks}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Vendors</p>
          <p className="text-2xl font-bold text-purple-600">{stats.totalVendors}</p>
        </div>
        <div className="col-span-2">
          <p className="text-sm text-gray-600">Days Until Wedding</p>
          <p className="text-2xl font-bold text-pink-600">{stats.daysUntilWedding}</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardStats;
