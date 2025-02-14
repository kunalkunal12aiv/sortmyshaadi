import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../../firebase';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { FiClock, FiCheckCircle, FiPlusCircle, FiUser, FiDollarSign } from 'react-icons/fi';

function RecentActivity() {
  const [activities, setActivities] = useState([]);
  const { currentUser } = useAuth();

  const loadActivities = useCallback(async () => {
    if (!currentUser) return;
    try {
      const activitiesRef = collection(db, 'activities');
      const q = query(
        activitiesRef,
        where('userId', '==', currentUser.uid),
        orderBy('timestamp', 'desc'),
        limit(5)
      );
      const snapshot = await getDocs(q);
      setActivities(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Error loading activities:', error);
    }
  }, [currentUser]);

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  if (!currentUser) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 text-center">
        <p className="text-gray-500">Please sign in to view recent activity.</p>
      </div>
    );
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case 'task':
        return <FiCheckCircle className="text-green-500" />;
      case 'guest':
        return <FiUser className="text-blue-500" />;
      case 'vendor':
        return <FiPlusCircle className="text-purple-500" />;
      case 'budget':
        return <FiDollarSign className="text-pink-500" />;
      default:
        return <FiClock className="text-gray-500" />;
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
      Math.ceil((date - new Date()) / (1000 * 60 * 60 * 24)),
      'day'
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
        <FiClock className="text-gray-400" />
      </div>
      <div className="space-y-4">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="mt-1">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <p className="text-gray-900">{activity.description}</p>
                <p className="text-sm text-gray-500">{formatTimestamp(activity.timestamp)}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">No recent activity</p>
        )}
      </div>
    </div>
  );
}

export default RecentActivity;
