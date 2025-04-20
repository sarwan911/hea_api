import React, { useState, useEffect } from "react";
import axios from "axios";
import './EditConsultation.css';

const API_URL = "https://localhost:7272/api/Consultations";

const EditConsultation = ({ consultationId, loadConsultations }) => {
  const [formData, setFormData] = useState({
    appointmentId: "",
    doctorId: "",
    notes: "",
    prescription: "",
    consultationDate: ""
  });
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [isFormVisible, setIsFormVisible] = useState(true); // State to manage form visibility

  useEffect(() => {
    if (isFormVisible) {
      const fetchConsultation = async () => {
        try {
          const response = await axios.get(`${API_URL}/${consultationId}`);
          setFormData(response.data);
        } catch (error) {
          console.error("Error fetching consultation:", error);
        }
      };
      fetchConsultation();
    }
  }, [consultationId, isFormVisible]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/${consultationId}`, formData);
      loadConsultations(); // Refresh data
      setSuccessMessage("Consultation edited successfully!"); // Set success message
      setTimeout(() => {
        setSuccessMessage(""); // Clear success message after 2 seconds
        setIsFormVisible(false); // Hide the form
      }, 2000);
    } catch (error) {
      console.error("Error editing consultation:", error);
    }
  };

  return (
    <div>
      {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success message */}
      {isFormVisible && (
        <form onSubmit={handleSubmit} className="form">
          <h2>Edit Consultation</h2>
          <input
            type="text"
            id="appointmentId"
            value={formData.appointmentId}
            onChange={handleChange}
            placeholder="Appointment ID"
            required
            className="form-control input"
          />
          <input
            type="text"
            id="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            placeholder="Doctor ID"
            required
            className="form-control input"
          />
          <input
            type="text"
            id="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Notes"
            required
            className="form-control input"
          />
          <input
            type="text"
            id="prescription"
            value={formData.prescription}
            onChange={handleChange}
            placeholder="Prescription"
            className="form-control input"
          />
          <input
            type="date"
            id="consultationDate"
            value={formData.consultationDate}
            onChange={handleChange}
            placeholder="Consultation Date"
            required
            className="form-control input"
          />
          <button type="submit" className="btn btn-primary button">Edit</button>
        </form>
      )}
    </div>
  );
};

export default EditConsultation;