import React, { useState, useEffect } from 'react';

const EditConsultation = ({ currentConsultation, onUpdate }) => {
  const [doctorId, setDoctorId] = useState(currentConsultation.doctorId);
  const [notes, setNotes] = useState(currentConsultation.notes);
  const [prescription, setPrescription] = useState(currentConsultation.prescription);
  const [consultationDate, setConsultationDate] = useState(currentConsultation.consultationDate);

  useEffect(() => {
    setDoctorId(currentConsultation.doctorId);
    setNotes(currentConsultation.notes);
    setPrescription(currentConsultation.prescription);
    setConsultationDate(currentConsultation.consultationDate);
  }, [currentConsultation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedConsultation = {
      doctorId,
      notes,
      prescription,
      consultationDate
    };
    onUpdate(currentConsultation.consultationId, updatedConsultation);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit Consultation</h3>
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
      <button type="submit">Update Consultation</button>
    </form>
  );
};

export default EditConsultation;
