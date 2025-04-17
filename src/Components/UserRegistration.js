// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './UserRegistration.css'; // Import the CSS file

// const UserRegistration = () => {
//     const [user, setUser] = useState({
//         name: '',
//         role: 'Patient', // Default value
//         email: '',
//         age: '',
//         phone: '',
//         address: '',
//         password: '',
//     });

//     const navigate = useNavigate();

//     const handleRegister = async () => {
//         try {
//             console.log('Sending user data:', user);
//             const response = await axios.post('https://localhost:7272/api/Users/register', user);
//             console.log('Registration Response:', response);
//             if (response.status === 200) {
//                 alert('User registered successfully!');

//                 // Navigate based on user role
//                 if (user.role === 'Patient') {
//                     navigate('/patientdashboard');
//                 } else if (user.role === 'Doctor') {
//                     navigate('/doctordashboard');
//                 }

//                 // Reset user state
//                 setUser({
//                     name: '',
//                     role: 'Patient',
//                     email: '',
//                     age: '',
//                     phone: '',
//                     address: '',
//                     password: '',
//                 });
//             }
//         } catch (error) {
//             console.error('Error registering user:', error);
//             alert('An error occurred during registration.');
//         }
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setUser({ ...user, [name]: value });
//     };

//     return (
//         <div className="registration-container">
//             <div className="registration-card">
//                 <h2 className="registration-title">User Registration</h2>
//                 <form className="registration-form">
//                     <div className="form-group">
//                         <label htmlFor="name" className="form-label">Name:</label>
//                         <input type="text" className="form-control" id="name" name="name" value={user.name} onChange={handleInputChange} />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="role" className="form-label">Role:</label>
//                         <select className="form-select" id="role" name="role" value={user.role} onChange={handleInputChange}>
//                             <option value="Patient">Patient</option>
//                             <option value="Doctor">Doctor</option>
//                         </select>
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="email" className="form-label">Email:</label>
//                         <input type="email" className="form-control" id="email" name="email" value={user.email} onChange={handleInputChange} />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="age" className="form-label">Age:</label>
//                         <input type="number" className="form-control" id="age" name="age" value={user.age} onChange={handleInputChange} />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="phone" className="form-label">Phone Number:</label>
//                         <input type="text" className="form-control" id="phone" name="phone" value={user.phone} onChange={handleInputChange} />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="address" className="form-label">Address:</label>
//                         <input type="text" className="form-control" id="address" name="address" value={user.address} onChange={handleInputChange} />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="password" className="form-label">Password:</label>
//                         <input type="password" className="form-control" id="password" name="password" value={user.password} onChange={handleInputChange} />
//                     </div>
//                     <button type="button" className="btn-register" onClick={handleRegister}>Register</button>
//                     <p className="login-link">
//                         <Link to="/Login">Already have an account? Login here.</Link>
//                     </p>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default UserRegistration;

// import React, { useState, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useFormik } from "formik";
// import * as yup from "yup";
// import axios from 'axios';
// import { UserContext } from './UserContext';
// import './UserRegistration.css'; // Import the CSS file
// import { toast } from 'react-toastify'; // Import toast
// import 'react-toastify/dist/ReactToastify.css';

// const validationSchema = yup.object({
//     userId: yup.number()
//         .integer("User ID must be an integer.")
//         .required("User ID is required."),
//     name: yup.string()
//         .min(4, "Name should contain a minimum length of 4 characters")
//         .max(30, "Name should not exceed the maximum limit of 30 characters")
//         .required("Name is required."),
//     email: yup.string()
//         .email("Invalid email format")
//         .required("Email is required."),
//     age: yup.number()
//         .min(1, "Age must be at least 1")
//         .required("Age is required."),
//     phone: yup.string()
//         .matches(/^\d{10}$/, "Phone number should contain exactly 10 digits.")
//         .required("Phone number is required."),
//     address: yup.string()
//         .required("Address is required."),
//     password: yup.string()
//         .min(6, "Password must be at least 6 characters long.")
//         .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).+$/, "Password must contain at least one uppercase letter, one special character, and one number.")
//         .required("Password is required."),
// });

