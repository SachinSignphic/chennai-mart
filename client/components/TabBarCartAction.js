import { View, Text, Pressable } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "@context/cart";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

const TabBarCartAction = ({ id }) => {
    const cartItems = useSelector((state) => state.cart.items);
    const productsData = useSelector((state) => state.products.products);

    const dispatch = useDispatch();
    const currentCartItem = cartItems.find((item) => item.id == id);
    const currentProduct = productsData.find((item) => item.id == id);
    const cartItemIDs = cartItems.map((item) => item.id);
    const currentCartItemsData = productsData.filter((product) =>
        cartItemIDs.includes(product.id)
    );
    // console.log(cartItems, productsData, currentCartItemsData);

    return (
        <View className='flex self-center flex-row items-center justify-between w-[90%] bg-primary px-4 rounded-xl min-h-[80px] absolute bottom-[2%]'>
            <Text className='text-white font-nunito-800 modern:text-lg text-md ml-4'>
                {cartItems?.length} items | ₹
                {currentCartItemsData.reduce(
                    (prev, curr) =>
                        prev +
                        curr.price *
                            cartItems.find((item) => item.id == curr.id)
                                .quantity,
                    0
                )}
            </Text>
            {!currentCartItem && (
                <Pressable
                    hitSlop={10}
                    onPress={() => dispatch(addToCart({ id }))}>
                    <View className='flex flex-row gap-x-2 items-center justify-center px-6 py-4 rounded-xl bg-[#100F18]'>
                        <MaterialCommunityIcons
                            name='shopping-outline'
                            size={24}
                            color='white'
                        />
                        <Text className='font-nunito-800 modern:text-lg text-md text-white'>
                            Add to Cart
                        </Text>
                    </View>
                </Pressable>
            )}
            {currentCartItem && (
                <Pressable
                    hitSlop={10}
                    onPress={() => router.push("/cart")}>
                    <View className='flex flex-row gap-x-2 items-center justify-center px-6 py-4 rounded-xl bg-[#100F18]'>
                        <MaterialCommunityIcons
                            name='shopping-outline'
                            size={24}
                            color='white'
                        />
                        <Text className='font-nunito-800 modern:text-lg text-md text-white'>
                            View Cart
                        </Text>
                    </View>
                </Pressable>
            )}
        </View>
    );
};

export default TabBarCartAction;
