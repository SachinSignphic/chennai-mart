// controllers/authController.js

import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';

const secretKey = process.env.ISS_SECRET; // Change this to a more secure value in production

// Route for user login
router.post("/req-otp", async (req, res) => {
    const { mobile, name } = req.body;
    console.log("🚀 ~ router.post ~ req.body:", req.body)
    // return res.send("OK");
    try {
        const requestOTP = async (mobile) => {
            // const OTPRequest = await fetch("thatsiteendpoint");
            // return await OTPRequest.json();
            return "0000";
        }
        const userData = await UserModel.findOne({ phone: mobile });

        if (!userData) {
            const userData = new UserModel({
                userName: name,
                phone: mobile,
            });

            const OTP = await requestOTP(mobile);
            userData.otp = OTP;

            await userData.save();
        } else {
            const OTP = await requestOTP(mobile);
            userData.otp = OTP;
            await userData.save();
        }

        res.json({ data: {
            message: "OTP Sent successfully!"
        } });
    } catch (error) {
        console.log(`Error in generating OTP for ${mobile}:`, error);
        res.status(500).json({ error: { message: "Server error for OTP request" } });
    }
});

router.post('/login', async (req, res) => {
    const { mobile, OTP } = req.body; // i get mobile number again from user because i can check if it has been messed with or not
    console.log(req.body);
    try {
        // Check if the mobile number exists in the database
        let user = await UserModel.findOne({ phone: mobile });
        console.log("🚀 ~ router.post ~ user:", user)

        if (!user) {
            // If the mobile number doesn't exist, add the user to the collection
            return res.status(404).json({ error: "Mobile number does not exist!" });
        }
        
        if (!(user.otp === OTP)) {
            return res.status(403).json({ error: "Invalid OTP entered!" });
        }

        // also make a check to implement expired OTP and such!
        /// for simplicity, no expiry check for now

        // Generate JWT token for the user
        const token = jwt.sign({ userId: user._id }, "unakkuthaan", { expiresIn: '2d' });
        console.log({ token, userId: user._id, userName: user.userName })
        res.json({ data: { token, userId: user._id, userName: user.userName } });
    } catch (err) {
        console.error(`Error during login for ${mobile}:`, err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
