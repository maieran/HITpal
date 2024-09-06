import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div style={styles.container}>
      <h1>Welcome to HITPal</h1>
      <p>Your fitness journey starts here!</p>
      <div style={styles.buttonContainer}>
        <Link to="/login">
          <button style={styles.button}>Login</button>
        </Link>
        <Link to="/register">
          <button style={styles.button}>Register</button>
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: '20px',
    display: 'flex',
    gap: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default LandingPage;
