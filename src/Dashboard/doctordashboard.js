import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import HandlingSessions from '../Components/HandlingSessions';
import Consultations from '../Components/Consultations';
import ProfilePage from '../Components/ProfilePage';
import Consultation from '../Components/Consultation';
import NotificationComponent from '../Components/Notification';
import './doctordashboard.css';
import ViewNotifications from '../Components/ViewNotifications';

const DoctorDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('HandlingSessions');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'HandlingSessions':
        return <HandlingSessions />;
      case 'Consultation':
        return <Consultation />; 
      // case 'Consultations':
      //   return <Consultations />;
      case 'Notification':
      return <ViewNotifications /> ;
      case 'ProfilePage':
        return <ProfilePage/>;
      default:
        return <HandlingSessions />;
    }
  };

  return (
    <div className="doctor-dashboard-container">
      <nav className="doctor-dashboard-nav">
        <button
          className={activeComponent === 'HandlingSessions' ? 'active' : ''}
          onClick={() => setActiveComponent('HandlingSessions')}
        >
          Handling Sessions
        </button>
        <button
          className={activeComponent === 'Consultation' ? 'active' : ''}
          onClick={() => setActiveComponent('Consultation')}
          >
            Consultations
          </button>
        {/* <button
          className={activeComponent === 'Consultations' ? 'active' : ''}
          onClick={() => setActiveComponent('Consultations')}
        >
          Consultations
        </button> */}
        <button
          className={activeComponent === 'Notification' ? 'active' : ''}
          onClick={() => setActiveComponent('Notification')}
        >
          Notification
        </button>        
        <button
          className={activeComponent === 'ProfilePage' ? 'active' : ''}
          onClick={() => setActiveComponent('ProfilePage')}
        >
          Profile Page
        </button>
      </nav>

      <div className="doctor-dashboard-content">
        {renderComponent()}
      </div>
    </div>
  );
};

export default DoctorDashboard;
