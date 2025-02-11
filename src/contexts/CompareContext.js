import React, { createContext, useContext, useState } from 'react';

const CompareContext = createContext();

export function CompareProvider({ children }) {
  const [comparedVenues, setComparedVenues] = useState([]);

  const addToCompare = (venue) => {
    if (!comparedVenues.some(v => v.id === venue.id)) {
      setComparedVenues(prev => [...prev, venue]);
    }
  };

  const removeFromCompare = (venueId) => {
    setComparedVenues(prev => prev.filter(v => v.id !== venueId));
  };

  const clearCompare = () => setComparedVenues([]);

  return (
    <CompareContext.Provider value={{ comparedVenues, addToCompare, removeFromCompare, clearCompare }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  return useContext(CompareContext);
}
