import React, { useState } from 'react';
import useAxios from '../../../util/useAxios'; // Adjust path as per your project structure
import { APIS } from '../../../util/config'; // Adjust backend endpoint
import {
  validatePassword,
  validateConfirmPassword,
} from '../../../util/auth-validation'; // Adjust validation functions
import { useNavigate, useParams } from 'react-router-dom';

const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const { email } = useParams();
  const navigate = useNavigate();

  const { executeRequest } = useAxios(); // Custom hook for Axios API calls

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'newPassword') {
      setNewPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (!validatePassword(newPassword)) {
      setError(
        'Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character'
      );
      return;
    }

    if (!validateConfirmPassword(confirmPassword, newPassword)) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Make API call to reset password
      const response = await executeRequest({
        method: 'post',
        url: APIS.resetPassword,
        data: { email, newPassword },
        headers: { 'Content-Type': 'application/json' },
      });

      setLoading(false);
      setSuccessMessage(response.message); // Display success message
      setNewPassword('');
      setConfirmPassword('');
      navigate('/login');
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Reset Password</h2>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <input
        type="password"
        name="newPassword"
        value={newPassword}
        onChange={handleChange}
        placeholder="New Password"
        required
      />
      <input
        type="password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={handleChange}
        placeholder="Confirm Password"
        required
      />
      <button type="submit" disabled={loading}>
        Create New Password
      </button>
    </form>
  );
};

export default ResetPasswordForm;
