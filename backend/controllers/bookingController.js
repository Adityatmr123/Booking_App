import Booking from '../models/booking.js';
import User from '../models/user.js'; // Make sure this import exists
import Court from '../models/court.js'; 

// 1. Get all bookings available for a sport on a particular date
export const getAvailableBookings = async (req, res) => {
    const { sportId, date } = req.body;

    if (!sportId || !date) {
        return res.status(400).json({ message: "Sport ID and date are required" });
    }

    try {
        // Find all courts associated with the sportId
        const courts = await Court.find({ sport: sportId });

        if (courts.length === 0) {
            return res.status(404).json({ message: "No courts found for this sport" });
        }

        // Get all bookings for those courts on the specified date
        const bookings = await Booking.find({
            court: { $in: courts.map(court => court._id) },
            date: new Date(date)
        }).populate('court');

        // Prepare a list of booked slots
        const bookedSlots = bookings.map(booking => ({
            courtId: booking.court._id.toString(),
            startTime: booking.startTime,
            endTime: booking.endTime,
        }));

        // Example: Generate available time slots for each court from 08:00 to 22:00 every hour
        const generateAvailableSlots = (courtBookings) => {
            const slots = [];
            for (let hour = 8; hour < 22; hour++) {
                const start = `${hour.toString().padStart(2, '0')}:00`;
                const end = `${(hour + 1).toString().padStart(2, '0')}:00`;

                // Check if this time slot is already booked
                const isBooked = courtBookings.some(slot =>
                    (slot.startTime < end && slot.endTime > start) // Overlapping logic
                );

                // If not booked, add the time slot to available slots
                if (!isBooked) {
                    slots.push({ start, end });
                }
            }
            return slots;
        };

        // Generate available slots for each court
        const availableSlots = courts.map(court => {
            const courtBookings = bookedSlots.filter(slot => slot.courtId === court._id.toString());
            const slots = generateAvailableSlots(courtBookings);

            return {
                courtId: court._id,
                courtName: court.name,  // Assuming you have a 'name' field in Court model
                availableSlots: slots,
            };
        });

        // Return the available slots for all courts (including those with no available slots)
        res.status(200).json(availableSlots);

    } catch (error) {
        console.error("Error fetching available bookings:", error);
        res.status(500).json({ message: "Error fetching available bookings", error });
    }
};





// 2. Book a slot
export const createBooking = async (req, res) => {
    const { customerName, userId, courtId, date, startTime, sportId } = req.body;

    if (!customerName || !userId || !courtId || !date || !startTime || !sportId) {
        return res.status(400).json({ message: "All fields are required." });
    }

    // Calculate end time (1 hour later)
    const startDateTime = new Date(`${date}T${startTime}:00`); // Assuming startTime is in HH:mm format
    const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); // 1 hour later

    const newBooking = new Booking({
        customerName,
        user: userId,
        court: courtId,
        date: startDateTime,
        startTime,
        endTime: endDateTime.toTimeString().split(' ')[0].slice(0, 5), // Format to HH:mm
        sport: sportId, // Include sportId
    });

    try {
        // Check for existing bookings at the same time
        const existingBooking = await Booking.findOne({
            court: courtId,
            date: startDateTime,
            startTime,
        });

        if (existingBooking) {
            return res.status(400).json({ message: "Slot already booked for this time." });
        }

        // Save the booking
        await newBooking.save();

        // Update the user to include the new booking reference
        await User.findByIdAndUpdate(userId, { $push: { bookings: newBooking._id } });

        // Update the court to include the new booking reference
        await Court.findByIdAndUpdate(courtId, { $push: { bookings: newBooking._id } });

        res.status(201).json({ message: "Booking created successfully", booking: newBooking });
    } catch (error) {
        console.error("Error details:", error); // Log the error details
        res.status(500).json({ message: "Error creating booking", error });
    }
};



// 3. Get the schedule of a center on a specific day
export const getScheduleByCenter = async (req, res) => {
    const { centerId, date } = req.body;

    if (!centerId || !date) {
        return res.status(400).json({ message: "Center ID and date are required" });
    }

    try {
        const bookings = await Booking.find({ date: new Date(date) }).populate('court');

        // Filter bookings by center
        const filteredBookings = bookings.filter(booking => booking.court.center.toString() === centerId);

        res.status(200).json(filteredBookings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching schedule", error });
    }
};

// 4. Get user slots booked for a specific date
export const getUserBookings = async (req, res) => {
    const { userId, date } = req.body;

    if (!userId || !date) {
        return res.status(400).json({ message: "User ID and date are required" });
    }

    try {
        // Convert date to ISO format and set the start and end of the day
        const startOfDay = new Date(date);
        const endOfDay = new Date(startOfDay);
        endOfDay.setHours(23, 59, 59, 999); // Set to the end of the day

        // Find bookings for the specific user and date
        const bookings = await Booking.find({
            user: userId,
            date: { $gte: startOfDay, $lte: endOfDay } // Check for bookings in the date range
        }).populate('court');

        res.status(200).json(bookings);
    } catch (error) {
        console.error("Error details:", error); // Log the error details for debugging
        res.status(500).json({ message: "Error fetching user bookings", error });
    }
};
