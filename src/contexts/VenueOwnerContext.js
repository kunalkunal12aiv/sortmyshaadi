import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from './AuthContext';

const VenueOwnerContext = createContext();

export function VenueOwnerProvider({ children }) {
  const { currentUser } = useAuth();
  const [ownerProfile, setOwnerProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVenueOwner, setIsVenueOwner] = useState(false);

  useEffect(() => {
    const fetchOwnerProfile = async () => {
      if (!currentUser) {
        setOwnerProfile(null);
        setIsVenueOwner(false);
        setLoading(false);
        return;
      }

      try {
        const ownerDoc = await getDoc(doc(db, 'venueOwners', currentUser.uid));
        if (ownerDoc.exists()) {
          setOwnerProfile(ownerDoc.data());
          setIsVenueOwner(true);
        } else {
          setOwnerProfile(null);
          setIsVenueOwner(false);
        }
      } catch (error) {
        console.error('Error fetching owner profile:', error);
      }
      setLoading(false);
    };

    fetchOwnerProfile();
  }, [currentUser]);

  const value = {
    ownerProfile,
    setOwnerProfile,
    isVenueOwner,
    loading
  };

  return (
    <VenueOwnerContext.Provider value={value}>
      {!loading && children}
    </VenueOwnerContext.Provider>
  );
}

export function useVenueOwner() {
  return useContext(VenueOwnerContext);
}
