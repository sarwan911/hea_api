import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sessions.css'; // Import the CSS file

const API_URL = 'https://localhost:7272/api/DocAvailabilities';

const Sessions = () => {
    const [sessions, setSessions] = useState([]);
    const [filters, setFilters] = useState({
        doctorId: '',
        availableDate: '',
        startTime: '',
        location: '',
    });
    const [newSession, setNewSession] = useState({
        doctorId: '',
        location: '',
        availableDate: '',
    });
    const [editingSession, setEditingSession] = useState(null);
    const [editDetails, setEditDetails] = useState({});
    const [selectedSessions, setSelectedSessions] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [filteredSessionsData, setFilteredSessionsData] = useState([]); // Separate state for filtered data

    useEffect(() => {
        loadSessions();
    }, []);

    const loadSessions = async () => {
        try {
            const response = await axios.get(API_URL);
            setSessions(response.data);
            setFilteredSessionsData(response.data); // Initialize filtered data with all sessions
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
        setFilters({ ...filters, [name]: value });
    };

    const handleAddSession = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/generate`, null, {
                params: newSession,
            });
            loadSessions();
            setNewSession({ doctorId: '', location: '', availableDate: '' });
        } catch (error) {
            console.error('Error adding session:', error);
        }
    };

    const handleFilter = () => {
        const result = sessions.filter((session) => {
            return (
                (!filters.doctorId || session.doctorId.toString().includes(filters.doctorId)) &&
                (!filters.availableDate || session.availableDate === filters.availableDate) &&
                (!filters.startTime || session.startTime === filters.startTime) &&
                (!filters.location || session.location.toLowerCase().includes(filters.location.toLowerCase()))
            );
        });
        setFilteredSessionsData(result); // Update the filtered data state
        setShowFilters(false); // Hide filters after applying
    };

    const handleCheckboxChange = (sessionId) => {
        setSelectedSessions((prevSelected) =>
            prevSelected.includes(sessionId)
                ? prevSelected.filter((id) => id !== sessionId)
                : [...prevSelected, sessionId]
        );
    };

    const toggleFiltersVisibility = () => {
        setShowFilters(!showFilters);
    };

    return (
        <div className="sessions-container">
            <h2 className="sessions-title">Available Sessions</h2>

            <button className="sessions-filter-button" onClick={toggleFiltersVisibility}>
                {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>

            {showFilters && (
                <div className="sessions-filter-section">
                    <div className="sessions-filter-inputs">
                        <div className="form-group">
                            <label htmlFor="doctorId">Doctor ID:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="doctorId"
                                name="doctorId"
                                value={filters.doctorId}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="availableDate">Date:</label>
                            <input
                                type="date"
                                className="form-control"
                                id="availableDate"
                                name="availableDate"
                                value={filters.availableDate}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="startTime">Start Time:</label>
                            <input
                                type="time"
                                className="form-control"
                                id="startTime"
                                name="startTime"
                                value={filters.startTime}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="location">Location:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="location"
                                name="location"
                                value={filters.location}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <button className="sessions-apply-filter-button" onClick={handleFilter}>
                        Apply Filter
                    </button>
                </div>
            )}

            <div className="sessions-table-responsive">
                <table className="sessions-table">
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
                        {filteredSessionsData.map((session) => (
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
            </div>
        </div>
    );
};

export default Sessions;