import React, { useState } from 'react';
import { calculateBudgetAllocation } from '../../utils/budgetcalculations';

function BudgetResults({ calculations, onUpdate }) {
  const [distribution, setDistribution] = useState({
    single: 30,
    double: 40,
    triple: 30
  });

  const handleDistributionChange = (type, value) => {
    const newValue = Number(value);
    const otherTypes = Object.keys(distribution).filter(t => t !== type);
    const remaining = 100 - newValue;
    
    const newDistribution = {
      ...distribution,
      [type]: newValue,
      [otherTypes[0]]: Math.round(remaining / 2),
      [otherTypes[1]]: Math.round(remaining / 2)
    };

    setDistribution(newDistribution);
    onUpdate(calculateBudgetAllocation({
      ...calculations,
      roomDistribution: newDistribution
    }));
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Room Distribution</h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Single Rooms: {distribution.single}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={distribution.single}
            onChange={(e) => handleDistributionChange('single', e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Double Rooms: {distribution.double}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={distribution.double}
            onChange={(e) => handleDistributionChange('double', e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Triple Rooms: {distribution.triple}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={distribution.triple}
            onChange={(e) => handleDistributionChange('triple', e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="border-t pt-4">
          <h4 className="font-semibold text-gray-700">Room Allocation</h4>
          <p>Single Rooms: {calculations.roomCounts.single} (₹3,000 per night)</p>
          <p>Double Rooms: {calculations.roomCounts.double} (₹5,000 per night)</p>
          <p>Triple Rooms: {calculations.roomCounts.triple} (₹7,000 per night)</p>
          
          <p className="text-lg font-bold mt-4">
            Total Stay Cost: ₹{calculations.totalStayCost.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BudgetResults;
