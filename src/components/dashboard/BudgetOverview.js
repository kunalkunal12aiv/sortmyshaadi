import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { FiDollarSign } from 'react-icons/fi';

function BudgetOverview() {
  const [budget, setBudget] = useState({
    total: 0,
    spent: 0,
    categories: []
  });
  const { currentUser } = useAuth();

  useEffect(() => {
    loadBudget();
  }, [currentUser]);

  const loadBudget = async () => {
    try {
      const budgetQuery = query(
        collection(db, 'budgets'),
        where('userId', '==', currentUser.uid)
      );
      const snapshot = await getDocs(budgetQuery);
      
      if (!snapshot.empty) {
        const budgetData = snapshot.docs[0].data();
        setBudget({
          total: budgetData.totalBudget,
          spent: budgetData.totalSpent,
          categories: budgetData.categories || []
        });
      }
    } catch (error) {
      console.error('Error loading budget:', error);
    }
  };

  const getProgressColor = (percentage) => {
    if (percentage > 90) return 'bg-red-500';
    if (percentage > 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

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
            <span className="font-semibold">₹{budget.total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Spent</span>
            <span className="font-semibold text-pink-600">₹{budget.spent.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Remaining</span>
            <span className="font-semibold text-green-600">
              ₹{(budget.total - budget.spent).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className={`h-full rounded-full ${getProgressColor((budget.spent / budget.total) * 100)}`}
            style={{ width: `${(budget.spent / budget.total) * 100}%` }}
          />
        </div>

        <div className="space-y-4">
          {budget.categories.map((category, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">{category.name}</span>
                <span className="text-sm font-medium">
                  ₹{category.spent.toLocaleString()} / ₹{category.allocated.toLocaleString()}
                </span>
              </div>
              <div className="h-1.5 bg-gray-200 rounded-full">
                <div
                  className={`h-full rounded-full ${getProgressColor((category.spent / category.allocated) * 100)}`}
                  style={{ width: `${(category.spent / category.allocated) * 100}%` }}
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
