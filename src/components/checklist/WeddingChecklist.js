import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { FiCheck, FiPlus } from 'react-icons/fi';

const defaultCategories = [
  {
    name: "Venue & Catering",
    tasks: [
      "Book wedding venue",
      "Book reception venue",
      "Select menu options",
      "Plan cake design and tasting",
      "Arrange catering staff"
    ]
  },
  {
    name: "Attire & Accessories",
    tasks: [
      "Choose wedding dress",
      "Select groom's outfit",
      "Book makeup artist",
      "Schedule hair trials",
      "Purchase wedding rings"
    ]
  },
  {
    name: "Vendors",
    tasks: [
      "Book photographer",
      "Book videographer",
      "Hire DJ/Band",
      "Book florist",
      "Arrange transportation"
    ]
  }
];

function WeddingChecklist() {
  const [categories, setCategories] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { currentUser } = useAuth();

  const createDefaultChecklist = useCallback(async () => {
    try {
      const checklistRef = collection(db, 'checklists');
      await addDoc(checklistRef, {
        userId: currentUser.uid,
        categories: defaultCategories,
        createdAt: new Date()
      });
      return defaultCategories;
    } catch (error) {
      console.error('Error creating default checklist:', error);
      return [];
    }
  }, [currentUser]);

  const loadChecklist = useCallback(async () => {
    try {
      const checklistRef = collection(db, 'checklists');
      const q = query(checklistRef, where('userId', '==', currentUser.uid));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        const defaultList = await createDefaultChecklist();
        setCategories(defaultList);
      } else {
        const userChecklist = snapshot.docs[0].data().categories;
        setCategories(userChecklist);
      }
    } catch (error) {
      console.error('Error loading checklist:', error);
    }
  }, [currentUser, createDefaultChecklist]);

  useEffect(() => {
    loadChecklist();
  }, [currentUser, loadChecklist]);

  const updateChecklist = async (newCategories) => {
    try {
      const checklistRef = collection(db, 'checklists');
      const q = query(checklistRef, where('userId', '==', currentUser.uid));
      const snapshot = await getDocs(q);
      
      if (!snapshot.empty) {
        const docRef = doc(db, 'checklists', snapshot.docs[0].id);
        await updateDoc(docRef, { categories: newCategories });
      }
    } catch (error) {
      console.error('Error updating checklist:', error);
    }
  };

  const toggleTask = (categoryIndex, taskIndex) => {
    const newCategories = [...categories];
    const task = newCategories[categoryIndex].tasks[taskIndex];
    
    if (typeof task === 'string') {
      newCategories[categoryIndex].tasks[taskIndex] = {
        text: task,
        completed: true,
        completedAt: new Date()
      };
    } else {
      task.completed = !task.completed;
      task.completedAt = task.completed ? new Date() : null;
    }

    setCategories(newCategories);
    updateChecklist(newCategories);
  };

  const addTask = () => {
    if (!newTask || !selectedCategory) return;

    const newCategories = [...categories];
    const categoryIndex = newCategories.findIndex(c => c.name === selectedCategory);
    
    if (categoryIndex !== -1) {
      newCategories[categoryIndex].tasks.push({
        text: newTask,
        completed: false
      });
      
      setCategories(newCategories);
      updateChecklist(newCategories);
      setNewTask('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Wedding Checklist</h1>
        
        <div className="flex gap-4 mb-6">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="flex-1 rounded-lg border-gray-300 focus:ring-pink-500 focus:border-pink-500"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add new task..."
            className="flex-2 rounded-lg border-gray-300 focus:ring-pink-500 focus:border-pink-500"
          />
          <button
            onClick={addTask}
            className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
          >
            <FiPlus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {categories.map((category, categoryIndex) => (
          <div key={category.name} className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{category.name}</h2>
            <div className="space-y-3">
              {category.tasks.map((task, taskIndex) => (
                <div
                  key={taskIndex}
                  className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <button
                    onClick={() => toggleTask(categoryIndex, taskIndex)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                      ${typeof task === 'string' || !task.completed
                        ? 'border-gray-300 hover:border-pink-500'
                        : 'border-green-500 bg-green-500'}`}
                  >
                    {(typeof task !== 'string' && task.completed) && (
                      <FiCheck className="w-4 h-4 text-white" />
                    )}
                  </button>
                  <span className={`flex-1 ${typeof task !== 'string' && task.completed ? 'line-through text-gray-400' : ''}`}>
                    {typeof task === 'string' ? task : task.text}
                  </span>
                  {typeof task !== 'string' && task.completed && (
                    <span className="text-sm text-gray-400">
                      {new Date(task.completedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeddingChecklist;
