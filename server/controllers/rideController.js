import Ride from '../models/Ride.js';
import Group from '../models/Group.js';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';

// @desc    Create a new ride
// @route   POST /api/rides
// @access  Private
const createRide = asyncHandler(async (req, res) => {
  const { pickup, drop, time, mode } = req.body;

  // Validate required fields
  if (!pickup || !drop || !time || !mode) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  // Validate pickup and drop objects
  if (!pickup.address || !pickup.lat || !pickup.lng) {
    res.status(400);
    throw new Error('Please provide complete pickup location details');
  }

  if (!drop.address || !drop.lat || !drop.lng) {
    res.status(400);
    throw new Error('Please provide complete drop location details');
  }

  // Validate time
  const rideTime = new Date(time);
  if (isNaN(rideTime.getTime())) {
    res.status(400);
    throw new Error('Please provide a valid date and time');
  }

  // Validate mode
  if (mode !== 'solo' && mode !== 'sharing') {
    res.status(400);
    throw new Error('Mode must be either "solo" or "sharing"');
  }

  // For now, we'll use dummy values for distance, duration, and fare
  // In a real implementation, you would call Google Distance Matrix API here
  const distance = 10; // km
  const duration = 30; // minutes
  const fareEstimate = 200; // rupees

  const ride = new Ride({
    creatorId: req.user._id,
    pickup,
    drop,
    time: rideTime,
    distance,
    duration,
    fareEstimate,
    mode
  });

  const createdRide = await ride.save();

  // If sharing mode, create a group
  if (mode === 'sharing') {
    const group = new Group({
      rideId: createdRide._id,
      admin: req.user._id,
      members: [{
        userId: req.user._id,
        paymentStatus: 'pending'
      }]
    });

    const createdGroup = await group.save();
    
    // Update ride with groupId
    createdRide.groupId = createdGroup._id;
    await createdRide.save();
  }

  res.status(201).json(createdRide);
});

// @desc    Get user's rides
// @route   GET /api/rides/myrides
// @access  Private
const getMyRides = asyncHandler(async (req, res) => {
  const rides = await Ride.find({ creatorId: req.user._id }).sort({ createdAt: -1 });
  res.json(rides);
});

// @desc    Get ride by ID
// @route   GET /api/rides/:id
// @access  Private
const getRideById = asyncHandler(async (req, res) => {
  const ride = await Ride.findById(req.params.id);

  if (ride) {
    res.json(ride);
  } else {
    res.status(404);
    throw new Error('Ride not found');
  }
});

// @desc    Suggest groups for ride sharing
// @route   POST /api/rides/suggest-groups
// @access  Private
const suggestGroups = asyncHandler(async (req, res) => {
  const { pickup, drop, time } = req.body;

  // Find groups with similar pickup/drop locations and time
  // This is a simplified implementation - in reality, you'd use geospatial queries
  const groups = await Group.find({
    'members.userId': { $ne: req.user._id }, // Exclude groups where user is already a member
    status: 'open'
  }).populate('rideId');

  // Filter groups based on location and time similarity
  const suggestedGroups = groups.filter(group => {
    // In a real implementation, you would calculate distance between locations
    // For now, we'll just return all open groups
    return true;
  });

  res.json(suggestedGroups);
});

export { createRide, getMyRides, getRideById, suggestGroups };