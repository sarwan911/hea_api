import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import './AddConsultation.css';
import { UserContext } from "./UserContext";

const API_URL = "https://localhost:7272/api/Consultations";

const AddConsultation = ({ loadConsultations }) => {
  const { user } = useContext(UserContext); // Access user from UserContext
  const [formData, setFormData] = useState({
    appointmentId: "",
    doctorId: user?.role === "Doctor" ? user.userId : "", // Automatically set doctorId if role is doctor
    notes: "",
    prescription: "",
    consultationDate: ""
  });
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  useEffect(() => {
    // Update doctorId if the user role is doctor
    if (user?.role === "Doctor") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        doctorId: user.userId
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData);
      loadConsultations(); // Refresh data
      setFormData({
        appointmentId: "",
        doctorId: user?.role === "Doctor" ? user.userId : "",
        notes: "",
        prescription: "",
        consultationDate: ""
      });
      setShowForm(false); // Hide form after submission
      setSuccessMessage("Consultation added successfully!"); // Set success message
      setTimeout(() => {
        setSuccessMessage(""); // Clear success message after 2 seconds
      }, 2000);
    } catch (error) {
      console.error("Error adding consultation:", error);
    }
  };

  return (
    <div>
      {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success message */}
      <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
        {showForm ? "Hide Form" : "Add"}
      </button>
      {showForm && (
        <form onSubmit={handleSubmit} className="form">
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
            disabled={user?.role === "Doctor"} // Disable input if role is doctor
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
          <button type="submit" className="btn btn-success button">Add Consultation</button>
        </form>
      )}
    </div>
  );
};

export default AddConsultation;