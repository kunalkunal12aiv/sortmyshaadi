import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { FiDollarSign } from 'react-icons/fi';

function BudgetOverview() {
  const [budgetItems, setBudgetItems] = useState([]);
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

  const getProgressColor = (percentage) => {
    if (percentage > 90) return 'bg-red-500';
    if (percentage > 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const totalExpenses = budgetItems.reduce((sum, item) => sum + item.amount, 0);
  const remainingBudget = totalBudget - totalExpenses;
  const budgetUsagePercentage = (totalExpenses / totalBudget) * 100 || 0;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Budget Overview</h2>
        <FiDollarSign className="text-gray-400" />
      </div>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Total Budget</span>
            <span className="font-semibold">₹{totalBudget.toLocaleString()}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Total Expenses</span>
            <span className="font-semibold text-pink-600">₹{totalExpenses.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Remaining</span>
            <span className="font-semibold text-green-600">
              ₹{remainingBudget.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className={`h-full rounded-full ${getProgressColor(budgetUsagePercentage)}`}
            style={{ width: `${Math.min(budgetUsagePercentage, 100)}%` }}
          />
        </div>

        <div className="space-y-4">
          {budgetItems.map((item) => (
            <div key={item.id}>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">{item.name}</span>
                <span className="text-sm font-medium">
                  ₹{item.amount.toLocaleString()}
                </span>
              </div>
              <div className="h-1.5 bg-gray-200 rounded-full">
                <div
                  className={`h-full rounded-full ${getProgressColor((item.amount / totalBudget) * 100)}`}
                  style={{ width: `${(item.amount / totalBudget) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BudgetOverview;