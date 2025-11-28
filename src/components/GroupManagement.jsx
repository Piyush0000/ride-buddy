import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const GroupManagement = () => {
  const { groupId } = useParams();
  const [activeTab, setActiveTab] = useState('members');
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Mock data for group members
  const groupMembers = [
    { id: 1, name: 'Priya Sharma', avatar: 'PS', email: 'priya@du.edu.in', phone: '9876543210', paymentStatus: 'paid' },
    { id: 2, name: 'Rahul Verma', avatar: 'RV', email: 'rahul@du.edu.in', phone: '9876543211', paymentStatus: 'paid' },
    { id: 3, name: 'Anjali Gupta', avatar: 'AG', email: 'anjali@du.edu.in', phone: '9876543212', paymentStatus: 'pending' },
    { id: 4, name: 'Vikram Singh', avatar: 'VS', email: 'vikram@du.edu.in', phone: '9876543213', paymentStatus: 'paid' }
  ];

  // Mock data for chat messages
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Priya Sharma', avatar: 'PS', message: 'Hi everyone! Looking forward to our ride tomorrow.', timestamp: '2 hours ago' },
    { id: 2, sender: 'Rahul Verma', avatar: 'RV', message: 'Same here! Should we meet at the main gate?', timestamp: '1 hour ago' },
    { id: 3, sender: 'Anjali Gupta', avatar: 'AG', message: 'Yes, main gate at 6:15 PM works for me.', timestamp: '45 minutes ago' }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'You',
        avatar: 'YO',
        message: message,
        timestamp: 'Just now'
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const pendingPayments = groupMembers.filter(member => member.paymentStatus === 'pending').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="animate-fade-in-left">
              <h1 className="text-2xl font-bold text-gray-900">Group Management</h1>
              <p className="text-gray-600">Group ID: {groupId}</p>
            </div>
            <div className="flex items-center space-x-4 animate-fade-in-right">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                pendingPayments > 0 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {pendingPayments > 0 
                  ? `${pendingPayments} pending payments` 
                  : 'All payments received'}
              </span>
              <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300">
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className={`max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Group Info and Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg overflow-hidden mb-6 card-hover animate-fade-in-up">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Group Details</h2>
                <div className="space-y-4">
                  <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <p className="text-sm text-gray-500">Pickup</p>
                    <p className="font-medium">Delhi University North Campus</p>
                  </div>
                  <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <p className="text-sm text-gray-500">Dropoff</p>
                    <p className="font-medium">Connaught Place</p>
                  </div>
                  <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p className="font-medium">Dec 15, 2023 at 6:30 PM</p>
                  </div>
                  <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <p className="text-sm text-gray-500">Your Share</p>
                    <p className="text-2xl font-bold text-blue-600">₹237.50</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden card-hover animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex">
                  <button
                    onClick={() => setActiveTab('members')}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm transition-all duration-300 ${
                      activeTab === 'members'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Members
                  </button>
                  <button
                    onClick={() => setActiveTab('chat')}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm transition-all duration-300 ${
                      activeTab === 'chat'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Chat
                  </button>
                </nav>
              </div>
            </div>
          </div>

          {/* Right Column - Content Based on Tab */}
          <div className="lg:col-span-2">
            {activeTab === 'members' ? (
              <div className="bg-white shadow rounded-lg overflow-hidden card-hover animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-medium text-gray-900">Group Members</h2>
                    <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105">
                      Invite More
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {groupMembers.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg transition-all duration-300 hover:shadow-md animate-fade-in-up" style={{ animationDelay: `${0.1 * member.id}s` }}>
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                            {member.avatar}
                          </div>
                          <div className="ml-4">
                            <h3 className="text-sm font-medium text-gray-900">{member.name}</h3>
                            <p className="text-sm text-gray-500">{member.email}</p>
                            <p className="text-sm text-gray-500">{member.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-all duration-300 ${
                            member.paymentStatus === 'paid' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {member.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                          </span>
                          <button className="text-blue-600 hover:text-blue-900 text-sm font-medium transition-colors duration-300">
                            Message
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white shadow rounded-lg overflow-hidden flex flex-col h-[600px] card-hover animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Group Chat</h2>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-6">
                    {messages.map((msg) => (
                      <div key={msg.id} className="flex animate-fade-in-up" style={{ animationDelay: `${0.1 * msg.id}s` }}>
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                          {msg.avatar}
                        </div>
                        <div className="ml-4">
                          <div className="flex items-baseline">
                            <h4 className="text-sm font-medium text-gray-900">{msg.sender}</h4>
                            <span className="ml-2 text-xs text-gray-500">{msg.timestamp}</span>
                          </div>
                          <p className="mt-1 text-sm text-gray-700">{msg.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border-t border-gray-200 p-4">
                  <form onSubmit={handleSendMessage} className="flex">
                    <input
                      type="text"
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-300 hover:shadow-md"
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
                    >
                      Send
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default GroupManagement;