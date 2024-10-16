import express from 'express';
import { createSport, getSportsByCenter } from '../controllers/sportController.js';

const router = express.Router();

// Route for creating a new sport
router.post('/', createSport);

// Route for getting all sports by center (using body)
router.post('/getByCenter', getSportsByCenter);

export default router;
