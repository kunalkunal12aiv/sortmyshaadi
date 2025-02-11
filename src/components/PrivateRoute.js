import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function AdminRoute({ children }) {
  const { currentUser, userRole, loading } = useAuth();
  
  console.log('Auth state:', { 
    isAuthenticated: !!currentUser, 
    userEmail: currentUser?.email,
    userRole: userRole,
    loading: loading
  });

  if (loading) return <div>Loading...</div>;
  if (!currentUser) return <Navigate to="/signin" />;
  if (userRole !== 'admin') return <Navigate to="/unauthorized" />; // Ensure only admin can access

  return children;
}

export default AdminRoute;
