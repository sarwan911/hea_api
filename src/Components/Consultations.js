import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { UserContext, UserProvider } from './UserContext';
import './Consultation.css';

const Consultations = () => {
  const [consultations, setConsultations] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user && user.userId) { // Ensure user and userId exist before fetching
      fetchConsultations();
    }
  }, [user]); 

  const fetchConsultations = async () => {
    try {
      let endpoint = '';
      if (user.role === 'Doctor') {
        endpoint = `https://localhost:7272/api/Consultations/doctor/${user.userId}`;
      } else if (user.role === 'Patient') {
        endpoint = `https://localhost:7272/api/Consultations/patient/${user.userId}`;
      }
  
      if (endpoint) {
        const response = await axios.get(endpoint);
        setConsultations(response.data);
      } else {
        console.error('Invalid user role. Cannot fetch consultations.');
      }
    } catch (error) {
      console.error('Error fetching consultations:', error);
    }
  };

  return (
    <div className="consultation-container">
      <h2>Consultations</h2>
      <ul className="consultation-list">
        {consultations.map((consultation) => (
          <li key={consultation.consultationId} className="consultation-item">
            <span>Appointment ID: {consultation.appointmentId}</span>
            <span>Doctor ID: {consultation.doctorId}</span>
            <span>Notes: {consultation.notes}</span>
            <span>Prescription: {consultation.prescription}</span>
            <span>Date: {consultation.consultationDate}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Consultations;
