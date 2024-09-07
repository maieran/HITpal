import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css'; // CSS-Datei für Styling

const LandingPage = () => {
  const [isLoginFlipped, setIsLoginFlipped] = useState(false);
  const [isRegisterFlipped, setIsRegisterFlipped] = useState(false);

  const handleLoginFlip = () => {
    setIsLoginFlipped(!isLoginFlipped);
  };

  const handleRegisterFlip = () => {
    setIsRegisterFlipped(!isRegisterFlipped);
  };

  return (
    <div className="container">
      <h1>Welcome to HITPal</h1>
      <p>Your fitness journey starts here!</p>
      <div className="button-container">
        <div className={`flip-box ${isLoginFlipped ? 'flipped' : ''}`} onClick={handleLoginFlip}>
          <div className="flip-box-inner">
            <div className="flip-box-front">
              <h2>Login</h2>
            </div>
            <div className="flip-box-back">
              <h2>Login</h2>
              <Link to="/login">
                <button className="login-btn">Go to Login</button>
              </Link>
            </div>
          </div>
        </div>
        <div className={`flip-box ${isRegisterFlipped ? 'flipped' : ''}`} onClick={handleRegisterFlip}>
          <div className="flip-box-inner">
            <div className="flip-box-front">
              <h2>Register</h2>
            </div>
            <div className="flip-box-back">
              <h2>Register</h2>
              <Link to="/register">
                <button className="register-btn">Go to Register</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
