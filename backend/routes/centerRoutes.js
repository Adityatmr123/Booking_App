import express from 'express';
import { createCenter, getCenters } from '../controllers/centerController.js';

const router = express.Router();

// Create a new center
router.post('/', createCenter);

// Get all centers
router.get('/', getCenters);

export default router;
