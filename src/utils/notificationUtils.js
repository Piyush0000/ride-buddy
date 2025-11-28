// src/utils/notificationUtils.js

// Mock function to simulate sending notifications
export const sendNotification = async (userId, message, type = 'info') => {
  // In a real app, this would integrate with a notification service
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Notification sent to user ${userId}: ${message} (${type})`);
      resolve({
        id: Date.now(),
        userId,
        message,
        type,
        timestamp: new Date().toISOString(),
        read: false
      });
    }, 100);
  });
};

// Mock function to simulate sending SMS
export const sendSMS = async (phoneNumber, message) => {
  // In a real app, this would integrate with an SMS service provider
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`SMS sent to ${phoneNumber}: ${message}`);
      resolve({
        success: true,
        messageId: `sms_${Date.now()}`,
        timestamp: new Date().toISOString()
      });
    }, 200);
  });
};

// Mock function to simulate sending email
export const sendEmail = async (email, subject, message) => {
  // In a real app, this would integrate with an email service provider
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Email sent to ${email} with subject "${subject}"`);
      resolve({
        success: true,
        messageId: `email_${Date.now()}`,
        timestamp: new Date().toISOString()
      });
    }, 300);
  });
};

// Mock notification templates
export const notificationTemplates = {
  rideConfirmed: (userName, pickup, dropoff, time) => 
    `Hello ${userName}, your ride from ${pickup} to ${dropoff} at ${time} has been confirmed!`,
  
  rideReminder: (userName, pickup, dropoff, time) => 
    `Reminder: Your ride from ${pickup} to ${dropoff} is scheduled for ${time}. Please be ready!`,
  
  newRidePartner: (userName, partnerName) => 
    `Good news ${userName}! ${partnerName} has joined your ride group.`,
  
  paymentReceived: (userName, amount) => 
    `Payment of ₹${amount} has been received. Thank you for using RideBuddy!`,
  
  rideCancelled: (userName, reason) => 
    `Unfortunately, your ride has been cancelled. Reason: ${reason}. Please book another ride.`
};