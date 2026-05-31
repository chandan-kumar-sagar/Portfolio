import { Router } from 'express';
import { submitContact, getStats, incrementViews } from '../controllers/portfolioController';
import { handleChat } from '../controllers/chatController';

const router = Router();

router.post('/contact', submitContact);
router.post('/chat', handleChat);
router.get('/stats', getStats);
router.post('/hit', incrementViews);

export default router;
