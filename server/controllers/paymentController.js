import Payment from '../models/Payment.js';
import Group from '../models/Group.js';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import Razorpay from 'razorpay';
import mongoose from 'mongoose';

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_your_key_id',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'your_key_secret'
});

// @desc    Initiate payment
// @route   POST /api/payments/initiate
// @access  Private
const initiatePayment = asyncHandler(async (req, res) => {
  const { groupId, amount } = req.body;
  
  // Validate required fields
  if (!groupId || !amount) {
    res.status(400);
    throw new Error('Group ID and amount are required');
  }
  
  // Validate amount
  if (isNaN(amount) || amount <= 0) {
    res.status(400);
    throw new Error('Please provide a valid amount');
  }
  
  // Validate MongoDB ObjectId format for groupId
  if (!mongoose.Types.ObjectId.isValid(groupId)) {
    res.status(400);
    throw new Error('Please provide a valid group ID');
  }
  
  try {
    // Create Razorpay order
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: 'INR',
      receipt: `receipt_${groupId}_${req.user._id}`
    };
    
    const order = await razorpay.orders.create(options);
    
    // Save payment record
    const payment = new Payment({
      orderId: order.id,
      userId: req.user._id,
      groupId,
      amount,
      status: 'pending'
    });
    
    const createdPayment = await payment.save();
    
    res.status(201).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency
    });
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    res.status(500);
    throw new Error('Failed to initiate payment');
  }
});

// @desc    Verify payment
// @route   POST /api/payments/verify
// @access  Private
const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpayPaymentId, razorpayOrderId, razorpaySignature, groupId } = req.body;
  
  // Validate required fields
  if (!razorpayPaymentId || !razorpayOrderId || !razorpaySignature || !groupId) {
    res.status(400);
    throw new Error('All payment details are required');
  }
  
  // Validate MongoDB ObjectId format for groupId
  if (!mongoose.Types.ObjectId.isValid(groupId)) {
    res.status(400);
    throw new Error('Please provide a valid group ID');
  }
  
  try {
    // Verify payment signature with Razorpay
    const crypto = require('crypto');
    const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'your_key_secret');
    shasum.update(`${razorpayOrderId}|${razorpayPaymentId}`);
    const digest = shasum.digest('hex');
    
    if (digest !== razorpaySignature) {
      res.status(400);
      throw new Error('Payment verification failed');
    }
    
    const payment = await Payment.findOne({ orderId: razorpayOrderId });
    
    if (payment) {
      payment.razorpayPaymentId = razorpayPaymentId;
      payment.razorpayOrderId = razorpayOrderId;
      payment.razorpaySignature = razorpaySignature;
      payment.status = 'completed';
      
      const updatedPayment = await payment.save();
      
      // Update user's payment status
      const user = await User.findById(req.user._id);
      if (user) {
        user.paymentVerified = true;
        await user.save();
      }
      
      // Update group member's payment status
      const group = await Group.findById(groupId);
      if (group) {
        const member = group.members.find(m => m.userId.toString() === req.user._id.toString());
        if (member) {
          member.paymentStatus = 'paid';
          await group.save();
        }
      }
      
      res.json({
        success: true,
        message: 'Payment verified successfully'
      });
    } else {
      res.status(404);
      throw new Error('Payment record not found');
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500);
    throw new Error('Failed to verify payment');
  }
});

// @desc    Get payment status
// @route   GET /api/payments/:id
// @access  Private
const getPaymentStatus = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id);
  
  if (payment) {
    res.json(payment);
  } else {
    res.status(404);
    throw new Error('Payment not found');
  }
});

export { initiatePayment, verifyPayment, getPaymentStatus };