import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

const index = () => {
    const productData = useSelector((state) => state.products.products);
    const cartData = useSelector((state) => state.cart.items);
    let totalCartAmount = cartData
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

    return (
        <View className='flex'>
            <Text className='text-primary font-nunito-800 text-xl'>MockPay</Text>
            <Text className='text-primary font-nunito-400 text-lg'>This is a test payment page, no money is deducted.</Text>
            <Text className='text-primary font-nunito-400 text-base'>Testing purposes only</Text>
            <TouchableOpacity className='flex py-3 mt-8 mx-2 bg-primary rounded-lg justify-center'>
                <Text className='text-white self-center font-nunito-400 text-md modern:text-lg'>
                    Pay ₹ {totalCartAmount}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default index;