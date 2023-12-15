import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function App() {
    return (
        <View className='flex-1 justify-center items-center'>
            <Text className='text-xl text-red-500'>
                The onboarding screen
            </Text>
            <Link href={'/home'}>Go to home! After user logs in</Link>
            <StatusBar style='auto' />
            {/* once checking if signed in or used multiple times, use <Redirect /> component to take users */}
        </View>
    );
}
