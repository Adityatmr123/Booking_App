import express from 'express';
import {
    getAvailableBookings,
    createBooking,
    getScheduleByCenter,
    getUserBookings,
} from '../controllers/bookingController.js';

const router = express.Router();

// 1. Get all bookings available for a sport on a particular date
router.post('/available', getAvailableBookings);

// 2. Book a slot
router.post('/', createBooking);

// 3. Get the schedule of a center on a specific day
router.post('/schedule', getScheduleByCenter);

// 4. Get user slots booked for a specific date
router.post('/user/slots', getUserBookings);

export default router;
