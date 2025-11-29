import User from '../models/User.js';
import Ride from '../models/Ride.js';
import Group from '../models/Group.js';
import Payment from '../models/Payment.js';
import asyncHandler from 'express-async-handler';

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getAdminStats = asyncHandler(async (req, res) => {
  try {
    // Get total users
    const totalUsers = await User.countDocuments();
    
    // Get total rides
    const totalRides = await Ride.countDocuments();
    
    // Get total groups
    const totalGroups = await Group.countDocuments();
    
    // Get total commission (sum of all payments)
    const payments = await Payment.find({ status: 'completed' });
    const totalCommission = payments.reduce((sum, payment) => sum + payment.amount, 0);
    
    // Get recent rides
    const recentRides = await Ride.find()
      .populate('creatorId', 'name email')
      .sort({ createdAt: -1 })
      .limit(10);
    
    res.json({
      stats: {
        totalUsers,
        totalRides,
        totalGroups,
        totalCommission
      },
      recentRides
    });
  } catch (error) {
    res.status(500);
    throw new Error('Failed to fetch admin stats');
  }
});

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500);
    throw new Error('Failed to fetch users');
  }
});

// @desc    Get all rides
// @route   GET /api/admin/rides
// @access  Private/Admin
const getRides = asyncHandler(async (req, res) => {
  try {
    const rides = await Ride.find()
      .populate('creatorId', 'name email')
      .populate('groupId');
    res.json(rides);
  } catch (error) {
    res.status(500);
    throw new Error('Failed to fetch rides');
  }
});

// @desc    Get all groups
// @route   GET /api/admin/groups
// @access  Private/Admin
const getGroups = asyncHandler(async (req, res) => {
  try {
    const groups = await Group.find()
      .populate('rideId')
      .populate('members.userId', 'name email')
      .populate('admin', 'name email');
    res.json(groups);
  } catch (error) {
    res.status(500);
    throw new Error('Failed to fetch groups');
  }
});

// @desc    Get all payments
// @route   GET /api/admin/payments
// @access  Private/Admin
const getPayments = asyncHandler(async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('userId', 'name email')
      .populate('groupId');
    res.json(payments);
  } catch (error) {
    res.status(500);
    throw new Error('Failed to fetch payments');
  }
});

// @desc    Ban a user
// @route   PUT /api/admin/users/:id/ban
// @access  Private/Admin
const banUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (user) {
      user.isBanned = true;
      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    res.status(500);
    throw new Error('Failed to ban user');
  }
});

// @desc    Unban a user
// @route   PUT /api/admin/users/:id/unban
// @access  Private/Admin
const unbanUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (user) {
      user.isBanned = false;
      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    res.status(500);
    throw new Error('Failed to unban user');
  }
});

export {
  getAdminStats,
  getUsers,
  getRides,
  getGroups,
  getPayments,
  banUser,
  unbanUser
};