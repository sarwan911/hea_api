import React from "react";
import axios from "axios";
import "./DeleteConsultation.css"; // Import the CSS file

const API_URL = "https://localhost:7272/api/Consultations";

const DeleteConsultation = ({ consultationId, loadConsultations }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`<span class="math-inline">\{API\_URL\}/</span>{consultationId}`);
      loadConsultations(); // Refresh data
    } catch (error) {
      console.error("Error deleting consultation:", error);
    }
  };

  return (
    <button onClick={handleDelete} className="btn btn-danger button">Delete</button>
  );
};

export default DeleteConsultation;