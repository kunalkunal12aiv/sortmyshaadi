import React, { createContext, useContext, useState } from 'react';

const ShortlistContext = createContext();

export function ShortlistProvider({ children }) {
  const [shortlistedVenues, setShortlistedVenues] = useState([]);

  const addToShortlist = (venue) => {
    setShortlistedVenues(prev => {
      if (!prev.find(v => v.id === venue.id)) {
        return [...prev, venue];
      }
      return prev;
    });
  };

  const removeFromShortlist = (venueId) => {
    setShortlistedVenues(prev => prev.filter(v => v.id !== venueId));
  };

  const clearShortlist = () => {
    setShortlistedVenues([]);
  };

  return (
    <ShortlistContext.Provider value={{
      shortlistedVenues,
      addToShortlist,
      removeFromShortlist,
      clearShortlist
    }}>
      {children}
    </ShortlistContext.Provider>
  );
}

export function useShortlist() {
  return useContext(ShortlistContext);
}
