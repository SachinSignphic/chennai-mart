import { View, Text, TouchableOpacity } from "react-native";
import React, { useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import {useFonts} from "expo-font";
import { SplashScreen, router } from "expo-router";

const HomeHeader = () => {
    const [fontsLoaded, fontError] = useFonts({
        "Nunito-ExtraBold": require("@assets/fonts/Nunito-ExtraBold.otf"),
        // "Inter-SemiBoldItalic":
        //     "https://rsms.me/inter/font-files/Inter-SemiBoldItalic.otf?v=3.12",
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <View
            className='header flex flex-row items-center justify-around w-full py-6'
            onLayout={onLayoutRootView}>
            <View>
                <Text
                    className='text-secondary text-xl modern:text-3xl w-min'
                    style={{
                        // fontFamily: "serif",
                        fontFamily: "Nunito-ExtraBold",
                        fontWeight: 800,
                    }}>
                    Welcome Back,
                </Text>
                <Text
                    className='text-primary text-3xl modern:text-4xl w-fit'
                    style={{
                        fontFamily: "Nunito-ExtraBold",
                        fontWeight: 800,
                    }}>
                    DAVID
                </Text>
            </View>
            <View className='flex flex-row items-center gap-6'>
                <TouchableOpacity
                    onLongPress={() => router.push("/home/settings")}
                    onPress={() => router.push("/home/settings")}>
                    <Ionicons
                        name='md-settings-sharp'
                        size={24}
                        color='black'
                    />
                </TouchableOpacity>
                <TouchableOpacity
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
