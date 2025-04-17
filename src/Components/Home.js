import React from 'react';

import { Link } from 'react-router-dom';

import './Home.css';

const Home = () => {

  // Check if the user is logged in (based on token in localStorage)

  const token = localStorage.getItem('token');

  return (
<div className="home-container">
<h1 className="home-title">

        Welcome to <span className="home-title-highlight">Healthcare Appointment System</span>
</h1>
<p className="home-subtitle">Your health, simplified.</p>

      {/* Show buttons only if not logged in */}

      {!token && (
<div className="home-buttons">
<Link to="/login" className="home-button primary">

            Login
</Link>
<Link to="/register" className="home-button secondary">

            Register
</Link>
</div>

      )}
</div>

  );

};

export default Home; 