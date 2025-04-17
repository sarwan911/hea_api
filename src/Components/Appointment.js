import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import './Appointment.css';

const Appointment = () => {
  const { user } = useContext(UserContext);
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    sessionId: '',
    patientId: user.userId, // Use userId from context
    status: 'Booked' // Default value for the dropdown
  });
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [editDetails, setEditDetails] = useState({});
  const [showAppointments, setShowAppointments] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, [user.userId]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`https://localhost:7272/api/Appointments/patient/${user.userId}`);
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingAppointment) {
      setEditDetails({ ...editDetails, [name]: value });
    } else {
      setNewAppointment({ ...newAppointment, [name]: value });
    }
  };

  const handleAddAppointment = async () => {
    try {
      await axios.post('https://localhost:7272/api/Appointments', newAppointment);
      fetchAppointments();
      setNewAppointment({ sessionId: '', patientId: user.userId, status: 'Booked' });
    } catch (error) {
      console.error('Error adding appointment:', error);
    }
  };

  const handleEditClick = (appointment) => {
    setEditingAppointment(appointment);
    setEditDetails(appointment);
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(`https://localhost:7272/api/Appointments/${editingAppointment.appointmentId}`, editDetails);
      fetchAppointments();
      setEditingAppointment(null);
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  const deleteAppointment = async (id) => {
    try {
      await axios.delete(`https://localhost:7272/api/Appointments/${id}`);
      setAppointments(appointments.filter(app => app.appointmentId !== id));
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  const toggleShowAppointments = () => {
    setShowAppointments(!showAppointments);
  };

  return (
    <div className="appointment-container">
      <h2>Appointments</h2>
      <button onClick={toggleShowAppointments}>
        {showAppointments ? 'Hide Appointments' : 'Show Appointments'}
      </button>
      {showAppointments && (
        <ul className="appointment-list">
          {appointments.map((appointment) => (
            <li key={appointment.appointmentId} className="appointment-item">
              <span>Session ID: {appointment.sessionId}</span>
              <span>Patient ID: {appointment.patientId}</span>
              <span>Status: {appointment.status}</span>
              <button onClick={() => handleEditClick(appointment)}>Edit</button>
              <button onClick={() => deleteAppointment(appointment.appointmentId)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      <div className="appointment-form">
        <h3>{editingAppointment ? 'Edit Appointment' : 'Add New Appointment'}</h3>
        <input
          type="number"
          name="sessionId"
          placeholder="Session ID"
          value={editingAppointment ? editDetails.sessionId : newAppointment.sessionId}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="patientId"
          placeholder="Patient ID"
          value={editingAppointment ? editDetails.patientId : newAppointment.patientId}
          onChange={handleInputChange}
        />
        <select
          name="status"
          value={editingAppointment ? editDetails.status : newAppointment.status}
          onChange={handleInputChange}
        >
          <option value="Booked">Booked</option>
          <option value="Rescheduled">Rescheduled</option>
          <option value="Canceled">Canceled</option>
        </select>
        <div className="button-group">
          <button onClick={editingAppointment ? handleSaveClick : handleAddAppointment}>
            {editingAppointment ? 'Save' : 'Add'}
          </button>
          {editingAppointment && <button onClick={() => setEditingAppointment(null)}>Cancel</button>}
        </div>
      </div>
    </div>
  );
};

export default Appointment;
