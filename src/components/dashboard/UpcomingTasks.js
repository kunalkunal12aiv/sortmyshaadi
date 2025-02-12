import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { FiCheck, FiClock } from 'react-icons/fi';

function UpcomingTasks() {
  const [tasks, setTasks] = useState([]);
  const { currentUser } = useAuth();

  const loadTasks = useCallback(async () => {
    try {
      const tasksQuery = query(
        collection(db, 'checklists'),
        where('userId', '==', currentUser.uid)
      );
      const snapshot = await getDocs(tasksQuery);
      
      if (!snapshot.empty) {
        const categories = snapshot.docs[0].data().categories;
        const pendingTasks = categories.reduce((acc, category) => {
          const categoryTasks = category.tasks
            .filter(task => !task.completed)
            .map(task => ({
              ...task,
              category: category.name
            }));
          return [...acc, ...categoryTasks];
        }, []);
        
        setTasks(pendingTasks.slice(0, 5)); // Show only top 5 pending tasks
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  }, [currentUser]);

  useEffect(() => {
    loadTasks();
  }, [currentUser, loadTasks]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Upcoming Tasks</h2>
        <FiClock className="text-gray-400" />
      </div>
      
      <div className="space-y-4">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
              <FiCheck className="w-4 h-4 text-gray-300" />
            </div>
            <div className="flex-1">
              <p className="text-gray-900">{task.text}</p>
              <p className="text-sm text-gray-500">{task.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpcomingTasks;
