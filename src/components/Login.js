import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber }),
        credentials: 'include' // Important for sending cookies
      });
      if (response.ok) {
        setOtpSent(true);
        console.log('OTP sent to:', phoneNumber);
      } else {
        console.error('Failed to send OTP');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp }),
        credentials: 'include' // Important for session handling
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Logged in with OTP:', otp);
        console.log('User ID:', data.userId);
        navigate('/home'); // Redirect after login
      } else {
        console.error('Invalid OTP');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">CareMate Login</h1>
      <form className="login-form" onSubmit={otpSent ? handleLogin : handleSendOtp}>
        <label htmlFor="phoneNumber" className="label">
          Mobile Number
        </label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="input"
          placeholder="Enter your phone number"
          required
          disabled={otpSent}
        />

        {otpSent && (
          <>
            <label htmlFor="otp" className="label">
              Enter OTP
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="input"
              placeholder="Enter OTP"
              required
            />
          </>
          
        )}

        <button type="submit" className="login-btn">
          {otpSent ? 'Login' : 'Send OTP'}
        </button>

        <div className="login-link-container">
          <p>Create an account?</p>
          <Link to="/" className="login-btn">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
