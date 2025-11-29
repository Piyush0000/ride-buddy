// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('authToken');
    if (token) {
      // Verify token with backend to get real user data
      const fetchUserProfile = async () => {
        try {
          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          };

          const { data } = await axios.get(
            'http://localhost:5000/api/auth/profile',
            config
          );

          setUser(data);
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
          localStorage.removeItem('authToken');
        } finally {
          setLoading(false);
        }
      };

      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      console.log('Attempting login with:', { email }); // Log attempt

      const { data } = await axios.post(
        'http://localhost:5000/api/auth/login',
        { email, password },
        config
      );

      console.log('Login success:', data); // Log success

      localStorage.setItem('authToken', data.token);
      setUser(data);
      return data;
    } catch (error) {
      console.error('Login Error:', error);
      if (error.response) {
        console.error('Error Response:', error.response.data);
        console.error('Error Status:', error.response.status);
      } else if (error.request) {
        console.error('Error Request:', error.request);
      } else {
        console.error('Error Message:', error.message);
      }
      throw new Error(error.response && error.response.data.message
        ? error.response.data.message
        : error.message);
    }
  };

  const register = async (userData) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      console.log('Attempting register with:', userData); // Log attempt

      const { data } = await axios.post(
        'http://localhost:5000/api/auth/register',
        userData,
        config
      );

      console.log('Register success:', data); // Log success

      localStorage.setItem('authToken', data.token);
      setUser(data);
      return data;
    } catch (error) {
      console.error('Register Error:', error);
      if (error.response) {
        console.error('Error Response:', error.response.data);
      }
      throw new Error(error.response && error.response.data.message
        ? error.response.data.message
        : error.message);
    }
  };

  const googleLogin = async (credentialResponse) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        'http://localhost:5000/api/auth/google',
        { idToken: credentialResponse.credential },
        config
      );

      localStorage.setItem('authToken', data.token);
      setUser(data);
      return data;
    } catch (error) {
       console.error('Google Login Error:', error);
       throw new Error(error.response && error.response.data.message
        ? error.response.data.message
        : error.message);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
  };

  const value = {
    user,
    login,
    register,
    googleLogin,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};