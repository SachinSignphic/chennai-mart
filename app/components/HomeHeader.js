import { View, Text, TouchableOpacity } from "react-native";
import React, { useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SplashScreen, router } from "expo-router";

const HomeHeader = () => {
    return (
        <View className='header flex flex-row items-center justify-between w-full px-6 py-6 pb-2'>
            <View>
                <Text
                    className='text-secondary text-xl modern:text-3xl w-min'
                    style={{
                        // fontFamily: "serif",
                        fontFamily: "Nunito ExtraBold",
                        // fontWeight: 800,
                    }}>
                    Welcome Back,
                </Text>
                <Text className='text-primary text-3xl modern:text-4xl w-fit font-nunito-800'>
                    DAVID
                </Text>
            </View>
            <View className='flex flex-row items-center gap-6'>
                <TouchableOpacity
                    hitSlop={10}
                    onLongPress={() => router.push("/home/settings")}
                    onPress={() => router.push("/home/settings")}>
                    <Ionicons
                        name='md-settings-sharp'
                        size={24}
                        color='black'
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    hitSlop={10}
                    onLongPress={() => router.push("/home/user/1")}
                    onPress={() => router.push("/home/user/1")}>
                    <View className='border-2 modern:border h-16 w-16 modern:w-20 modern:h-20 rounded-full flex items-center justify-center'>
                        <View className='w-[85%] h-[85%] rounded-full bg-secondary'></View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default HomeHeader;
