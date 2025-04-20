// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import './HandlingSessions.css'; // Import the CSS file
// import { UserContext } from './UserContext';

// const API_URL = 'https://localhost:7272/api/DocAvailabilities';

// const HandlingSessions = () => {
//   const { user } = useContext(UserContext); // Access user from UserContext
//   const [sessions, setSessions] = useState([]);
//   const [newSession, setNewSession] = useState({
//     doctorId: user?.userId || '', // Automatically set doctorId to logged-in user's ID
//     location: '',
//     availableDate: ''
//   });
//   const [editingSession, setEditingSession] = useState(null);
//   const [editDetails, setEditDetails] = useState({});
//   const [selectedSessions, setSelectedSessions] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1); // Current page number
//   const sessionsPerPage = 5; // Number of sessions per page

//   useEffect(() => {
//     if (user?.userId) {
//       loadSessions();
//     }
//   }, [user?.userId]);

//   const loadSessions = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/doctor/${user.userId}`);
//       setSessions(response.data);
//     } catch (error) {
//       console.error('Error fetching sessions:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (editingSession) {
//       setEditDetails({ ...editDetails, [name]: value });
//     } else {
//       setNewSession({ ...newSession, [name]: value });
//     }
//   };

//   const handleAddSession = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(`${API_URL}/generate`, null, {
//         params: newSession
//       });
//       loadSessions();
//       setNewSession({ doctorId: user.userId, location: '', availableDate: '' });
//     } catch (error) {
//       console.error('Error adding session:', error);
//     }
//   };

//   const handleEditClick = (session) => {
//     setEditingSession(session);
//     setEditDetails({ ...session }); // Initialize editDetails with the session's current values
//   };

//   const handleSaveClick = async () => {
//     try {
//       if (!editingSession || !editDetails) {
//         alert('No session selected for editing.');
//         return;
//       }

//       // Send the updated session details to the server
//       await axios.put(`${API_URL}/${editingSession.sessionId}`, editDetails, {
//         headers: {
//           'Content-Type': 'application/json', // Ensure correct content type
//         },
//       });

//       // Reload sessions and reset editing state
//       loadSessions();
//       setEditingSession(null);
//       setEditDetails({});
//     } catch (error) {
//       console.error('Error updating session:', error);
//       alert('Failed to update session. Please try again.');
//     }
//   };

//   const deleteSelectedSessions = async () => {
//     try {
//       await Promise.all(
//         selectedSessions.map((id) => axios.delete(`${API_URL}/${id}`))
//       );
//       loadSessions();
//       setSelectedSessions([]);
//     } catch (error) {
//       console.error('Error deleting sessions:', error);
//     }
//   };

//   const handleCheckboxChange = (sessionId) => {
//     setSelectedSessions((prevSelected) =>
//       prevSelected.includes(sessionId)
//         ? prevSelected.filter((id) => id !== sessionId)
//         : [...prevSelected, sessionId]
//     );
//   };

//   // Pagination logic
//   const indexOfLastSession = currentPage * sessionsPerPage;
//   const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
//   const currentSessions = sessions.slice(indexOfFirstSession, indexOfLastSession);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="container">
//       <div className="form-container">
//         <h2>{editingSession ? 'Edit Session' : 'Generate Doctor Availability'}</h2>
//         <form onSubmit={editingSession ? handleSaveClick : handleAddSession}>
//           <div>
//             <label>Doctor ID:</label>
//             <input
//               type="text"
//               name="doctorId"
//               value={editingSession ? editDetails.doctorId : newSession.doctorId}
//               onChange={handleInputChange}
//               required
//               disabled // Disable editing doctorId to prevent accidental changes
//             />
//           </div>
//           <div>
//             <label>Location:</label>
//             <input
//               type="text"
//               name="location"
//               value={editingSession ? editDetails.location : newSession.location}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div>
//             <label>Available Date:</label>
//             <input
//               type="date"
//               name="availableDate"
//               value={editingSession ? editDetails.availableDate : newSession.availableDate}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="button-group">
//             <button type="submit">
//               {editingSession ? 'Save' : 'Generate Availability'}
//             </button>
//             {editingSession && <button onClick={() => setEditingSession(null)}>Cancel</button>}
//           </div>
//         </form>
//       </div>
//       <div className="table-container">
//         <h2>Session Details</h2>
//         <table id="sessionTable">
//           <thead>
//             <tr>
//               <th>Session ID</th>
//               <th>Doctor ID</th>
//               <th>Available Date</th>
//               <th>Start Time</th>
//               <th>End Time</th>
//               <th>Location</th>
//               <th>Actions</th>
//               <th>ToDelete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentSessions.map((session) => (
//               <tr key={session.sessionId}>
//                 <td>{session.sessionId}</td>
//                 <td>{session.doctorId}</td>
//                 <td>{session.availableDate}</td>
//                 <td>{session.startTime}</td>
//                 <td>{session.endTime}</td>
//                 <td>{session.location}</td>
//                 <td>
//                   <button className="btn btn-secondary" onClick={() => handleEditClick(session)}>Edit</button>
//                 </td>
//                 <td>
//                   <input
//                     type="checkbox"
//                     checked={selectedSessions.includes(session.sessionId)}
//                     onChange={() => handleCheckboxChange(session.sessionId)}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div className="pagination">
//           {Array.from({ length: Math.ceil(sessions.length / sessionsPerPage) }, (_, index) => (
//             <button
//               key={index + 1}
//               onClick={() => paginate(index + 1)}
//               className={currentPage === index + 1 ? 'active' : ''}
//             >
//               {index + 1}
//             </button>
//           ))}
//         </div>
//         <p>
//           <button onClick={deleteSelectedSessions}>Delete Selected</button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default HandlingSessions;

// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import './HandlingSessions.css'; // Import the CSS file
// import { UserContext } from './UserContext';

// const API_URL = `https://localhost:7272/api/DocAvailabilities`;

// const HandlingSessions = () => {
//   const { user } = useContext(UserContext); // Access user from UserContext
//   const [sessions, setSessions] = useState([]);
//   const [newSession, setNewSession] = useState({
//     doctorId: user?.userId || '', // Default to logged-in doctor's ID
//     location: '',
//     availableDate: ''
//   });
//   const [editingSession, setEditingSession] = useState(null);
//   const [editDetails, setEditDetails] = useState({});
//   const [selectedSessions, setSelectedSessions] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [sessionsPerPage] = useState(5); // Number of sessions per page

//   useEffect(() => {
//     if (user?.userId) {
//       loadSessions();
//     }
//   }, [user?.userId]); // Reload sessions when the logged-in user changes

//   const loadSessions = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/doctor/${user.userId}`);
//       setSessions(response.data);
//     } catch (error) {
//       console.error('Error fetching sessions:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (editingSession) {
//       setEditDetails({ ...editDetails, [name]: value });
//     } else {
//       setNewSession({ ...newSession, [name]: value });
//     }
//   };

//   const handleAddSession = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(`https://localhost:7272/api/DocAvailabilities`, null, {
//         params: newSession
//       });
//       loadSessions();
//       setNewSession({ doctorId: user.userId, location: '', availableDate: '' });
//     } catch (error) {
//       console.error('Error adding session:', error);
//     }
//   };

//   const handleEditClick = (session) => {
//     setEditingSession(session);
//     setEditDetails({...session});
//   };

//   // const handleSaveClick = async () => {
//   //   try {
//   //     await axios.put(`${API_URL}/${editingSession.sessionId}`, editDetails);
//   //     loadSessions();
//   //     setEditingSession(null);
//   //   } catch (error) {
//   //     console.error('Error updating session:', error);
//   //   }
//   // };

//   const handleSaveClick = async () => {
//     try {
//       if (!editingSession || !editDetails) {
//         alert('No session selected for editing.');
//         return;
//       }
  
//       // Send the updated session details to the server
//       await axios.put(API_URL, editDetails, {
//         headers: {
//           'Content-Type': 'application/json', // Ensure correct content type
//         },
//       });
  
//       // Reload sessions and reset editing state
//       loadSessions();
//       setEditingSession(null);
//       setEditDetails({});
//     } catch (error) {
//       console.error('Error updating session:', error);
//       alert('Failed to update session. Please try again.');
//     }
//   };

//   const deleteSelectedSessions = async () => {
//     try {
//       await Promise.all(
//         selectedSessions.map((id) => axios.delete(`${API_URL}/${id}`))
//       );
//       loadSessions();
//       setSelectedSessions([]);
//     } catch (error) {
//       console.error('Error deleting sessions:', error);
//     }
//   };

