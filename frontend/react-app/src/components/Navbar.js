// components/Navbar.js
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Importiere die CSS-Datei

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Token aus dem localStorage entfernen
    localStorage.removeItem('token');

    // Benutzer zur Login-Seite umleiten
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <ul className="navbar-left">
        <li><Link to="/">Home</Link></li>
      </ul>
      <ul className="navbar-right">
        <li><Link to="/profile">Profile</Link></li>
        <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;
