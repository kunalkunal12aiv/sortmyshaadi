import React from 'react';
import { Navigate } from 'react-router-dom';
import { useVenueOwner } from '../contexts/VenueOwnerContext';

function VenueOwnerRoute({ children }) {
  const { isVenueOwner, loading } = useVenueOwner();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isVenueOwner) {
    return <Navigate to="/venue-owner/auth" />;
  }

  return children;
}

export default VenueOwnerRoute;
