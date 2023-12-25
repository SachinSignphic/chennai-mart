import { useFonts } from "expo-font";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
    const hideSplashScreen = async () => {
        await SplashScreen.hideAsync();
    }
    const [fontsLoaded, fontError] = useFonts({
        "Nunito ExtraBold": require("@assets/fonts/Nunito-ExtraBold.otf"), // 800
        Nunito: require("@assets/fonts/Nunito.ttf"),
    });

    if (!fontsLoaded || !fontError) {
        hideSplashScreen();
    }

    return (
        <View className='flex-1 justify-center items-center'>
            <Text className='text-xl text-red-500'>The onboarding screen</Text>
            <Link
                href={"/home"}
                className='text-2xl'>
                Go to home! After user logs in
            </Link>
            <StatusBar style='auto' />
            {/* once checking if signed in or used multiple times, use <Redirect /> component to take users */}
        </View>
    )
}
