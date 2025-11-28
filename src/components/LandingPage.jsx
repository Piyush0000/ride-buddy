import React, { useState, useEffect, useRef } from 'react';
import { Camera, Users, DollarSign, Shield, Clock, MapPin, ArrowRight, Menu, X, Star, Sparkles, Zap, Heart, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const titleRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleClick = (e) => {
      // Add particles on click
      const newParticles = Array.from({ length: 5 }, (_, i) => ({
        id: Date.now() + i,
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 20 + 5,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        life: 100
      }));
      setParticles(prev => [...prev, ...newParticles]);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    
    const interval = setInterval(() => {
      setCurrentFeature(prev => (prev + 1) % 4);
    }, 3000);

    // Particle animation
    const particleInterval = setInterval(() => {
      setParticles(prev => 
        prev.map(p => ({ ...p, life: p.life - 1 }))
          .filter(p => p.life > 0)
      );
    }, 50);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      clearInterval(interval);
      clearInterval(particleInterval);
    };
  }, []);

  const features = [
    {
      icon: <DollarSign className="w-16 h-16" />,
      title: "Save Up to 70%",
      description: "Split costs with fellow students and save money on every ride",
      color: "from-emerald-500 to-teal-600",
      animation: "animate-bounce-in"
    },
    {
      icon: <Users className="w-16 h-16" />,
      title: "Student Community",
      description: "Connect with verified students from your college",
      color: "from-blue-500 to-indigo-600",
      animation: "animate-wobble"
    },
    {
      icon: <Shield className="w-16 h-16" />,
      title: "Safe & Secure",
      description: "Verified profiles and real-time ride tracking",
      color: "from-purple-500 to-pink-600",
      animation: "animate-jello"
    },
    {
      icon: <Clock className="w-16 h-16" />,
      title: "Instant Matching",
      description: "Find ride partners instantly with AI-powered matching",
      color: "from-orange-500 to-red-600",
      animation: "animate-shake"
    }
  ];

  const testimonials = [
    { 
      name: "Priya Sharma", 
      college: "DU Student", 
      avatar: "PS", 
      rating: 5, 
      text: "Saved ₹2000/month! The group matching is incredible.",
      animation: "hover-lift"
    },
    { 
      name: "Rahul Verma", 
      college: "JMI Student", 
      avatar: "RV", 
      rating: 5, 
      text: "Made amazing friends through RideBuddy. Love the safety features!",
      animation: "hover-shake"
    },
    { 
      name: "Anjali Gupta", 
      college: "NSIT Student", 
      avatar: "AG", 
      rating: 5, 
      text: "Super user-friendly and the savings are real. Highly recommend!",
      animation: "hover-jello"
    }
  ];

  const stats = [
    { value: "50K+", label: "Active Students", icon: <Users className="w-8 h-8" /> },
    { value: "₹2M+", label: "Money Saved", icon: <DollarSign className="w-8 h-8" /> },
    { value: "100K+", label: "Rides Completed", icon: <Rocket className="w-8 h-8" /> },
    { value: "4.9★", label: "Average Rating", icon: <Star className="w-8 h-8" /> }
  ];

  // Mouse follower gradient
  const gradientStyle = {
    background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden relative">
      {/* Animated Background with Mouse Follow */}
      <div className="fixed inset-0 pointer-events-none" style={gradientStyle}></div>
      
      {/* Particles */}
      <AnimatePresence>
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
      </AnimatePresence>

      {/* Crazy Animated Background Elements */}
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
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-white/90 backdrop-blur-lg shadow-2xl' : 'bg-transparent'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div 
              className="flex items-center space-x-3 group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-2xl animate-glow"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Rocket className="text-white w-6 h-6" />
                </motion.div>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl blur opacity-75"
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <motion.span 
                className="text-2xl font-bold gradient-text"
                animate={{ backgroundPosition: ['0%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                RideBuddy
              </motion.span>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {['Home', 'Features', 'How It Works', 'Testimonials'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 relative group"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item}
                  <motion.span 
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:w-full"
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <motion.button 
                className="text-blue-600 hover:text-blue-700 font-semibold transition-all duration-300"
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')}
              >
                Login
              </motion.button>
              <motion.button 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-2xl magnetic-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  boxShadow: [
                    "0 20px 25px -5px rgba(59, 130, 246, 0.4)",
                    "0 25px 50px -12px rgba(59, 130, 246, 0.6)",
                    "0 20px 25px -5px rgba(59, 130, 246, 0.4)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                onClick={() => navigate('/register')}
              >
                <Sparkles className="w-4 h-4 inline mr-2" />
                Sign Up
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden bg-white/95 backdrop-blur-lg border-t"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-6 space-y-4">
                {['Home', 'Features', 'How It Works', 'Testimonials'].map((item, index) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="block text-gray-700 hover:text-blue-600 font-medium transition-colors text-lg"
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item}
                  </motion.a>
                ))}
                <motion.button 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold mt-4"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/register')}
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 px-4">
        <div className="w-full mx-auto">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-block mb-6"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-2xl animate-pulse border-2 border-white/20">
                <Zap className="w-4 h-4 inline mr-2 animate-bounce" />
                Join 50,000+ Students Saving Money Daily
                <Sparkles className="w-4 h-4 inline ml-2" />
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-6xl md:text-8xl font-black text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              Share Rides,
              <br />
              <motion.span 
                className="gradient-text"
                animate={{ 
                  backgroundPosition: ['0%', '100%'],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  backgroundPosition: { duration: 3, repeat: Infinity },
                  scale: { duration: 2, repeat: Infinity }
                }}
              >
                Save Money
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-2xl md:text-3xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              India's first <span className="font-bold text-blue-600">college-focused</span> ride sharing platform. 
              Book rides with classmates and split costs <span className="font-bold text-green-600">effortlessly</span>.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <motion.button 
                className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl magnetic-btn relative overflow-hidden"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    "0 20px 25px -5px rgba(59, 130, 246, 0.5)",
                    "0 25px 50px -12px rgba(59, 130, 246, 0.8)",
                    "0 20px 25px -5px rgba(59, 130, 246, 0.5)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="relative z-10 flex items-center">
                  <Rocket className="mr-3 w-6 h-6 group-hover:rotate-45 transition-transform" />
                  Book Your First Ride
                  <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </motion.button>

              <motion.button 
                className="group bg-white text-gray-900 px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl border-3 border-blue-600/20 hover:border-blue-600 magnetic-btn"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center">
                  Watch Demo
                  <motion.span 
                    className="ml-3 text-blue-600"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    ▶
                  </motion.span>
                </span>
              </motion.button>
            </motion.div>

            {/* Animated Stats Bar */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl card-3d hover-lift border border-white/20"
                  whileHover={{ scale: 1.1, rotateY: 10 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1, type: "spring" }}
                >
                  <motion.div 
                    className="text-4xl md:text-5xl font-black gradient-text mb-3"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="flex items-center justify-center space-x-2 text-gray-600 font-semibold">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      {stat.icon}
                    </motion.div>
                    <span>{stat.label}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Animated Elements */}
        <motion.div
          className="absolute top-1/4 left-10 w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full opacity-20 animate-float-crazy"
          animate={{
            y: [0, -40, 0],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/3 right-20 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-20 animate-float-crazy"
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-28 h-28 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full opacity-20 animate-float-crazy"
          animate={{
            y: [0, -20, 0],
            rotate: [0, -180, -360],
            borderRadius: ["50%", "40%", "50%"],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </section>

      {/* Features Showcase */}
      <section id="features" className="py-20 px-4 relative">
        <div className="w-full mx-auto">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-5xl md:text-7xl font-black text-gray-900 mb-6"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
              viewport={{ once: true }}
            >
              Why Choose{" "}
              <motion.span 
                className="gradient-text"
                animate={{ 
                  backgroundPosition: ['0%', '100%'],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                RideBuddy
              </motion.span>
              ?
            </motion.h2>
            <motion.p 
              className="text-2xl text-gray-600 font-medium"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              Experience the <span className="font-bold text-purple-600">future</span> of student transportation
            </motion.p>
          </motion.div>

          {/* Featured Card - Large Rotating Display */}
          <motion.div 
            className="max-w-4xl mx-auto mb-20"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-12 card-3d hover-lift border border-white/20 relative overflow-hidden"
              whileHover={{ scale: 1.02, y: -10 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${features[currentFeature].color} opacity-5`}></div>
              <div className="relative z-10 text-center">
                <motion.div 
                  key={currentFeature}
                  className={`inline-flex p-8 rounded-3xl bg-gradient-to-br ${features[currentFeature].color} text-white mb-8 shadow-2xl ${features[currentFeature].animation}`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {features[currentFeature].icon}
                </motion.div>
                <motion.h3 
                  key={`title-${currentFeature}`}
                  className="text-4xl font-black text-gray-900 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {features[currentFeature].title}
                </motion.h3>
                <motion.p 
                  key={`desc-${currentFeature}`}
                  className="text-2xl text-gray-600 font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {features[currentFeature].description}
                </motion.p>
              </div>
              
              {/* Progress Indicators */}
              <div className="flex justify-center mt-10 space-x-3">
                {features.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`h-3 rounded-full transition-all duration-500 cursor-pointer ${
                      index === currentFeature 
                        ? 'w-16 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg' 
                        : 'w-3 bg-gray-300 hover:bg-gray-400'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => setCurrentFeature(index)}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group bg-white/90 backdrop-blur-lg rounded-3xl p-10 shadow-2xl card-3d border border-white/20 relative overflow-hidden"
                whileHover={{ scale: 1.05, y: -10 }}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 }
                }}
                onMouseEnter={() => setCurrentFeature(index)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                <div className="relative z-10">
                  <motion.div 
                    className={`inline-flex p-6 rounded-2xl bg-gradient-to-br ${feature.color} text-white mb-6 shadow-2xl ${feature.animation}`}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-2xl font-black text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-white/50 relative overflow-hidden">
        <div className="w-full mx-auto">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-5xl md:text-7xl font-black text-gray-900 mb-6"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
              viewport={{ once: true }}
            >
              Get Started in{" "}
              <motion.span 
                className="gradient-text"
                animate={{ 
                  backgroundPosition: ['0%', '100%'],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                3 Easy Steps
              </motion.span>
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                step: "01", 
                title: "Sign Up with College Email", 
                desc: "Verify your student status instantly",
                icon: "🎓",
                color: "from-blue-500 to-cyan-500"
              },
              { 
                step: "02", 
                title: "Find Your Ride Buddies", 
                desc: "Match with students going your way",
                icon: "🤝",
                color: "from-purple-500 to-pink-500"
              },
              { 
                step: "03", 
                title: "Share & Save Money", 
                desc: "Split costs and enjoy the journey",
                icon: "💰",
                color: "from-green-500 to-teal-500"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                {/* Connecting Line */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-20 left-1/2 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500 transform translate-x-1/2 z-0"></div>
                )}
                
                <motion.div 
                  className="relative bg-white/90 backdrop-blur-lg rounded-3xl p-10 shadow-2xl card-3d border border-white/20 z-10"
                  whileHover={{ scale: 1.05, y: -10 }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                >
                  <motion.div 
                    className={`absolute -top-8 -left-8 w-20 h-20 bg-gradient-to-br ${item.color} rounded-3xl flex items-center justify-center text-white text-3xl shadow-2xl`}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {item.icon}
                  </motion.div>
                  
                  <div className="mt-8">
                    <motion.h3 
                      className="text-3xl font-black text-gray-900 mb-4"
                      whileHover={{ scale: 1.05 }}
                    >
                      {item.title}
                    </motion.h3>
                    <p className="text-gray-600 text-xl leading-relaxed">{item.desc}</p>
                  </div>

                  {/* Step Number */}
                  <motion.div 
                    className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-2xl"
                    whileHover={{ scale: 1.1, rotate: 15 }}
                  >
                    {item.step}
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 relative">
        <div className="w-full mx-auto">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-5xl md:text-7xl font-black text-gray-900 mb-6"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
              viewport={{ once: true }}
            >
              What Students{" "}
              <motion.span 
                className="gradient-text"
                animate={{ 
                  backgroundPosition: ['0%', '100%'],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Say About Us
              </motion.span>
            </motion.h2>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.3
                }
              }
            }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className={`bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl card-3d border border-white/20 ${testimonial.animation}`}
                variants={{
                  hidden: { opacity: 0, y: 50, scale: 0.8 },
                  visible: { opacity: 1, y: 0, scale: 1 }
                }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div className="flex items-center mb-6">
                  <motion.div 
                    className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-black text-2xl shadow-2xl mr-6"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {testimonial.avatar}
                  </motion.div>
                  <div>
                    <h4 className="font-black text-gray-900 text-xl">{testimonial.name}</h4>
                    <p className="text-gray-600 font-medium">{testimonial.college}</p>
                  </div>
                </div>
                <motion.div 
                  className="flex mb-6"
                  whileHover={{ scale: 1.1 }}
                >
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.3, rotate: 15 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                </motion.div>
                <motion.p 
                  className="text-gray-700 text-lg leading-relaxed italic font-medium"
                  whileHover={{ scale: 1.02 }}
                >
                  "{testimonial.text}"
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 animate-rainbow"></div>
        
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <motion.div 
          className="max-w-4xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-5xl md:text-8xl font-black text-white mb-8"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            viewport={{ once: true }}
          >
            Ready to Start{" "}
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Saving?
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="text-2xl md:text-3xl text-white/90 mb-12 font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Join <span className="font-black">thousands</span> of students already using RideBuddy
          </motion.p>
          
          <motion.button 
            className="group bg-white text-gray-900 px-12 py-6 rounded-2xl font-black text-2xl shadow-2xl magnetic-btn relative overflow-hidden"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 25px 50px -12px rgba(255, 255, 255, 0.25)",
                "0 35px 60px -12px rgba(255, 255, 255, 0.5)",
                "0 25px 50px -12px rgba(255, 255, 255, 0.25)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="relative z-10 flex items-center">
              <Rocket className="mr-4 w-8 h-8 group-hover:rotate-45 transition-transform" />
              Get Started Now
              <ArrowRight className="ml-4 w-8 h-8 group-hover:translate-x-2 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </motion.button>
        </motion.div>

        {/* Floating Hearts */}
        <motion.div
          className="absolute top-10 left-1/4 text-white/20"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 20, 0],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Heart className="w-12 h-12" fill="currentColor" />
        </motion.div>
        <motion.div
          className="absolute bottom-10 right-1/4 text-white/20"
          animate={{
            y: [0, 30, 0],
            rotate: [0, -20, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        >
          <Heart className="w-16 h-16" fill="currentColor" />
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-2xl"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Rocket className="text-white w-6 h-6" />
                </motion.div>
                <motion.span 
                  className="text-2xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.1 }}
                >
                  RideBuddy
                </motion.span>
              </div>
              <motion.p 
                className="text-gray-400 text-lg leading-relaxed"
                whileHover={{ scale: 1.02 }}
              >
                Making college travel <span className="font-semibold text-blue-400">affordable</span> and <span className="font-semibold text-green-400">social</span>.
              </motion.p>
            </motion.div>
            
            {[
              { 
                title: "Product", 
                links: ["Features", "How It Works", "Pricing", "Security"],
                color: "from-blue-400 to-cyan-400"
              },
              { 
                title: "Company", 
                links: ["About", "Careers", "Blog", "Press"],
                color: "from-purple-400 to-pink-400"
              },
              { 
                title: "Support", 
                links: ["Help Center", "Contact", "Terms", "Privacy"],
                color: "from-green-400 to-teal-400"
              }
            ].map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.h4 
                  className={`font-black text-xl mb-6 bg-gradient-to-r ${section.color} bg-clip-text text-transparent`}
                  whileHover={{ scale: 1.05 }}
                >
                  {section.title}
                </motion.h4>
                <ul className="space-y-3">
                  {section.links.map((link, i) => (
                    <motion.li key={i} whileHover={{ x: 5 }}>
                      <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 font-medium text-lg">
                        {link}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="pt-12 border-t border-gray-800 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.p 
              className="text-gray-400 text-lg"
              whileHover={{ scale: 1.05 }}
            >
              &copy; 2024 RideBuddy. All rights reserved. Made with <Heart className="w-4 h-4 inline text-red-500" /> for students.
            </motion.p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;