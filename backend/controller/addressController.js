// controllers/address.js

import express from "express";
const router = express.Router();
import { verifyToken } from "../utils/token.js";
import AddressModel from "../models/Address.js";
import UserModel from "../models/User.js";

// Route for user login
router.post("/new", async (req, res) => {
    console.log(req.headers);
    const token = req.headers['auth'];
    const address = req.body;
    console.log("🚀 address: ", address, token);

    try {
        const userId = verifyToken(token);
        console.log("🚀 ~ router.post ~ userId:", userId)
        
        if (!userId) return res.status(403).json({ error: 'Invalid Token!' });

        const userData = await UserModel.findById(userId);
        console.log("🚀 ~ address.post ~ userData:", userData)

        if (!userData) {
            return res.status(403).json({ error: 'Invalid User!' });
        } 

        const addressData = await AddressModel.findOneAndUpdate(
            { userId },
            {
                $setOnInsert: {
                    userId: userId,
                },
                $push: {
                    addresses: {
                        ...address,
                        country: 'India'
                    }
                },
            },
            { new: true, upsert: true }
        );
        console.log("🚀 ~ router.post ~ address:", addressData)

        res.json({
            data: {
                addressData,
            },
        });
    } catch (error) {
        console.log(`Error in saving address for ${req.headers.auth}:`, error);
        res.status(500).json({
            error: { message: "Error in saving address" },
        });
    }
});

export default router;
