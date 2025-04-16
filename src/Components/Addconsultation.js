import React, { useState } from "react";
import axios from "axios";
import './AddConsultation.css';
 
const API_URL = "https://localhost:7272/api/Consultations";
 
const AddConsultation = ({ loadConsultations }) => {
  const [formData, setFormData] = useState({ appointmentId: "", doctorId: "", notes: "", prescription: "", consultationDate: "" });
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData);
      loadConsultations(); // Refresh data
      setFormData({ appointmentId: "", doctorId: "", notes: "", prescription: "", consultationDate: "" });
    } catch (error) {
      console.error("Error adding consultation:", error);
    }
  };
 
  return (
    <form onSubmit={handleSubmit} className="form">
      <input type="text" id="appointmentId" value={formData.appointmentId} onChange={handleChange} placeholder="Appointment ID" required className="form-control input" />
      <input type="text" id="doctorId" value={formData.doctorId} onChange={handleChange} placeholder="Doctor ID" required className="form-control input" />
      <input type="text" id="notes" value={formData.notes} onChange={handleChange} placeholder="Notes" required className="form-control input" />
      <input type="text" id="prescription" value={formData.prescription} onChange={handleChange} placeholder="Prescription" className="form-control input" />
      <input type="date" id="consultationDate" value={formData.consultationDate} onChange={handleChange} placeholder="Consultation Date" required className="form-control input" />
      <button type="submit" className="btn btn-success button">Add</button>
    </form>
  );
};
 
export default AddConsultation;