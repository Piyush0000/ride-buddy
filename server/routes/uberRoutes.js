import express from 'express';
const router = express.Router();
import {
  createUberLink,
  trackAndRedirect,
  uploadRideProof,
  getMyTrackingRecords,
  getTrackingRecordById
} from '../controllers/uberController.js';
import { protect } from '../middleware/authMiddleware.js';

// Protected routes
router.route('/create-link')
  .post(protect, createUberLink);

router.route('/upload-proof')
  .post(protect, uploadRideProof);

router.route('/my-tracking')
  .get(protect, getMyTrackingRecords);

router.route('/tracking/:trackingId')
  .get(protect, getTrackingRecordById);

// Public route for tracking and redirecting to Uber
router.route('/track/:trackingId')
  .get(trackAndRedirect);

export default router;