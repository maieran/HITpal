// src/Profile.js
import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      fetch('http://localhost:3000/api/users/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Fehler beim Abrufen des Profils.');
        }
        return response.json();
      })
      .then(data => setUser(data))
      .catch(error => setError(error.message));
    } else {
      setError('Kein Token vorhanden, bitte einloggen.');
    }
  }, []);

  return (
    <div>
      <h1>Profil</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {user ? (
        <div>
          <p>ID: {user.id}</p>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Profil wird geladen...</p>
      )}
    </div>
  );
};

export default Profile;
