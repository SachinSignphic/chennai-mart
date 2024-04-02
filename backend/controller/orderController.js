import express from "express";
const router = express.Router();
import CartModel from "../models/Cart.js";
import { verifyTokenMiddleware } from "../utils/middleware.js";
import OrderModel from "../models/Order.js";
import sanity from "../utils/sanity.js";
import { generate as OTPGenerator } from 'otp-generator';
import AddressModel from "../models/Address.js";
import DriverModel from "../models/Driver.js";

// This endpoint is called from frontend when user finalizes order jsut before payment page
// so probably generate payment link here
// save payment id and all i think
// also write a new webhook for razorpay API to hit. 

/* FOR NOW HAVE THE ORDER STATUS AS PAID SUCCESSFULLY! */
router.post("/new", verifyTokenMiddleware, async (req, res) => {
    //  Dummy data for testing
    // const data = {
    //     cart: {
    //         cartId: "66069bcbb48080f12097a5a0",
    //         items: [
    //             { id: "002b619a-23b0-4314-ba8d-ba1ec95129d1", quantity: 2 },
    //             { id: "029cf54a-c92e-407c-a070-27528cf9a9c1", quantity: 2 },
    //             { id: "0443fa40-3801-4a81-9988-8f43c4692264", quantity: 1 },
    //         ],
    //     },
    //     address: "660800d2c2da97b7df9ef300",
    // };

    const data = req.body;

    try {
        const cartData = await CartModel.findById(data.cart.cartId);

        if (!cartData)
            return res
                .status(404)
                .json({ error: "Could not find your cart! Order failed!" });

        cartData.items = data.cart.items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
        }));
        console.log("🚀 ~ order.post ~ cartData:", cartData);

        await cartData.save();

        const queryCartItems = `
            *[_id in [${cartData.items.map((item) => `'${item.productId}'`)}]] {
                _id,
                name,
                quantity_no,
                quantity_count,
                price,
                discount,
                discounted_price,
            }
        `;

        const productData = await sanity.fetch(queryCartItems);
        const orderTotal = productData
            .map(
                (product) => {
                    let currentProduct = cartData.items.find(item => item.productId == product._id)
                    return (product.discounted_price === 0
                        ? product.price * (1 - product.discount / 100)
                        : product.discounted_price) * parseInt(currentProduct.quantity)
                    }
            )
            .reduce((prev, curr) => prev + curr, 0)
            .toFixed(2);

        const orderData = new OrderModel({
            userId: req.userId,
            addressId: data.address,
            cartId: cartData._id,
            cartTotal: orderTotal,
            orderId: OTPGenerator(10, {
                specialChars: false,
                lowerCaseAlphabets: false,
                digits: true,
            }),
            // deliveredBy: the ID comes from the drivers who accept to deliver this order
            paymentStatus: "success", // ---> FOR NOW ONLY! REMOVE AFTER INTEGRATING RZRPY
        });
        console.log("🚀 ~ order.post ~ orderData:", orderData);
        
        await orderData.save();

        res.json({ message: `Order created successfully! Order ID is ${orderData._id}` });

    } catch (error) {
        console.log(`Error in creating order for ${req.headers.auth}:`, error);
        res.status(500).json({
            error: { message: "Server error in creating order" },
        });
    }
});

router.get("/", verifyTokenMiddleware, async (req, res) => {
    try {
        const orderData = await OrderModel.find({ userId: req.userId });
        const cartData = await CartModel.find({ userId: req.userId });
        const addressData = await AddressModel.findOne({ userId: req.userId });
        const driverData = await DriverModel.find();

        if (!orderData) return res.status(404).json({ error: "No orders found!" });
        if (!addressData) return res.status(404).json({ error: "No addresses found!" });
        if (!cartData) return res.status(404).json({ error: "No carts found!" });
        if (!driverData) return res.status(404).json({ error: "No drivers found!" });
        
        const orders = orderData.map(order => {
            const currentAddress = addressData.addresses.find(address => address._id + '' === order.addressId + '');
            const currentCart = cartData.find(cart => cart._id + '' === order.cartId + '');
            const currentDriver = order.deliveredBy ? driverData.find(driver => driver._id + '' === order.deliveredBy + ''): null;

            return {
                id: order.orderId,
                date: order.placedOn ? new Date(order.placedOn).toLocaleDateString("en-IN", {
                    timeZone: "Asia/Kolkata",
                }): 'N/A',
                time: order.placedOn? new Date(order.placedOn).toLocaleTimeString("en-IN", {
                    timeZone: "Asia/Kolkata",
                }): 'N/A',
                name: currentAddress.firstName + ' ' + currentAddress.lastName,
                status: order.orderStatus,
                total: order.cartTotal,
                itemsCount: currentCart.items.length,
                deliveredBy: currentDriver ?currentDriver.firstName + ' ' + currentDriver.lastName: 'N/A' 
            };
        })

        res.json(orders);
    } catch (error) {
        console.log("🚀 ~ order.get ~ error:", error);
        return res.status(500).json({ error: "Server error in fetching orders" });
    }
})

export default router;
