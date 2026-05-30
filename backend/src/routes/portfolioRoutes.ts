import { Router } from 'express';
import { submitContact, getStats, incrementViews } from '../controllers/portfolioController';

const router = Router();

// Route mappings
router.post('/contact', submitContact);
router.get('/stats', getStats);
router.post('/hit', incrementViews);

export default router;
