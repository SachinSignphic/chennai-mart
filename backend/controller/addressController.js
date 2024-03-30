// controllers/address.js

import express from "express";
const router = express.Router();
import AddressModel from "../models/Address.js";
import { verifyTokenMiddleware  } from "../utils/middleware.js"

router.post("/new", verifyTokenMiddleware, async (req, res) => {
    const address = req.body;
    try {
        const addressData = await AddressModel.findOneAndUpdate(
            { userId: req.userId },
            {
                $setOnInsert: {
                    userId: req.userId,
                },
                $push: {
                    addresses: {
                        ...address,
                        country: "India",
                    },
                },
            },
            { new: true, upsert: true }
        );
        console.log("🚀 ~ router.post ~ address:", addressData)

        res.json({
            data: addressData.addresses.at(-1)
        });
    } catch (error) {
        console.log(`Error in saving address for ${req.headers.auth}:`, error);
        res.status(500).json({
            error: { message: "Error in saving address" },
        });
    }
});

router.get('/', verifyTokenMiddleware, async (req, res) => {
    try {
        const addressData = await AddressModel.findOne({ userId: req.userId });
        if (!addressData) return res.status(404).json({ message: "No addresses saved!" });
        return res.json({ data: addressData.addresses });
    } catch (error) {
        console.log("🚀 ~ address.get ~ error:", error);
        return res.status(500).json({ message: "Server error in fetching addresses!" });
    }
})

export default router;
