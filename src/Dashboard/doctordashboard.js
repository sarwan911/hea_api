import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import HandlingSessions from '../Components/HandlingSessions';
import Consultations from '../Components/Consultations';
import ProfilePage from '../Components/ProfilePage';
// import ConsultationsD from '../Components/Dashboard';
import './doctordashboard.css';

const DoctorDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('HandlingSessions');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'HandlingSessions':
        return <HandlingSessions />;
      // case 'New Consultations':
      //   return <ConsultationsD />; 
      case 'Consultations':
        return <Consultations />;
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
        {/* <button
          className={activeComponent === 'ConsultationsD' ? 'active' : ''}
          onClick={() => setActiveComponent('ConsultationD')}
          >
            New Consultations
          </button> */}
        <button
          className={activeComponent === 'Consultations' ? 'active' : ''}
          onClick={() => setActiveComponent('Consultations')}
        >
          Consultations
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
