import mongoose from 'mongoose';

const sportSchema = new mongoose.Schema({
    name: { type: String, required: true },
    center: { type: mongoose.Schema.Types.ObjectId, ref: 'Center', required: true } // Reference to Center model
});

export default mongoose.model('Sport', sportSchema);