// const UserRegistration = () => {
//     const [user, setUser] = useState({
//         userId: '',
//         name: '',
//         role: 'Patient', // Default value
//         email: '',
//         age: '',
//         phone: '',
//         address: '',
//         password: '',
//     });

//     const navigate = useNavigate();
//     const { setUser: setUserContext } = useContext(UserContext);

//     const formik = useFormik({
//         initialValues: user,
//         validationSchema: validationSchema,
//         onSubmit: async (values) => {
//             try {
//                 console.log('Sending user data:', values);
//                 const response = await axios.post('https://localhost:7272/api/Users/register', values);
//                 console.log('Registration Response:', response);
//                 if (response.status === 200) {
//                     alert('User registered successfully!');
        
//                     const { token, role } = response.data;
        
//                     // Store token, userId, and role in localStorage
//                     localStorage.setItem('token', token);
//                     localStorage.setItem('userId', values.name);
//                     localStorage.setItem('role', role);
        
//                     // Update user context
//                     setUserContext({ userId: values.name, token, role });
        
//                     // Navigate based on user role
//                     if (role === 'Patient') {
//                         navigate('/patientdashboard');
//                     } else if (role === 'Doctor') {
//                         navigate('/doctordashboard');
//                     }
        
//                     // Reset user state
//                     formik.resetForm();
//                 }
//             } catch (error) {
//                 console.error('Error registering user:', error);
//                 alert('An error occurred during registration.');
//             }
//         },
//     });

//     return (
//         <div className="registration-container">
//             <div className="registration-card">
//                 <h2 className="registration-title">User Registration</h2>
//                 <form className="registration-form" onSubmit={formik.handleSubmit}>
//                     <div className="form-group">
//                         <label htmlFor="userId" className="form-label">User ID:</label>
//                         <input type="number" className="form-control" id="userId" name="userId" value={formik.values.userId} onChange={formik.handleChange} />
//                         {formik.errors.userId && <div className="error">{formik.errors.userId}</div>}
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="name" className="form-label">Name:</label>
//                         <input type="text" className="form-control" id="name" name="name" value={formik.values.name} onChange={formik.handleChange} />
//                         {formik.errors.name && <div className="error">{formik.errors.name}</div>}
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="role" className="form-label">Role:</label>
//                         <select className="form-select" id="role" name="role" value={formik.values.role} onChange={formik.handleChange}>
//                             <option value="Patient">Patient</option>
//                             <option value="Doctor">Doctor</option>
//                         </select>
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="email" className="form-label">Email:</label>
//                         <input type="email" className="form-control" id="email" name="email" value={formik.values.email} onChange={formik.handleChange} />
//                         {formik.errors.email && <div className="error">{formik.errors.email}</div>}
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="age" className="form-label">Age:</label>
//                         <input type="number" className="form-control" id="age" name="age" value={formik.values.age} onChange={formik.handleChange} />
//                         {formik.errors.age && <div className="error">{formik.errors.age}</div>}
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="phone" className="form-label">Phone Number:</label>
//                         <input type="text" className="form-control" id="phone" name="phone" value={formik.values.phone} onChange={formik.handleChange} />
//                         {formik.errors.phone && <div className="error">{formik.errors.phone}</div>}
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="address" className="form-label">Address:</label>
//                         <input type="text" className="form-control" id="address" name="address" value={formik.values.address} onChange={formik.handleChange} />
//                         {formik.errors.address && <div className="error">{formik.errors.address}</div>}
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="password" className="form-label">Password:</label>
//                         <input type="password" className="form-control" id="password" name="password" value={formik.values.password} onChange={formik.handleChange} />
//                         {formik.errors.password && <div className="error">{formik.errors.password}</div>}
//                     </div>
//                     <button type="submit" className="btn-register">Register</button>
//                     <button type="button" className="btn-reset" onClick={formik.resetForm}>Reset</button>
//                     <p className="login-link">
//                         <Link to="/Login">Already have an account? Login here.</Link>
//                     </p>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default UserRegistration;
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";
import axios from 'axios';
import { UserContext } from './UserContext';
import './UserRegistration.css'; // Import the CSS file
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = yup.object({
    userId: yup.number()
        .integer("User ID must be an integer.")
        .required("User ID is required."),
    name: yup.string()
        .min(4, "Name should contain a minimum length of 4 characters")
        .max(30, "Name should not exceed the maximum limit of 30 characters")
        .required("Name is required."),
    email: yup.string()
        .email("Invalid email format")
        .required("Email is required."),
    age: yup.number()
        .min(1, "Age must be at least 1")
        .required("Age is required."),
    phone: yup.string()
        .matches(/^\d{10}$/, "Phone number should contain exactly 10 digits.")
        .required("Phone number is required."),
    address: yup.string()
        .required("Address is required."),
    password: yup.string()
        .min(6, "Password must be at least 6 characters long.")
        .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).+$/, "Password must contain at least one uppercase letter, one special character, and one number.")
        .required("Password is required."),
});

