import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');
  const { user, logout } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Mock data for rides
  const upcomingRides = [
    {
      id: 1,
      pickup: 'Delhi University North Campus',
      dropoff: 'Connaught Place',
      date: '2023-12-15',
      time: '18:30',
      type: 'Shared',
      status: 'Confirmed',
      price: '₹250',
      members: 3
    },
    {
      id: 2,
      pickup: 'Delhi University South Campus',
      dropoff: 'Saket',
      date: '2023-12-18',
      time: '14:00',
      type: 'Solo',
      status: 'Pending',
      price: '₹450',
      members: 1
    }
  ];

  const pastRides = [
    {
      id: 3,
      pickup: 'Jamia Millia Islamia',
      dropoff: 'Karol Bagh',
      date: '2023-12-01',
      time: '09:00',
      type: 'Shared',
      status: 'Completed',
      price: '₹200',
      members: 4
    }
  ];

  const notifications = [
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
  ];

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="animate-fade-in-left">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.name || 'User'}!</p>
          </div>
          <div className="flex items-center space-x-4 animate-fade-in-right">
            <button className="relative p-1 text-gray-600 hover:text-gray-900 transition-colors duration-300">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {unreadNotifications > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {unreadNotifications}
                </span>
              )}
            </button>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                {user?.avatar || 'U'}
              </div>
              <span className="ml-2 text-gray-700">{user?.name?.split(' ').map(n => n[0]).join('') || 'User'}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className={`max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Quick Booking Form */}
        <div className="bg-white shadow rounded-lg p-6 mb-8 card-hover animate-fade-in-up">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Book a Ride</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <label htmlFor="pickup" className="block text-sm font-medium text-gray-700 mb-1">
                Pickup Location
              </label>
              <select
                id="pickup"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all duration-300 hover:shadow-md"
              >
                <option>Select pickup location</option>
                <option>Delhi University North Campus</option>
                <option>Delhi University South Campus</option>
                <option>Jamia Millia Islamia</option>
                <option>NSIT</option>
                <option>IIT Delhi</option>
              </select>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <label htmlFor="dropoff" className="block text-sm font-medium text-gray-700 mb-1">
                Dropoff Location
              </label>
              <select
                id="dropoff"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all duration-300 hover:shadow-md"
              >
                <option>Select dropoff location</option>
                <option>Connaught Place</option>
                <option>Saket</option>
                <option>Karol Bagh</option>
                <option>South Extension</option>
                <option>DLF Cyber City</option>
              </select>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <label htmlFor="datetime" className="block text-sm font-medium text-gray-700 mb-1">
                Date & Time
              </label>
              <input
                type="datetime-local"
                id="datetime"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all duration-300 hover:shadow-md"
              />
            </div>
            <div className="flex items-end animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <button
                onClick={() => navigate('/booking')}
                className="w-full btn-primary flex items-center justify-center group"
              >
                Find Ride
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white shadow rounded-lg p-6 mb-8 card-hover animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Notifications</h2>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className={`p-4 rounded-md transition-all duration-300 hover:shadow-md ${!notification.read ? 'bg-blue-50' : 'bg-gray-50'} animate-fade-in-up`} style={{ animationDelay: `${0.1 * notification.id}s` }}>
                <div className="flex justify-between">
                  <p className={`${!notification.read ? 'text-blue-800 font-medium' : 'text-gray-700'}`}>
                    {notification.message}
                  </p>
                  <span className="text-sm text-gray-500">{notification.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rides Section */}
        <div className="bg-white shadow rounded-lg overflow-hidden card-hover animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm transition-all duration-300 ${
                  activeTab === 'upcoming'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Upcoming Rides
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm transition-all duration-300 ${
                  activeTab === 'past'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Past Rides
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {activeTab === 'upcoming' ? (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Your Upcoming Rides</h3>
                {upcomingRides.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {upcomingRides.map((ride) => (
                      <div key={ride.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-all duration-300 hover:shadow-md animate-fade-in-up" style={{ animationDelay: `${0.1 * ride.id}s` }}>
                        <div className="flex justify-between">
                          <div>
                            <div className="flex items-center">
                              <h4 className="text-lg font-medium text-gray-900">{ride.pickup}</h4>
                              <svg className="mx-2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                              <h4 className="text-lg font-medium text-gray-900">{ride.dropoff}</h4>
                            </div>
                            <p className="text-gray-600 mt-1">
                              {ride.date} at {ride.time} • {ride.type} Ride • {ride.members} {ride.members > 1 ? 'members' : 'member'}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold text-gray-900">{ride.price}</p>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-all duration-300 ${
                              ride.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                              ride.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {ride.status}
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 flex space-x-3">
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-300">
                            View Details
                          </button>
                          {ride.status === 'Confirmed' && (
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-300">
                              Track Ride
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 animate-fade-in-up">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No upcoming rides</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by booking a new ride.</p>
                    <div className="mt-6">
                      <button
                        onClick={() => navigate('/booking')}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
                      >
                        Book a Ride
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Your Past Rides</h3>
                {pastRides.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {pastRides.map((ride) => (
                      <div key={ride.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-all duration-300 hover:shadow-md animate-fade-in-up" style={{ animationDelay: `${0.1 * ride.id}s` }}>
                        <div className="flex justify-between">
                          <div>
                            <div className="flex items-center">
                              <h4 className="text-lg font-medium text-gray-900">{ride.pickup}</h4>
                              <svg className="mx-2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                              <h4 className="text-lg font-medium text-gray-900">{ride.dropoff}</h4>
                            </div>
                            <p className="text-gray-600 mt-1">
                              {ride.date} at {ride.time} • {ride.type} Ride • {ride.members} {ride.members > 1 ? 'members' : 'member'}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold text-gray-900">{ride.price}</p>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 transition-all duration-300">
                              {ride.status}
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 flex space-x-3">
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-300">
                            View Receipt
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 animate-fade-in-up">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No past rides</h3>
                    <p className="mt-1 text-sm text-gray-500">Your completed rides will appear here.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;