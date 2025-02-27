import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs, addDoc, deleteDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

function Budget() {
  const [budgetItems, setBudgetItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', amount: 0 });
  const [totalBudget, setTotalBudget] = useState(0);
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

      // Load total budget
      const totalBudgetRef = doc(db, 'totalBudget', currentUser.uid);
      const totalBudgetDoc = await getDoc(totalBudgetRef);
      if (totalBudgetDoc.exists()) {
        setTotalBudget(totalBudgetDoc.data().amount || 0);
      }
    } catch (error) {
      console.error('Error loading budget items:', error);
    }
  }, [currentUser.uid]);

  useEffect(() => {
    loadBudgetItems();
  }, [loadBudgetItems]);

  const saveTotalBudget = async (amount) => {
    try {
      const totalBudgetRef = doc(db, 'totalBudget', currentUser.uid);
      await setDoc(totalBudgetRef, {
        amount: amount,
        userId: currentUser.uid,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error saving total budget:', error);
    }
  };

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

  const totalExpenses = budgetItems.reduce((sum, item) => sum + item.amount, 0);
  const remainingBudget = totalBudget - totalExpenses;
  const budgetUsagePercentage = (totalExpenses / totalBudget) * 100 || 0;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Budget Tracker</h1>
      
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Total Budget</h2>
        <div className="flex gap-4">
          <input
            type="number"
            value={totalBudget}
            onChange={(e) => {
              const value = parseFloat(e.target.value) || 0;
              setTotalBudget(value);
              saveTotalBudget(value);
            }}
            placeholder="Enter Total Budget"
            className="flex-1 rounded-lg border-gray-300 focus:ring-pink-500 focus:border-pink-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Budget Overview</h2>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="text-sm text-blue-600">Total Budget</p>
            <p className="text-2xl font-bold text-blue-800">₹{totalBudget.toLocaleString()}</p>
          </div>
          <div className="bg-red-100 p-4 rounded-lg">
            <p className="text-sm text-red-600">Total Expenses</p>
            <p className="text-2xl font-bold text-red-800">₹{totalExpenses.toLocaleString()}</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <p className="text-sm text-green-600">Remaining Budget</p>
            <p className="text-2xl font-bold text-green-800">₹{remainingBudget.toLocaleString()}</p>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${budgetUsagePercentage > 90 ? 'bg-red-600' : budgetUsagePercentage > 70 ? 'bg-yellow-400' : 'bg-green-600'}`}
            style={{ width: `${Math.min(budgetUsagePercentage, 100)}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">Budget Usage: {budgetUsagePercentage.toFixed(1)}%</p>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Expense</h2>
        <div className="flex gap-4">
          <input
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            placeholder="Expense Name"
            className="flex-1 rounded-lg border-gray-300 focus:ring-pink-500 focus:border-pink-500"
          />
          <input
            type="number"
            value={newItem.amount}
            onChange={(e) => setNewItem({ ...newItem, amount: parseFloat(e.target.value) || 0 })}
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
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Expense Items</h2>
        <ul className="space-y-4">
          {budgetItems.map((item) => (
            <li key={item.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg">
              <span className="font-medium">{item.name}</span>
              <div className="flex items-center gap-4">
                <span className="text-gray-700">₹{item.amount.toLocaleString()}</span>
                <button
                  onClick={() => deleteBudgetItem(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FiTrash2 className="w-5 h-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Budget;