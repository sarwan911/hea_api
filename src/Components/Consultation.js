import React from 'react';

const Consultation = ({ consultation, onEdit, onDelete }) => {
  return (
    <div>
      <h4>{consultation.consultationId}</h4>
      <p>Doctor ID: {consultation.doctorId}</p>
      <p>Notes: {consultation.notes}</p>
      <p>Prescription: {consultation.prescription}</p>
      <p>Date: {consultation.consultationDate}</p>
      <button onClick={onEdit}>Edit</button>
      <button onClick={() => onDelete(consultation.consultationId)}>Delete</button>
    </div>
  );
};

export default Consultation;
