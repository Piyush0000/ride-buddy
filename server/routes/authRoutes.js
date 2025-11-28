import express from 'express';
const router = express.Router();
import {
  authUser,
  registerUser,
  googleAuth,
  getUserProfile,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/google', googleAuth);
router.route('/profile').get(protect, getUserProfile);

export default router;
