import express from 'express';
const router = express.Router();
import {
  getGroupById,
  joinGroup,
  leaveGroup,
  sendChatMessage
} from '../controllers/groupController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/:id')
  .get(protect, getGroupById);

router.route('/:id/join')
  .post(protect, joinGroup);

router.route('/:id/leave')
  .delete(protect, leaveGroup);

router.route('/:id/chat')
  .post(protect, sendChatMessage);

export default router;