import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.styles.css'; // Import your CSS file for styling
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons for password toggle
import useAxios from '../../util/useAxios';
import { APIS } from '../../util/config';
import GoogleSignIn from '../Google-Signin/googleSignin';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const { executeRequest } = useAxios();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLoginSuccess = async (token) => {
    const response = await executeRequest({
      method: 'post',
      url: APIS.googleLogin,
      data: { token },
      headers: { 'Content-Type': 'application/json' },
    });
    navigate('/home');
  };

  const handleLoginFailure = (error) => {
    console.error('Failed to sign in with Google:', error);
    // Handle failure (e.g., show error message)
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(APIS.LOGIN_USER);
      const response = await executeRequest({
        method: 'post',
        url: APIS.LOGIN_USER,
        data: { emailOrPhone, password },
        headers: { 'Content-Type': 'application/json' },
      });
      // Assuming your API returns a token upon successful login
      console.log(response);
      localStorage.setItem('token', response); // Store token in localStorage
      setError(null);
      navigate('/home'); // Redirect to home page after successful login
    } catch (error) {
      console.log(error);
      setError(error.response.data.error); // Update error state
    }
  };

  return (
    <div className="login-form-container">
      <h2 className="form-heading">Login</h2>
      {error && <p className="error">{error}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="emailOrPhone">Email/Phone</label>
          <input
            type="text"
            id="emailOrPhone"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="toggle-password" onClick={handleTogglePassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <a href="/login/forgot-password" className="forgot-password">
            Forgot password?
          </a>
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        <p className="or-text">or continue with</p>
        <div className="social-buttons">
          <GoogleSignIn
            onSuccess={handleLoginSuccess}
            onFailure={handleLoginFailure}
          />
        </div>
        <p className="signup-text">
          Don't have an account? <a href="/register">Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
