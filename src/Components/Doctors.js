import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import './Doctors.css'; // Import separate CSS file

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [doctorsPerPage] = useState(3); // You can adjust this number

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await fetch('https://localhost:7272/api/Users');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        // Filter for doctors. The API returns all users, we only want Doctors.
        const doctorData = data.filter(user => user.role === 'Doctor');
        if (doctorData.length > 0) {
          setDoctors(doctorData);
        } else {
          setError("No doctors found.");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, []);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * doctorsPerPage;
  const currentDoctors = doctors.slice(offset, offset + doctorsPerPage);
  const pageCount = Math.ceil(doctors.length / doctorsPerPage);

  if (loading) {
    return <div className="loading">Loading Doctor Details...</div>;
  }

  if (error) {
    return (
      <div className="error">
        Error: {error}
      </div>
    );
  }

  if (doctors.length === 0) {
    return <div className="no-data">No Doctor details available.</div>;
  }

  return (
    <div className="doctor-list-container">
      <h1 className="doctor-list-heading">Our Dedicated Doctors</h1>
      <div className="doctor-grid">
        {currentDoctors.map((doctor) => (
          <div key={doctor.userId} className="doctor-card">
            <div className="card-header">
              <h2 className="card-title">{doctor.name}</h2>
              <p className="card-specialization">
                <span className="doctor-role">{doctor.specialization || 'General Practitioner'}</span>
              </p>
            </div>
            <div className="card-body">
              <div className="detail-item">
                <span className="detail-label">Doctor ID:</span> {doctor.userId}
              </div>
              <div className="detail-item">
                <span className="detail-label">Email:</span> {doctor.email}
              </div>
              <div className="detail-item">
                <span className="detail-label">Age:</span> {doctor.age}
              </div>
              <div className="detail-item">
                <span className="detail-label">Phone:</span> {doctor.phone}
              </div>
              <div className="detail-item">
                <span className="detail-label">Address:</span> {doctor.address}
              </div>
            </div>
          </div>
        ))}
      </div>
      {pageCount > 1 && (
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      )}
    </div>
  );
};

export default DoctorList;