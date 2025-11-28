// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

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
    // Check if user is logged in (in a real app, you would verify the token with backend)
    const token = localStorage.getItem('authToken');
    if (token) {
      // Simulate fetching user data
      setTimeout(() => {
        setUser({
          id: 1,
          name: 'Priya Sharma',
          email: 'priya@du.edu.in',
          college: 'Delhi University',
          avatar: 'PS'
        });
        setLoading(false);
      }, 500);
    } else {
      setLoading(false);
    }
  }, []);

  const login = (email, password) => {
    // In a real app, you would call the API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email.endsWith('.edu.in') && password) {
          const userData = {
            id: 1,
            name: 'Priya Sharma',
            email: email,
            college: 'Delhi University',
            avatar: 'PS'
          };
          setUser(userData);
          localStorage.setItem('authToken', 'fake-jwt-token');
          resolve(userData);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const register = (userData) => {
    // In a real app, you would call the API
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          id: Date.now(),
          name: userData.fullName,
          email: userData.email,
          college: 'Delhi University',
          avatar: userData.fullName.split(' ').map(n => n[0]).join('')
        };
        setUser(newUser);
        localStorage.setItem('authToken', 'fake-jwt-token');
        resolve(newUser);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};