import express from 'express';
import { createCourt, getCourtsByCenterAndSport } from '../controllers/courtController.js';

const router = express.Router();

// Route for creating a new court
router.post('/', createCourt);

// Route for getting all courts of a particular sport under a center
router.post('/getByCenterAndSport', getCourtsByCenterAndSport);

export default router;
