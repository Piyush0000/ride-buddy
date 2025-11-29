// src/services/api.js
import axios from 'axios';

// In a real application, this would be your backend API URL
const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  login: (email, password) => 
    api.post('/auth/login', { email, password }),
  
  register: (userData) => 
    api.post('/auth/register', userData),
  
  logout: () => {
    localStorage.removeItem('authToken');
  }
};

// Booking APIs
export const bookingAPI = {
  createBooking: (bookingData) => 
    api.post('/bookings', bookingData),
  
  getBookings: (userId) => 
    api.get(`/bookings/user/${userId}`),
  
  getBookingById: (bookingId) => 
    api.get(`/bookings/${bookingId}`),
  
  cancelBooking: (bookingId) => 
    api.delete(`/bookings/${bookingId}`)
};

// Group APIs
export const groupAPI = {
  createGroup: (groupData) => 
    api.post('/groups', groupData),
  
  getGroupById: (groupId) => 
    api.get(`/groups/${groupId}`),
  
  joinGroup: (groupId, userId) => 
    api.post(`/groups/${groupId}/members`, { userId }),
  
  leaveGroup: (groupId, userId) => 
    api.delete(`/groups/${groupId}/members/${userId}`),
  
  getGroupMembers: (groupId) => 
    api.get(`/groups/${groupId}/members`)
};

// Payment APIs
export const paymentAPI = {
  processPayment: (paymentData) => 
    api.post('/payments', paymentData),
  
  getPaymentStatus: (paymentId) => 
    api.get(`/payments/${paymentId}`)
};

// Uber APIs
export const uberAPI = {
  createUberLink: (rideData) => 
    api.post('/uber/create-link', rideData),
  
  uploadRideProof: (proofData) => 
    api.post('/uber/upload-proof', proofData),
  
  getMyTrackingRecords: () => 
    api.get('/uber/my-tracking'),
  
  getTrackingRecord: (trackingId) => 
    api.get(`/uber/tracking/${trackingId}`)
};

// Notification APIs
export const notificationAPI = {
  getNotifications: (userId) => 
    api.get(`/notifications/user/${userId}`),
  
  markAsRead: (notificationId) => 
    api.put(`/notifications/${notificationId}/read`)
};

export default api;