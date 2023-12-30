import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import ProductCartAction from "./ProductCartAction";

const StackHeader = ({ headerTitle, cartActionForId, routeAction }) => {
    return (
        <View
            className={`flex flex-row ${
                cartActionForId ? "bg-teal" : "bg-white"
            }  justify-start w-full py-10 mt-6`}>
            <TouchableOpacity
                onPress={routeAction ? () => router.push(routeAction): router.back}
                hitSlop={10}
                className='p-2 left-5 absolute flex self-center bg-primary rounded-xl z-50'>
                <Ionicons
                    name='arrow-back-sharp'
                    size={24}
                    color='white'
                />
            </TouchableOpacity>
            <Text
                className={`text-xl text-center ${
                    !cartActionForId && "w-full"
                } flex self-center font-nunito-800 text-primary max-modern:text-md`}>
                {headerTitle}
            </Text>
            {cartActionForId && (
                <View className='flex justify-end w-full pr-10'>
                    <ProductCartAction productId={cartActionForId} />
                </View>
            )}
        </View>
    );
};

export default StackHeader;
