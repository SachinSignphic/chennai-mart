import { View, Text, TouchableOpacity, ToastAndroid, Alert } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "@/constants";
import { getToken } from "@/utils/fetch";
import { router } from "expo-router";
import storage from "@/utils/storage";
import { addCartId, deleteCart } from "@/context/cart";

const index = () => {
    const productData = useSelector((state) => state.products.products);
    const cartData = useSelector((state) => state.cart);
    const addressData = useSelector((state) => state.address);
    const totalCartAmount = cartData.items
        .map((item) => {
            let currProduct = productData.find(
                (product) => product._id == item.id
            );
            return (
                (currProduct.discounted_price === 0
                    ? currProduct.price * (1 - currProduct.discount / 100)
                    : currProduct.discounted_price) * item.quantity
            );
        })
        .reduce((prev, curr) => prev + curr, 0)
        .toFixed(2);

    const dispatch = useDispatch();

    const handlePayment = async () => {
        try {
            const orderRequest = await fetch(API_URL + "/order/new", {
                method: "POST",
                headers: {
                    Auth: await getToken(),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ cart: cartData, address: addressData.selected }),
            });
            const orderResponse = await orderRequest.json();
            console.log(
                "🚀 ~ updateCartData ~ orderResponse:",
                orderResponse
            );

            if (orderRequest.status == 200) {
                ToastAndroid.show(
                    "Order Placement successful!",
                    ToastAndroid.LONG
                );
                console.log("Order has been placed successfully!");
                await storage.remove({ key: "cartId" });
                await storage.remove({ key: 'cartItems' });
                dispatch(addCartId(""));
                dispatch(deleteCart());
                router.push("/cart/success");
            }

            if (orderRequest.status == 403) {
                await storage.remove({ key: "user" });
                await storage.save({ key: "user", expires: 10 });
                ToastAndroid.show(
                    "User Session Expired. Please login again",
                    ToastAndroid.LONG
                );
                router.replace("/login?showname=false");
                return;
            }

            if (orderRequest.status == 404) {
                await storage.remove({ key: "cartId" });
                ToastAndroid.show(
                    "Cart ID was not found!",
                    ToastAndroid.LONG
                );
                dispatch(addCartId(""));
            }

            if (orderRequest.status == 500) {
                Alert.alert(
                    "Unexpected Server Error!",
                    orderResponse.error,
                    [{ text: "OK", style: "cancel" }]
                );
            }
        } catch (error) {
            console.log("🚀 ~ updateCartData ~ error:", error);
            Alert.alert(
                "Unexpected Error!",
                "Please report this error",
                [{ text: "OK", style: "cancel" }]
            );
            return;
        }
    };

    return (
        <View className='flex'>
            <Text className='text-primary font-nunito-800 text-xl'>
                MockPay
            </Text>
            <Text className='text-primary font-nunito-400 text-lg'>
                This is a test payment page, no money is deducted.
            </Text>
            <Text className='text-primary font-nunito-400 text-base'>
                Testing purposes only
            </Text>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={handlePayment}
                className='flex py-3 mt-8 mx-2 bg-primary rounded-lg justify-center'>
                <Text className='text-white self-center font-nunito-400 text-md modern:text-lg'>
                    Pay ₹ {totalCartAmount}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default index;
