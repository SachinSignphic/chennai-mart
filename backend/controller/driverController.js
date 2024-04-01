import express from "express";
const router = express.Router();
import CartModel from "../models/Cart.js";
import UserModel from "../models/User.js";
import AddressModel from "../models/Address.js";
import OrderModel from "../models/Order.js";
import sanity from "../utils/sanity.js";
import DriverModel from "../models/Driver.js";

router.get("/orders/get", async (req, res) => {
    try {
        const userData = await UserModel.find();
        const cartData = await CartModel.find();
        const orderData = await OrderModel.find();
        const addressData = await AddressModel.find();

        const adminData = orderData.map((order) => {
            const currentCart = cartData.find(
                (cart) => cart._id + "" === order.cartId + ""
            );
            const currentUser = userData.find(
                (user) => user._id + "" === order.userId + ""
            );
            const currentAddress = addressData
                .find((addr) => addr.userId + "" === order.userId + "")
                ?.addresses.find(
                    (addr) => addr._id + "" == order.addressId + ""
                );
            return {
                id: order.orderId,
                name: currentUser.userName,
                address: currentAddress?.streetLandmark,
                date: new Date(order.placedOn).toLocaleString(undefined, {
                    timeZone: "Asia/Kolkata",
                }),
                products: currentCart.items.length,
                items: currentCart.items,
                total: order.cartTotal,
            };
        });
        return res.json(adminData);
    } catch (error) {
        res.status(500).json({
            error: "Server error in fetching admin order data",
        });
    }
});

router.post("/orders/accept", /* inga middleware to check driver mode varanum */ async (req, res) => {
    const order = req.body;
    const driverId = req.body.driverId; // this driverId is just for testing, remove this and use driverId from middlware
    try {
        const orderData = await OrderModel.findOne({ orderId: order.orderId });
        if (!orderData) return res.status(404).json({ error: "Could not find such order!" });
        orderData.deliveredBy = driverId;
        await orderData.save();
        return res.json({ message: "Order accepted!" });
    } catch (error) {
        console.log("🚀 ~ driver.post ~ error:", error)
        res.status(500).json({ error: "Server error in accepting order" });
    }
})

router.post('/new', async (req, res) => {
    try {
        const driverData = await DriverModel.create({
            firstName: 'Driver 1',
            lastName: 'Test',
            age: 37,
            phone: '9848227660'
        });
        return res.json(driverData);
    } catch (error) {
        console.log("🚀 ~ router.post ~ error:", error)
        return res.status(500).json({ error: "Server error in creating driver" })
    }
})

export default router;