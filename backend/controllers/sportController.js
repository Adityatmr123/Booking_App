import Sport from '../models/sport.js';

// Create a new sport
export const createSport = async (req, res) => {
    const { name, center } = req.body;

    // Validate input
    if (!name || !center) {
        return res.status(400).json({ message: "Name and center are required" });
    }

    const newSport = new Sport({ name, center });

    try {
        await newSport.save();
        res.status(201).json({ message: "Sport created successfully", sport: newSport });
    } catch (error) {
        res.status(500).json({ message: "Error creating sport", error });
    }
};

// Get all sports
export const getSportsByCenter = async (req, res) => {
    const { centerId } = req.body;

    // Validate input
    if (!centerId) {
        return res.status(400).json({ message: "Center ID is required" });
    }

    try {
        // Find all sports that belong to the specified center
        const sports = await Sport.find({ center: centerId }).populate('center', 'name location'); 
        
        // If no sports are found, return a 404 response
        if (sports.length === 0) {
            return res.status(404).json({ message: "No sports found for this center" });
        }

        res.status(200).json(sports); // Return the list of sports
    } catch (error) {
        res.status(500).json({ message: "Error fetching sports", error });
    }
};