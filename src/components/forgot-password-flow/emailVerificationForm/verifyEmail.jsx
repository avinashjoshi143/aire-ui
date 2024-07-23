import React, { useState } from 'react';
import useAxios from '../../../util/useAxios'; // Adjust path as per your project structure
import { verifyCode } from '../../../../config'; // Adjust backend endpoint
import { useNavigate, useParams } from 'react-router-dom';

const VerifyEmailForm = () => {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { email } = useParams();
    const navigate = useNavigate();

    const { executeRequest } = useAxios(); // Custom hook for Axios API calls

    const handleChange = (e) => {
        setCode(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError(null);

            // Make API call to verify code
            const response = await executeRequest({
                method: 'post',
                url: verifyCode,
                data: { email, code },
                headers: { 'Content-Type': 'application/json' },
            });

            setLoading(false);
            navigate(`/login/reset-password/${email}`); // Navigate to next step (ResetPasswordForm)
        } catch (error) {
            setLoading(false);
            setError(error.response.data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Verify Email</h2>
            {error && <p className="error">{error}</p>}
            <p>Enter the verification code sent to your email.</p>
            <input type="text" value={code} onChange={handleChange} placeholder="Verification Code" required />
            <button type="submit" disabled={loading}>Verify</button>
        </form>
    );
};

export default VerifyEmailForm;
