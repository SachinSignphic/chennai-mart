import { useFonts } from 'expo-font';
import { View, Text, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import * as Splashscreen from "expo-splash-screen";
import Swiper from 'react-native-swiper';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

Splashscreen.preventAutoHideAsync();

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

const index = () => {
    const [isSwiperPlayed, setIsSwiperPlayed] = useState(false);
    const swiperRef = useRef();

    const hideSplashScreen = async () => {
        await Splashscreen.hideAsync();
    }

    const [fontsLoaded, fontError] = useFonts({
        "Nunito ExtraBold": require("@/assets/fonts/Nunito-ExtraBold.otf"), // 800
        Nunito: require("@/assets/fonts/Nunito.ttf"),
    });

    if (!fontsLoaded || !fontError) {
        hideSplashScreen();
    }

    return (
        fontsLoaded && <>
            <StatusBar backgroundColor='#F2F5FD' style='dark' />
            <Swiper
                ref={swiperRef}
                autoplay
                autoplayTimeout={5}
                disableIntervalMomentum
                dot={
                    <View className='bg-primary/40 w-1.5 h-1.5 rounded-full mx-1' />
                }
                activeDot={
                    <View className='bg-primary w-2 h-2 rounded-full mx-1' />
                }
                paginationStyle={{
                    bottom: isSwiperPlayed? 110: 50,
                }}
                loop={false}
                onIndexChanged={(i) => i == 2 && setIsSwiperPlayed(true)}
            >
                {swiperData.map((data, i) => {
                    return <SwiperSlide key={i} heading={data.heading} />
                })}
            </Swiper>
            {isSwiperPlayed && <TouchableOpacity activeOpacity={0.8} className='absolute flex bottom-6 items-center justify-center self-center bg-primary w-[90%] rounded-md py-4'
                onPress={() => router.push("/mobile")}
            >
                <Text className='font-nunito-400 text-lg modern:text-xl text-teal'>Next</Text>
            </TouchableOpacity>}
        </>
    )
}

export default index