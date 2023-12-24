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
        <View className='flex self-center flex-row items-center justify-between w-[90%] bg-primary px-4 rounded-xl min-h-[80px] fixed bottom-[4%]'>
            <Text className='text-white font-nunito-800 text-xl ml-4'>
                {cartItems?.length} items | ₹{currentCartItemsData.reduce((prev, curr) => prev + (curr.price * cartItems.find(item => item.id == curr.id).quantity), 0)}
            </Text>
            {!currentCartItem && (
                <Pressable>
                    <View className='flex flex-row gap-x-2 items-center justify-center px-6 py-4 rounded-xl bg-[#100F18]'>
                        <MaterialCommunityIcons
                            name='shopping-outline'
                            size={24}
                            color='white'
                        />
                        <Pressable onPress={() => dispatch(addToCart({ id }))}>
                            <Text className='font-nunito-800 text-lg text-white'>
                                Add to Cart
                            </Text>
                        </Pressable>
                    </View>
                </Pressable>
            )}
            {currentCartItem && (
                <Pressable>
                    <View className='flex flex-row gap-x-2 items-center justify-center px-6 py-4 rounded-xl bg-[#100F18]'>
                        <MaterialCommunityIcons
                            name='shopping-outline'
                            size={24}
                            color='white'
                        />
                        <Pressable onPress={() => router.push("/cart")}>
                            <Text className='font-nunito-800 text-lg text-white'>
                                View Cart
                            </Text>
                        </Pressable>
                    </View>
                </Pressable>
            )}
        </View>
    );
};

export default TabBarCartAction;
