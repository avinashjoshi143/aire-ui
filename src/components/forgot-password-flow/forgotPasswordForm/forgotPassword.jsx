import React, { useState } from 'react';
import useAxios from '../../../util/useAxios'; // Adjust path as per your project structure
import { sendVerificationCode } from '../../../util/service-urls'; // Adjust backend endpoint
import { useNavigate } from 'react-router-dom';


const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const { executeRequest } = useAxios(); // Custom hook for Axios API calls

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError(null);

            // Make API call to send verification code
            const response = await executeRequest({
                method: 'post',
                url: sendVerificationCode,
                data: { email },
                headers: { 'Content-Type': 'application/json' },
            });

            setLoading(false);
            navigate(`/login/verify-email/${email}`) // Navigate to next step (VerifyEmailForm)
        } catch (error) {
            setLoading(false);
            console.log(error);
            setError(error.response.data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Forgot Password</h2>
            {error && <p className="error">{error}</p>}
            <input type="email" value={email} onChange={handleChange} placeholder="Enter your email" required />
            <button type="submit" disabled={loading}>Get OTP</button>
        </form>
    );
};

export default ForgotPasswordForm;
