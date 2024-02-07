import { ScrollView, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

export default OnboardingScreens = ({ scrollView, children }) => {
    return (
        <>
            <StatusBar backgroundColor='#fff' style='dark' />
            <SafeAreaProvider>
                {
                    scrollView ? 
                        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} className='flex flex-1 bg-white px-8' contentContainerStyle={{alignItems: "center"}}>
                            {children}
                        </ScrollView> 
                        :
                        <View className='flex flex-1 items-center bg-white px-8'>
                            {children}
                        </View>
                }
                
            </SafeAreaProvider>
        </>
    )
}