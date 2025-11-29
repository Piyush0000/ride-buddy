import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Users, Car, CreditCard, Calendar, DollarSign, Plus, Eye, X, TrendingUp } from 'lucide-react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [groups, setGroups] = useState([]);
  const [commissionData, setCommissionData] = useState({
    totalCommission: '₹0',
    thisMonth: '₹0',
    lastMonth: '₹0',
    bookingsCount: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setIsVisible(true);
    fetchAdminData();
    
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

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      };
      
      // In a real implementation, you would have specific admin endpoints
      // For now, we'll simulate with dummy data
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data for bookings
      const mockBookings = [
        { id: 1, user: 'Priya Sharma', pickup: 'DU North Campus', dropoff: 'Connaught Place', date: '2023-12-15', time: '18:30', status: 'Confirmed', groupSize: 4, commission: '₹50' },
        { id: 2, user: 'Rahul Verma', pickup: 'JMI', dropoff: 'Saket', date: '2023-12-16', time: '14:00', status: 'Pending', groupSize: 2, commission: '₹30' },
        { id: 3, user: 'Anjali Gupta', pickup: 'NSIT', dropoff: 'Karol Bagh', date: '2023-12-17', time: '09:00', status: 'Completed', groupSize: 3, commission: '₹40' }
      ];
      
      // Mock data for groups
      const mockGroups = [
        { id: 'G001', members: 4, pickup: 'DU North Campus', dropoff: 'Connaught Place', date: '2023-12-15', status: 'Active' },
        { id: 'G002', members: 2, pickup: 'JMI', dropoff: 'Saket', date: '2023-12-16', status: 'Pending' },
        { id: 'G003', members: 3, pickup: 'NSIT', dropoff: 'Karol Bagh', date: '2023-12-17', status: 'Completed' }
      ];
      
      // Mock data for commission
      const mockCommissionData = {
        totalCommission: '₹2,450',
        thisMonth: '₹850',
        lastMonth: '₹1,200',
        bookingsCount: 42
      };
      
      setBookings(mockBookings);
      setGroups(mockGroups);
      setCommissionData(mockCommissionData);
      
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to load admin data');
      setLoading(false);
    }
  };

  // Mouse follower gradient
  const gradientStyle = {
    background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden relative flex items-center justify-center">
        {/* Animated Background with Mouse Follow */}
        <div className="fixed inset-0 pointer-events-none" style={gradientStyle}></div>
        
        <div className="flex flex-col items-center">
          <div className="loading-spinner mr-2 mb-4"></div>
          <span>Loading admin data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden relative flex items-center justify-center">
        {/* Animated Background with Mouse Follow */}
        <div className="fixed inset-0 pointer-events-none" style={gradientStyle}></div>
        
        <motion.div 
          className="rounded-md bg-red-50 p-4 max-w-md backdrop-blur-lg border border-red-200"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-sm text-red-700">
            {error}
          </div>
          <motion.button 
            onClick={fetchAdminData}
            className="mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Retry
          </motion.button>
        </motion.div>
      </div>
    );
  }

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
              <TrendingUp className="mr-2 h-6 w-6 text-blue-600" />
              Admin Dashboard
            </motion.h1>
            <motion.button 
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300 animate-fade-in-right flex items-center bg-blue-50/50 hover:bg-blue-100/50 px-3 py-2 rounded-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="mr-1 h-4 w-4" />
              Logout
            </motion.button>
          </div>
        </div>
      </motion.header>

      <main className={`w-full px-4 py-6 transition-all duration-700 relative z-10`}>
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div 
            className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-6 border border-white/20"
            style={{ animationDelay: '0.1s' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">Total Commission</h3>
                <p className="text-2xl font-semibold text-gray-900">{commissionData.totalCommission}</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-6 border border-white/20"
            style={{ animationDelay: '0.2s' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">This Month</h3>
                <p className="text-2xl font-semibold text-gray-900">{commissionData.thisMonth}</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-6 border border-white/20"
            style={{ animationDelay: '0.3s' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100">
                <Users className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">Total Bookings</h3>
                <p className="text-2xl font-semibold text-gray-900">{commissionData.bookingsCount}</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-6 border border-white/20"
            style={{ animationDelay: '0.4s' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100">
                <Car className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">Active Groups</h3>
                <p className="text-2xl font-semibold text-gray-900">12</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <motion.div 
          className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl overflow-hidden border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <motion.button
                onClick={() => setActiveTab('bookings')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm transition-all duration-300 flex items-center justify-center ${
                  activeTab === 'bookings'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Car className="mr-2 h-4 w-4" />
                Bookings
              </motion.button>
              <motion.button
                onClick={() => setActiveTab('groups')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm transition-all duration-300 flex items-center justify-center ${
                  activeTab === 'groups'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Users className="mr-2 h-4 w-4" />
                Groups
              </motion.button>
              <motion.button
                onClick={() => setActiveTab('commission')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm transition-all duration-300 flex items-center justify-center ${
                  activeTab === 'commission'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Commission
              </motion.button>
              <motion.button
                onClick={() => setActiveTab('manual')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm transition-all duration-300 flex items-center justify-center ${
                  activeTab === 'manual'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Manual Booking
              </motion.button>
            </nav>
          </div>
          
          <div className="p-6">
            {activeTab === 'bookings' && <BookingsTable bookings={bookings} />}
            {activeTab === 'groups' && <GroupsTable groups={groups} />}
            {activeTab === 'commission' && <CommissionStats data={commissionData} />}
            {activeTab === 'manual' && <ManualBookingForm />}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

// Bookings Table Component
const BookingsTable = ({ bookings }) => {
  return (
    <div>
      <motion.h2 
        className="text-lg font-medium text-gray-900 mb-4 animate-fade-in-up flex items-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <Car className="mr-2 h-5 w-5 text-blue-600" />
        Recent Bookings
      </motion.h2>
      <motion.div 
        className="overflow-x-auto animate-fade-in-up"
        style={{ animationDelay: '0.1s' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50/50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Booking ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Route
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Group Size
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Commission
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white/50 divide-y divide-gray-200">
            {bookings.map((booking) => (
              <motion.tr 
                key={booking.id} 
                className="animate-fade-in-up"
                style={{ animationDelay: `${0.1 * booking.id}s` }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (0.1 * booking.id), duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{booking.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {booking.user}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {booking.pickup} → {booking.dropoff}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {booking.date} at {booking.time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {booking.groupSize}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <motion.span 
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full transition-all duration-300 ${
                      booking.status === 'Confirmed' ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800' :
                      booking.status === 'Pending' ? 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800' :
                      'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {booking.status}
                  </motion.span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {booking.commission}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <motion.button 
                    className="text-blue-600 hover:text-blue-900 mr-3 transition-colors duration-300 bg-blue-50/50 hover:bg-blue-100/50 px-2 py-1 rounded"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Eye className="h-4 w-4 inline mr-1" />
                    View
                  </motion.button>
                  <motion.button 
                    className="text-red-600 hover:text-red-900 transition-colors duration-300 bg-red-50/50 hover:bg-red-100/50 px-2 py-1 rounded"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="h-4 w-4 inline mr-1" />
                    Cancel
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

// Groups Table Component
const GroupsTable = ({ groups }) => {
  return (
    <div>
      <motion.h2 
        className="text-lg font-medium text-gray-900 mb-4 animate-fade-in-up flex items-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <Users className="mr-2 h-5 w-5 text-blue-600" />
        Active Groups
      </motion.h2>
      <motion.div 
        className="overflow-x-auto animate-fade-in-up"
        style={{ animationDelay: '0.1s' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50/50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Group ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Members
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Route
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white/50 divide-y divide-gray-200">
            {groups.map((group) => (
              <motion.tr 
                key={group.id} 
                className="animate-fade-in-up"
                style={{ animationDelay: `${0.1 * group.id.charCodeAt(3)}s` }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (0.1 * group.id.charCodeAt(3)), duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {group.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {group.members} members
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {group.pickup} → {group.dropoff}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {group.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <motion.span 
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full transition-all duration-300 ${
                      group.status === 'Active' ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800' :
                      group.status === 'Pending' ? 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800' :
                      'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {group.status}
                  </motion.span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <motion.button 
                    className="text-blue-600 hover:text-blue-900 mr-3 transition-colors duration-300 bg-blue-50/50 hover:bg-blue-100/50 px-2 py-1 rounded"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Eye className="h-4 w-4 inline mr-1" />
                    View
                  </motion.button>
                  <motion.button 
                    className="text-red-600 hover:text-red-900 transition-colors duration-300 bg-red-50/50 hover:bg-red-100/50 px-2 py-1 rounded"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="h-4 w-4 inline mr-1" />
                    Dissolve
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

// Commission Stats Component
const CommissionStats = ({ data }) => {
  return (
    <div>
      <motion.h2 
        className="text-lg font-medium text-gray-900 mb-4 animate-fade-in-up flex items-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <CreditCard className="mr-2 h-5 w-5 text-blue-600" />
        Commission Overview
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          className="bg-gray-50/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200"
          style={{ animationDelay: '0.1s' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <h3 className="text-md font-medium text-gray-900 mb-4">Commission Summary</h3>
          <div className="space-y-4">
            <motion.div 
              className="flex justify-between animate-fade-in-up"
              style={{ animationDelay: '0.1s' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <span className="text-gray-600">Total Commission Earned</span>
              <span className="font-medium">{data.totalCommission}</span>
            </motion.div>
            <motion.div 
              className="flex justify-between animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <span className="text-gray-600">This Month</span>
              <span className="font-medium">{data.thisMonth}</span>
            </motion.div>
            <motion.div 
              className="flex justify-between animate-fade-in-up"
              style={{ animationDelay: '0.3s' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <span className="text-gray-600">Last Month</span>
              <span className="font-medium">{data.lastMonth}</span>
            </motion.div>
            <motion.div 
              className="flex justify-between animate-fade-in-up"
              style={{ animationDelay: '0.4s' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.3 }}
            >
              <span className="text-gray-600">Total Bookings</span>
              <span className="font-medium">{data.bookingsCount}</span>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-gray-50/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200"
          style={{ animationDelay: '0.2s' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.3 }}
        >
          <h3 className="text-md font-medium text-gray-900 mb-4">Monthly Trend</h3>
          <div className="h-64 flex items-end space-x-2">
            {[1200, 800, 1500, 900, 1100, 1300].map((amount, index) => (
              <motion.div 
                key={index} 
                className="flex flex-col items-center flex-1 animate-fade-in-up"
                style={{ animationDelay: `${0.1 * index}s` }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + (0.1 * index), duration: 0.3 }}
              >
                <motion.div 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 rounded-t transition-all duration-500 hover:opacity-75"
                  style={{ height: `${amount / 20}%` }}
                  whileHover={{ scale: 1.05 }}
                ></motion.div>
                <span className="text-xs text-gray-500 mt-2">M{index + 1}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Manual Booking Form Component
const ManualBookingForm = () => {
  const [formData, setFormData] = useState({
    user: '',
    pickup: '',
    dropoff: '',
    date: '',
    time: '',
    groupSize: 1
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would submit the form to create a manual booking
    console.log('Manual booking:', formData);
    alert('Manual booking created successfully!');
  };

  return (
    <div>
      <motion.h2 
        className="text-lg font-medium text-gray-900 mb-4 animate-fade-in-up flex items-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <Plus className="mr-2 h-5 w-5 text-blue-600" />
        Create Manual Booking
      </motion.h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            className="animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <label htmlFor="user" className="block text-sm font-medium text-gray-700 mb-1">
              User
            </label>
            <select
              id="user"
              name="user"
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all duration-300 hover:shadow-md bg-white/50 backdrop-blur-sm"
              value={formData.user}
              onChange={handleChange}
            >
              <option value="">Select user</option>
              <option>Priya Sharma</option>
              <option>Rahul Verma</option>
              <option>Anjali Gupta</option>
              <option>Vikram Singh</option>
            </select>
          </motion.div>
          
          <motion.div 
            className="animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <label htmlFor="groupSize" className="block text-sm font-medium text-gray-700 mb-1">
              Group Size
            </label>
            <select
              id="groupSize"
              name="groupSize"
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all duration-300 hover:shadow-md bg-white/50 backdrop-blur-sm"
              value={formData.groupSize}
              onChange={handleChange}
            >
              {[1, 2, 3, 4, 5, 6].map(size => (
                <option key={size} value={size}>{size} {size === 1 ? 'person' : 'people'}</option>
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
              <option>Delhi University North Campus</option>
              <option>Delhi University South Campus</option>
              <option>Jamia Millia Islamia</option>
              <option>NSIT</option>
              <option>IIT Delhi</option>
            </select>
          </motion.div>
          
          <motion.div 
            className="animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
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
              <option>Connaught Place</option>
              <option>Saket</option>
              <option>Karol Bagh</option>
              <option>South Extension</option>
              <option>DLF Cyber City</option>
            </select>
          </motion.div>
          
          <motion.div 
            className="animate-fade-in-up"
            style={{ animationDelay: '0.5s' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.3 }}
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
            style={{ animationDelay: '0.6s' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.3 }}
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
          className="flex justify-end animate-fade-in-up"
          style={{ animationDelay: '0.7s' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.3 }}
        >
          <motion.button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Booking
          </motion.button>
        </motion.div>
      </form>
    </div>
  );
};

export default AdminPanel;