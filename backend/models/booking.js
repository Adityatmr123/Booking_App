import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    court: { type: mongoose.Schema.Types.ObjectId, ref: 'Court', required: true },
    sport: { type: mongoose.Schema.Types.ObjectId, ref: 'Sport', required: true }, // Reference to Sport model
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);
