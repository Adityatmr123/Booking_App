import mongoose from 'mongoose';

const courtSchema = new mongoose.Schema({
    sport: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sport',  // Reference to Sport model
        required: true
    },
    center: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Center',  // Reference to Center model
        required: true
    },
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking'  // Reference to Booking model
    }],
}, { timestamps: true });

export default mongoose.model('Court', courtSchema);