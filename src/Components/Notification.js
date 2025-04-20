import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Notification.css';

const API_URL = `https://localhost:7272/api/Notifications`;

const NotificationItem = ({ notification, onEdit, onDelete }) => (
  <tr>
    <td>{notification.notificationId}</td>
    <td>{notification.userId}</td>
    <td>{notification.message}</td>
    <td>{new Date(notification.createdAt).toLocaleDateString()}</td>
    <td>{notification.status}</td>
    <td>
      <button className="btn btn-sm btn-primary" onClick={() => onEdit(notification)}>
        Edit
      </button>
      <button className="btn btn-sm btn-danger" onClick={() => onDelete(notification.notificationId)}>
        Delete
      </button>
    </td>
  </tr>
);

const NotificationForm = ({ notification: initialNotification, onSubmit, onCancel }) => {
  const [notification, setNotification] = useState(initialNotification);

  useEffect(() => {
    setNotification(initialNotification);
  }, [initialNotification]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotification((prevNotification) => ({
      ...prevNotification,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(notification);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="userId" className="form-label">
          User ID:
        </label>
        <input
          type="number"
          className="form-control"
          id="userId"
          name="userId"
          value={notification.userId || ''}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="message" className="form-label">
          Message:
        </label>
        <input
          type="text"
          className="form-control"
          id="message"
          name="message"
          value={notification.message || ''}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="createdAt" className="form-label">
          Created At:
        </label>
        <input
          type="date"
          className="form-control"
          id="createdAt"
          name="createdAt"
          value={notification.createdAt ? new Date(notification.createdAt).toISOString().split('T')[0] : ''}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="status" className="form-label">
          Status:
        </label>
        <input
          type="text"
          className="form-control"
          id="status"
          name="status"
          value={notification.status || ''}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {notification.notificationId ? 'Save' : 'Create'}
      </button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);
  const [editingNotification, setEditingNotification] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(API_URL);
      setNotifications(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setError('Failed to load notifications.');
    }
  };

  const handleCreate = () => {
    setEditingNotification({ userId: '', message: '', createdAt: new Date().toISOString().split('T')[0], status: '' });
    setShowForm(true);
  };

  const handleEdit = (notification) => {
    setEditingNotification(notification);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchNotifications();
        setError('');
      } catch (error) {
        console.error('Error deleting notification:', error);
        setError('Failed to delete notification.');
      }
    }
  };

  const handleSave = async (notificationData) => {
    try {
      if (notificationData.notificationId) {
        // Edit existing notification
        await axios.put(`${API_URL}/${notificationData.notificationId}`, notificationData);
      } else {
        // Create new notification
        await axios.post(API_URL, notificationData);
      }
      fetchNotifications();
      setShowForm(false);
      setEditingNotification(null);
      setError('');
    } catch (error) {
      console.error('Error saving notification:', error);
      setError('Failed to save notification.');
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingNotification(null);
  };

  return (
    <div className="container">
      <h1>Notifications</h1>
      {error && <div className="alert alert-danger">{error}</div>}

      {!showForm && (
        <>
          <button className="btn btn-success mb-3" onClick={handleCreate}>
            Create New Notification
          </button>
          {notifications.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User ID</th>
                  <th>Message</th>
                  <th>Created At</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {notifications.map((notification) => (
                  <NotificationItem
                    key={notification.notificationId}
                    notification={notification}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <p>No notifications found.</p>
          )}
        </>
      )}

      {showForm && (
        <div className="mt-3">
          <h2>{editingNotification?.notificationId ? 'Edit Notification' : 'Create New Notification'}</h2>
          <NotificationForm
            notification={editingNotification || { userId: '', message: '', createdAt: new Date().toISOString().split('T')[0], status: '' }}
            onSubmit={handleSave}
            onCancel={handleCancelForm}
          />
        </div>
      )}
    </div>
  );
};

export default NotificationComponent;