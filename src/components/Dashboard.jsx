import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Sparkles, Bell, LogOut, Car, Calendar, Users, MapPin, Clock } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');
  const { user, logout } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [upcomingRides, setUpcomingRides] = useState([]);
  const [pastRides, setPastRides] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setIsVisible(true);
    fetchRides();
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleClick = (e) => {
      // Add particles on click
      const newParticles = Array.from({ length: 3 }, (_, i) => ({
        id: Date.now() + i,
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 15 + 5,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        life: 100
      }));
      setParticles(prev => [...prev, ...newParticles]);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    
    // Particle animation
    const particleInterval = setInterval(() => {
      setParticles(prev => 
        prev.map(p => ({ ...p, life: p.life - 1 }))
          .filter(p => p.life > 0)
      );
    }, 50);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      clearInterval(particleInterval);
    };
  }, []);

  const fetchRides = async () => {
    try {
      setLoading(true);
      // Fetch user's rides from backend
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      };

      const { data } = await axios.get(
        'http://localhost:5000/api/rides/myrides',
        config
      );

      // Separate upcoming and past rides
      const now = new Date();
      const upcoming = data.filter(ride => new Date(ride.time) > now);
      const past = data.filter(ride => new Date(ride.time) <= now);

      setUpcomingRides(upcoming);
      setPastRides(past);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to fetch rides');
      setLoading(false);
    }
  };

  // For now, we'll keep notifications as mock data
  // In a real implementation, you would fetch from backend
  useEffect(() => {
    setNotifications([
      {
        id: 1,
        message: 'Your ride to Connaught Place has been confirmed!',
        time: '2 hours ago',
        read: false
      },
      {
        id: 2,
        message: 'New ride partner joined your group to Saket',
        time: '1 day ago',
        read: true
      }
    ]);
  }, []);

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Mouse follower gradient
  const gradientStyle = {
    background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden relative">
      {/* Animated Background with Mouse Follow */}
      <div className="fixed inset-0 pointer-events-none" style={gradientStyle}></div>
      
      {/* Particles */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="particle rounded-full absolute pointer-events-none"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            background: particle.color,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ 
            scale: 1, 
            opacity: 0,
            x: (Math.random() - 0.5) * 100,
            y: (Math.random() - 0.5) * 100
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      ))}
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            y: [0, -50, 0],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            borderRadius: ["50%", "30%", "50%"],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Header */}
      <motion.header 
        className="bg-white/80 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-white/20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full px-4 py-6 flex justify-between items-center">
          <motion.div 
            className="animate-fade-in-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.name || 'User'}!</p>
          </motion.div>
          <motion.div 
            className="flex items-center space-x-4 animate-fade-in-right"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.button 
              className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors duration-300 rounded-full hover:bg-gray-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Bell className="h-6 w-6" />
              {unreadNotifications > 0 && (
                <motion.span 
                  className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {unreadNotifications}
                </motion.span>
              )}
            </motion.button>
            <div className="flex items-center">
              <motion.div 
                className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center text-white font-semibold shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {user?.avatar || user?.name?.charAt(0) || 'U'}
              </motion.div>
              <span className="ml-2 text-gray-700 font-medium">{user?.name?.split(' ').map(n => n[0]).join('') || 'User'}</span>
            </div>
            <motion.button 
              onClick={handleLogout}
              className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300 bg-gray-100/50 hover:bg-gray-200/50 px-3 py-2 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </motion.button>
          </motion.div>
        </div>
      </motion.header>

      <main className={`w-full px-4 py-6 transition-all duration-700 relative z-10`}>
        {/* Loading and Error States */}
        {loading && (
          <motion.div 
            className="flex justify-center items-center h-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="loading-spinner mr-2"></div>
            <span>Loading...</span>
          </motion.div>
        )}
        
        {error && (
          <motion.div 
            className="rounded-md bg-red-50 p-4 mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-sm text-red-700">
              {error}
            </div>
          </motion.div>
        )}
        
        {/* Quick Booking Form */}
        <motion.div 
          className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-6 mb-8 border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.h2 
            className="text-xl font-semibold text-gray-900 mb-4 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <Car className="mr-2 h-5 w-5 text-blue-600" />
            Book a Ride
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <motion.div 
              className="animate-fade-in-up"
              style={{ animationDelay: '0.1s' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <label htmlFor="pickup" className="block text-sm font-medium text-gray-700 mb-1">
                Pickup Location
              </label>
              <select
                id="pickup"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all duration-300 hover:shadow-md bg-white/50 backdrop-blur-sm"
              >
                <option>Select pickup location</option>
                <option>Delhi University North Campus</option>
                <option>Delhi University South Campus</option>
                <option>Jamia Millia Islamia</option>
                <option>NSIT</option>
                <option>IIT Delhi</option>
              </select>
            </motion.div>
            <motion.div 
              className="animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <label htmlFor="dropoff" className="block text-sm font-medium text-gray-700 mb-1">
                Dropoff Location
              </label>
              <select
                id="dropoff"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all duration-300 hover:shadow-md bg-white/50 backdrop-blur-sm"
              >
                <option>Select dropoff location</option>
                <option>Connaught Place</option>
                <option>Saket</option>
                <option>Karol Bagh</option>
                <option>South Extension</option>
                <option>DLF Cyber City</option>
              </select>
            </motion.div>
            <motion.div 
              className="animate-fade-in-up"
              style={{ animationDelay: '0.3s' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.3 }}
            >
              <label htmlFor="datetime" className="block text-sm font-medium text-gray-700 mb-1">
                Date & Time
              </label>
              <input
                type="datetime-local"
                id="datetime"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all duration-300 hover:shadow-md bg-white/50 backdrop-blur-sm"
              />
            </motion.div>
            <motion.div 
              className="flex items-end animate-fade-in-up"
              style={{ animationDelay: '0.4s' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.3 }}
            >
              <motion.button
                onClick={() => navigate('/booking')}
                className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Find Ride
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Tabs for Rides */}
        <motion.div 
          className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-6 mb-8 border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'upcoming'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Upcoming Rides
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'past'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Past Rides
              </button>
            </nav>
          </div>

          {/* Rides List */}
          <div className="mt-6">
            {activeTab === 'upcoming' && (
              <div className="space-y-4">
                {upcomingRides.length === 0 ? (
                  <motion.div 
                    className="text-center py-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Car className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No upcoming rides</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by booking a new ride.</p>
                    <div className="mt-6">
                      <motion.button
                        onClick={() => navigate('/booking')}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Book a Ride
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  upcomingRides.map((ride, index) => (
                    <motion.div 
                      key={ride._id}
                      className="flex items-center p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.3 }}
                    >
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                          <Calendar className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-900">{ride.pickup.address} to {ride.drop.address}</h3>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {ride.mode}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          <span>{new Date(ride.time).toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <span className="text-lg font-bold text-gray-900">₹{ride.fareEstimate}</span>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'past' && (
              <div className="space-y-4">
                {pastRides.length === 0 ? (
                  <motion.div 
                    className="text-center py-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No past rides</h3>
                    <p className="mt-1 text-sm text-gray-500">Your completed rides will appear here.</p>
                  </motion.div>
                ) : (
                  pastRides.map((ride, index) => (
                    <motion.div 
                      key={ride._id}
                      className="flex items-center p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.3 }}
                    >
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                          <Calendar className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-900">{ride.pickup.address} to {ride.drop.address}</h3>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Completed
                          </span>
                        </div>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          <span>{new Date(ride.time).toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <span className="text-lg font-bold text-gray-900">₹{ride.fareEstimate}</span>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            )}
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div 
          className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-6 mb-8 border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.h2 
            className="text-xl font-semibold text-gray-900 mb-4 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <Bell className="mr-2 h-5 w-5 text-blue-600" />
            Notifications
          </motion.h2>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <motion.div 
                key={notification.id} 
                className={`p-4 rounded-md transition-all duration-300 hover:shadow-md ${!notification.read ? 'bg-blue-50/50 backdrop-blur-sm' : 'bg-gray-50/50 backdrop-blur-sm'} animate-fade-in-up`}
                style={{ animationDelay: `${0.1 * notification.id}s` }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + (0.1 * notification.id), duration: 0.3 }}
              >
                <div className="flex justify-between">
                  <p className={`${!notification.read ? 'text-blue-800 font-medium' : 'text-gray-700'}`}>
                    {notification.message}
                  </p>
                  <span className="text-xs text-gray-500">{notification.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;