const UserRegistration = () => {
    const navigate = useNavigate();
    const { setUser: setUserContext } = useContext(UserContext);

    const formik = useFormik({
        initialValues: {
            userId: '',
            name: '',
            role: 'Patient', // Default value
            email: '',
            age: '',
            phone: '',
            address: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                console.log('Sending user data:', values);
                const response = await axios.post('https://localhost:7272/api/Users/register', values);
                console.log('Registration Response:', response);
                if (response.status === 201) {
                    alert('User registered successfully!');

                    const { token, role } = response.data;
                    const userId = values.name; // Using name as userId for context

                    // Store token, userId, and role in localStorage
                    localStorage.setItem('token', token);
                    localStorage.setItem('userId', userId);
                    localStorage.setItem('role', role);

                    // Update user context
                    setUserContext({ userId, token, role });

                    // Navigate based on user role
                    if (role === 'Patient') {
                        console.log(role);
                        navigate('/patientdashboard');
                    } else if (role === 'Doctor') {
                        console.log("doc  "+role);
                        navigate('/doctordashboard');
                    }

                    // Reset the form
                    formik.resetForm();
                }
            } catch (error) {
                console.error('Error registering user:', error);
                alert('An error occurred during registration.');
            }
        },
    });

    return (
        <div className="registration-container">
            <div className="registration-card">
                <h2 className="registration-title">User Registration</h2>
                <form className="registration-form" onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="userId" className="form-label">User ID:</label>
                        <input type="number" className="form-control" id="userId" name="userId" value={formik.values.userId} onChange={formik.handleChange} />
                        {formik.errors.userId && <div className="error">{formik.errors.userId}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Name:</label>
                        <input type="text" className="form-control" id="name" name="name" value={formik.values.name} onChange={formik.handleChange} />
                        {formik.errors.name && <div className="error">{formik.errors.name}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="role" className="form-label">Role:</label>
                        <select className="form-select" id="role" name="role" value={formik.values.role} onChange={formik.handleChange}>
                            <option value="Patient">Patient</option>
                            <option value="Doctor">Doctor</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input type="email" className="form-control" id="email" name="email" value={formik.values.email} onChange={formik.handleChange} />
                        {formik.errors.email && <div className="error">{formik.errors.email}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="age" className="form-label">Age:</label>
                        <input type="number" className="form-control" id="age" name="age" value={formik.values.age} onChange={formik.handleChange} />
                        {formik.errors.age && <div className="error">{formik.errors.age}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone" className="form-label">Phone Number:</label>
                        <input type="text" className="form-control" id="phone" name="phone" value={formik.values.phone} onChange={formik.handleChange} />
                        {formik.errors.phone && <div className="error">{formik.errors.phone}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="address" className="form-label">Address:</label>
                        <input type="text" className="form-control" id="address" name="address" value={formik.values.address} onChange={formik.handleChange} />
                        {formik.errors.address && <div className="error">{formik.errors.address}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input type="password" className="form-control" id="password" name="password" value={formik.values.password} onChange={formik.handleChange} />
                        {formik.errors.password && <div className="error">{formik.errors.password}</div>}
                    </div>
                    <button type="submit" className="btn-register">Register</button>
                    <button type="button" className="btn-reset" onClick={formik.resetForm}>Reset</button>
                    <p className="login-link">
                        <Link to="/Login">Already have an account? Login here.</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default UserRegistration;