import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';

const ViewNotifications = () => {
  const { user } = useContext(UserContext);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user.userId) {
      // Fetch notifications from the API using the userId from context
      fetch(`https://localhost:7272/api/Notifications/UserId?userId=${user.userId}`)
        .then(response => {
          console.log('Response status:', response.status);
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Fetched notifications:', data); // Debug statement
          if (Array.isArray(data)) {
            setNotifications(data);
          } else {
            throw new Error('Data is not an array');
          }
        })
        .catch(error => {
          console.error('Error fetching notifications:', error);
          setError(error.message);
          setNotifications([]); // Ensure notifications is an array even on error
        });
    }
  }, [user.userId]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h3>Notifications</h3>
      <ul className="notification-list">
        {notifications.map(notification => (
          <li key={notification.notificationd} className="notification-item">
            <span>Notification ID: {notification.notificationId}</span>
            <span>Patient ID: {notification.userId}</span>
            <span>Message: {notification.message}</span>
            <span>Date: {new Date(notification.createdAt).toLocaleDateString()}</span>
            <span>Status: {notification.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewNotifications;
