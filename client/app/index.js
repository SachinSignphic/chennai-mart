import { useFonts } from "expo-font";
import { router } from "expo-router";
// import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, StatusBar, View, TouchableOpacity, ToastAndroid } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import Swiper from "react-native-swiper";
import { useState } from "react";
import storage from "@utils/storage";
import { IS_DEV } from "@/constants";

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
    const [isSwiperPlayed, setIsSwiperPlayed] = useState(false)
    const [canDisplayOnboarding, setCanDisplayOnboarding] = useState(false)

    const hideSplashScreen = async () => {
        await SplashScreen.hideAsync();
    }
    const checkIfUserSessionExpired = async () => {
        try {
            const user = await storage.load({ key: 'user' });
            console.log("🚀 ~ checkIfUserSessionExpired ~ user:", user)
            // check if it is expired by making a call to endpoint
            router.replace("/home");
        } catch (error) {
            console.log("🚀 ~ checkIfUserSessionExpired ~ error:", error)
            switch (error.name) {
                case 'NotFoundError':
                    ToastAndroid.show("User not found. Please login", 5000) 
                    router.replace("/login?showname=true");
                    break;
                case 'ExpiredError':
                    ToastAndroid.show("User session expired. Please login", 5000) 
                    router.replace("/login?showname=false");
                    break;
            }
        }
    }

    const checkIfOnboardingComplete = async () => {
        try {
            // await storage.remove({ key: 'isSwiperPlayed' });
            // await storage.remove({ key: 'user' });
            // setCanDisplayOnboarding(true);
            // return;
            // above 3 lines for testing. delete that boolean in storage whenever i need
            const hasSwiperBeenPlayed = await storage.load({ key: 'isSwiperPlayed' });
            if (hasSwiperBeenPlayed) router.push('/login');
        } catch (error) {
            // console.warn(error.message);
            setCanDisplayOnboarding(true);
            switch (error.name) {
                case 'NotFoundError':
                    console.log("SwiperPlayed state not found!"); // prolly remove this switch case
                    break;
                case 'ExpiredError':
                    // not possible because it never expires
                    break;
            }
        }
    }

    const handleSwiperComplete = async () => {
        await storage.save({
            key: "isSwiperPlayed",
            data: true,
            expires: 1000 * 60 * 60 * 24,
        });
        router.push('/login');
        // await storage.remove({ key: 'isSwiperPlayed' });
    }

    const [fontsLoaded, fontError] = useFonts({
        "Nunito ExtraBold": require("@assets/fonts/Nunito-ExtraBold.otf"), // 800
        Nunito: require("@assets/fonts/Nunito.ttf"),
    });

    if (!fontsLoaded || !fontError) {
        hideSplashScreen();
    }

    if (fontsLoaded) {
        !IS_DEV && checkIfUserSessionExpired();
        checkIfOnboardingComplete();
    }
    // console.log(windowDim)

    return (
        canDisplayOnboarding && (<SafeAreaView className='flex-1'>
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
                    onPress={handleSwiperComplete}
                    activeOpacity={0.8}
                    className='absolute w-[90%] bottom-4 self-center bg-primary py-3 rounded-lg'>
                    <Text className='text-white font-nunito-400 self-center text-xl'>
                        Done✨
                    </Text>
                </TouchableOpacity>
            )}
        </SafeAreaView>)
    );
}
