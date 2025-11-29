import UberTracking from '../models/UberTracking.js';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import crypto from 'crypto';

// @desc    Create Uber deep link and tracking
// @route   POST /api/uber/create-link
// @access  Private
const createUberLink = asyncHandler(async (req, res) => {
  const { pickup, drop } = req.body;

  // Validate required fields
  if (!pickup || !drop) {
    res.status(400);
    throw new Error('Please provide pickup and drop locations');
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

  // Generate a unique tracking ID
  const trackingId = crypto.randomBytes(8).toString('hex');

  // Create Uber deep link
  // Format: uber://?action=setPickup&pickup[latitude]=LAT&pickup[longitude]=LNG&dropoff[latitude]=LAT&dropoff[longitude]=LNG&dropoff[nickname]=NAME
  const uberDeepLink = `uber://?action=setPickup&pickup[latitude]=${pickup.lat}&pickup[longitude]=${pickup.lng}&dropoff[latitude]=${drop.lat}&dropoff[longitude]=${drop.lng}&dropoff[nickname]=${encodeURIComponent(drop.address)}`;

  // Create tracking record
  const uberTracking = new UberTracking({
    userId: req.user._id,
    trackingId,
    uberDeepLink,
    pickup,
    drop
  });

  const createdTracking = await uberTracking.save();

  // Return the tracking link that will be used in our system
  const trackingLink = `${req.protocol}://${req.get('host')}/api/uber/track/${trackingId}`;

  res.status(201).json({
    trackingId,
    trackingLink,
    uberDeepLink,
    message: 'Uber link created successfully'
  });
});

// @desc    Track Uber link click and redirect to Uber
// @route   GET /api/uber/track/:trackingId
// @access  Public
const trackAndRedirect = asyncHandler(async (req, res) => {
  const { trackingId } = req.params;

  // Find the tracking record
  const uberTracking = await UberTracking.findOne({ trackingId });

  if (!uberTracking) {
    res.status(404);
    throw new Error('Tracking link not found');
  }

  // Increment click count
  uberTracking.clickCount += 1;
  uberTracking.status = 'clicked';
  await uberTracking.save();

  // Redirect to Uber deep link
  res.redirect(uberTracking.uberDeepLink);
});

// @desc    Upload ride proof and calculate commission
// @route   POST /api/uber/upload-proof
// @access  Private
const uploadRideProof = asyncHandler(async (req, res) => {
  const { trackingId, actualFare, proofImage } = req.body;

  // Find the tracking record
  const uberTracking = await UberTracking.findOne({ trackingId });

  if (!uberTracking) {
    res.status(404);
    throw new Error('Tracking record not found');
  }

  // Check if user owns this tracking record
  if (uberTracking.userId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this tracking record');
  }

  // Update with actual fare and proof
  uberTracking.actualFare = actualFare;
  uberTracking.proofUploaded = true;
  uberTracking.proofImage = proofImage;
  uberTracking.status = 'completed';

  // Calculate commission (3% of actual fare)
  const commission = actualFare * (uberTracking.commissionRate / 100);
  uberTracking.commissionEarned = commission;

  const updatedTracking = await uberTracking.save();

  // Update user's commission balance
  const user = await User.findById(req.user._id);
  if (user) {
    user.commissionBalance = (user.commissionBalance || 0) + commission;
    await user.save();
  }

  res.json({
    ...updatedTracking._doc,
    message: 'Proof uploaded and commission calculated successfully'
  });
});

// @desc    Get user's Uber tracking records
// @route   GET /api/uber/my-tracking
// @access  Private
const getMyTrackingRecords = asyncHandler(async (req, res) => {
  const trackingRecords = await UberTracking.find({ userId: req.user._id })
    .sort({ createdAt: -1 });

  res.json(trackingRecords);
});

// @desc    Get Uber tracking record by ID
// @route   GET /api/uber/tracking/:trackingId
// @access  Private
const getTrackingRecordById = asyncHandler(async (req, res) => {
  const { trackingId } = req.params;

  const uberTracking = await UberTracking.findOne({ trackingId });

  if (!uberTracking) {
    res.status(404);
    throw new Error('Tracking record not found');
  }

  // Check if user owns this tracking record
  if (uberTracking.userId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to view this tracking record');
  }

  res.json(uberTracking);
});

export { 
  createUberLink, 
  trackAndRedirect, 
  uploadRideProof, 
  getMyTrackingRecords, 
  getTrackingRecordById 
};