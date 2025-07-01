import React from 'react';
import { useAuth } from '../context/AuthContext';
import { AdminRole } from '../data/admins';

interface CanProps {
  requiredRole: AdminRole;
  children: React.ReactNode;
}

const Can: React.FC<CanProps> = ({ requiredRole, children }) => {
  const { hasPermission } = useAuth();

  if (hasPermission(requiredRole)) {
    return <>{children}</>;
  }

  return null;
};

export default Can; 