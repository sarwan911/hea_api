// import React, { useState, useContext } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from './UserContext';
// import './login.css'; // Import the CSS file

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();
//   // const { setUsername } = useContext(UserContext);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     console.log("name  "+username);
//     try {
//       const response = await axios.post('https://localhost:7272/api/Auth/login', {
//         username,
//         password,
//       });
//       console.log('Login API response:', response.data);
//       console.log(response.data.Role);
//       if (response.data && response.data.token && response.data.Role) {
//         const { token, Role } = response.data;
       
//         // Store token and username in localStorage
//         localStorage.setItem('token', token);
//         localStorage.setItem('username', username);
//         // Update user context
//         setUsername({ username, token });
//         // Navigate based on role
//         if (Role === 'Patient') {
//           navigate('/patientdashboard');
//         } else if (Role === 'Doctor') {
//           navigate('/doctordashboard');
//         } else {
//           navigate('/register'); // Fallback or handle other roles
//         }
//       } else {
//         throw new Error('Invalid response from server');
//       }
//     } catch (error) {
//       console.error('Login failed:', error.response ? error.response.data : error.message);
//       alert('Invalid credentials or server error!');
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import './login.css'; // Import the CSS file

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const validateForm = () => {
    const newErrors = {};
    if (!username) {
      newErrors.username = 'Username is required';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Invalid Password';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    console.log("name  " + username);
    try {
      const response = await axios.post('https://localhost:7272/api/Auth/login', {
        username,
        password,
      });
      console.log('Login API response:', response.data);
      console.log(response.data.role);
      if (response.data && response.data.token && response.data.role) {
        const { token, role } = response.data;

        // Store token, userId, and role in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userId', username);
        localStorage.setItem('role', role);

        // Update user context
        setUser({ userId: username, token, role: role });

        // Navigate based on role
        if (role === 'Patient') {
          navigate('/patientdashboard');
        } else if (role === 'Doctor') {
          navigate('/doctordashboard');
        } else {
          navigate('/register'); // Fallback or handle other roles
        }
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      alert('Invalid credentials or server error!');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="User_ID"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {errors.username && <p className="error">{errors.username}</p>}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && <p className="error">{errors.password}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
