
import express from "express";
const router = express.Router();
import CartModel from "../models/Cart.js";
import { verifyTokenMiddleware } from "../utils/middleware.js";

router.post("/new", verifyTokenMiddleware, async (req, res) => {
    const cart = req.body;
    try {
        const cartData = await CartModel.create({ userId: req.userId, items: cart.items.map(item => ({ productId: item.id, quantity: item.quantity })) });
        console.log("🚀 ~ cart.post ~ cart:", cartData);
        
        res.json(cartData);

    } catch (error) {
        console.log(`Error in creating cart for ${req.headers.auth}:`, error);
        res.status(500).json({
            error: { message: "Server error in creating cart" },
        });
    }
});

router.post('/update', verifyTokenMiddleware, async (req, res) => {
    const cart = req.body;
    try {        
        const cartData = await CartModel.findById(cart.cartId);
        
        if (!cartData) return res.status(404).json({ error: 'Could not find your cart!' });
        
        cartData.items = cart.items.map(item => ({ productId: item.id, quantity: item.quantity }));
        console.log("🚀 ~ router.post ~ cartData:", cartData);

        await cartData.save({ validateBeforeSave: false });

        res.status(200).json({ message: "Cart updated successfully!" });
        
    } catch (error) {
        console.log(`Error in updating cart for ${req.headers.auth}:`, error);
        res.status(500).json({ error: "Server error in updating cart items" });
    }
})

router.get('/new', verifyTokenMiddleware, async (req, res) => {
    try {
        const cartData = await CartModel.find({ userId: req.userId });
        console.log("🚀 ~ cart.get ~ cartData:", cartData)

        if(!cartData) return res.status(404).json({ message: "No carts yet!" });

        const currentCart = cartData.at(-1);
        if (currentCart.status !== "new") return res.status(404).json({ message: "No carts yet!" });
        
        return res.json(currentCart);

    } catch (error) {
        console.log("🚀 ~ cart.get ~ error:", error)
        res.status(500).json({ 
            error: "Server error in fetching cart details"
        })
    }
})

export default router;
