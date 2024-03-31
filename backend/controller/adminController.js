import express from "express";
const router = express.Router();
import CartModel from "../models/Cart.js";
import UserModel from '../models/User.js';
import AddressModel from '../models/Address.js'
import OrderModel from '../models/Order.js'
import sanity from "../utils/sanity.js";

router.get("/orders", async (req, res) => {
    try {
        // id: order._id,
        //         name: order.name,
        //         address: order.address.streetLandmark,
        //         date: order.placedOn,
        //         products: order.items.length,
        //         status: order.orderStatus,
        //         driver: order.driver.firstName,
        //         items: order.items
        const userData = await UserModel.find();
        const cartData = await CartModel.find();
        const orderData = await OrderModel.find();
        const addressData = await AddressModel.find();
        
        const adminData = orderData.map(order => {
            const currentCart = cartData.find(cart => cart._id + '' === order.cartId + '');
            const currentUser = userData.find(user => user._id + '' === order.userId + '');
            const currentAddress = addressData.find(addr => addr.userId + '' === order.userId + '')?.addresses.find(addr => addr._id + '' == order.addressId + '');
            return {
                id: order.orderId,
                name: currentUser.userName,
                address: currentAddress.streetLandmark,
                date: order.placedOn,
                products: currentCart.items.length,
                status: order.orderStatus,
                driver: order.deliveredBy || 'N/A',
            }
        });
        return res.json(adminData);
    } catch (error) {
        console.log("🚀 ~ admin.get ~ error:", error);
        res.status(500).json({
            error: "Server error in fetching admin order data",
        });
    }
});

router.get('/products', async (req, res) => {
    const IDs = req.body;
    try {
        const sanityProductDataQuery = `
            *[_id in [${IDs}]] {
                _id
                name,
                'category': category[] -> {_id, title, description, category_image},
                quantity_no,
                quantity_count,
                price,
                discount,
                discounted_price,
                main_image {
                    asset -> {
                        url
                    }
                },
            }
        `;
    } catch (error) {
        console.log("🚀 ~ admin.products.get ~ error:", error)
    }
})

export default router;