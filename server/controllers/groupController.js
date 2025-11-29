import Group from '../models/Group.js';
import Ride from '../models/Ride.js';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';

// @desc    Get group by ID
// @route   GET /api/groups/:id
// @access  Private
const getGroupById = asyncHandler(async (req, res) => {
  const group = await Group.findById(req.params.id)
    .populate('rideId')
    .populate('members.userId', 'name avatar')
    .populate('admin', 'name avatar');

  if (group) {
    res.json(group);
  } else {
    res.status(404);
    throw new Error('Group not found');
  }
});

// @desc    Join a group
// @route   POST /api/groups/:id/join
// @access  Private
const joinGroup = asyncHandler(async (req, res) => {
  const group = await Group.findById(req.params.id);
  
  if (group) {
    // Check if user is already a member
    const isMember = group.members.some(member => 
      member.userId.toString() === req.user._id.toString()
    );
    
    if (isMember) {
      res.status(400);
      throw new Error('You are already a member of this group');
    }
    
    // Add user to group
    group.members.push({
      userId: req.user._id,
      paymentStatus: 'pending'
    });
    
    const updatedGroup = await group.save();
    res.json(updatedGroup);
  } else {
    res.status(404);
    throw new Error('Group not found');
  }
});

// @desc    Leave a group
// @route   DELETE /api/groups/:id/leave
// @access  Private
const leaveGroup = asyncHandler(async (req, res) => {
  const group = await Group.findById(req.params.id);
  
  if (group) {
    // Check if user is a member
    const memberIndex = group.members.findIndex(member => 
      member.userId.toString() === req.user._id.toString()
    );
    
    if (memberIndex === -1) {
      res.status(400);
      throw new Error('You are not a member of this group');
    }
    
    // Remove user from group
    group.members.splice(memberIndex, 1);
    
    // If group becomes empty, delete it
    if (group.members.length === 0) {
      await group.remove();
      res.json({ message: 'Group deleted' });
    } else {
      // If the leaving user was the admin, assign a new admin
      if (group.admin.toString() === req.user._id.toString()) {
        group.admin = group.members[0].userId;
      }
      
      const updatedGroup = await group.save();
      res.json(updatedGroup);
    }
  } else {
    res.status(404);
    throw new Error('Group not found');
  }
});

// @desc    Send a chat message
// @route   POST /api/groups/:id/chat
// @access  Private
const sendChatMessage = asyncHandler(async (req, res) => {
  const { message } = req.body;
  
  // Validate required fields
  if (!message) {
    res.status(400);
    throw new Error('Message is required');
  }
  
  // Validate message length
  if (message.trim().length === 0) {
    res.status(400);
    throw new Error('Message cannot be empty');
  }
  
  if (message.length > 500) {
    res.status(400);
    throw new Error('Message cannot exceed 500 characters');
  }
  
  const group = await Group.findById(req.params.id);
  
  if (group) {
    // Check if user is a member
    const isMember = group.members.some(member => 
      member.userId.toString() === req.user._id.toString()
    );
    
    if (!isMember) {
      res.status(400);
      throw new Error('You are not a member of this group');
    }
    
    // Add message to chat
    group.chat.push({
      senderId: req.user._id,
      message
    });
    
    const updatedGroup = await group.save();
    res.status(201).json(updatedGroup.chat[updatedGroup.chat.length - 1]);
  } else {
    res.status(404);
    throw new Error('Group not found');
  }
});

export { getGroupById, joinGroup, leaveGroup, sendChatMessage };