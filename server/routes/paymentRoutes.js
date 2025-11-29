import express from 'express';
const router = express.Router();
import {
  initiatePayment,
  verifyPayment,
  getPaymentStatus
} from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/initiate')
  .post(protect, initiatePayment);

router.route('/verify')
  .post(protect, verifyPayment);

router.route('/:id')
  .get(protect, getPaymentStatus);

export default router;