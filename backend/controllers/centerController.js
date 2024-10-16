import Center from '../models/center.js';

// Create a new center
export const createCenter = async (req, res) => {
    const { name, location } = req.body;

    const newCenter = new Center({ name, location });

    try {
        await newCenter.save();
        res.status(201).json({ message: "Center created successfully", center: newCenter });
    } catch (error) {
        res.status(500).json({ message: "Error creating center", error });
    }
};

// Get all centers
export const getCenters = async (req, res) => {
    try {
        const centers = await Center.find();
        res.status(200).json(centers);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving centers", error });
    }
};
