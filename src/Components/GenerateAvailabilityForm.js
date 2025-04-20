import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

const API_URL = 'https://localhost:7272/api/DocAvailabilities';

const GenerateAvailabilityForm = ({ onSuccess = () => {} }) => {
  const { user } = useContext(UserContext); // Access user from UserContext
  const [formData, setFormData] = useState({
    doctorId: user?.role === 'Doctor' ? user.userId : '', // Automatically set doctorId if role is Doctor
    location: '',
    availableDate: ''
  });
  const [sessions, setSessions] = useState([]); // Store all sessions
  const [filteredSessions, setFilteredSessions] = useState([]); // Store filtered sessions

  useEffect(() => {
    // Fetch all sessions when the component loads
    const fetchSessions = async () => {
      try {
        const response = await axios.get(API_URL);
        setSessions(response.data);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };

    fetchSessions();
  }, []);

  useEffect(() => {
    // Update doctorId if the user changes and role is Doctor
    if (user?.role === 'Doctor' && user?.userId) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        doctorId: user.userId
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/generate`, null, {
        params: formData
      });
      onSuccess(); // Callback to refresh data or notify success
      setFormData({
        doctorId: user?.role === 'Doctor' ? user.userId : '',
        location: '',
        availableDate: ''
      });
    } catch (error) {
      console.error('Error generating availability:', error);
    }
  };

  const handleFilter = () => {
    console.log('Form Data:', formData); // Debugging: Log formData
    console.log('Sessions Data:', sessions); // Debugging: Log sessions
  
    // Convert 12-hour format (AM/PM) to 24-hour format (HH:mm:00)
    const normalizeTime = (time) => {
      const [hours, minutes] = time.split(':');
      const isPM = time.toLowerCase().includes('pm');
      let normalizedHours = parseInt(hours, 10);
  
      if (isPM && normalizedHours !== 12) {
        normalizedHours += 12;
      } else if (!isPM && normalizedHours === 12) {
        normalizedHours = 0;
      }
  
      return `${normalizedHours.toString().padStart(2, '0')}:${minutes}:00`;
    };
  
    const normalizedStartTime = formData.startTime ? normalizeTime(formData.startTime) : '';
  
    const result = sessions.filter((session) => {
      return (
        (!formData.location || session.location.toLowerCase().includes(formData.location.toLowerCase())) &&
        (!formData.availableDate || session.availableDate === formData.availableDate) &&
        (!formData.startTime || session.startTime === normalizedStartTime) // Compare normalized startTime
      );
    });
  
    console.log('Filtered Sessions:', result); // Debugging: Log filtered sessions
    setFilteredSessions(result); // Update filtered sessions
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* <div> */}
          {/* <label>Doctor ID:</label>
          {user?.role === 'Doctor' ? (
            <input
              type="text"
              name="doctorId"
              value={formData.doctorId}
              onChange={handleInputChange}
              required
              disabled // Disable editing doctorId for doctors
            />
          ) : (
            <input
              type="text"
              name="doctorId"
              value={formData.doctorId}
              onChange={handleInputChange}
              required // Allow input for patients
            />
          )}
        </div> */}
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Available Date:</label>
          <input
            type="date"
            name="availableDate"
            value={formData.availableDate}
            onChange={handleInputChange}
          />
        </div>
        <div>
        <label>Start Time:</label>
        <input
            type="time"
            name="startTime"
            value={formData.startTime || ''}
            onChange={handleInputChange}
        />
        </div>
        <div className="button-group">
          <button type="button" onClick={handleFilter}>
            Genarate Doctor Availability
          </button>
          {/* <button type="submit">Generate Availability</button> */}
        </div>
      </form>

      <div>
        <h3>Filtered Sessions</h3>
        {filteredSessions.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Session ID</th>
                <th>Doctor ID</th>
                <th>Available Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {filteredSessions.map((session) => (
                <tr key={session.sessionId}>
                  <td>{session.sessionId}</td>
                  <td>{session.doctorId}</td>
                  <td>{session.availableDate}</td>
                  <td>{session.startTime}</td>
                  <td>{session.endTime}</td>
                  <td>{session.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No sessions found.</p>
        )}
      </div>
    </div>
  );
};

export default GenerateAvailabilityForm;