import mongoose from 'mongoose';

const centerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true }
});

export default mongoose.model('Center', centerSchema);
