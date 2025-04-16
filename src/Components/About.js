// AboutUs.js
import React from 'react';
import './About.css'; // Optional: Import CSS for styling

function AboutUs() {
  return (
    <div className="about-us-container">
      <h2>About Our Healthcare System</h2>
      <p>Welcome to our Healthcare Appointment Management System! We are dedicated to providing a seamless and efficient way for patients to connect with healthcare professionals and manage their appointments.</p>

      <section className="our-mission">
        <h3>Our Mission</h3>
        <p>Our mission is to improve healthcare accessibility and convenience for everyone. We strive to empower patients with the tools they need to easily book appointments, access their medical history, and stay informed about their health journey. For doctors, we aim to streamline appointment scheduling and provide a platform for efficient patient management.</p>
      </section>

      <section className="our-values">
        <h3>Our Core Values</h3>
        <ul>
          <li><strong>Patient-Centricity:</strong> We prioritize the needs and convenience of our patients.</li>
          <li><strong>Efficiency:</strong> We aim to make the appointment process as smooth and quick as possible.</li>
          <li><strong>Reliability:</strong> We are committed to providing a stable and dependable platform.</li>
          <li><strong>Security:</strong> We ensure the privacy and security of all user data.</li>
          <li><strong>Innovation:</strong> We continuously seek to improve our system with the latest technologies.</li>
        </ul>
      </section>

      <section className="our-team">
        <h3>Our Team</h3>
        <p>We are a team of passionate individuals with expertise in healthcare, technology, and user experience. We are driven by the goal of making a positive impact on the healthcare industry.</p>
        {/* You could add more details about your team members here if needed */}
      </section>

      <p>Thank you for choosing our Healthcare Appointment Management System. We are here to support your healthcare needs.</p>
    </div>
  );
}

export default AboutUs;