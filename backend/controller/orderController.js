import express from "express";
const router = express.Router();
import CartModel from "../models/Cart.js";
import { verifyTokenMiddleware } from "../utils/middleware.js";
import OrderModel from "../models/Order.js";
import sanity from "../utils/sanity.js";

router.post("/new", verifyTokenMiddleware, async (req, res) => {
    // get cart id and cart items from request,
    // update cart first
    // then create a new order
    const data = req.body;
    try {
        const cartData = await CartModel.findById(data.cart.cartId);

        if (!cartData)
            return res
                .status(404)
                .json({ error: "Could not find your cart! Order failed!" });

        cartData.items = cart.items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
        }));
        console.log("🚀 ~ router.post ~ cartData:", cartData);

        await cartData.save({ validateBeforeSave: false });

        const queryCartItems = `
            *[_type=='products'] {
                _id,
                name,
                description,
                'category': category[] -> {_id, title, description, category_image},
                quantity_no,
                quantity_count,
                price,
                discount,
                discounted_price,
                tags,
                main_image {
                    asset -> {
                        url
                    }
                },
                images{asset -> {url}}[]
            }[1..20]
        `;
        
        /* 
        
        const productData = await sanity.fetch(queryCartItems);

        // total up the sum using productData object
        // then populate below OrderModl
        const orderData = await OrderModel.create({
            userId: req.userId,
            addressId: data.addressId,
            cartId: cartData._id,
            // cartTotal: cartData.ite
        });

        */
        res.json(cartData);
    } catch (error) {
        console.log(`Error in creating order for ${req.headers.auth}:`, error);
        res.status(500).json({
            error: { message: "Server error in creating order" },
        });
    }
});

export default router;
