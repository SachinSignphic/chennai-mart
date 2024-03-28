
import express from "express";
const router = express.Router();
import { verifyToken } from "../utils/token.js";
import CartModel from "../models/Cart.js";
import UserModel from "../models/User.js";

// Route for user login
router.post("/new", async (req, res) => {
    console.log(req.headers);
    const token = req.headers["auth"];
    const cart = req.body;
    console.log("🚀 address: ", cart, token);

    try {
        const userId = verifyToken(token);
        console.log("🚀 ~ cart.post ~ userId:", userId);

        if (!userId) return res.status(403).json({ error: "Invalid Token!" });

        const userData = await UserModel.findById(userId);
        console.log("🚀 ~ cart.post ~ userData:", userData.firstName);

        if (!userData) {
            return res.status(403).json({ error: "Invalid User!" });
        }

        const cartData = await CartModel.findOneAndUpdate(
            { userId },
            {
                $setOnInsert: {
                    userId: userId,
                },
                $push: {
                    items: {
                        productId: String,
                        quantity: String,
                        discount: Number,
                    },
                },
            },
            { new: true, upsert: true }
        );
        console.log("🚀 ~ cart.post ~ cart:", cartData);

        res.json({
            data: {
                message: "Payment successful!",
            },
        });
    } catch (error) {
        console.log(`Error in saving address for ${req.headers.auth}:`, error);
        res.status(500).json({
            error: { message: "Error in saving address" },
        });
    }
});

router.get('/new', async (req, res) => {
    const token = req.headers["auth"];
    try {
        const userId = verifyToken(token);

        if (!userId) return res.status(403).json({ error: "Invalid Token!" });

        const userData = await UserModel.findById(userId);
        console.log("🚀 ~ cart.post ~ userData:", userData.firstName);

        if (!userData) {
            return res.status(403).json({ error: "Invalid User!" });
        }

        const cartData = await CartModel.find({ userId });
        console.log("🚀 ~ cart.get ~ cartData:", cartData)

        if(!cartData) return res.status(404).json({ message: "No carts yet!" });

        const currentCart = cartData.at(-1);
        if (currentCart.status !== "new") return res.status(404).json({ message: "No carts yet!" });
        
        return res.json(currentCart);

    } catch (error) {
        console.log("🚀 ~ router.get ~ error:", error)
        res.status(500).json({ 
            error: "Server error in fetching cart details"
        })
    }
})

export default router;
