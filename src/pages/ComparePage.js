import React from 'react';
import CompareVenues from '../components/budget_calculator/CompareVenues';
import { useCompare } from '../contexts/CompareContext';

function ComparePage() {
  const { comparedVenues } = useCompare();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Your Compare List</h1>
      {comparedVenues.length > 0 ? (
        <CompareVenues venues={comparedVenues} />
      ) : (
        <p>No venues added for comparison.</p>
      )}
    </div>
  );
}

export default ComparePage;
