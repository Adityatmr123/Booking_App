import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import centerRoutes from './routes/centerRoutes.js';
import sportRoutes from './routes/sportRoutes.js';
import courtRoutes from './routes/courtRoutes.js';
import cors from 'cors';
import path from 'path';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log('MongoDB is connected');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

const __dirname = path.resolve();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/centers', centerRoutes);
app.use('/api/sports', sportRoutes);
app.use('/api/courts', courtRoutes);



app.listen(3000, () => {
    console.log("Server is running on port 3000 !! ");
});

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});
