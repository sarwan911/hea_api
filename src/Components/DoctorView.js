import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom'; // If you're using React Router

const DoctorView = () => {
  const { user } = useContext(UserContext);
  const [doctorData, setDoctorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // If you're using React Router

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        if (user.userId) {
          // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint to fetch doctor details
          const response = await fetch(`https://localhost:7272/api/Users/Doctors/${user.userId}`, {
            headers: {
              'Authorization': `Bearer ${user.token}`, // Include token if your API requires it
            },
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Failed to fetch doctor details (Status: ${response.status})`);
          }

          const data = await response.json();
          setDoctorData(data);
        } else {
          setError('User ID not found. Please log in.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [user.userId, user.token]); // Re-fetch if userId or token changes

  // Optional: Redirect if not logged in or not a doctor
  useEffect(() => {
    if (!user.userId) {
      navigate('/login'); // Redirect to login page
      return;
    }
    if (user.role !== 'doctor') {
      navigate('/unauthorized'); // Redirect to an unauthorized page
    }
  }, [user.userId, user.role, navigate]);

  if (loading) {
    return <div style={styles.loading}>Loading doctor information...</div>;
  }

  if (error) {
    return <div style={styles.error}>Error: {error}</div>;
  }

  if (!doctorData) {
    return <div style={styles.noData}>No doctor information available.</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Doctor Profile</h2>
      <div style={styles.infoContainer}>
        <p style={styles.infoItem}>
          <strong style={styles.label}>Doctor ID:</strong> {doctorData.id || doctorData._id} {/* Adjust based on your API response */}
        </p>
        <p style={styles.infoItem}>
          <strong style={styles.label}>Name:</strong> {doctorData.name}
        </p>
        <p style={styles.infoItem}>
          <strong style={styles.label}>Specialization:</strong> {doctorData.specialization}
        </p>
        <p style={styles.infoItem}>
          <strong style={styles.label}>Email:</strong> {doctorData.email}
        </p>
        {/* Add more doctor details as needed based on your API response */}
      </div>

      {/* You can add more UI elements here, like buttons to edit profile, view appointments, etc. */}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
    textAlign: 'center',
  },
  infoContainer: {
    marginBottom: '20px',
  },
  infoItem: {
    marginBottom: '10px',
    fontSize: '16px',
    color: '#555',
  },
  label: {
    fontWeight: 'bold',
    marginRight: '5px',
    color: '#333',
  },
  loading: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '16px',
    color: '#777',
  },
  error: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '16px',
    color: 'red',
  },
  noData: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '16px',
    color: '#777',
  },
};

export default DoctorView;