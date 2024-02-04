import { View } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

export default OnboardingScreens = ({ children }) => {
    return (
        <>
            <StatusBar backgroundColor='#fff' style='dark' />
            <SafeAreaProvider>
                <View className='flex flex-1 items-center bg-white px-8'>
                    { children }
                </View>
            </SafeAreaProvider>
        </>
    )
}