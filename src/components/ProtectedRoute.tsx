import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // If not logged in, redirect to the login page
    return <Navigate to="/admin/login" />;
  }

  // If logged in, render the child routes
  return <Outlet />;
};

export default ProtectedRoute; 