import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { API_URL } from "@/constants";
import { getToken } from "@/utils/fetch";

const index = () => {
    const productData = useSelector((state) => state.products.products);
    const cartData = useSelector((state) => state.cart);
    const addressData = useSelector((state) => state.address);
    let totalCartAmount = cartData.items
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

    const handlePayment = async () => {
        try {
            const cartUpdateRequest = await fetch(API_URL + "/cart/update", {
                method: "POST",
                headers: {
                    Auth: await getToken(),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cartData),
            });
            const cartUpdateResponse = await cartUpdateRequest.json();
            console.log(
                "🚀 ~ updateCartData ~ cartUpdateResponse:",
                cartUpdateResponse
            );

            if (cartUpdateRequest.status == 200) {
                // here cart is updated successfully means, maybe show an indication?
                console.log("Cart updated!");
            }

            if (cartUpdateRequest.status == 403) {
                await storage.remove({ key: "user" });
                await storage.save({ key: "user", expires: 10 });
                ToastAndroid.show(
                    "User Session Expired. Please login again",
                    ToastAndroid.LONG
                );
                router.replace("/login?showname=false");
                return;
            }

            if (cartUpdateRequest.status == 404) {
                await storage.remove({ key: "cartId" });
                dispatch(addCartId(""));
            }

            if (cartUpdateRequest.status == 500) {
                Alert.alert(
                    "Unexpected Server Error!",
                    cartUpdateResponse.error,
                    [{ text: "OK", style: "cancel" }]
                );
            }
        } catch (error) {
            console.log("🚀 ~ updateCartData ~ error:", error);
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
