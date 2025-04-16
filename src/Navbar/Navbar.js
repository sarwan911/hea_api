import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import './Navbar.css';

function Navbar() {

  const navigate = useNavigate();

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status from localStorage

  useEffect(() => {

    const token = localStorage.getItem('token');

    setIsLoggedIn(!!token);

  }, []);

  const handleNavigation = (path) => {

    navigate(path);

    setDropdownVisible(false);

  };

  const handleLogout = () => {

    localStorage.clear();

    setIsLoggedIn(false);

    setDropdownVisible(false);

    navigate('/Home');

  };

  // Close dropdown on outside click

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (!event.target.closest('.profile-container')) {

        setDropdownVisible(false);

      }

    };

    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);

  }, []);

  return (
<nav className="navbar">
<div className="navbar-container">
<div onClick={() => handleNavigation('/')} className="navbar-logo">

          Healthcare Appointment System
</div>
<ul className="nav-menu">
<li className="nav-item">
<div onClick={() => handleNavigation('/')} className="nav-links">Home</div>
</li>
<li className="nav-item">
<div onClick={() => handleNavigation('/doctors')} className="nav-links">Doctors</div>
</li>
<li className="nav-item">
<div onClick={() => handleNavigation('/sessions')} className="nav-links">Sessions</div>
</li>
<li className="nav-item">
<div onClick={() => handleNavigation('/about')} className="nav-links">About Us</div>
</li>
<li className="nav-item">
<div onClick={() => handleNavigation('/contact')} className="nav-links">Contact Us</div>
</li>
</ul>

        {/* Conditionally render profile only if logged in */}

        {isLoggedIn && (
<div className="profile-container">
<img

              src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png"

              alt="Profile"

              className="profile-icon"

              onClick={() => setDropdownVisible(!dropdownVisible)}

            />

            {dropdownVisible && (
<div className="profile-dropdown">
<div onClick={() => handleNavigation('/profile')}>My Profile</div>
<div onClick={handleLogout}>Logout</div>
</div>

            )}
</div>

        )}
</div>
</nav>

  );

}

export default Navbar; 