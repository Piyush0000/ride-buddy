import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { popularPickupLocations, popularDropoffLocations } from '../utils/mapUtils.js';
import { calculateFareBreakdown } from '../utils/paymentUtils.js';

const BookingFlow = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="w-full px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 animate-fade-in-left">Book a Ride</h1>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300 animate-fade-in-right"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      <main className={`w-full px-4 py-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Progress Bar */}
        <div className="mb-8 animate-fade-in-up">
          <div className="flex justify-between">
            <div className="flex-1 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                step >= 1 ? 'bg-blue-600 text-white scale-110' : 'bg-gray-200 text-gray-600'
              }`}>
                1
              </div>
              <div className="mt-2 text-sm font-medium text-gray-900">Route Selection</div>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                step >= 2 ? 'bg-blue-600 text-white scale-110' : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
              <div className="mt-2 text-sm font-medium text-gray-900">Group Matching</div>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                step >= 3 ? 'bg-blue-600 text-white scale-110' : 'bg-gray-200 text-gray-600'
              }`}>
                3
              </div>
              <div className="mt-2 text-sm font-medium text-gray-900">Payment & Confirmation</div>
            </div>
          </div>
          <div className="mt-4 flex">
            <div className={`flex-1 h-1 transition-all duration-500 ${step >= 1 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            <div className={`flex-1 h-1 transition-all duration-500 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white shadow rounded-lg p-6 card-hover animate-fade-in-up">
          {step === 1 && <RouteSelection onNext={() => setStep(2)} pickupLocations={popularPickupLocations} dropoffLocations={popularDropoffLocations} />}
          {step === 2 && <GroupMatching onNext={() => setStep(3)} onBack={() => setStep(1)} user={user} />}
          {step === 3 && <PaymentConfirmation onBack={() => setStep(2)} user={user} />}
        </div>
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would validate and submit the form
    console.log('Route selection:', formData);
    onNext();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6 animate-fade-in-up">Select Your Route</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
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
              {pickupLocations.map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))}
            </select>
          </div>
          
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
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
              {dropoffLocations.map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))}
            </select>
          </div>
          
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
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
          
          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
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
        
        <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ride Type
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              className={`border rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-md ${
                formData.rideType === 'shared' ? 'border-blue-500 bg-blue-50 scale-105' : 'border-gray-300'
              }`}
              onClick={() => setFormData({...formData, rideType: 'shared'})}
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
                  <h3 className="font-medium text-gray-900">Find Ride Partners</h3>
                  <p className="text-sm text-gray-500">Share the ride and cost with fellow students</p>
                </div>
              </div>
            </div>
            
            <div 
              className={`border rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-md ${
                formData.rideType === 'solo' ? 'border-blue-500 bg-blue-50 scale-105' : 'border-gray-300'
              }`}
              onClick={() => setFormData({...formData, rideType: 'solo'})}
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
                  <h3 className="font-medium text-gray-900">Solo Ride</h3>
                  <p className="text-sm text-gray-500">Book a private ride for yourself</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