//   const handleCheckboxChange = (sessionId) => {
//     setSelectedSessions((prevSelected) =>
//       prevSelected.includes(sessionId)
//         ? prevSelected.filter((id) => id !== sessionId)
//         : [...prevSelected, sessionId]
//     );
//   };

//   // Pagination logic
//   const indexOfLastSession = currentPage * sessionsPerPage;
//   const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
//   const currentSessions = sessions.slice(indexOfFirstSession, indexOfLastSession);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="container">
//       <div className="form-container">
//         <h2>{editingSession ? 'Edit Session' : 'Generate Doctor Availability'}</h2>
//         <form onSubmit={handleAddSession}>
//           <div>
//             <label>Doctor ID:</label>
//             <input
//               type="text"
//               name="doctorId"
//               value={editingSession ? editDetails.doctorId : newSession.doctorId}
//               onChange={handleInputChange}
//               required
//               disabled // Disable editing doctorId to prevent accidental changes
//             />
//           </div>
//           <div>
//             <label>Location:</label>
//             <input
//               type="text"
//               name="location"
//               value={editingSession ? editDetails.location : newSession.location}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div>
//             <label>Available Date:</label>
//             <input
//               type="date"
//               name="availableDate"
//               value={editingSession ? editDetails.availableDate : newSession.availableDate}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="button-group">
//             <button type="submit">
//               {editingSession ? 'Save' : 'Generate Availability'}
//             </button>
//             {editingSession && <button onClick={() => setEditingSession(null)}>Cancel</button>}
//           </div>
//         </form>
//       </div>
//       <div className="table-container">
//         <h2>Session Details</h2>
//         <table id="sessionTable">
//           <thead>
//             <tr>
//               <th>Session ID</th>
//               <th>Doctor ID</th>
//               <th>Available Date</th>
//               <th>Start Time</th>
//               <th>End Time</th>
//               <th>Location</th>
//               <th>Actions</th>
//               <th>ToDelete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentSessions.map((session) => (
//               <tr key={session.sessionId}>
//                 <td>{session.sessionId}</td>
//                 <td>{session.doctorId}</td>
//                 <td>{session.availableDate}</td>
//                 <td>{session.startTime}</td>
//                 <td>{session.endTime}</td>
//                 <td>{session.location}</td>
//                 <td>
//                   <button className="btn btn-secondary" onClick={() => handleSaveClick}>Edit</button>
//                 </td>
//                 <td>
//                   <input
//                     type="checkbox"
//                     checked={selectedSessions.includes(session.sessionId)}
//                     onChange={() => handleCheckboxChange(session.sessionId)}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div className="pagination">
//           {Array.from({ length: Math.ceil(sessions.length / sessionsPerPage) }, (_, index) => (
//             <button key={index + 1} onClick={() => paginate(index + 1)}>
//               {index + 1}
//             </button>
//           ))}
//         </div>
//         <p>
//           <button onClick={deleteSelectedSessions}>Delete Selected</button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default HandlingSessions;

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './HandlingSessions.css'; // Import the CSS file
import { UserContext } from './UserContext';

const API_URL = 'https://localhost:7272/api/DocAvailabilities';

const HandlingSessions = () => {
  const { user } = useContext(UserContext); // Access user from UserContext
  const [sessions, setSessions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const sessionsPerPage = 5; // Number of sessions per page

  useEffect(() => {
    if (user?.userId) {
      loadSessions();
    }
  }, [user?.userId]);

  const loadSessions = async () => {
    try {
      const response = await axios.get(`${API_URL}/doctor/${user.userId}`);
      setSessions(response.data);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  // Pagination logic
  const indexOfLastSession = currentPage * sessionsPerPage;
  const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
  const currentSessions = sessions.slice(indexOfFirstSession, indexOfLastSession);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <div className="table-container">
        <h2>Session Details</h2>
        <table id="sessionTable">
          <thead>
            <tr>
              <th>Session ID</th>
              {/* <th>Doctor ID</th> */}
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {currentSessions.map((session) => (
              <tr key={session.sessionId}>
                <td>{session.sessionId}</td>
                {/* <td>{session.doctorId}</td> */}
                <td>{session.availableDate}</td>
                <td>{session.startTime}</td>
                <td>{session.endTime}</td>
                <td>{session.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {Array.from({ length: Math.ceil(sessions.length / sessionsPerPage) }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HandlingSessions;