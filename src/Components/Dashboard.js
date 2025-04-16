import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Consultation from './Consultation';
import AddConsultation from './Addconsultation';
import EditConsultation from './EditConsultation';

const ConsultationsD = () => {
  const [consultations, setConsultations] = useState([]);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = () => {
    const token = localStorage.getItem('authToken');
    axios.get('https://localhost:7272/api/Consultations', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => setConsultations(response.data))
    .catch(error => console.error('Error fetching consultations:', error));
  };

  const handleAddConsultation = (newConsultation) => {
    const token = localStorage.getItem('authToken');
    axios.post('https://localhost:7272/api/Consultations', newConsultation, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => setConsultations([...consultations, response.data]))
    .catch(error => console.error('Error adding consultation:', error));
  };

  const handleUpdateConsultation = (id, updatedConsultation) => {
    const token = localStorage.getItem('authToken');
    axios.put(`https://localhost:7272/api/Consultations/${id}`, updatedConsultation, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setConsultations(consultations.map(consultation => (consultation.consultationId === id ? response.data : consultation)));
      setEditing(false);
      setSelectedConsultation(null);
    })
    .catch(error => console.error('Error updating consultation:', error));
  };

  const handleDeleteConsultation = (id) => {
    const token = localStorage.getItem('authToken');
    axios.delete(`https://localhost:7272/api/Consultations/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(() => {
      setConsultations(consultations.filter(consultation => consultation.consultationId !== id));
    })
    .catch(error => console.error('Error deleting consultation:', error));
  };

  return (
    <div>
      <h2>Consultations Dashboard</h2>
      {editing ? (
        <EditConsultation
          currentConsultation={selectedConsultation}
          onUpdate={handleUpdateConsultation}
        />
      ) : (
        <AddConsultation onAdd={handleAddConsultation} />
      )}
      <div>
        {consultations.map(consultation => (
          <Consultation
            key={consultation.consultationId}
            consultation={consultation}
            onEdit={() => {
              setSelectedConsultation(consultation);
              setEditing(true);
            }}
            onDelete={handleDeleteConsultation}
          />
        ))}
      </div>
    </div>
  );
};

export default ConsultationsD;
