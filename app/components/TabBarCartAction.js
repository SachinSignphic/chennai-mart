import { View, Text } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "@context/cart";

const TabBarCartAction = ({ id }) => {
    const cartItems = useSelector((state) => state.cart.items);
    const productsData = useSelector(state => state.products.products);
    
    const dispatch = useDispatch();
    const currentCartItem = cartItems.find((item) => item.id == id);
    const currentProduct = productsData.find(item => item.id == id);

    console.log(currentCartItem, currentProduct);

    return (
        <View className='flex self-center items-center justify-evenly w-[90%] bg-primary rounded-xl h-[90px] fixed bottom-[2%]'>
            <Text className='text-white font-nunito-400 text-xl'>₹{currentProduct.price}</Text>
        </View>
    );
};

export default TabBarCartAction;