// Step 2: Group Matching
const GroupMatching = ({ onNext, onBack, user }) => {
  const [group, setGroup] = useState([
    { id: 1, name: 'Priya Sharma', avatar: 'PS', status: 'confirmed' },
    { id: 2, name: 'Rahul Verma', avatar: 'RV', status: 'confirmed' },
    { id: 3, name: user?.name || 'You', avatar: user?.avatar || 'YO', status: 'pending' }
  ]);

  const confirmedMembers = group.filter(member => member.status === 'confirmed').length;
  const totalMembers = group.length;
  
  // Calculate fare breakdown
  const fareBreakdown = calculateFareBreakdown(900, totalMembers, 50);

  const handleJoinGroup = () => {
    // In a real app, this would join the user to the group
    setGroup(group.map(member => 
      member.id === 3 ? {...member, status: 'confirmed'} : member
    ));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6 animate-fade-in-up">Find Ride Partners</h2>
      
      <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Your Group</h3>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 transition-all duration-300">
            {confirmedMembers} of {totalMembers} members confirmed
          </span>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-center space-x-6 mb-6">
            {group.map((member) => (
              <div key={member.id} className="flex flex-col items-center animate-fade-in-up" style={{ animationDelay: `${0.1 * member.id}s` }}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-semibold mb-2 transition-all duration-500 ${
                  member.status === 'confirmed' ? 'bg-blue-600 scale-110' : 'bg-gray-400'
                }`}>
                  {member.avatar}
                </div>
                <span className={`text-sm font-medium transition-all duration-300 ${
                  member.status === 'confirmed' ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {member.name}
                </span>
                {member.status === 'pending' && (
                  <span className="text-xs text-gray-500 mt-1">(Pending)</span>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <p className="text-gray-600 mb-4">
              Waiting for {user?.name || 'you'} to confirm. Share this link with friends to join your group:
            </p>
            <div className="flex">
              <input
                type="text"
                readOnly
                value="https://ridebuddy.com/group/abc123"
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-300 hover:shadow-md"
              />
              <button className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm transition-all duration-300 hover:bg-gray-100">
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Cost Breakdown</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="space-y-2">
            <div className="flex justify-between animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <span className="text-gray-600">Uber Fare</span>
              <span className="font-medium">₹{fareBreakdown.baseFare}</span>
            </div>
            <div className="flex justify-between animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <span className="text-gray-600">Platform Fee</span>
              <span className="font-medium">₹{fareBreakdown.platformFee}</span>
            </div>
            <div className="border-t border-gray-200 pt-2 flex justify-between animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <span className="text-gray-900 font-medium">Total Fare</span>
              <span className="text-gray-900 font-medium">₹{fareBreakdown.totalFare}</span>
            </div>
            <div className="border-t border-gray-200 pt-2 flex justify-between animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <span className="text-blue-600 font-medium">Your Share ({totalMembers} people)</span>
              <span className="text-blue-600 font-bold text-lg">₹{fareBreakdown.perPersonFare}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <button
          onClick={onBack}
          className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
        >
          Back
        </button>
        <div className="space-x-3">
          <button className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105">
            Group Chat
          </button>
          <button
            onClick={onNext}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
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

  // Calculate fare breakdown
  const fareBreakdown = calculateFareBreakdown(900, 4, 50);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // In a real app, this would process the payment
      if (paymentMethod === 'upi') {
        console.log('Processing UPI payment with:', { upiId, amount: fareBreakdown.perPersonFare });
        // Simulate UPI payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));
      } else {
        console.log('Processing Card payment with:', { cardDetails, amount: fareBreakdown.perPersonFare });
        // Simulate Card payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
      alert('Payment successful! Your ride has been booked.');
    } catch (err) {
      setError(err.message || 'Payment failed. Please try again.');
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
      <h2 className="text-xl font-semibold text-gray-900 mb-6 animate-fade-in-up">Payment & Confirmation</h2>
      
      {error && (
        <div className="rounded-md bg-red-50 p-4 mb-6 animate-fade-in-up">
          <div className="text-sm text-red-700">
            {error}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Ride Details</h3>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
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
          
          <h3 className="text-lg font-medium text-gray-900 mb-4">Cost Breakdown</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="space-y-2">
              <div className="flex justify-between animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <span className="text-gray-600">Uber Fare</span>
                <span className="font-medium">₹{fareBreakdown.baseFare}</span>
              </div>
              <div className="flex justify-between animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <span className="text-gray-600">Platform Fee</span>
                <span className="font-medium">₹{fareBreakdown.platformFee}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <span className="text-gray-900 font-medium">Total Fare</span>
                <span className="text-gray-900 font-medium">₹{fareBreakdown.totalFare}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <span className="text-blue-600 font-medium">Your Share (4 people)</span>
                <span className="text-blue-600 font-bold text-lg">₹{fareBreakdown.perPersonFare}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
          <form onSubmit={handlePayment} className="space-y-6">
            <div className="space-y-4">
              <div 
                className={`border rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-md ${
                  paymentMethod === 'upi' ? 'border-blue-500 bg-blue-50 scale-105' : 'border-gray-300'
                }`}
                onClick={() => setPaymentMethod('upi')}
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
                  <div className="mt-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <label htmlFor="upi-id" className="block text-sm font-medium text-gray-700 mb-1">
                      UPI ID
                    </label>
                    <input
                      type="text"
                      id="upi-id"
                      placeholder="yourname@upi"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all duration-300 hover:shadow-md"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      required
                    />
                  </div>
                )}
              </div>
              
              <div 
                className={`border rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-md ${
                  paymentMethod === 'card' ? 'border-blue-500 bg-blue-50 scale-105' : 'border-gray-300'
                }`}
                onClick={() => setPaymentMethod('card')}
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
                  <div className="mt-4 space-y-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <div>
                      <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        id="card-number"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all duration-300 hover:shadow-md"
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
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all duration-300 hover:shadow-md"
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
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all duration-300 hover:shadow-md"
                          value={cardDetails.cvv}
                          onChange={handleCardChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-between animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <button
                type="button"
                onClick={onBack}
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                disabled={loading}
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="loading-spinner mr-2"></div>
                    Processing Payment...
                  </>
                ) : (
                  `Pay ₹${fareBreakdown.perPersonFare}`
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingFlow;