import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Consultations = () => {
  const [consultations, setConsultations] = useState([]);

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    try {
      const response = await axios.get('https://localhost:7272/api/Consultations');
      setConsultations(response.data);
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
