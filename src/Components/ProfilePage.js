import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
// import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const navigate = useNavigate();
  const userIdToFetch = localStorage.getItem('userId'); 

  const fetchUserProfile = async () => {
    if (!userIdToFetch) {
      setLoading(false);
      setError("User ID not available. Please log in.");
      console.log("fetchUserProfile: User ID not available."); // Log this
      return;
    }

    setLoading(true);
    setError(null);
    const apiUrl = `https://localhost:7272/api/Users/${userIdToFetch}`;

    console.log("fetchUserProfile: Fetching data from:", apiUrl); // Log the API URL

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        const errorMessage = `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
      }
      const data = await response.json();
      setUser(data);
      setEditFormData(data);
      console.log("fetchUserProfile: Data fetched successfully:", data); // Log the fetched data
    } catch (e) {
      setError(e.message);
      console.error("fetchUserProfile: Error fetching profile:", e); // Log the error
    } finally {
      setLoading(false);
      console.log("fetchUserProfile: Fetch operation completed. Loading:", loading, "Error:", error); // Log the final state
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [userIdToFetch]); // Re-run effect if userIdToFetch changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
    console.log("handleInputChange:", name, value, editFormData); // Log input changes
  };

  const handleEditClick = () => {
    setIsEditing(true);
    console.log("handleEditClick: isEditing set to true"); // Log edit click
  };

  const handleSaveClick = () => {
    setUser(editFormData);
    setIsEditing(false);
    console.log("handleSaveClick: Profile saved:", editFormData, "isEditing set to false"); // Log save action
    alert('Profile updated successfully!'); // Replace with a more user-friendly notification
  };

  const handleCancelClick = () => {
    setEditFormData(user);
    setIsEditing(false);
    console.log("handleCancelClick: Edit cancelled, form reset:", user, "isEditing set to false"); // Log cancel action
  };

  if (loading) {
    console.log("Rendering: Loading state"); // Log loading state
    return <div>Loading profile...</div>;
  }

  if (error) {
    console.log("Rendering: Error state:", error); // Log error state
    return <div>Error loading profile: {error}</div>;
  }

  if (!user) {
    console.log("Rendering: No user data"); // Log no user data
    return <div>Please log in to view your profile.</div>;
  }

  console.log("Rendering: Profile data:", user, "Editing:", isEditing); // Log rendering with user data

  return (
    <div className="profile-page">
      <h1>Your Profile</h1>
      {isEditing ? (
        <div className="edit-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={editFormData?.name || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <input
              type="text"
              id="role"
              name="role"
              value={editFormData?.role || ''}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={editFormData?.email || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              name="age"
              value={editFormData?.age || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={editFormData?.phone || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <textarea
              id="address"
              name="address"
              value={editFormData?.address || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="button-group">
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={handleCancelClick}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="profile-info">
          <p><strong>User ID:</strong> {user.userId}</p>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <div className="button-group">
            <button onClick={handleEditClick}>Edit Profile</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;