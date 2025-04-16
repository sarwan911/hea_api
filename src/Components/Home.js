import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">
        Welcome to <span className="home-title-highlight">Healthcare Appointment System</span>
      </h1>
      <p className="home-subtitle">Your health, simplified.</p>
      <div className="home-buttons">
        <Link to="/login" className="home-button primary">
          Login
        </Link>
        <Link to="/register" className="home-button secondary">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;