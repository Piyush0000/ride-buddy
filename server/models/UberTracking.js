import mongoose from 'mongoose';

const uberTrackingSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  trackingId: {
    type: String,
    required: true,
    unique: true
  },
  uberDeepLink: {
    type: String,
    required: true
  },
  pickup: {
    address: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  drop: {
    address: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  clickCount: {
    type: Number,
    default: 0
  },
  estimatedFare: {
    type: Number, // in rupees
    default: 0
  },
  actualFare: {
    type: Number, // in rupees
    default: 0
  },
  commissionEarned: {
    type: Number, // in rupees
    default: 0
  },
  commissionRate: {
    type: Number, // percentage
    default: 3 // 3% commission
  },
  status: {
    type: String,
    enum: ['created', 'clicked', 'completed', 'commission_paid'],
    default: 'created'
  },
  proofUploaded: {
    type: Boolean,
    default: false
  },
  proofImage: {
    type: String // URL to the proof image
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const UberTracking = mongoose.model('UberTracking', uberTrackingSchema);

export default UberTracking;