import express from 'express';
const router = express.Router();
import {
  getAdminStats,
  getUsers,
  getRides,
  getGroups,
  getPayments,
  banUser,
  unbanUser
} from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// All admin routes require authentication and admin privileges
router.use(protect, admin);

router.route('/stats')
  .get(getAdminStats);

router.route('/users')
  .get(getUsers);

router.route('/users/:id/ban')
  .put(banUser);

router.route('/users/:id/unban')
  .put(unbanUser);

router.route('/rides')
  .get(getRides);

router.route('/groups')
  .get(getGroups);

router.route('/payments')
  .get(getPayments);

export default router;