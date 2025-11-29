import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { uberAPI } from '../services/api.js';
import { motion } from 'framer-motion';
import { Car, MapPin, Clock, IndianRupee, Award, Upload, CheckCircle } from 'lucide-react';

const UberTracking = () => {
  const { user } = useAuth();
  const [trackingRecords, setTrackingRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showProofForm, setShowProofForm] = useState(false);
  const [proofData, setProofData] = useState({
    actualFare: '',
    proofImage: ''
  });

  useEffect(() => {
    fetchTrackingRecords();
  }, []);

  const fetchTrackingRecords = async () => {
    try {
      setLoading(true);
      const response = await uberAPI.getMyTrackingRecords();
      setTrackingRecords(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch tracking records');
      setLoading(false);
    }
  };

  const handleUploadProof = async (trackingId) => {
    setSelectedRecord(trackingId);
    setShowProofForm(true);
  };

  const handleProofSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const payload = {
        trackingId: selectedRecord,
        actualFare: parseFloat(proofData.actualFare),
        proofImage: proofData.proofImage
      };
      
      await uberAPI.uploadRideProof(payload);
      
      // Refresh the tracking records
      fetchTrackingRecords();
      
      // Reset form and close modal
      setProofData({ actualFare: '', proofImage: '' });
      setShowProofForm(false);
      setSelectedRecord(null);
      
      alert('Proof uploaded successfully!');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to upload proof');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'created': return 'bg-yellow-100 text-yellow-800';
      case 'clicked': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'commission_paid': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'created': return 'Created';
      case 'clicked': return 'Clicked';
      case 'completed': return 'Completed';
      case 'commission_paid': return 'Commission Paid';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading-spinner mr-2"></div>
        <span>Loading tracking records...</span>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div 
        className="rounded-md bg-red-50 p-4 mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-sm text-red-700">
          {error}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Commission Balance */}
      <motion.div 
        className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Your Commission Balance</h3>
            <p className="text-purple-200 mt-1">Total earnings from Uber referrals</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">₹{user?.commissionBalance || 0}</div>
            <p className="text-purple-200 text-sm">Available to withdraw</p>
          </div>
        </div>
      </motion.div>

      {/* Tracking Records */}
      <motion.div 
        className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-6 border border-white/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Car className="mr-2 h-5 w-5 text-blue-600" />
          Uber Tracking Records
        </h3>
        
        {trackingRecords.length === 0 ? (
          <div className="text-center py-8">
            <Car className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No tracking records</h3>
            <p className="mt-1 text-sm text-gray-500">Create an Uber link to start tracking.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {trackingRecords.map((record, index) => (
              <motion.div 
                key={record._id}
                className="p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">
                        {record.pickup.address} to {record.drop.address}
                      </h4>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                        {getStatusText(record.status)}
                      </span>
                    </div>
                    
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        <span>{new Date(record.timestamp).toLocaleString()}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <IndianRupee className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        <span>Est: ₹{record.estimatedFare || 0} | Act: ₹{record.actualFare || 0}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <Award className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        <span>Comm: ₹{record.commissionEarned || 0}</span>
                      </div>
                    </div>
                    
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      <span>Clicks: {record.clickCount}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 md:ml-4 flex space-x-2">
                    {record.status === 'clicked' && !record.proofUploaded && (
                      <motion.button
                        onClick={() => handleUploadProof(record.trackingId)}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Upload className="mr-1 h-4 w-4" />
                        Upload Proof
                      </motion.button>
                    )}
                    
                    {record.status === 'completed' && (
                      <div className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-green-800 bg-green-100">
                        <CheckCircle className="mr-1 h-4 w-4" />
                        Completed
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Proof Upload Modal */}
      {showProofForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-white rounded-2xl shadow-xl w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Upload Ride Proof</h3>
              
              <form onSubmit={handleProofSubmit} className="space-y-4">
                <div>
                  <label htmlFor="actualFare" className="block text-sm font-medium text-gray-700 mb-1">
                    Actual Fare (₹)
                  </label>
                  <input
                    type="number"
                    id="actualFare"
                    required
                    value={proofData.actualFare}
                    onChange={(e) => setProofData({...proofData, actualFare: e.target.value})}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all duration-300 hover:shadow-md bg-white/50 backdrop-blur-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="proofImage" className="block text-sm font-medium text-gray-700 mb-1">
                    Proof Image URL
                  </label>
                  <input
                    type="text"
                    id="proofImage"
                    required
                    value={proofData.proofImage}
                    onChange={(e) => setProofData({...proofData, proofImage: e.target.value})}
                    placeholder="Enter URL to screenshot"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all duration-300 hover:shadow-md bg-white/50 backdrop-blur-sm"
                  />
                  <p className="mt-1 text-xs text-gray-500">In a real app, this would be a file upload</p>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <motion.button
                    type="button"
                    onClick={() => setShowProofForm(false)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                  
                  <motion.button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Upload className="mr-1 h-4 w-4" />
                    Upload Proof
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default UberTracking;