import React, { type JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user,loading } = useAuth();
  if (loading) {
    return <div>Chargement de la session...</div>; // ⏳ Empêche redirection trop tôt
  }
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
