import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { connect } from 'mongoose';

import authController from './controller/authController.js'; // Import the auth controller
import addressController from './controller/addressController.js';
import cartController from './controller/cartController.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// MongoDB connection URL
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB
connect(mongoURI, { dbName: "chennai-mart" })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Mount the authController router
app.use('/auth', authController);
app.use('/address/', addressController);
app.use('/cart', cartController);
