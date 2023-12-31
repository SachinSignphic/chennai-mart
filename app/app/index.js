import { useFonts } from "expo-font";
import { Link, router } from "expo-router";
// import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, StatusBar, View, TouchableOpacity, useWindowDimensions } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import Swiper from "react-native-swiper";
import { useState } from "react";

SplashScreen.preventAutoHideAsync();

const swiperData = [
    {
        heading: "This is onboarding page 1",
    },
    {
        heading: "This is onboarding page 2",
    },
    {
        heading: "This is onboarding page 3",
    },
]

const SwiperSlide = ({ heading, subheading, image }) => {
    return (
        <View className='flex-1 items-center justify-center bg-white'>
            <Text className='text-primary text-xl'>{heading}</Text>
        </View>
    );
}

export default function App() {
    const hideSplashScreen = async () => {
        await SplashScreen.hideAsync();
    }

    const windowDim = useWindowDimensions();

    const [fontsLoaded, fontError] = useFonts({
        "Nunito ExtraBold": require("@assets/fonts/Nunito-ExtraBold.otf"), // 800
        Nunito: require("@assets/fonts/Nunito.ttf"),
    });

    const [isSwiperPlayed, setIsSwiperPlayed] = useState(false)

    if (!fontsLoaded || !fontError) {
        hideSplashScreen();
    }

    console.log(windowDim)

    return (
        <SafeAreaView className='flex-1'>
            <StatusBar barStyle='dark-content' />
            <Swiper
                autoplay
                autoplayTimeout={5}
                dot={
                    <View className='bg-primary/40 w-1 h-1 rounded-full mx-1' />
                }
                activeDot={
                    <View className='bg-primary w-1.5 h-1.5 rounded-full mx-1' />
                }
                paginationStyle={{
                    bottom: isSwiperPlayed ? 90 : 10,
                }}
                loop={false}
                onIndexChanged={(i) => i == 2 && setIsSwiperPlayed(true)}
            >
                {swiperData.map((data, i) => {
                    return <SwiperSlide key={i} heading={data.heading} />
                })}

            </Swiper>
            {isSwiperPlayed && (
                <TouchableOpacity
                    onPress={() => router.push("/home")}
                    activeOpacity={0.8}
                    className='absolute w-[90%] bottom-4 self-center bg-primary py-3 rounded-lg'>
                    <Text className='text-white font-nunito-400 self-center text-xl'>
                        Done✨
                    </Text>
                </TouchableOpacity>
            )}
        </SafeAreaView>
    );
}
