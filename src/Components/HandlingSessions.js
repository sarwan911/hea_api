import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HandlingSessions.css'; // Import the CSS file

const API_URL = 'https://localhost:7272/api/DocAvailabilities';

const HandlingSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [newSession, setNewSession] = useState({
    doctorId: '',
    location: '',
    availableDate: ''
  });
  const [editingSession, setEditingSession] = useState(null);
  const [editDetails, setEditDetails] = useState({});
  const [selectedSessions, setSelectedSessions] = useState([]);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      const response = await axios.get(API_URL);
      setSessions(response.data);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingSession) {
      setEditDetails({ ...editDetails, [name]: value });
    } else {
      setNewSession({ ...newSession, [name]: value });
    }
  };

  const handleAddSession = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/generate`, null, {
        params: newSession
      });
      loadSessions();
      setNewSession({ doctorId: '', location: '', availableDate: '' });
    } catch (error) {
      console.error('Error adding session:', error);
    }
  };

  const handleEditClick = (session) => {
    setEditingSession(session);
    setEditDetails(session);
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(`${API_URL}/${editingSession.sessionId}`, editDetails);
      loadSessions();
      setEditingSession(null);
    } catch (error) {
      console.error('Error updating session:', error);
    }
  };

  const deleteSelectedSessions = async () => {
    try {
      await Promise.all(
        selectedSessions.map((id) => axios.delete(`${API_URL}/${id}`))
      );
      loadSessions();
      setSelectedSessions([]);
    } catch (error) {
      console.error('Error deleting sessions:', error);
    }
  };

  const handleCheckboxChange = (sessionId) => {
    setSelectedSessions((prevSelected) =>
      prevSelected.includes(sessionId)
        ? prevSelected.filter((id) => id !== sessionId)
        : [...prevSelected, sessionId]
    );
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>{editingSession ? 'Edit Session' : 'Generate Doctor Availability'}</h2>
        <form onSubmit={handleAddSession}>
          <div>
            <label>Doctor ID:</label>
            <input
              type="text"
              name="doctorId"
              value={editingSession ? editDetails.doctorId : newSession.doctorId}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={editingSession ? editDetails.location : newSession.location}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Available Date:</label>
            <input
              type="date"
              name="availableDate"
              value={editingSession ? editDetails.availableDate : newSession.availableDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="button-group">
            <button type="submit">
              {editingSession ? 'Save' : 'Generate Availability'}
            </button>
            {editingSession && <button onClick={() => setEditingSession(null)}>Cancel</button>}
          </div>
        </form>
      </div>
      <div className="table-container">
        <h2>Session Details</h2>
        <table id="sessionTable">
          <thead>
            <tr>
              <th>Session ID</th>
              <th>Doctor ID</th>
              <th>Available Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Location</th>
              <th>Actions</th>
              <th>ToDelete</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => (
              <tr key={session.sessionId}>
                <td>{session.sessionId}</td>
                <td>{session.doctorId}</td>
                <td>{session.availableDate}</td>
                <td>{session.startTime}</td>
                <td>{session.endTime}</td>
                <td>{session.location}</td>
                <td>
                  <button className="btn btn-secondary" onClick={() => handleEditClick(session)}>Edit</button>
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedSessions.includes(session.sessionId)}
                    onChange={() => handleCheckboxChange(session.sessionId)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          <button onClick={deleteSelectedSessions}>Delete Selected</button>
        </p>
      </div>
    </div>
  );
};

export default HandlingSessions;
