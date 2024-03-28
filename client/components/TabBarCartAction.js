import { View, Text, Pressable } from "react-native";
import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@context/cart";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import storage from "@/utils/storage";

const TabBarCartAction = ({ id }) => {
    const cartItems = useSelector((state) => state.cart.items);
    const productsData = useSelector((state) => state.products.products);

    const dispatch = useDispatch();
    const currentCartItem = cartItems.find((item) => item.id == id);
    // const currentProduct = productsData.find((item) => item._id == id);
    
    // I Think i am unnecessarily memoizing these states, anyway lets see
    const cartItemIDs = useMemo(
        () => cartItems.map((item) => item.id),
        [cartItems]
    );
    const currentCartItemsData = useMemo(
        () =>
            productsData.filter((product) => cartItemIDs.includes(product._id)),
        [productsData, cartItemIDs]
    );
    const priceRightNow = useMemo(
        () =>
            currentCartItemsData
                .reduce(
                    (prev, curr) =>
                        prev +
                        (curr.discounted_price === 0
                            ? curr.price * (1 - curr.discount / 100)
                            : curr.discounted_price) *
                            cartItems.find((item) => item.id == curr._id)
                                .quantity,
                    0
                )
                .toFixed(2),
        [currentCartItemsData]
    );

    return (
        <View className='flex self-center flex-row items-center justify-between w-[90%] bg-primary px-4 rounded-xl min-h-[80px] absolute bottom-[2%]'>
            <Text className='text-white font-nunito-800 modern:text-lg text-md ml-4'>
                {cartItems?.length} items | ₹
                {priceRightNow}
            </Text>
            {!currentCartItem && (
                <Pressable
                    hitSlop={10}
                    onPress={async () =>{ 
                        await storage.save({ key: 'cartItems', data: cartItems.map(item => item.id == productId? {...item, quantity: ++item.quantity }: item) })
                        dispatch(addToCart({ id }))}}>
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
