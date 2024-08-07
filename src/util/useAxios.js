import { useState } from 'react';
import axios from 'axios';

const useAxios = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeRequest = async (config) => {
    try {
      setLoading(true);
      setError(null);

      // Make Axios request using the provided config
      const response = await axios(config);
      setLoading(false);
      return response.data; // Return data from the response
    } catch (err) {
      setLoading(false);
      setError(err);
      throw error; // Re-throw error for the calling component to handle
    }
  };

  return { executeRequest, loading, error };
};

export default useAxios;
