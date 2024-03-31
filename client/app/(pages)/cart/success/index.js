import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link, router, useNavigation } from "expo-router";

const index = () => {
    const navigation = useNavigation();
    useEffect(() => {
        const handleBack = (e) => {
            e.preventDefault();
            router.replace("/home");
        };

        return () => {
            navigation.removeListener("beforeRemove", handleBack);
        };
    }, []);

    return (
        <View className='flex flex-1 w-full bg-white items-center justify-center'>
            <Ionicons
                name='checkmark-circle-outline'
                size={64}
                color='green'
            />
            <Text className='text-xl text-primary'>
                Order Placement successful!
            </Text>
            <Link
                href={"/home"}
                replace
                className='px-4 py-2 mt-5 text-lg bg-secondary/20 rounded-md'>
                Continue Shopping
            </Link>
        </View>
    );
};

export default index;
