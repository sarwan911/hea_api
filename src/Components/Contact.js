// Contact.js
import React from 'react';
import './Contact.css'; // Optional: Import CSS for styling

function Contact() {
  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p>We'd love to hear from you! Please use the information below to get in touch.</p>

      <div className="contact-details">
        <div className="detail-item">
          <i className="fas fa-map-marker-alt"></i> {/* Example: Font Awesome icon */}
          <p><strong>Address:</strong> 123 Main Street, Anantapur, AP, India</p>
        </div>
        <div className="detail-item">
          <i className="fas fa-phone"></i> {/* Example: Font Awesome icon */}
          <p><strong>Phone:</strong> +91 9876543210</p>
        </div>
        <div className="detail-item">
          <i className="fas fa-envelope"></i> {/* Example: Font Awesome icon */}
          <p><strong>Email:</strong> info@healthcare-system.com</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;