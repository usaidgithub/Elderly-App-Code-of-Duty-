import React, { useState } from 'react';
import { Link,useNavigate} from "react-router-dom";
import './Registration.css';

const Registration = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    phoneNumber: '',
    firstName: '',
    email: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const { phoneNumber, firstName, email } = formData;
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({phoneNumber,firstName,email}),
        credentials: 'include'
      });
      if (response.ok) {
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="registration-container">
      <h1 className="registration-title">CareMate Registration</h1>
      <form className="registration-form" onSubmit={handleSubmit}>
        <label htmlFor="firstName" className="label">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="input"
          placeholder="Enter your first name"
          required
        />

        <label htmlFor="phoneNumber" className="label">
          Mobile Number
        </label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="input"
          placeholder="Enter your phone number"
          required
        />

        <label htmlFor="email" className="label">
          Email (for notifications)
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="input"
          placeholder="Enter your email"
        />

        <button type="submit" className="register-btn">Register</button>
      </form>

      <div className="login-link-container">
        <p>Already have an account?</p>
        <Link to="/login" className="login-btn">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Registration;
