import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function App() {
    return (
        <View className='flex-1 justify-center items-center'>
            <Text className='text-xl text-red-500'>
                Open up App.js to start working on your app!
            </Text>
            <Link href={'/home'}>Go to home!</Link>
            <StatusBar style='auto' />
        </View>
    );
}
