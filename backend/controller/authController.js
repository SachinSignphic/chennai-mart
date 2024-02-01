// controllers/authController.js

import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const secretKey = process.env.ISS_SECRET; // Change this to a more secure value in production

// Route for user login
router.post("/req-otp", async (req, res) => {
    try {
        const { mobile } = req.body;

        // insert code to contact service to generate and send OTP
        res.json({ status: 200, data: {
            message: "OTP Sent successfully!"
        } });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, error: "Server error for OTP request" });
    }
});

router.post('/login', async (req, res) => {
    const { mobile, OTP } = req.body; // i get mobile number again from user because i can check if it has been messed with or not

    try {
        // Check if the mobile number exists in the database
        let user = await User.findOne({ mobileNumber });

        if (!user) {
            // If the mobile number doesn't exist, add the user to the collection
            user = new User({ mobileNumber });
            await user.save();
        }

        // Generate JWT token for the user
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '2d' });
        res.json({ status: 200, data: { token } });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
