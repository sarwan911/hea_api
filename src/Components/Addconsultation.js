import React, { useState } from 'react';

const AddConsultation = ({ onAdd }) => {
  const [doctorId, setDoctorId] = useState('');
  const [notes, setNotes] = useState('');
  const [prescription, setPrescription] = useState('');
  const [consultationDate, setConsultationDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newConsultation = {
      doctorId,
      notes,
      prescription,
      consultationDate
    };
    onAdd(newConsultation);
    setDoctorId('');
    setNotes('');
    setPrescription('');
    setConsultationDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Consultation</h3>
      <input
        type="text"
        placeholder="Doctor ID"
        value={doctorId}
        onChange={(e) => setDoctorId(e.target.value)}
        required
      />
      <textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Prescription"
        value={prescription}
        onChange={(e) => setPrescription(e.target.value)}
        required
      />
      <input
        type="date"
        value={consultationDate}
        onChange={(e) => setConsultationDate(e.target.value)}
        required
      />
      <button type="submit">Add Consultation</button>
    </form>
  );
};

export default AddConsultation;
