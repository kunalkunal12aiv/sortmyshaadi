import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

function Budget() {
  const [budgetItems, setBudgetItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', amount: 0 });
  const { currentUser } = useAuth();

  const loadBudgetItems = useCallback(async () => {
    try {
      const budgetRef = collection(db, 'budget');
      const q = query(budgetRef, where('userId', '==', currentUser.uid));
      const snapshot = await getDocs(q);
      
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setBudgetItems(items);
    } catch (error) {
      console.error('Error loading budget items:', error);
    }
  }, [currentUser.uid]);

  useEffect(() => {
    loadBudgetItems();
  }, [loadBudgetItems]);

  const addBudgetItem = async () => {
    try {
      const budgetRef = collection(db, 'budget');
      await addDoc(budgetRef, {
        ...newItem,
        userId: currentUser.uid,
        createdAt: new Date()
      });
      setNewItem({ name: '', amount: 0 });
      await loadBudgetItems();
    } catch (error) {
      console.error('Error adding budget item:', error);
    }
  };

  const deleteBudgetItem = async (itemId) => {
    try {
      await deleteDoc(doc(db, 'budget', itemId));
      await loadBudgetItems();
    } catch (error) {
      console.error('Error deleting budget item:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Budget</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Item</h2>
        <div className="flex gap-4">
          <input
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            placeholder="Item Name"
            className="flex-1 rounded-lg border-gray-300 focus:ring-pink-500 focus:border-pink-500"
          />
          <input
            type="number"
            value={newItem.amount}
            onChange={(e) => setNewItem({ ...newItem, amount: parseFloat(e.target.value) })}
            placeholder="Amount"
            className="flex-1 rounded-lg border-gray-300 focus:ring-pink-500 focus:border-pink-500"
          />
          <button
            onClick={addBudgetItem}
            className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
          >
            <FiPlus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Budget Items</h2>
        <ul className="space-y-4">
          {budgetItems.map((item) => (
            <li key={item.id} className="flex justify-between items-center">
              <span>{item.name}</span>
              <span>₹{item.amount.toLocaleString()}</span>
              <button
                onClick={() => deleteBudgetItem(item.id)}
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

export default Budget;
