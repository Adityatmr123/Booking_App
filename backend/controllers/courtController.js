import Court from '../models/court.js';

// Create a new court
export const createCourt = async (req, res) => {
    const { sport, center } = req.body;

    const newCourt = new Court({ sport, center });

    try {
        await newCourt.save();
        res.status(201).json({ message: "Court created successfully", court: newCourt });
    } catch (error) {
        res.status(500).json({ message: "Error creating court", error });
    }
};

// Get all courts

export const getCourtsByCenterAndSport = async (req, res) => {
    const { centerId, sport } = req.body; // Get center ID and sport from request body

    // Validate input
    if (!centerId || !sport) {
        return res.status(400).json({ message: "Center ID and sport are required" });
    }

    try {
        // Find all courts that belong to the specified center and sport
        const courts = await Court.find({ center: centerId, sport: sport });

        // If no courts are found, return a 404 response
        if (courts.length === 0) {
            return res.status(404).json({ message: "No courts found for this sport in the specified center" });
        }

        res.status(200).json(courts); // Return the list of courts
    } catch (error) {
        res.status(500).json({ message: "Error fetching courts", error });
    }
};
