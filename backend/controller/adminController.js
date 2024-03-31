import express from "express";
const router = express.Router();
import CartModel from "../models/Cart.js";
import UserModel from '../models/User.js';
import AddressModel from '../models/Address.js'
import OrderModel from '../models/Order.js'
import sanity from "../utils/sanity.js";

router.get("/orders", async (req, res) => {
    try {

        const userData = await UserModel.find();
        const cartData = await CartModel.find();
        const orderData = await OrderModel.find();
        const addressData = await AddressModel.find();
        const productIDs = cartData.flatMap(cart => cart.items.map(item => item.productId));

        const adminData = orderData.map(order => {
            const currentCart = cartData.find(cart => cart._id + '' === order.cartId + '');
            const currentUser = userData.find(user => user._id + '' === order.userId + '');
            const currentAddress = addressData.find(addr => addr.userId + '' === order.userId + '')?.addresses.find(addr => addr._id + '' == order.addressId + '');
            return {
                id: order.orderId,
                name: currentUser.userName,
                address: currentAddress?.streetLandmark,
                date: new Date(order.placedOn).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' }),
                products: currentCart.items.length,
                status: order.orderStatus,
                driver: { name: order.deliveredBy || 'N/A', id: order.deliveredBy }, // here check for drivers in drivers collctn with ROLE and use that name
                items: currentCart.items,
                total: order.cartTotal
            }
        });
        return res.json(adminData);
    } catch (error) {
        res.status(500).json({
            error: "Server error in fetching admin order data",
        });
    }
});

router.post('/products', async (req, res) => {
    const IDs = req.body;
    try {
        const sanityProductDataQuery = `
            *[_id in [${IDs.map(id => `'${id}'`)}]] {
                _id,
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
        const productsData = await sanity.fetch(sanityProductDataQuery);
        res.json(productsData);

    } catch (error) {
    }
})

export default router;