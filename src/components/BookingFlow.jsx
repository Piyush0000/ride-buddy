import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { popularPickupLocations, popularDropoffLocations } from '../utils/mapUtils.js';
import { calculateFareBreakdown } from '../utils/paymentUtils.js';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Car, Users, CreditCard, MapPin, Calendar, Clock } from 'lucide-react';

const BookingFlow = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setIsVisible(true);
    
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
        <div className="w-full px-4 py-6">
          <div className="flex justify-between items-center">
            <motion.h1 
              className="text-2xl font-bold text-gray-900 animate-fade-in-left flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Car className="mr-2 h-6 w-6 text-blue-600" />
              Book a Ride
            </motion.h1>
            <motion.button
              onClick={() => navigate('/dashboard')}
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300 animate-fade-in-right flex items-center bg-blue-50/50 hover:bg-blue-100/50 px-3 py-2 rounded-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowRight className="mr-1 h-4 w-4 transform rotate-180" />
              Back to Dashboard
            </motion.button>
          </div>
        </div>
      </motion.header>

      <main className={`w-full px-4 py-6 transition-all duration-700 relative z-10`}>
        {/* Progress Bar */}
        <motion.div 
          className="mb-8 animate-fade-in-up"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex justify-between">
            <div className="flex-1 flex flex-col items-center">
              <motion.div 
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                  step >= 1 ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white scale-110 shadow-lg' : 'bg-gray-200 text-gray-600'
                }`}
                whileHover={{ scale: step >= 1 ? 1.1 : 1 }}
              >
                1
              </motion.div>
              <div className="mt-2 text-sm font-medium text-gray-900">Route Selection</div>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <motion.div 
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                  step >= 2 ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white scale-110 shadow-lg' : 'bg-gray-200 text-gray-600'
                }`}
                whileHover={{ scale: step >= 2 ? 1.1 : 1 }}
              >
                2
              </motion.div>
              <div className="mt-2 text-sm font-medium text-gray-900">Group Matching</div>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <motion.div 
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                  step >= 3 ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white scale-110 shadow-lg' : 'bg-gray-200 text-gray-600'
                }`}
                whileHover={{ scale: step >= 3 ? 1.1 : 1 }}
              >
                3
              </motion.div>
              <div className="mt-2 text-sm font-medium text-gray-900">Payment & Confirmation</div>
            </div>
          </div>
          <div className="mt-4 flex">
            <motion.div 
              className={`flex-1 h-1 transition-all duration-500 ${step >= 1 ? 'bg-gradient-to-r from-blue-600 to-indigo-700' : 'bg-gray-200'}`}
              initial={{ width: 0 }}
              animate={{ width: step >= 1 ? '100%' : '0%' }}
              transition={{ delay: 0.3, duration: 0.5 }}
            ></motion.div>
            <motion.div 
              className={`flex-1 h-1 transition-all duration-500 ${step >= 2 ? 'bg-gradient-to-r from-blue-600 to-indigo-700' : 'bg-gray-200'}`}
              initial={{ width: 0 }}
              animate={{ width: step >= 2 ? '100%' : '0%' }}
              transition={{ delay: 0.4, duration: 0.5 }}
            ></motion.div>
          </div>
        </motion.div>

        {/* Step Content */}
        <motion.div 
          className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-6 card-hover border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {step === 1 && <RouteSelection onNext={() => setStep(2)} pickupLocations={popularPickupLocations} dropoffLocations={popularDropoffLocations} />}
          {step === 2 && <GroupMatching onNext={() => setStep(3)} onBack={() => setStep(1)} user={user} />}
          {step === 3 && <PaymentConfirmation onBack={() => setStep(2)} user={user} />}
        </motion.div>
      </main>
    </div>
  );
};

// Step 1: Route Selection
const RouteSelection = ({ onNext, pickupLocations, dropoffLocations }) => {
  const [formData, setFormData] = useState({
    pickup: '',
    dropoff: '',
    date: '',
    time: '',
    rideType: 'shared'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.pickup || !formData.dropoff || !formData.date || !formData.time) {
      setError('Please fill in all fields');
      return;
    }
    
    // Validate date and time
    const selectedDateTime = new Date(`${formData.date}T${formData.time}`);
    const now = new Date();
    if (selectedDateTime < now) {
      setError('Please select a future date and time');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Combine date and time
      const dateTime = new Date(`${formData.date}T${formData.time}`);
      
      // Prepare ride data with coordinates
      const rideData = {
        pickup: {
          address: formData.pickup,
          lat: 28.6139, // Default coordinates for Delhi
          lng: 77.2090
        },
        drop: {
          address: formData.dropoff,
          lat: 28.6330, // Default coordinates for Delhi
          lng: 77.2190
        },
        time: dateTime.toISOString(),
        mode: formData.rideType
      };
      
      // Submit to backend
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      };
      
      const { data } = await axios.post(
        'http://localhost:5000/api/rides',
        rideData,
        config
      );
      
      console.log('Ride created:', data);
      onNext();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to create ride');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <motion.h2 
        className="text-xl font-semibold text-gray-900 mb-6 animate-fade-in-up flex items-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <MapPin className="mr-2 h-5 w-5 text-blue-600" />
        Select Your Route
      </motion.h2>
      
      {error && (
        <motion.div 
          className="rounded-md bg-red-50 p-4 mb-6 animate-fade-in-up"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-sm text-red-700">
            {error}
          </div>
        </motion.div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            className="animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <label htmlFor="pickup" className="block text-sm font-medium text-gray-700 mb-1">
              Pickup Location
            </label>
            <select
              id="pickup"
              name="pickup"
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all duration-300 hover:shadow-md bg-white/50 backdrop-blur-sm"
              value={formData.pickup}
              onChange={handleChange}
            >
              <option value="">Select pickup location</option>
              {pickupLocations.map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))}
            </select>
          </motion.div>
          
          <motion.div 
            className="animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <label htmlFor="dropoff" className="block text-sm font-medium text-gray-700 mb-1">
              Dropoff Location
            </label>
            <select
              id="dropoff"
              name="dropoff"
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all duration-300 hover:shadow-md bg-white/50 backdrop-blur-sm"
              value={formData.dropoff}
              onChange={handleChange}
            >
              <option value="">Select dropoff location</option>
              {dropoffLocations.map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))}
            </select>
          </motion.div>
          
          <motion.div 
            className="animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all duration-300 hover:shadow-md bg-white/50 backdrop-blur-sm"
              value={formData.date}
              onChange={handleChange}
            />
          </motion.div>
          
          <motion.div 
            className="animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all duration-300 hover:shadow-md bg-white/50 backdrop-blur-sm"
              value={formData.time}
              onChange={handleChange}
            />
          </motion.div>
        </div>
        
        <motion.div 
          className="animate-fade-in-up"
          style={{ animationDelay: '0.5s' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ride Type
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div 
              className={`border rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-md ${
                formData.rideType === 'shared' ? 'border-blue-500 bg-blue-50/50 scale-105 shadow-lg' : 'border-gray-300'
              }`}
              onClick={() => setFormData({...formData, rideType: 'shared'})}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center">
                <div className={`h-5 w-5 rounded-full border flex items-center justify-center mr-3 transition-all duration-300 ${
                  formData.rideType === 'shared' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                }`}>
                  {formData.rideType === 'shared' && (
                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 flex items-center">
                    <Users className="mr-2 h-4 w-4 text-blue-600" />
                    Find Ride Partners
                  </h3>
                  <p className="text-sm text-gray-500">Share the ride and cost with fellow students</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className={`border rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-md ${
                formData.rideType === 'solo' ? 'border-blue-500 bg-blue-50/50 scale-105 shadow-lg' : 'border-gray-300'
              }`}
              onClick={() => setFormData({...formData, rideType: 'solo'})}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center">
                <div className={`h-5 w-5 rounded-full border flex items-center justify-center mr-3 transition-all duration-300 ${
                  formData.rideType === 'solo' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                }`}>
                  {formData.rideType === 'solo' && (
                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 flex items-center">
                    <Car className="mr-2 h-4 w-4 text-blue-600" />
                    Solo Ride
                  </h3>
                  <p className="text-sm text-gray-500">Book a private ride for yourself</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex justify-end animate-fade-in-up"
          style={{ animationDelay: '0.6s' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.3 }}
        >
          <motion.button
            type="submit"
            disabled={loading}
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
          >
            {loading ? (
              <>
                <div className="loading-spinner mr-2"></div>
                Creating Ride...
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </motion.button>
        </motion.div>
      </form>
    </div>
  );
};

// Step 2: Group Matching
const GroupMatching = ({ onNext, onBack, user }) => {
  const [group, setGroup] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [fareBreakdown, setFareBreakdown] = useState({
    baseFare: 0,
    platformFee: 0,
    totalFare: 0,
    perPersonFare: 0
  });

  useEffect(() => {
    fetchGroupData();
  }, []);

  const fetchGroupData = async () => {
    try {
      setLoading(true);
      // In a real app, you would fetch the actual group data from the backend
      // For now, we'll simulate with dummy data
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const dummyGroup = [
        { id: 1, name: 'Priya Sharma', avatar: 'PS', status: 'confirmed' },
        { id: 2, name: 'Rahul Verma', avatar: 'RV', status: 'confirmed' },
        { id: 3, name: user?.name || 'You', avatar: user?.avatar || 'YO', status: 'pending' }
      ];
      
      setGroup(dummyGroup);
      
      // Calculate fare breakdown
      const breakdown = calculateFareBreakdown(900, dummyGroup.length, 50);
      setFareBreakdown(breakdown);
      
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to load group data');
      setLoading(false);
    }
  };

  const confirmedMembers = group.filter(member => member.status === 'confirmed').length;
  const totalMembers = group.length;

  const handleJoinGroup = () => {
    // In a real app, this would join the user to the group
    setGroup(group.map(member => 
      member.id === 3 ? {...member, status: 'confirmed'} : member
    ));
  };

  return (
    <div>
      <motion.h2 
        className="text-xl font-semibold text-gray-900 mb-6 animate-fade-in-up flex items-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <Users className="mr-2 h-5 w-5 text-blue-600" />
        Find Ride Partners
      </motion.h2>
      
      {loading && (
        <motion.div 
          className="flex justify-center items-center h-64"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="loading-spinner mr-2"></div>
          <span>Loading group data...</span>
        </motion.div>
      )}
      
      {error && (
        <motion.div 
          className="rounded-md bg-red-50 p-4 mb-6 animate-fade-in-up"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-sm text-red-700">
            {error}
          </div>
        </motion.div>
      )}
      
      {!loading && !error && (
        <>
          <motion.div 
            className="mb-8 animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Your Group</h3>
              <motion.span 
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                {confirmedMembers} of {totalMembers} members confirmed
              </motion.span>
            </div>
            
            <div className="bg-gray-50/50 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
              <div className="flex justify-center space-x-6 mb-6">
                {group.map((member) => (
                  <motion.div 
                    key={member.id} 
                    className="flex flex-col items-center animate-fade-in-up"
                    style={{ animationDelay: `${0.1 * member.id}s` }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + (0.1 * member.id), duration: 0.3 }}
                  >
                    <motion.div 
                      className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-semibold mb-2 transition-all duration-500 ${
                        member.status === 'confirmed' ? 'bg-gradient-to-r from-blue-600 to-indigo-700 scale-110 shadow-lg' : 'bg-gray-400'
                      }`}
                      whileHover={{ scale: member.status === 'confirmed' ? 1.1 : 1.05 }}
                    >
                      {member.avatar}
                    </motion.div>
                    <span className={`text-sm font-medium transition-all duration-300 ${
                      member.status === 'confirmed' ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {member.name}
                    </span>
                    {member.status === 'pending' && (
                      <span className="text-xs text-gray-500 mt-1">(Pending)</span>
                    )}
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="text-center animate-fade-in-up"
                style={{ animationDelay: '0.4s' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.3 }}
              >
                <p className="text-gray-600 mb-4">
                  Waiting for {user?.name || 'you'} to confirm. Share this link with friends to join your group:
                </p>
                <div className="flex">
                  <input
                    type="text"
                    readOnly
                    value="https://ridebuddy.com/group/abc123"
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-300 hover:shadow-md bg-white/50 backdrop-blur-sm"
                  />
                  <motion.button 
                    className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50/50 text-gray-500 sm:text-sm transition-all duration-300 hover:bg-gray-100/50 backdrop-blur-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Copy
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="mb-8 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.3 }}
          >
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <CreditCard className="mr-2 h-5 w-5 text-blue-600" />
              Cost Breakdown
            </h3>
            <div className="bg-gray-50/50 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
              <div className="space-y-2">
                <motion.div 
                  className="flex justify-between animate-fade-in-up"
                  style={{ animationDelay: '0.1s' }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9, duration: 0.3 }}
                >
                  <span className="text-gray-600">Uber Fare</span>
                  <span className="font-medium">₹{fareBreakdown.baseFare}</span>
                </motion.div>
                <motion.div 
                  className="flex justify-between animate-fade-in-up"
                  style={{ animationDelay: '0.2s' }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0, duration: 0.3 }}
                >
                  <span className="text-gray-600">Platform Fee</span>
                  <span className="font-medium">₹{fareBreakdown.platformFee}</span>
                </motion.div>
                <motion.div 
                  className="border-t border-gray-200 pt-2 flex justify-between animate-fade-in-up"
                  style={{ animationDelay: '0.3s' }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1, duration: 0.3 }}
                >
                  <span className="text-gray-900 font-medium">Total Fare</span>
                  <span className="text-gray-900 font-medium">₹{fareBreakdown.totalFare}</span>
                </motion.div>
                <motion.div 
                  className="border-t border-gray-200 pt-2 flex justify-between animate-fade-in-up"
                  style={{ animationDelay: '0.4s' }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.3 }}
                >
                  <span className="text-blue-600 font-medium">Your Share ({totalMembers} people)</span>
                  <span className="text-blue-600 font-bold text-lg">₹{fareBreakdown.perPersonFare}</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex justify-between animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.3 }}
          >
            <motion.button
              onClick={onBack}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white/50 hover:bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back
            </motion.button>
            <div className="space-x-3">
              <motion.button 
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white/50 hover:bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Group Chat
              </motion.button>
              <motion.button
                onClick={onNext}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Proceed to Payment
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

// Step 3: Payment & Confirmation
const PaymentConfirmation = ({ onBack, user }) => {
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fareBreakdown, setFareBreakdown] = useState({
    baseFare: 0,
    platformFee: 0,
    totalFare: 0,
    perPersonFare: 0
  });

  useEffect(() => {
    // In a real app, you would fetch the actual fare breakdown from the backend
    // For now, we'll use dummy data
    const breakdown = calculateFareBreakdown(900, 4, 50);
    setFareBreakdown(breakdown);
  }, []);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // In a real app, this would process the payment through Razorpay
      
      // Step 1: Initiate payment with backend
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      };
      
      // For demo purposes, we'll use a fixed group ID
      // In a real app, you would get this from the ride/group creation
      const groupId = 'demo-group-id';
      
      const paymentData = {
        groupId,
        amount: fareBreakdown.perPersonFare
      };
      
      const { data } = await axios.post(
        'http://localhost:5000/api/payments/initiate',
        paymentData,
        config
      );
      
      console.log('Payment initiated:', data);
      
      // Step 2: Simulate Razorpay checkout
      // In a real app, you would load the Razorpay script and open the checkout
      
      alert('In a real app, this would open the Razorpay checkout. Payment successful! Your ride has been booked.');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCardChange = (e) => {
    setCardDetails({
      ...cardDetails,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <motion.h2 
        className="text-xl font-semibold text-gray-900 mb-6 animate-fade-in-up flex items-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <CreditCard className="mr-2 h-5 w-5 text-blue-600" />
        Payment & Confirmation
      </motion.h2>
      
      {error && (
        <motion.div 
          className="rounded-md bg-red-50 p-4 mb-6 animate-fade-in-up"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-sm text-red-700">
            {error}
          </div>
        </motion.div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div 
          className="animate-fade-in-up"
          style={{ animationDelay: '0.1s' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Car className="mr-2 h-5 w-5 text-blue-600" />
            Ride Details
          </h3>
          <div className="bg-gray-50/50 backdrop-blur-sm rounded-lg p-4 mb-6 border border-gray-200">
            <div className="flex justify-between mb-3">
              <div>
                <p className="font-medium">Delhi University North Campus</p>
                <p className="text-sm text-gray-600">Dec 15, 2023 at 6:30 PM</p>
              </div>
              <div className="text-right">
                <p className="font-medium">Connaught Place</p>
                <p className="text-sm text-gray-600">Estimated arrival: 7:15 PM</p>
              </div>
            </div>
            <div className="flex justify-center my-2">
              <div className="h-8 w-0.5 bg-gray-300"></div>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Shared ride with 3 other students
            </div>
          </div>
          
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <CreditCard className="mr-2 h-5 w-5 text-blue-600" />
            Cost Breakdown
          </h3>
          <div className="bg-gray-50/50 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
            <div className="space-y-2">
              <motion.div 
                className="flex justify-between animate-fade-in-up"
                style={{ animationDelay: '0.1s' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <span className="text-gray-600">Uber Fare</span>
                <span className="font-medium">₹{fareBreakdown.baseFare}</span>
              </motion.div>
              <motion.div 
                className="flex justify-between animate-fade-in-up"
                style={{ animationDelay: '0.2s' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <span className="text-gray-600">Platform Fee</span>
                <span className="font-medium">₹{fareBreakdown.platformFee}</span>
              </motion.div>
              <motion.div 
                className="border-t border-gray-200 pt-2 flex justify-between animate-fade-in-up"
                style={{ animationDelay: '0.3s' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <span className="text-gray-900 font-medium">Total Fare</span>
                <span className="text-gray-900 font-medium">₹{fareBreakdown.totalFare}</span>
              </motion.div>
              <motion.div 
                className="border-t border-gray-200 pt-2 flex justify-between animate-fade-in-up"
                style={{ animationDelay: '0.4s' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.3 }}
              >
                <span className="text-blue-600 font-medium">Your Share (4 people)</span>
                <span className="text-blue-600 font-bold text-lg">₹{fareBreakdown.perPersonFare}</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.3 }}
        >
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <CreditCard className="mr-2 h-5 w-5 text-blue-600" />
            Payment Method
          </h3>
          <form onSubmit={handlePayment} className="space-y-6">
            <div className="space-y-4">
              <motion.div 
                className={`border rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-md ${
                  paymentMethod === 'upi' ? 'border-blue-500 bg-blue-50/50 scale-105 shadow-lg' : 'border-gray-300'
                }`}
                onClick={() => setPaymentMethod('upi')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center">
                  <div className={`h-5 w-5 rounded-full border flex items-center justify-center mr-3 transition-all duration-300 ${
                    paymentMethod === 'upi' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                  }`}>
                    {paymentMethod === 'upi' && (
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">UPI Payment</h3>
                    <p className="text-sm text-gray-500">Pay using any UPI app (Google Pay, PhonePe, etc.)</p>
                  </div>
                </div>
                {paymentMethod === 'upi' && (
                  <motion.div 
                    className="mt-4 animate-fade-in-up"
                    style={{ animationDelay: '0.1s' }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.3 }}
                  >
                    <label htmlFor="upi-id" className="block text-sm font-medium text-gray-700 mb-1">
                      UPI ID
                    </label>
                    <input
                      type="text"
                      id="upi-id"
                      placeholder="yourname@upi"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all duration-300 hover:shadow-md bg-white/50 backdrop-blur-sm"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      required
                    />
                  </motion.div>
                )}
              </motion.div>
              
              <motion.div 
                className={`border rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-md ${
                  paymentMethod === 'card' ? 'border-blue-500 bg-blue-50/50 scale-105 shadow-lg' : 'border-gray-300'
                }`}
                onClick={() => setPaymentMethod('card')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center">
                  <div className={`h-5 w-5 rounded-full border flex items-center justify-center mr-3 transition-all duration-300 ${
                    paymentMethod === 'card' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                  }`}>
                    {paymentMethod === 'card' && (
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Credit/Debit Card</h3>
                    <p className="text-sm text-gray-500">Pay with your credit or debit card</p>
                  </div>
                </div>
                {paymentMethod === 'card' && (
                  <motion.div 
                    className="mt-4 space-y-4 animate-fade-in-up"
                    style={{ animationDelay: '0.1s' }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.3 }}
                  >
                    <div>
                      <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        id="card-number"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all duration-300 hover:shadow-md bg-white/50 backdrop-blur-sm"
                        value={cardDetails.cardNumber}
                        onChange={handleCardChange}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          id="expiry"
                          name="expiry"
                          placeholder="MM/YY"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all duration-300 hover:shadow-md bg-white/50 backdrop-blur-sm"
                          value={cardDetails.expiry}
                          onChange={handleCardChange}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          placeholder="123"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all duration-300 hover:shadow-md bg-white/50 backdrop-blur-sm"
                          value={cardDetails.cvv}
                          onChange={handleCardChange}
                          required
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
            
            <motion.div 
              className="flex justify-between animate-fade-in-up"
              style={{ animationDelay: '0.3s' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.3 }}
            >
              <motion.button
                type="button"
                onClick={onBack}
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white/50 hover:bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={loading}
              >
                Back
              </motion.button>
              <motion.button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                whileHover={{ scale: loading ? 1 : 1.05 }}
                whileTap={{ scale: loading ? 1 : 0.95 }}
              >
                {loading ? (
                  <>
                    <div className="loading-spinner mr-2"></div>
                    Processing Payment...
                  </>
                ) : (
                  `Pay ₹${fareBreakdown.perPersonFare}`
                )}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingFlow;