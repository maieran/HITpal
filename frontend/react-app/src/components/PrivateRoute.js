// src/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Token aus dem localStorage abrufen

  return token ? children : <Navigate to="/login" />; // Wenn Token vorhanden, zeige die Seite, sonst leite weiter
};

export default PrivateRoute;
