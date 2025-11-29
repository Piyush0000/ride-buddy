import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Users, MessageCircle, Car, MapPin, Calendar, CreditCard, ArrowRight } from 'lucide-react';

const GroupManagement = () => {
  const { groupId } = useParams();
  const [activeTab, setActiveTab] = useState('members');
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [group, setGroup] = useState(null);
  const [groupMembers, setGroupMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: y });
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setIsVisible(true);
    fetchGroupData();
    
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

  const fetchGroupData = async () => {
    try {
      setLoading(true);
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      };
      
      // Fetch group data
      const { data } = await axios.get(
        `http://localhost:5000/api/groups/${groupId}`,
        config
      );
      
      setGroup(data);
      
      // Extract members from group data
      if (data.members) {
        const members = data.members.map(member => ({
          id: member.userId._id,
          name: member.userId.name,
          avatar: member.userId.name.split(' ').map(n => n[0]).join('').toUpperCase(),
          email: member.userId.email,
          paymentStatus: member.paymentStatus
        }));
        setGroupMembers(members);
      }
      
      // Extract chat messages from group data
      if (data.chat) {
        const chatMessages = data.chat.map(msg => ({
          id: msg._id,
          sender: msg.senderId?.name || 'Unknown',
          avatar: msg.senderId?.name ? msg.senderId.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U',
          message: msg.message,
          timestamp: new Date(msg.timestamp).toLocaleString()
        }));
        setMessages(chatMessages);
      }
      
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load group data');
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        };
        
        // Send message to backend
        await axios.post(
          `http://localhost:5000/api/groups/${groupId}/chat`,
          { message },
          config
        );
        
        // Refresh group data to get the new message
        fetchGroupData();
        setMessage('');
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to send message');
      }
    }
  };

  const pendingPayments = groupMembers.filter(member => member.paymentStatus === 'pending').length;

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
          <span>Loading group data...</span>
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
            onClick={fetchGroupData}
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
            <motion.div 
              className="animate-fade-in-left"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h1 className="text-2xl font-bold text-gray-900">Group Management</h1>
              <p className="text-gray-600">Group ID: {groupId}</p>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-4 animate-fade-in-right"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.span 
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                  pendingPayments > 0 
                    ? 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800' 
                    : 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {pendingPayments > 0 
                  ? `${pendingPayments} pending payments` 
                  : 'All payments received'}
              </motion.span>
              <motion.button 
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300 flex items-center bg-blue-50/50 hover:bg-blue-100/50 px-3 py-2 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowRight className="mr-1 h-4 w-4 transform rotate-180" />
                Back to Dashboard
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <main className={`w-full px-4 py-6 transition-all duration-700 relative z-10`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Group Info and Tabs */}
          <div className="lg:col-span-1">
            <motion.div 
              className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl overflow-hidden mb-6 border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Car className="mr-2 h-5 w-5 text-blue-600" />
                  Group Details
                </h2>
                <div className="space-y-4">
                  {group && group.rideId && (
                    <>
                      <motion.div 
                        className="animate-fade-in-up"
                        style={{ animationDelay: '0.1s' }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.3 }}
                      >
                        <p className="text-sm text-gray-500 flex items-center">
                          <MapPin className="mr-1 h-4 w-4 text-blue-600" />
                          Pickup
                        </p>
                        <p className="font-medium">{group.rideId.pickup.address}</p>
                      </motion.div>
                      <motion.div 
                        className="animate-fade-in-up"
                        style={{ animationDelay: '0.2s' }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.3 }}
                      >
                        <p className="text-sm text-gray-500 flex items-center">
                          <MapPin className="mr-1 h-4 w-4 text-blue-600" />
                          Dropoff
                        </p>
                        <p className="font-medium">{group.rideId.drop.address}</p>
                      </motion.div>
                      <motion.div 
                        className="animate-fade-in-up"
                        style={{ animationDelay: '0.3s' }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                      >
                        <p className="text-sm text-gray-500 flex items-center">
                          <Calendar className="mr-1 h-4 w-4 text-blue-600" />
                          Date & Time
                        </p>
                        <p className="font-medium">{new Date(group.rideId.time).toLocaleString()}</p>
                      </motion.div>
                      <motion.div 
                        className="animate-fade-in-up"
                        style={{ animationDelay: '0.4s' }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.3 }}
                      >
                        <p className="text-sm text-gray-500 flex items-center">
                          <CreditCard className="mr-1 h-4 w-4 text-blue-600" />
                          Your Share
                        </p>
                        <p className="text-2xl font-bold text-blue-600">₹{group.rideId.fareEstimate / group.members.length}</p>
                      </motion.div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl overflow-hidden border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex">
                  <motion.button
                    onClick={() => setActiveTab('members')}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm transition-all duration-300 flex items-center justify-center ${
                      activeTab === 'members'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Members
                  </motion.button>
                  <motion.button
                    onClick={() => setActiveTab('chat')}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm transition-all duration-300 flex items-center justify-center ${
                      activeTab === 'chat'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Chat
                  </motion.button>
                </nav>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Content Based on Tab */}
          <div className="lg:col-span-2">
            {activeTab === 'members' ? (
              <motion.div 
                className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl overflow-hidden border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-medium text-gray-900 flex items-center">
                      <Users className="mr-2 h-5 w-5 text-blue-600" />
                      Group Members
                    </h2>
                    <motion.button 
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white/50 hover:bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Invite More
                    </motion.button>
                  </div>
                  
                  <div className="space-y-4">
                    {groupMembers.map((member) => (
                      <motion.div 
                        key={member.id} 
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg transition-all duration-300 hover:shadow-md bg-white/50 backdrop-blur-sm animate-fade-in-up"
                        style={{ animationDelay: `${0.1 * member.id}s` }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + (0.1 * member.id), duration: 0.3 }}
                      >
                        <div className="flex items-center">
                          <motion.div 
                            className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center text-white font-semibold shadow-lg"
                            whileHover={{ scale: 1.1 }}
                          >
                            {member.avatar}
                          </motion.div>
                          <div className="ml-4">
                            <h3 className="text-sm font-medium text-gray-900">{member.name}</h3>
                            <p className="text-sm text-gray-500">{member.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <motion.span 
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-all duration-300 ${
                              member.paymentStatus === 'paid' 
                                ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800' 
                                : 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800'
                            }`}
                            whileHover={{ scale: 1.05 }}
                          >
                            {member.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                          </motion.span>
                          <motion.button 
                            className="text-blue-600 hover:text-blue-900 text-sm font-medium transition-colors duration-300 bg-blue-50/50 hover:bg-blue-100/50 px-2 py-1 rounded"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Message
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl overflow-hidden flex flex-col h-[600px] border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900 flex items-center">
                    <MessageCircle className="mr-2 h-5 w-5 text-blue-600" />
                    Group Chat
                  </h2>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-6">
                    {messages.map((msg) => (
                      <motion.div 
                        key={msg.id} 
                        className="flex animate-fade-in-up"
                        style={{ animationDelay: `${0.1 * msg.id}s` }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + (0.1 * msg.id), duration: 0.3 }}
                      >
                        <motion.div 
                          className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center text-white font-semibold shadow-lg"
                          whileHover={{ scale: 1.1 }}
                        >
                          {msg.avatar}
                        </motion.div>
                        <div className="ml-4">
                          <div className="flex items-baseline">
                            <h4 className="text-sm font-medium text-gray-900">{msg.sender}</h4>
                            <span className="ml-2 text-xs text-gray-500">{msg.timestamp}</span>
                          </div>
                          <p className="mt-1 text-sm text-gray-700">{msg.message}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div className="border-t border-gray-200 p-4">
                  <form onSubmit={handleSendMessage} className="flex">
                    <input
                      type="text"
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-300 hover:shadow-md bg-white/50 backdrop-blur-sm"
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <motion.button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Send
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default GroupManagement;