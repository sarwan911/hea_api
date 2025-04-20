import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sessions.css'; // Import the CSS file
import { UserContext } from './UserContext';

const API_URL = 'https://localhost:7272/api/DocAvailabilities';

const Sessions = () => {
    const [sessions, setSessions] = useState([]);
    const [filters, setFilters] = useState({
        doctorId: '',
        availableDate: '',
        startTime: '',
        location: '',
    });
    const [filteredSessionsData, setFilteredSessionsData] = useState([]); // Separate state for filtered data
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // Current page number
    const sessionsPerPage = 5; // Number of sessions per page

    const { user } = useContext(UserContext); // Access user from UserContext

    useEffect(() => {
        if (user && user.userId) { // Ensure user and userId exist before fetching
            loadSessions();
        }
    }, [user]); // Add user as a dependency to re-run when it changes

    const loadSessions = async () => {
        try {
            let response;
            if (user.role === 'Doctor') {
                // Fetch only the logged-in doctor's sessions
                response = await axios.get(`${API_URL}/doctor/${user.userId}`);
            } else if (user.role === 'Patient') {
                // Fetch all available doctor sessions
                response = await axios.get(`${API_URL}`);
            }
            setSessions(response.data);
            setFilteredSessionsData(response.data); // Initialize filtered data with all sessions
        } catch (error) {
            console.error('Error fetching sessions:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleFilter = () => {
        const normalizedStartTime = filters.startTime ? `${filters.startTime}:00` : ''; // Convert to HH:mm:00 format
    
        const result = sessions.filter((session) => {
            return (
                (!filters.doctorId || session.doctorId.toString().includes(filters.doctorId)) &&
                (!filters.availableDate || session.availableDate === filters.availableDate) &&
                (!filters.startTime || session.startTime === normalizedStartTime) &&
                (!filters.location || session.location.toLowerCase().includes(filters.location.toLowerCase()))
            );
        });
    
        setFilteredSessionsData(result); // Update the filtered data state
        setShowFilters(false); // Hide filters after applying
        setCurrentPage(1); // Reset to the first page after filtering
    };

    const toggleFiltersVisibility = () => {
        setShowFilters(!showFilters);
    };

    // Pagination logic
    const indexOfLastSession = currentPage * sessionsPerPage;
    const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
    const currentSessions = filteredSessionsData.slice(indexOfFirstSession, indexOfLastSession);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                {filteredSessionsData.length === 0 ? (
                    <p className="no-sessions-message">No sessions found.</p> // Display message if no sessions are found
                ) : (
                    <table className="sessions-table">
                        <thead>
                            <tr>
                                <th>Session ID</th>
                                {user?.role === 'Patient' && <th>Doctor ID</th>} {/* Conditionally render Doctor ID */}
                                <th>Available Date</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentSessions.map((session) => (
                                <tr key={session.sessionId}>
                                    <td>{session.sessionId}</td>
                                    {user?.role === 'Patient' && <td>{session.doctorId}</td>} {/* Conditionally render Doctor ID */}
                                    <td>{session.availableDate}</td>
                                    <td>{session.startTime}</td>
                                    <td>{session.endTime}</td>
                                    <td>{session.location}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {filteredSessionsData.length > 0 && (
                <div className="pagination">
                    {Array.from({ length: Math.ceil(filteredSessionsData.length / sessionsPerPage) }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => paginate(index + 1)}
                            className={currentPage === index + 1 ? 'active' : ''}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Sessions;