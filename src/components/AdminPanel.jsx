import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Mock data for bookings
  const bookings = [
    { id: 1, user: 'Priya Sharma', pickup: 'DU North Campus', dropoff: 'Connaught Place', date: '2023-12-15', time: '18:30', status: 'Confirmed', groupSize: 4, commission: '₹50' },
    { id: 2, user: 'Rahul Verma', pickup: 'JMI', dropoff: 'Saket', date: '2023-12-16', time: '14:00', status: 'Pending', groupSize: 2, commission: '₹30' },
    { id: 3, user: 'Anjali Gupta', pickup: 'NSIT', dropoff: 'Karol Bagh', date: '2023-12-17', time: '09:00', status: 'Completed', groupSize: 3, commission: '₹40' }
  ];

  // Mock data for groups
  const groups = [
    { id: 'G001', members: 4, pickup: 'DU North Campus', dropoff: 'Connaught Place', date: '2023-12-15', status: 'Active' },
    { id: 'G002', members: 2, pickup: 'JMI', dropoff: 'Saket', date: '2023-12-16', status: 'Pending' },
    { id: 'G003', members: 3, pickup: 'NSIT', dropoff: 'Karol Bagh', date: '2023-12-17', status: 'Completed' }
  ];

  // Mock data for commission
  const commissionData = {
    totalCommission: '₹2,450',
    thisMonth: '₹850',
    lastMonth: '₹1,200',
    bookingsCount: 42
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 animate-fade-in-left">Admin Dashboard</h1>
            <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300 animate-fade-in-right">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className={`max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white shadow rounded-lg p-6 card-hover animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">Total Commission</h3>
                <p className="text-2xl font-semibold text-gray-900">{commissionData.totalCommission}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow rounded-lg p-6 card-hover animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">This Month</h3>
                <p className="text-2xl font-semibold text-gray-900">{commissionData.thisMonth}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow rounded-lg p-6 card-hover animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100">
                <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">Total Bookings</h3>
                <p className="text-2xl font-semibold text-gray-900">{commissionData.bookingsCount}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow rounded-lg p-6 card-hover animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100">
                <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">Active Groups</h3>
                <p className="text-2xl font-semibold text-gray-900">12</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white shadow rounded-lg overflow-hidden card-hover animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('bookings')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm transition-all duration-300 ${
                  activeTab === 'bookings'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Bookings
              </button>
              <button
                onClick={() => setActiveTab('groups')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm transition-all duration-300 ${
                  activeTab === 'groups'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Groups
              </button>
              <button
                onClick={() => setActiveTab('commission')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm transition-all duration-300 ${
                  activeTab === 'commission'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Commission
              </button>
              <button
                onClick={() => setActiveTab('manual')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm transition-all duration-300 ${
                  activeTab === 'manual'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Manual Booking
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {activeTab === 'bookings' && <BookingsTable bookings={bookings} />}
            {activeTab === 'groups' && <GroupsTable groups={groups} />}
            {activeTab === 'commission' && <CommissionStats data={commissionData} />}
            {activeTab === 'manual' && <ManualBookingForm />}
          </div>
        </div>
      </main>
    </div>
  );
};

// Bookings Table Component
const BookingsTable = ({ bookings }) => {
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4 animate-fade-in-up">Recent Bookings</h2>
      <div className="overflow-x-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
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
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id} className="animate-fade-in-up" style={{ animationDelay: `${0.1 * booking.id}s` }}>
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
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full transition-all duration-300 ${
                    booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                    booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {booking.commission}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3 transition-colors duration-300">
                    View
                  </button>
                  <button className="text-red-600 hover:text-red-900 transition-colors duration-300">
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Groups Table Component
const GroupsTable = ({ groups }) => {
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4 animate-fade-in-up">Active Groups</h2>
      <div className="overflow-x-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
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
          <tbody className="bg-white divide-y divide-gray-200">
            {groups.map((group) => (
              <tr key={group.id} className="animate-fade-in-up" style={{ animationDelay: `${0.1 * group.id.charCodeAt(3)}s` }}>
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
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full transition-all duration-300 ${
                    group.status === 'Active' ? 'bg-green-100 text-green-800' :
                    group.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {group.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3 transition-colors duration-300">
                    View
                  </button>
                  <button className="text-red-600 hover:text-red-900 transition-colors duration-300">
                    Dissolve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Commission Stats Component
const CommissionStats = ({ data }) => {
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4 animate-fade-in-up">Commission Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-6 card-hover animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <h3 className="text-md font-medium text-gray-900 mb-4">Commission Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <span className="text-gray-600">Total Commission Earned</span>
              <span className="font-medium">{data.totalCommission}</span>
            </div>
            <div className="flex justify-between animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <span className="text-gray-600">This Month</span>
              <span className="font-medium">{data.thisMonth}</span>
            </div>
            <div className="flex justify-between animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <span className="text-gray-600">Last Month</span>
              <span className="font-medium">{data.lastMonth}</span>
            </div>
            <div className="flex justify-between animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <span className="text-gray-600">Total Bookings</span>
              <span className="font-medium">{data.bookingsCount}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6 card-hover animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-md font-medium text-gray-900 mb-4">Monthly Trend</h3>
          <div className="h-64 flex items-end space-x-2">
            {[1200, 800, 1500, 900, 1100, 1300].map((amount, index) => (
              <div key={index} className="flex flex-col items-center flex-1 animate-fade-in-up" style={{ animationDelay: `${0.1 * index}s` }}>
                <div 
                  className="w-full bg-blue-600 rounded-t transition-all duration-500 hover:opacity-75"
                  style={{ height: `${amount / 20}%` }}
                ></div>
                <span className="text-xs text-gray-500 mt-2">M{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
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
      <h2 className="text-lg font-medium text-gray-900 mb-4 animate-fade-in-up">Create Manual Booking</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <label htmlFor="user" className="block text-sm font-medium text-gray-700 mb-1">
              User
            </label>
            <select
              id="user"
              name="user"
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all duration-300 hover:shadow-md"
              value={formData.user}
              onChange={handleChange}
            >
              <option value="">Select user</option>
              <option>Priya Sharma</option>
              <option>Rahul Verma</option>
              <option>Anjali Gupta</option>
              <option>Vikram Singh</option>
            </select>
          </div>
          
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <label htmlFor="groupSize" className="block text-sm font-medium text-gray-700 mb-1">
              Group Size
            </label>
            <select
              id="groupSize"
              name="groupSize"
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all duration-300 hover:shadow-md"
              value={formData.groupSize}
              onChange={handleChange}
            >
              {[1, 2, 3, 4, 5, 6].map(size => (
                <option key={size} value={size}>{size} {size === 1 ? 'person' : 'people'}</option>
              ))}
            </select>
          </div>
          
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <label htmlFor="pickup" className="block text-sm font-medium text-gray-700 mb-1">
              Pickup Location
            </label>
            <select
              id="pickup"
              name="pickup"
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all duration-300 hover:shadow-md"
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
          </div>
          
          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <label htmlFor="dropoff" className="block text-sm font-medium text-gray-700 mb-1">
              Dropoff Location
            </label>
            <select
              id="dropoff"
              name="dropoff"
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all duration-300 hover:shadow-md"
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
          </div>
          
          <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all duration-300 hover:shadow-md"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          
          <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all duration-300 hover:shadow-md"
              value={formData.time}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="flex justify-end animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
          >
            Create Booking
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminPanel;