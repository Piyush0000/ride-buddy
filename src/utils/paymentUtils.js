// src/utils/paymentUtils.js

// Mock function to simulate processing UPI payment
export const processUPIPayment = async (upiId, amount) => {
  // In a real app, this would integrate with a payment gateway
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate 90% success rate
      if (Math.random() > 0.1) {
        resolve({
          success: true,
          transactionId: `upi_txn_${Date.now()}`,
          amount,
          timestamp: new Date().toISOString(),
          upiId
        });
      } else {
        reject(new Error('Payment failed. Please try again.'));
      }
    }, 2000);
  });
};

// Mock function to simulate processing card payment
export const processCardPayment = async (cardDetails, amount) => {
  // In a real app, this would integrate with a payment gateway
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate 90% success rate
      if (Math.random() > 0.1) {
        resolve({
          success: true,
          transactionId: `card_txn_${Date.now()}`,
          amount,
          timestamp: new Date().toISOString(),
          cardLast4: cardDetails.cardNumber.slice(-4)
        });
      } else {
        reject(new Error('Payment failed. Please check your card details and try again.'));
      }
    }, 2000);
  });
};

// Mock function to calculate fare breakdown
export const calculateFareBreakdown = (baseFare, groupSize, platformFee = 50) => {
  const totalFare = baseFare + platformFee;
  const perPersonFare = totalFare / groupSize;
  
  return {
    baseFare,
    platformFee,
    totalFare,
    groupSize,
    perPersonFare: parseFloat(perPersonFare.toFixed(2))
  };
};

// Mock function to simulate checking payment status
export const checkPaymentStatus = async (transactionId) => {
  // In a real app, this would check with the payment gateway
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        transactionId,
        status: 'completed',
        timestamp: new Date().toISOString()
      });
    }, 500);
  });
};