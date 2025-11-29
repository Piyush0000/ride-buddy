import express from 'express';
const router = express.Router();
import {
  createRide,
  getMyRides,
  getRideById,
  suggestGroups
} from '../controllers/rideController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/')
  .post(protect, createRide);

router.route('/myrides')
  .get(protect, getMyRides);

router.route('/:id')
  .get(protect, getRideById);

router.route('/suggest-groups')
  .post(protect, suggestGroups);

export default router;