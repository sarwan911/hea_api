import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import UserRegistration from './Components/UserRegistration';
import PatientDashboard from './Dashboard/patientdashboard';
import DoctorDashboard from './Dashboard/doctordashboard';
import { UserProvider } from './Components/UserContext';
import Navbar from './Navbar/Navbar';
import Sessions from './Components/Sessions';
import AboutUs from './Components/About';
import Contact from './Components/Contact';
import Doctor from './Components/Doctors';
import ProfilePage from './Components/ProfilePage';
import './Styles.css';

function App() {
  return (
    <UserProvider>
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctor />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<UserRegistration />} />
          <Route path="/patientdashboard" element={<PatientDashboard />} />
          <Route path="/doctordashboard" element={<DoctorDashboard />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
