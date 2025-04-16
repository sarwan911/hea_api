import React, { useState } from 'react';
// import { Link } from 'react-router-dom'; //  Used for navigation
import Appointment from '../Components/Appointment'; // Adjust the path if necessary
import Sessions from '../Components/Sessions';     // Adjust the path if necessary
import ViewNotifications from '../Components/ViewNotifications'; // Adjust the path if necessary
import ProfilePage from '../Components/ProfilePage';
import Consultations from '../Components/Consultations';
import './patientdashboard.css'; // Import the CSS file

const PatientDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('Sessions'); // Default to Sessions

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Sessions':
        return <Sessions />;
      case 'Appointment':
        return <Appointment />;
      case 'Consultations':
        return <Consultations />;
      case 'ViewNotifications':
        return <ViewNotifications />;
      case 'ProfilePage':
        return <ProfilePage/>;
      default:
        return <Sessions />; // Default to Sessions if an invalid state occurs
    }
  };

  return (
    <div className="patient-dashboard-container">
      <nav className="patient-dashboard-nav">
        <button
          className={activeComponent === 'Sessions' ? 'active' : ''}
          onClick={() => setActiveComponent('Sessions')}
        >
          Sessions
        </button>
        <button
          className={activeComponent === 'Appointment' ? 'active' : ''}
          onClick={() => setActiveComponent('Appointment')}
        >
          Appointment
        </button>
        <button
          className={activeComponent === 'Consultations' ? 'active' : ''}
          onClick={() => setActiveComponent('Consultations')}
        >
          Consultations
        </button>
        <button
          className={activeComponent === 'ViewNotifications' ? 'active' : ''}
          onClick={() => setActiveComponent('ViewNotifications')}
        >
          View Notifications
        </button>
        <button
          className={activeComponent === 'ProfilePage' ? 'active' : ''}
          onClick={() => setActiveComponent('ProfilePage')}
        >
          Profile Page
        </button>
      </nav>

      <div className="patient-dashboard-content">
        {renderComponent()}
      </div>
    </div>
  );
};

export default PatientDashboard;
