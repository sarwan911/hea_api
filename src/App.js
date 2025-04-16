import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Appointment from './Components/Appointment';
import UserRegistration from './Components/UserRegistration';
// import Consultations from './Components/Consultations';
// import Consultations from './Components/Dashboard';
import ViewNotifications from './Components/ViewNotifications';
import './Styles.css';
import PatientDashboard from './Dashboard/patientdashboard';
import DoctorDashboard from './Dashboard/doctordashboard';
import Login from './Components/login';
import Home from './Components/Home';
import { UserProvider } from './Components/UserContext';
import Navbar from './Navbar/Navbar';
import Sessions from './Components/Sessions';
import AboutUs from './Components/About';
import Contact from './Components/Contact';
import Doctor from './Components/Doctors';
import ProfilePage from './Components/ProfilePage';
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
          <Route path="/appointments" element={<Appointment />} />
          {/* <Route path="/prescriptions" element={<Consultations />} /> */}
          <Route path="/UserRegistration" element={<UserRegistration />} />
          <Route path="/ViewNotification" element={<ViewNotifications />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
