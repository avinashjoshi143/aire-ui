import React, { useState } from 'react';
import useAxios from '../../util/useAxios'; // Adjust the path as per your project structure
import { REGISTER_USER } from '../../util/service-urls'; // Assuming you have defined this constant
import { validateEmail, validatePassword, validateConfirmPassword } from '../../util/auth-validation'; // Assuming you have defined these validation functions
import './register.styles.css'; // Your CSS styles for the form
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons from react-icons library

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        newPassword: '',
        confirmPassword: '',
        contact: ''
    });

    const { name, email, newPassword, confirmPassword, contact } = formData;
    const { executeRequest } = useAxios(); // Custom hook for Axios API calls
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Clear error message when user starts typing again
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form fields
        const newErrors = {};
        if (!validateEmail(email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!validatePassword(newPassword)) {
            newErrors.newPassword = 'Please follow the password must contain instructions';
        }
        if (!validateConfirmPassword(confirmPassword, newPassword)) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Form data is valid, make API call
        try {
            setLoading(true);
            setError(null);

            const response = await executeRequest({
                method: 'post',
                url: REGISTER_USER,
                data: formData,
                headers: { 'Content-Type': 'application/json' },
            });

            setData(response.message);
            setFormData({
                name: '',
                email: '',
                newPassword: '',
                confirmPassword: '',
                contact: ''
            }); // Reset form fields after successful registration
        } catch (err) {
            setError(err.response.data.error);
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-form-container">
            <form onSubmit={handleSubmit} className="register-form">
                <h2>Sign up</h2>
                {loading && <p>Loading...</p>}
                {data && <p className="success">{data}</p>}
                {error && <p className="error">{error}</p>}

                <input type="text" name="name" value={name} onChange={handleChange} placeholder="Name" required />
                {errors.name && <span className="error">{errors.name}</span>}

                <input type="email" name="email" value={email} onChange={handleChange} placeholder="Email" required />
                {errors.email && <span className="error">{errors.email}</span>}

                <div className="password-input">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="newPassword"
                        value={newPassword}
                        onChange={handleChange}
                        placeholder="New Password"
                        required
                    />
                </div>
                {errors.newPassword && <span className="error">{errors.newPassword}</span>}

                <div className="password-input">
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        required
                    />
                    <span className="toggle-password" onClick={handleToggleConfirmPassword}>
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}

                <input type="text" name="contact" value={contact} onChange={handleChange} placeholder="Contact" required />
                {errors.contact && <span className="error">{errors.contact}</span>}

                <button type="submit" disabled={loading}>Create Account</button>

                <div className="password-instructions">
                    <p>Password must contain:</p>
                    <ul>
                        <li>At least 8 characters</li>
                        <li>At least one uppercase letter (A-Z)</li>
                        <li>At least one number (0-9)</li>
                        <li>At least one special character (e.g., !@#$%^&*)</li>
                    </ul>
                </div>

                <p>Already have an account? <a href="/login">Sign in</a></p>
            </form>
        </div>
    );
};

export default RegisterForm;
