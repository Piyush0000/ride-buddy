import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Rotate features every 3 seconds
    const interval = setInterval(() => {
      setCurrentFeature(prev => (prev + 1) % 4);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const handleBookNow = () => {
    if (user) {
      navigate('/booking');
    } else {
      navigate('/register');
    }
  };

  const handleFindPartners = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  // Features data
  const features = [
    {
      icon: "💰",
      title: "Cost Effective",
      description: "Save up to 70% on your travel expenses by sharing rides"
    },
    {
      icon: "👥",
      title: "Student Community",
      description: "Connect with fellow students and make new friends"
    },
    {
      icon: "🛡️",
      title: "Safe & Secure",
      description: "Verified student profiles and real-time tracking"
    },
    {
      icon: "⏱️",
      title: "Real-time Matching",
      description: "Instantly find ride partners with similar routes"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
      {/* Animated Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 animate-fade-in-left">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center pulse-animation">
              <span className="text-white font-bold text-lg">RB</span>
            </div>
            <span className="text-2xl font-bold text-blue-800 animate-fade-in-right">RideBuddy</span>
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}><a href="#home" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300">Home</a></li>
              <li className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}><a href="#how-it-works" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300">How It Works</a></li>
              <li className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}><a href="#features" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300">Features</a></li>
              <li className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}><a href="#testimonials" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300">Testimonials</a></li>
            </ul>
          </nav>
          <div className="animate-fade-in-right">
            {user ? (
              <button 
                onClick={() => navigate('/dashboard')}
                className="btn-primary"
              >
                Dashboard
              </button>
            ) : (
              <>
                <button 
                  onClick={() => navigate('/login')}
                  className="mr-4 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300"
                >
                  Login
                </button>
                <button 
                  onClick={() => navigate('/register')}
                  className="btn-primary"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section with Enhanced Animations */}
      <section id="home" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-600 opacity-10"></div>
        <div className={`container mx-auto px-4 text-center relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 animate-fade-in-up">
            Share Rides, Save Money,<br />
            <span className="text-blue-600 gradient-bg bg-clip-text text-transparent">Connect with Fellow Students</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            India's first college-focused cab sharing platform. Book rides with classmates heading your way and split the cost.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button 
              onClick={handleBookNow}
              className="btn-primary flex items-center justify-center group"
            >
              Book Now
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <button 
              onClick={handleFindPartners}
              className="btn-secondary flex items-center justify-center group"
            >
              Find Partners
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-16 h-16 bg-blue-200 rounded-full opacity-50 float-animation"></div>
        <div className="absolute top-1/3 right-20 w-12 h-12 bg-indigo-200 rounded-full opacity-50 float-animation" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-blue-300 rounded-full opacity-30 float-animation" style={{ animationDelay: '2s' }}></div>
      </section>

      {/* How It Works with Enhanced Animations */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12 animate-fade-in-up">
            How RideBuddy Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-blue-50 card-hover animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 pulse-animation">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sign Up with College Email</h3>
              <p className="text-gray-600">Verify your student status with your .edu.in email address</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-blue-50 card-hover animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 pulse-animation">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Travel Buddies</h3>
              <p className="text-gray-600">Match with students going the same way as you</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-blue-50 card-hover animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 pulse-animation">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Share the Ride & Cost</h3>
              <p className="text-gray-600">Split the fare and enjoy a safe journey with friends</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features with Auto-Rotation */}
      <section id="features" className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12 animate-fade-in-up">
            Why Choose RideBuddy?
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg card-hover animate-fade-in-up staggered-animation">
              <div className="text-center">
                <div className="text-6xl mb-4">{features[currentFeature].icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{features[currentFeature].title}</h3>
                <p className="text-gray-600 text-lg">{features[currentFeature].description}</p>
              </div>
              <div className="flex justify-center mt-6 space-x-2">
                {features.map((_, index) => (
                  <div 
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentFeature ? 'bg-blue-600 w-6' : 'bg-gray-300'
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
          
          {/* All features grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-md card-hover animate-fade-in-up"
                style={{ animationDelay: `${0.1 * index}s` }}
                onMouseEnter={() => setCurrentFeature(index)}
              >
                <div className="text-blue-600 text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12 animate-fade-in-up">
            What Students Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg card-hover animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  PS
                </div>
                <div>
                  <h4 className="font-semibold">Priya Sharma</h4>
                  <p className="text-sm text-gray-600">DU Student</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"RideBuddy helped me save ₹2000/month on cab fares. The group matching feature is amazing!"</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg card-hover animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  RV
                </div>
                <div>
                  <h4 className="font-semibold">Rahul Verma</h4>
                  <p className="text-sm text-gray-600">JMI Student</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"I've made so many new friends through RideBuddy. The safety features give me peace of mind."</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg card-hover animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  AG
                </div>
                <div>
                  <h4 className="font-semibold">Anjali Gupta</h4>
                  <p className="text-sm text-gray-600">NSIT Student</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"The app is so user-friendly and the cost savings are incredible. Highly recommended for all students!"</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in-up">
            Ready to Save on Rides?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Join thousands of students who are already saving money and making friends with RideBuddy.
          </p>
          <button 
            onClick={handleGetStarted}
            className="btn-accent mx-auto flex items-center justify-center group animate-fade-in-up" 
            style={{ animationDelay: '0.2s' }}
          >
            Get Started Now
            <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
                <span className="text-xl font-bold">RideBuddy</span>
              </div>
              <p className="text-gray-400">
                Making college travel affordable and social for students across India.
              </p>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#home" className="hover:text-white transition-colors duration-300">Home</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors duration-300">How It Works</a></li>
                <li><a href="#features" className="hover:text-white transition-colors duration-300">Features</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors duration-300">Testimonials</a></li>
              </ul>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-300">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Safety</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a></li>
              </ul>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: support@ridebuddy.com</li>
                <li>Phone: +91 9876543210</li>
                <li>Address: Delhi, India</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <p>&copy; 2023 RideBuddy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;