import React from 'react';
import Login from '../Login';

const ProtectedRoute = ({ children, isAuthenticated, onLogin, darkMode }) => {
  return isAuthenticated ? children : <Login onLogin={onLogin} darkMode={darkMode} />;
};

export default ProtectedRoute;