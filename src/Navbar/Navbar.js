import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Components/UserContext';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const isLoggedIn = !!user.token;

  const handleNavigation = (path) => {
    navigate(path);
    setDropdownVisible(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser({ userId: '', token: '', role: '' });
    setDropdownVisible(false);
    navigate('/Home');
  };

  // Close dropdown on outside click (moved to a separate useEffect)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile-container')) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Optional: Log user context on component mount for debugging
  useEffect(() => {
    console.log('User Context in Navbar:', user);
  }, [user]);

  // Optional: Log dropdown visibility changes for debugging
  useEffect(() => {
    console.log('Dropdown Visibility:', dropdownVisible);
  }, [dropdownVisible]);

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