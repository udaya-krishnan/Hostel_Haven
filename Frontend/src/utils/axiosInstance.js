import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Logout } from '../features/User/auth/authSlice';


const axiosInstance = axios.create({
  baseURL: '', 
  withCredentials: true,
});

// Interceptor to handle token refresh logic
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request to avoid infinite loops

      try {
        // Send request to refresh token endpoint
        const refreshResponse = await axios.post(
          `http://localhost:3000/refresh`, // Replace with your refresh token endpoint
          {},
          { withCredentials: true } // Send cookies (refreshToken) with the request
        );

        // Extract new access token
        const { accessToken } = refreshResponse.data;

        // Update the access token in the store and axios instance headers
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
        
        // // Optionally dispatch an action to update the token in Redux store
        // useDispatch(updateAccessToken(accessToken));

        // Retry the original request with the new access token
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        useDispatch(Logout());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
